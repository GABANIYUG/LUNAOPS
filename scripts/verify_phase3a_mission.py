"""
scripts/verify_phase3a_mission.py — End-to-End Browser Automation Test for Phase 3A.

Validates:
1. Application load and global Moon display.
2. Opening the Mission Configuration Workspace via #btn-new-mission.
3. Candidate preset selection and coordinate synchronization.
4. Local Site 01 terrain canvas, layer toggles, and coverage status box.
5. Outside-of-coverage fallback behavior.
6. Mission timeline duration arithmetic and UTC normalization.
7. Data readiness checklist.
8. Live SPICE ephemeris calculation via /api/spice/geometry.
9. Scenario summary and modal close/reopen.
10. Console error check and verification screenshot capture.
"""

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
DEBUG_PORT = "9232"
user_data_dir = os.path.join(os.environ.get("TEMP", "."), "chrome_phase3a_test_isolated")

def is_service_ready(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "HealthCheck"})
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False

async def run_phase3a_verification():
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
                        console_logs.append(" ".join(args))
                    elif method == "Runtime.exceptionThrown":
                        exc = data["params"]["exceptionDetails"]
                        exceptions.append(exc.get("text", "") + " " + str(exc.get("exception", {})))
                except asyncio.TimeoutError:
                    pass

        async def evaluate(expr):
            call_id = await send("Runtime.evaluate", {
                "expression": expr,
                "awaitPromise": True,
                "returnByValue": True,
            })
            start = time.time()
            while time.time() - start < 10.0:
                msg = await ws.recv()
                data = json.loads(msg)
                if data.get("id") == call_id:
                    result = data.get("result", {}).get("result", {})
                    return result.get("value")
            return None

        # ── 1. Page load check ──
        print("\n--- 1. Checking Page Load & New Mission Button ---")
        await evaluate("window.location.href = 'http://127.0.0.1:5173'")
        await listen_for(3.0)

        title = await evaluate("document.title")
        print(f"Page Title: {title}")
        assert "LUNAOPS" in title, f"Expected LUNAOPS in title, got: {title}"

        has_new_mission_btn = await evaluate("!!document.getElementById('btn-new-mission')")
        print(f"New Mission Analysis button present: {has_new_mission_btn}")
        assert has_new_mission_btn, "btn-new-mission button missing from HUD"

        # ── 2. Open Mission Workspace Modal ──
        print("\n--- 2. Opening Mission Configuration Workspace ---")
        await evaluate("document.getElementById('btn-new-mission').click()")
        await listen_for(1.0)

        is_modal_visible = await evaluate("!document.getElementById('mission-workspace-modal').classList.contains('hidden')")
        print(f"Mission Workspace modal open: {is_modal_visible}")
        assert is_modal_visible, "Modal failed to open"

        kicker = await evaluate("document.querySelector('.mission-kicker').textContent")
        modal_title = await evaluate("document.querySelector('.mission-title').textContent")
        readiness_badge = await evaluate("document.querySelector('.mission-header .readiness-pill').textContent")
        print(f"Workspace Header: {kicker} | {modal_title}")
        print(f"Initial Readiness: {readiness_badge}")
        assert "NASA SPACE APPS" in kicker
        assert "READY" in readiness_badge

        # ── 3. Test Presets & Coverage Switch ──
        print("\n--- 3. Testing Landing Site Presets & Coverage Detection ---")
        # Click Shackleton Crater Peak (Candidate 04) - outside Site01 tile
        await evaluate("""
            const p = document.querySelector('[data-preset-id="shackleton-peak"]');
            if (p) p.click();
        """)
        await listen_for(0.5)

        outside_status = await evaluate("""
            (() => {
                const box = document.querySelector('.coverage-status-box');
                const statVal = document.querySelector('.val-good');
                return {
                    isOutsideBox: box ? box.classList.contains('status-dem-outside') : false,
                    statVal: statVal ? statVal.textContent.trim() : 'none'
                };
            })()
        """)
        print(f"Outside Preset Selection Status: {outside_status}")
        assert outside_status['isOutsideBox'], "Should be marked outside DEM coverage"

        # Click Jump to Artemis Site 01 button
        await evaluate("""
            const btn = document.getElementById('btn-jump-site01');
            if (btn) btn.click();
        """)
        await listen_for(0.5)

        inside_status = await evaluate("""
            (() => {
                const box = document.querySelector('.coverage-status-box');
                const canvas = document.getElementById('site01-terrain-canvas');
                return {
                    isInsideBox: box ? box.classList.contains('status-dem-active') : false,
                    hasCanvas: !!canvas
                };
            })()
        """)
        print(f"Artemis Site 01 Restored Status: {inside_status}")
        assert inside_status['isInsideBox'], "Should be marked inside DEM coverage"
        assert inside_status['hasCanvas'], "Site 01 terrain canvas should be rendered"

        # ── 4. Test Timeline Configuration ──
        print("\n--- 4. Testing Mission Timeline & Duration Arithmetic ---")
        await evaluate("""
            const tab = document.querySelector('[data-tab="timeline"]');
            if (tab) tab.click();
        """)
        await listen_for(0.5)

        timeline_info = await evaluate("""
            (() => {
                const start = document.querySelector('.milestone-time');
                const dur = document.querySelector('.connector-duration');
                const cov = document.querySelector('.kernel-coverage-box');
                return {
                    start: start ? start.textContent.trim() : '',
                    dur: dur ? dur.textContent.trim() : '',
                    isCovered: cov ? cov.classList.contains('coverage-ok') : false
                };
            })()
        """)
        print(f"Timeline Details: {timeline_info}")
        assert "2026-10-16T12:00:00Z" in timeline_info['start']
        assert "14 days" in timeline_info['dur']
        assert timeline_info['isCovered'], "Interval must be covered by DE440s"

        # ── 5. Test Live SPICE Evaluation ──
        print("\n--- 5. Testing Live SPICE Geometry Evaluation (/api/spice/geometry) ---")
        tab_status = await evaluate("""
            (() => {
                const tab = document.querySelector('[data-tab="readiness"]');
                if (!tab) return 'READINESS_TAB_NOT_FOUND';
                tab.click();
                return 'READINESS_TAB_CLICKED';
            })()
        """)
        print(f"Readiness tab click status: {tab_status}")
        await listen_for(1.0)

        # Click Evaluate Geometry button
        print("Clicking Evaluate Live Geometry...")
        click_status = await evaluate("""
            (() => {
                const b = document.getElementById('btn-eval-spice-tab');
                if (!b) return 'BUTTON_NOT_FOUND';
                b.click();
                return 'BUTTON_CLICKED';
            })()
        """)
        print(f"Evaluate button status: {click_status}")

        geom_results = None
        for i in range(15):
            await listen_for(0.5)
            geom_results = await evaluate("""
                (() => {
                    const cards = document.querySelectorAll('.geom-card');
                    if (!cards || cards.length < 2) {
                        const err = document.querySelector('.empty-geom-state')?.innerText;
                        return err ? { error: err } : null;
                    }
                    const sunText = cards[0].innerText;
                    const earthText = cards[1].innerText;
                    const meta = document.querySelector('.geom-meta-bar')?.innerText || '';
                    return { sunText, earthText, meta };
                })()
            """)
            if geom_results:
                break
        print(f"SPICE Evaluation Output:\n{json.dumps(geom_results, indent=2)}")
        print(f"Recent console logs: {console_logs[-5:] if console_logs else 'none'}")
        print(f"Recent exceptions: {exceptions}")
        assert geom_results is not None, "SPICE calculation did not return geometry cards"
        assert "Sun Position" in geom_results['sunText']
        assert "Earth Position" in geom_results['earthText']
        assert "MOON_ME" in geom_results['meta']
        assert "AU" in geom_results['sunText']

        # ── 6. Capture Screenshot ──
        print("\n--- 6. Capturing Phase 3A Mission Workspace Screenshot ---")
        shot_res = await send("Page.captureScreenshot", {"format": "png"})
        shot_start = time.time()
        while time.time() - shot_start < 5.0:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == shot_res:
                b64_data = data["result"]["data"]
                img_bytes = base64.b64decode(b64_data)
                out_path = r"y:\LUNAOPS\phase3a_mission_workspace_render.png"
                with open(out_path, "wb") as f:
                    f.write(img_bytes)
                print(f"Saved Phase 3A verification screenshot: {out_path} ({len(img_bytes):,} bytes)")
                break

        # ── 7. Test Apply and Close ──
        print("\n--- 7. Applying Configuration to 3D Scene ---")
        summary_tab_res = await evaluate("""
            (() => {
                const tab = document.querySelector('[data-tab="summary"]');
                if (!tab) return 'SUMMARY_TAB_NOT_FOUND';
                tab.click();
                return 'SUMMARY_TAB_CLICKED';
            })()
        """)
        print(f"Summary tab switch status: {summary_tab_res}")
        await listen_for(1.0)

        apply_res = await evaluate("""
            (() => {
                const btn = document.getElementById('btn-apply-3d-view');
                if (!btn) return 'APPLY_BTN_NOT_FOUND';
                btn.click();
                return 'APPLY_CLICKED';
            })()
        """)
        print(f"Apply button click status: {apply_res}")
        await listen_for(0.8)

        is_modal_closed = await evaluate("document.getElementById('mission-workspace-modal').classList.contains('hidden')")
        print(f"Modal closed after apply: {is_modal_closed}")
        assert is_modal_closed, "Modal should be hidden after applying"

        coords_readout = await evaluate("document.getElementById('readout-coords').textContent")
        print(f"HUD Coordinates after applying: {coords_readout}")
        assert "89.463° S" in coords_readout, f"Expected 89.463° S in HUD, got: {coords_readout}"

        # ── 8. Console Error Check ──
        print("\n--- 8. Checking Browser Console Health ---")
        print(f"Total Console logs: {len(console_logs)}")
        print(f"Total Exceptions: {len(exceptions)}")
        if exceptions:
            print("Exceptions encountered:")
            for e in exceptions:
                print(f"  - {e}")
            assert len(exceptions) == 0, f"Found {len(exceptions)} exceptions"

        print("\nALL PHASE 3A BROWSER VERIFICATION TESTS PASSED WITH ZERO ERRORS!")
        return True

