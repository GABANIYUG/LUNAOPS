import subprocess
import time
import json
import urllib.request
import asyncio
import os
import websockets

chrome_bin = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
webp_path = r"public\generated\lroc_color_4k.webp"
webp_bak = r"public\generated\lroc_color_4k.webp.bak"
jpg_path = r"public\generated\lroc_color_4k.jpg"
jpg_bak = r"public\generated\lroc_color_4k.jpg.bak"

async def test_session(port, expected_substr):
    resp = urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list")
    tabs = json.loads(resp.read().decode("utf-8"))
    page = [t for t in tabs if t.get("type") == "page"][0]
    async with websockets.connect(page["webSocketDebuggerUrl"]) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Console.enable"}))
        start = time.time()
        matched = False
        while time.time() - start < 5:
            try:
                msg = await asyncio.wait_for(ws.recv(), timeout=0.5)
                d = json.loads(msg)
                if d.get("method") == "Runtime.consoleAPICalled":
                    args = [str(a.get("value", "")) for a in d["params"]["args"]]
                    text = " ".join(args)
                    if expected_substr in text:
                        print(f"MATCHED EXPECTED: {text}")
                        matched = True
                        break
            except asyncio.TimeoutError:
                pass
        return matched

def run_browser(port):
    user_data = os.path.join(os.environ.get("TEMP", "."), f"chrome_fb_{port}")
    return subprocess.Popen([
        chrome_bin,
        "--headless=new",
        f"--remote-debugging-port={port}",
        f"--user-data-dir={user_data}",
        "--disable-extensions",
        "--window-size=1600,1000",
        "http://127.0.0.1:5173/",
    ])

print("--- Testing Fallback Level 1 (4K JPEG fallback when WebP missing) ---")
os.rename(webp_path, webp_bak)
try:
    p1 = run_browser(9226)
    time.sleep(2)
    res1 = asyncio.run(test_session(9226, "NASA LROC 4K (JPEG)"))
    p1.terminate()
    p1.wait()
    assert res1, "Failed to fall back to 4K JPEG"
    print("Fallback 1 (4K JPEG) PASSED.")
finally:
    os.rename(webp_bak, webp_path)

print("\n--- Testing Fallback Level 2 (2K fallback when all 4K missing) ---")
os.rename(webp_path, webp_bak)
os.rename(jpg_path, jpg_bak)
try:
    p2 = run_browser(9227)
    time.sleep(2)
    res2 = asyncio.run(test_session(9227, "NASA LROC 2K (Fallback)"))
    p2.terminate()
    p2.wait()
    assert res2, "Failed to fall back to 2K texture"
    print("Fallback 2 (2K JPG) PASSED.")
finally:
    os.rename(webp_bak, webp_path)
    os.rename(jpg_bak, jpg_path)

print("\nALL FALLBACK TESTS PASSED PERFECTLY!")
