import subprocess
import time
import json
import urllib.request
import asyncio
import os
import websockets

chrome_bin = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
user_data = os.path.join(os.environ.get("TEMP", "."), "chrome_interaction_test")

proc = subprocess.Popen([
    chrome_bin,
    "--headless=new",
    "--remote-debugging-port=9228",
    f"--user-data-dir={user_data}",
    "--disable-extensions",
    "--window-size=1600,1000",
    "http://127.0.0.1:5173/",
])

time.sleep(2)

async def test_interactions():
    resp = urllib.request.urlopen("http://127.0.0.1:9228/json/list")
    tabs = json.loads(resp.read().decode("utf-8"))
    page = [t for t in tabs if t.get("type") == "page"][0]
    
    async with websockets.connect(page["webSocketDebuggerUrl"]) as ws:
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
        exceptions = []

        async def listen_short(dur=1.0):
            start = time.time()
            while time.time() - start < dur:
                try:
                    msg = await asyncio.wait_for(ws.recv(), timeout=0.2)
                    d = json.loads(msg)
                    if d.get("method") == "Runtime.exceptionThrown":
                        exceptions.append(d["params"])
                except asyncio.TimeoutError:
                    pass

        await listen_short(2.0)

        # 1. Test clicking Reset
        print("Testing Reset button...")
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-reset').click()"})
        await listen_short(0.5)

        # 2. Test toggling Auto-Rotate
        print("Testing Auto-Rotate button...")
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-auto').click()"})
        await listen_short(0.5)

        # 3. Test toggling Relief Scale
        print("Testing Relief scale button...")
        for _ in range(4):
            await send("Runtime.evaluate", {"expression": "document.getElementById('btn-topo').click()"})
            await listen_short(0.3)

        # 4. Test toggling Wireframe
        print("Testing Wireframe button...")
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-wire').click()"})
        await listen_short(0.3)
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-wire').click()"})
        await listen_short(0.3)

        # 5. Test toggling Sun Cycle
        print("Testing Sun Cycle button...")
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-sun').click()"})
        await listen_short(0.5)
        await send("Runtime.evaluate", {"expression": "document.getElementById('btn-sun').click()"})
        await listen_short(0.5)

        # 6. Test mouse drag & hover
        print("Testing canvas mouse interactions...")
        await send("Runtime.evaluate", {"expression": """(() => {
            const canvas = document.querySelector('canvas');
            const rect = canvas.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: cx, clientY: cy, bubbles: true }));
        })()"""})
        await listen_short(0.5)

        eval_res = await send("Runtime.evaluate", {
            "expression": """(() => {
                const elev = document.getElementById('readout-elev')?.textContent;
                const coords = document.getElementById('readout-coords')?.textContent;
                return { elev, coords };
            })()""",
            "returnByValue": True
        })

        while True:
            msg = await ws.recv()
            d = json.loads(msg)
            if d.get("id") == eval_res:
                readout = d.get("result", {}).get("result", {}).get("value")
                print("Hover readout at center:", readout)
                break

        assert not exceptions, f"Exceptions encountered: {exceptions}"
        print("ALL INTERACTION TESTS PASSED ZERO ERRORS!")

try:
    asyncio.run(test_interactions())
finally:
    proc.terminate()
    proc.wait()
