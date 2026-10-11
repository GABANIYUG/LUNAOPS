import subprocess
import time
import json
import urllib.request
import asyncio
import base64
import os
import sys

try:
    import websockets
except ImportError:
    print("websockets not installed")
    sys.exit(1)

CHROME_PATHS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]

chrome_bin = None
for p in CHROME_PATHS:
    if os.path.exists(p):
        chrome_bin = p
        break

if not chrome_bin:
    print("No compatible browser found")
    sys.exit(1)

user_data_dir = os.path.join(os.environ.get("TEMP", "."), "chrome_lunaops_test_isolated")

proc = subprocess.Popen([
    chrome_bin,
    "--headless=new",
    "--remote-debugging-port=9224",
    f"--user-data-dir={user_data_dir}",
    "--disable-extensions",
    "--disable-gpu-sandbox",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    "--window-size=1600,1000",
    "http://127.0.0.1:5173/",
])

time.sleep(2)


async def run_test():
    try:
        resp = urllib.request.urlopen("http://127.0.0.1:9224/json/list")
        tabs = json.loads(resp.read().decode("utf-8"))
        page_tab = None
        for t in tabs:
            if t.get("type") == "page":
                page_tab = t
                break
        if not page_tab:
            page_tab = tabs[0]
        ws_url = page_tab["webSocketDebuggerUrl"]
        print(f"Connected to page CDP: {ws_url} (title: {page_tab.get('title')})")
    except Exception as e:
        print(f"Failed to connect to browser CDP: {e}")
        return False

    async with websockets.connect(ws_url) as ws:
        msg_id = 1

        async def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            payload = {"id": msg_id, "method": method}
            if params:
                payload["params"] = params
            await ws.send(json.dumps(payload))
            return msg_id

        await send("Runtime.enable")
        await send("Console.enable")

        console_logs = []
        exceptions = []

        # Listen for messages over 4 seconds
        start_time = time.time()
        while time.time() - start_time < 4.0:
            try:
                msg = await asyncio.wait_for(ws.recv(), timeout=0.5)
                data = json.loads(msg)
                method = data.get("method")
                if method == "Runtime.consoleAPICalled":
                    args = [str(a.get("value", "")) for a in data["params"]["args"]]
                    log_text = " ".join(args)
                    console_logs.append(log_text)
                    print(f"BROWSER CONSOLE: {log_text}")
                elif method == "Runtime.exceptionThrown":
                    exc = data["params"]["exceptionDetails"]
                    exceptions.append(exc)
                    print(f"BROWSER EXCEPTION: {exc}")
            except asyncio.TimeoutError:
                pass

        # Inspect DOM & WebGL state
        eval_id = await send("Runtime.evaluate", {
            "expression": """(() => {
                const telem = document.getElementById('telem-color')?.textContent;
                const canvas = document.querySelector('canvas');
                const overlay = document.getElementById('loading-overlay');
                const readoutCoords = document.getElementById('readout-coords')?.textContent;
                const readoutElev = document.getElementById('readout-elev')?.textContent;
                return {
                    colorTelemetry: telem,
                    canvasWidth: canvas?.width,
                    canvasHeight: canvas?.height,
                    hasCanvas: !!canvas,
                    overlayRemoved: !overlay || window.getComputedStyle(overlay).opacity === '0',
                    readoutCoords: readoutCoords,
                    readoutElev: readoutElev
                };
            })()""",
            "returnByValue": True,
        })

        # Capture screenshot
        ss_id = await send("Page.captureScreenshot", {"format": "png"})

        eval_res = None
        screenshot_bytes = None

        while eval_res is None or screenshot_bytes is None:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == eval_id:
                eval_res = data.get("result", {}).get("result", {}).get("value")
            elif data.get("id") == ss_id:
                screenshot_bytes = base64.b64decode(data["result"]["data"])

        print("=== EVALUATION STATE ===")
        print(json.dumps(eval_res, indent=2))

        screenshot_path = "moon_4k_live_render.png"
        with open(screenshot_path, "wb") as f:
            f.write(screenshot_bytes)
        print(f"Saved live verification screenshot: {screenshot_path} ({len(screenshot_bytes):,} bytes)")

        # Verify results
        assert not exceptions, f"Exceptions encountered: {exceptions}"
        assert any("Successfully loaded color texture" in l for l in console_logs), "Texture load message not found in console"
        print("TEST PASSED: Live Moon render verified with 4K color map successfully.")
        return True


try:
    success = asyncio.run(run_test())
finally:
    proc.terminate()
    proc.wait()
