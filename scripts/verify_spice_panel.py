import subprocess
import time
import json
import urllib.request
import asyncio
import base64
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

try:
    import websockets
except ImportError:
    print("websockets not installed. Installing websockets...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "websockets"])
    import websockets

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

BACKEND_URL = "http://127.0.0.1:8000"
FRONTEND_URL = "http://127.0.0.1:5173"
DEBUG_PORT = "9230"
user_data_dir = os.path.join(os.environ.get("TEMP", "."), "chrome_spice_test_isolated")


def is_service_ready(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "HealthCheck"})
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False


async def run_spice_verification():
    print(f"Connecting to browser CDP on port {DEBUG_PORT}...")
    try:
        resp = urllib.request.urlopen(f"http://127.0.0.1:{DEBUG_PORT}/json/list")
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

    async with websockets.connect(ws_url, max_size=10_000_000) as ws:
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

        async def listen_for(duration_sec):
            start = time.time()
            while time.time() - start < duration_sec:
                try:
                    msg = await asyncio.wait_for(ws.recv(), timeout=0.2)
                    data = json.loads(msg)
                    method = data.get("method")
                    if method == "Runtime.consoleAPICalled":
                        args = [str(a.get("value", "")) for a in data["params"]["args"]]
                        log_text = " ".join(args)
                        console_logs.append(log_text)
                    elif method == "Runtime.exceptionThrown":
                        exc = data["params"]["exceptionDetails"]
                        exceptions.append(exc)
                        print(f"BROWSER EXCEPTION: {exc.get('text')} - {exc.get('exception', {}).get('description')}")
                except asyncio.TimeoutError:
                    pass

        # Wait for page to initialize and fetch SPICE health
        print("Waiting for page load and SPICE health check...")
        await listen_for(3.0)

        async def eval_js(expr):
            call_id = await send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
            while True:
                msg = await ws.recv()
                data = json.loads(msg)
                if data.get("id") == call_id:
                    res = data.get("result", {})
                    if "exceptionDetails" in res:
                        raise RuntimeError(f"JS Eval Error: {res['exceptionDetails']}")
                    return res.get("result", {}).get("value")

        # 1. Verify health status in DOM
        status_info = await eval_js("""(() => {
            const dot = document.getElementById('spice-status-dot');
            const text = document.getElementById('spice-status-text');
            const btn = document.getElementById('spice-fetch-btn');
            return {
                dotClass: dot?.className,
                statusText: text?.textContent,
                btnDisabled: btn?.disabled
            };
        })()""")
        print("Initial SPICE Status:", status_info)
        assert "dot-ok" in (status_info.get("dotClass") or ""), f"SPICE health dot not ok: {status_info}"
        assert not status_info.get("btnDisabled"), "Calculate button should be enabled"

        # 2. Trigger SPICE Calculation
        print("Clicking Calculate button to fetch ephemeris geometry...")
        await eval_js("document.getElementById('spice-fetch-btn').click()")
        await listen_for(2.0)

        # 3. Verify results populated
        results = await eval_js("""(() => {
            const results = document.getElementById('spice-results');
            return {
                visible: results && window.getComputedStyle(results).display !== 'none',
                sunDist: document.getElementById('res-sun-dist')?.textContent,
                sunAz: document.getElementById('res-sun-az')?.textContent,
                sunEl: document.getElementById('res-sun-el')?.textContent,
                sunHorizon: document.getElementById('res-sun-horizon')?.textContent,
                earthDist: document.getElementById('res-earth-dist')?.textContent,
                earthAz: document.getElementById('res-earth-az')?.textContent,
                earthEl: document.getElementById('res-earth-el')?.textContent,
                earthHorizon: document.getElementById('res-earth-horizon')?.textContent,
                frame: document.getElementById('res-frame')?.textContent,
                sceneNoteVisible: window.getComputedStyle(document.getElementById('spice-scene-note')).display !== 'none'
            };
        })()""")
        print("SPICE Results in DOM:")
        print(json.dumps(results, indent=2))

        assert results.get("visible"), "SPICE results section not visible"
        assert results.get("sunDist") and results.get("sunDist") != "—", "Sun distance not populated"
        assert results.get("sunAz") and results.get("sunAz") != "—", "Sun azimuth not populated"
        assert results.get("earthDist") and results.get("earthDist") != "—", "Earth distance not populated"
        assert "MOON_ME" in (results.get("frame") or ""), "Reference frame is not MOON_ME"
        assert results.get("sceneNoteVisible"), "Scene note indicating light update was not displayed"

        # 4. Verify Mission Badge & South Pole Focus Button
        print("Testing Mission Badge and South Pole focus button...")
        badge_text = await eval_js("document.querySelector('.mission-badge')?.textContent")
        print("Mission badge:", badge_text)
        assert "SOUTH POLE" in (badge_text or ""), f"Mission badge missing: {badge_text}"

        print("Clicking South Pole button to orbit camera to South Pole...")
        await eval_js("document.getElementById('btn-south-pole').click()")
        await listen_for(1.8)  # wait for camera tween

        # 5. Capture live screenshot of South Pole View
        print("Capturing live screenshot of South Pole highlight view...")
        ss_id = await send("Page.captureScreenshot", {"format": "png"})
        screenshot_bytes = None
        while screenshot_bytes is None:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == ss_id:
                screenshot_bytes = base64.b64decode(data["result"]["data"])

        screenshot_path = "south_pole_highlight_render.png"
        with open(screenshot_path, "wb") as f:
            f.write(screenshot_bytes)
        print(f"Saved live South Pole verification screenshot: {screenshot_path} ({len(screenshot_bytes):,} bytes)")

        # 6. Test South Pole site presets in SPICE panel
        print("Testing South Pole presets (clicking South Pole 90°S)...")
        await eval_js("document.querySelectorAll('.spice-preset-btn')[1].click()")
        await listen_for(1.5)

        sp_results = await eval_js("""(() => {
            const lat = document.getElementById('spice-lat')?.value;
            const note = document.getElementById('spice-site-note')?.textContent;
            return { lat, note };
        })()""")
        print("SPICE inputs after South Pole preset click:", sp_results)
        assert float(sp_results.get("lat") or 0) <= -89.9, f"Preset did not set lat to -90: {sp_results}"

        # 7. Test panel collapse / expand toggle
        print("Testing panel collapse / expand toggle...")
        await eval_js("document.querySelector('.spice-header').click()")
        await listen_for(0.3)
        collapsed = await eval_js("window.getComputedStyle(document.querySelector('.spice-body')).display === 'none'")
        assert collapsed, "Panel body did not collapse upon header click"

        await eval_js("document.querySelector('.spice-header').click()")
        await listen_for(0.3)
        expanded = await eval_js("window.getComputedStyle(document.querySelector('.spice-body')).display !== 'none'")
        assert expanded, "Panel body did not expand upon header click"

        # 8. Verify zero uncaught exceptions
        assert len(exceptions) == 0, f"Uncaught exceptions during test: {exceptions}"
        print("ALL SOUTH POLE AND SPICE VERIFICATIONS PASSED WITH ZERO ERRORS!")
        return True


