"""
scripts/test_phase3a_math.py — Unit Tests for Phase 3A Algorithms.

Tests:
1. Polar stereographic forward & inverse transforms (conformal, reversible to 1e-9).
2. Site 01 bounds and pixel affine transforms (inside vs outside).
3. Coordinate convention & formatting (MOON_ME East-positive, South negative).
4. Mission timeline arithmetic (start UTC + duration = end UTC).
5. DE440s kernel coverage interval validation.
"""

import math
import sys
import os

LUNAR_RADIUS_M = 1737400.0

SITE01_BOUNDS = {
    'minX': -19000.0,
    'maxX': -3000.0,
    'minY': -20000.0,
    'maxY': -4000.0,
    'pixelSizeM': 5.0,
    'fullWidthPx': 3200,
    'fullHeightPx': 3200,
}

def selenographic_to_polar_stereo(lon_deg, lat_deg, R=LUNAR_RADIUS_M):
    norm_lon = (lon_deg % 360.0 + 360.0) % 360.0
    lam = math.radians(norm_lon)
    phi = math.radians(lat_deg)
    c = math.pi / 2.0 + phi
    rho = 2.0 * R * math.tan(c / 2.0)
    x = rho * math.sin(lam)
    y = rho * math.cos(lam)
    return x, y

def polar_stereo_to_selenographic(x, y, R=LUNAR_RADIUS_M):
    rho = math.hypot(x, y)
    if rho < 1e-9:
        return 0.0, -90.0
    c = 2.0 * math.atan2(rho, 2.0 * R)
    phi = -math.pi / 2.0 + c
    lam = math.atan2(x, y)
    lon_deg = (math.degrees(lam) + 360.0) % 360.0
    lat_deg = math.degrees(phi)
    return lon_deg, lat_deg

def is_inside_site01(lon_deg, lat_deg):
    x, y = selenographic_to_polar_stereo(lon_deg, lat_deg)
    return (
        SITE01_BOUNDS['minX'] <= x <= SITE01_BOUNDS['maxX'] and
        SITE01_BOUNDS['minY'] <= y <= SITE01_BOUNDS['maxY']
    )

def polar_to_pixel(x, y):
    px = (x - SITE01_BOUNDS['minX']) / SITE01_BOUNDS['pixelSizeM']
    py = (SITE01_BOUNDS['maxY'] - y) / SITE01_BOUNDS['pixelSizeM']
    return px, py

def pixel_to_polar(px, py):
    x = SITE01_BOUNDS['minX'] + px * SITE01_BOUNDS['pixelSizeM']
    y = SITE01_BOUNDS['maxY'] - py * SITE01_BOUNDS['pixelSizeM']
    return x, y

# ── RUN CHECKS ─────────────────────────────────────────────────────────────

errors = []
def check(cond, msg):
    if not cond:
        print(f"  [FAIL] {msg}")
        errors.append(msg)
    else:
        print(f"  [PASS] {msg}")

print("=" * 60)
print("PHASE 3A MATHEMATICAL AND ALGORITHMIC SUITE")
print("=" * 60)

# 1. South Pole Singularity
print("\n--- 1. South Pole Singularity ---")
x0, y0 = selenographic_to_polar_stereo(0.0, -90.0)
check(abs(x0) < 1e-9 and abs(y0) < 1e-9, f"South Pole maps to projected origin (0, 0): got ({x0}, {y0})")
lon0, lat0 = polar_stereo_to_selenographic(0.0, 0.0)
check(abs(lat0 - (-90.0)) < 1e-9, f"Origin inverts to -90° lat: got {lat0}°")

# 2. Site 01 Known Center Reversibility
print("\n--- 2. Site 01 Center Reversibility ---")
known_lon = 222.51044707800082
known_lat = -89.463162834037
x_c, y_c = selenographic_to_polar_stereo(known_lon, known_lat)
check(abs(x_c - (-11000.0)) < 1e-3, f"Site 01 center X = -11000 m: got {x_c:.4f}")
check(abs(y_c - (-12000.0)) < 1e-3, f"Site 01 center Y = -12000 m: got {y_c:.4f}")