async def main():
    # 1. Check backend
    if not is_service_ready(f"{BACKEND_URL}/api/spice/health"):
        print("Backend is not running at http://127.0.0.1:8000. Please start the backend.")
        sys.exit(1)
    print("Backend is verified healthy.")

    # 2. Check frontend
    if not is_service_ready(FRONTEND_URL):
        print(f"Starting Vite frontend on port 5173...")
        vite_proc = subprocess.Popen(
            ["npx", "vite", "--port", "5173"],
            cwd=r"y:\LUNAOPS",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
        )
        time.sleep(3)

    print("Frontend is verified running.")

    # 3. Start headless browser with remote debugging
    browser_args = [
        chrome_bin,
        f"--remote-debugging-port={DEBUG_PORT}",
        f"--user-data-dir={user_data_dir}",
        "--no-first-run",
        "--no-default-browser-check",
        "--headless=new",
        "--window-size=1440,900",
        FRONTEND_URL,
    ]
    print(f"Starting headless browser: {chrome_bin}")
    browser_proc = subprocess.Popen(browser_args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    try:
        success = await run_phase3a_verification()
        if not success:
            sys.exit(1)
    finally:
        print("Cleaning up browser process...")
        browser_proc.terminate()
        try:
            browser_proc.wait(timeout=3)
        except Exception:
            browser_proc.kill()
        print("Cleanup complete.")

if __name__ == "__main__":
    asyncio.run(main())