def main():
    backend_proc = None
    frontend_proc = None
    browser_proc = None

    try:
        # Check or start backend
        if not is_service_ready(f"{BACKEND_URL}/api/spice/health"):
            print("Starting FastAPI backend on port 8000...")
            backend_proc = subprocess.Popen(
                [sys.executable, "-m", "uvicorn", "app:app", "--host", "127.0.0.1", "--port", "8000"],
                cwd=os.path.abspath("backend"),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            for _ in range(15):
                if is_service_ready(f"{BACKEND_URL}/api/spice/health"):
                    break
                time.sleep(0.5)

        assert is_service_ready(f"{BACKEND_URL}/api/spice/health"), "Backend health check failed to respond"
        print("Backend is verified healthy.")

        # Check or start frontend
        if not is_service_ready(FRONTEND_URL):
            print("Starting Vite frontend on port 5173...")
            frontend_proc = subprocess.Popen(
                ["npx.cmd", "vite", "--port", "5173", "--host", "127.0.0.1"],
                cwd=os.path.abspath("."),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            for _ in range(15):
                if is_service_ready(FRONTEND_URL):
                    break
                time.sleep(0.5)

        assert is_service_ready(FRONTEND_URL), "Frontend failed to start on port 5173"
        print("Frontend is verified running.")

        # Start browser
        print("Starting headless browser...")
        browser_proc = subprocess.Popen([
            chrome_bin,
            "--headless=new",
            f"--remote-debugging-port={DEBUG_PORT}",
            f"--user-data-dir={user_data_dir}",
            "--disable-extensions",
            "--disable-gpu-sandbox",
            "--enable-webgl",
            "--ignore-gpu-blocklist",
            "--window-size=1600,1000",
            FRONTEND_URL,
        ])
        time.sleep(2)

        success = asyncio.run(run_spice_verification())
        if not success:
            sys.exit(1)

    finally:
        print("Cleaning up processes...")
        if browser_proc:
            browser_proc.terminate()
            browser_proc.wait()
        if frontend_proc:
            frontend_proc.terminate()
            frontend_proc.wait()
        if backend_proc:
            backend_proc.terminate()
            backend_proc.wait()
        print("Cleanup complete.")


if __name__ == "__main__":
    main()