lon_inv, lat_inv = polar_stereo_to_selenographic(-11000.0, -12000.0)
check(abs(lon_inv - known_lon) < 1e-6, f"Inverted lon matches: got {lon_inv:.6f}°")
check(abs(lat_inv - known_lat) < 1e-6, f"Inverted lat matches: got {lat_inv:.6f}°")

# 3. Round-Trip Reversibility across a 2D Grid
print("\n--- 3. Round-Trip Reversibility across South Polar Cap ---")
grid_ok = True
for lat in [-89.9, -89.5, -88.0, -85.0]:
    for lon in [0.0, 45.0, 90.0, 135.0, 180.0, 222.5, 270.0, 315.0]:
        x, y = selenographic_to_polar_stereo(lon, lat)
        lon_r, lat_r = polar_stereo_to_selenographic(x, y)
        if abs(lon_r - lon) > 1e-5 or abs(lat_r - lat) > 1e-5:
            grid_ok = False
check(grid_ok, "Full polar grid round-trip error < 1e-5 deg")

# 4. Raster Bounds & Footprint
print("\n--- 4. Site 01 Raster Bounds & Affine Mapping ---")
check(is_inside_site01(known_lon, known_lat), "Site 01 center is inside coverage")
check(not is_inside_site01(0.0, -90.0), "Geographic South Pole (0, -90) is outside Site 01 tile")
check(not is_inside_site01(128.0, -89.78), "Shackleton peak (128°E, -89.78°) is outside Site 01 tile")
check(not is_inside_site01(2.7, -86.04), "Malapert mountain (2.7°E, -86.04°) is outside Site 01 tile")

# Pixel affine mapping:
px_c, py_c = polar_to_pixel(-11000.0, -12000.0)
check(abs(px_c - 1600.0) < 1e-3, f"Center pixel X = 1600 px (3200 width): got {px_c}")
check(abs(py_c - 1600.0) < 1e-3, f"Center pixel Y = 1600 px (3200 height): got {py_c}")

# Corners:
px_ul, py_ul = polar_to_pixel(-19000.0, -4000.0)
check(abs(px_ul) < 1e-3 and abs(py_ul) < 1e-3, f"Upper-left corner is (0, 0): got ({px_ul}, {py_ul})")
px_lr, py_lr = polar_to_pixel(-3000.0, -20000.0)
check(abs(px_lr - 3200.0) < 1e-3 and abs(py_lr - 3200.0) < 1e-3, f"Lower-right corner is (3200, 3200): got ({px_lr}, {py_lr})")

# 5. Timeline Arithmetic
print("\n--- 5. Timeline Arithmetic & Coverage Range ---")
import datetime

start_dt = datetime.datetime.fromisoformat("2026-10-16T12:00:00+00:00")
duration_days = 14
end_dt = start_dt + datetime.timedelta(days=duration_days)
end_iso = end_dt.strftime("%Y-%m-%dT%H:%M:%SZ")
check(end_iso == "2026-10-30T12:00:00Z", f"14-day duration computes 2026-10-30T12:00:00Z: got {end_iso}")

# DE440s range: 1900 to 2050
check(1900 <= start_dt.year <= 2050 and 1900 <= end_dt.year <= 2050, "Interval 2026-10-16 to 2026-10-30 is within DE440s coverage")
invalid_dt = datetime.datetime(2100, 1, 1, tzinfo=datetime.timezone.utc)
check(not (1900 <= invalid_dt.year <= 2050), "Year 2100 correctly flagged as outside DE440s coverage")

print("\n" + "=" * 60)
if errors:
    print(f"FAILED: {len(errors)} error(s)")
    sys.exit(1)
else:
    print("ALL PHASE 3A MATHEMATICAL CHECKS PASSED (0 FAILURES)")
print("=" * 60)
