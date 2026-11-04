"""
generate_polar_relief.py — Generates a scientifically registered, high-resolution
polar stereographic grayscale shaded relief map for the Lunar South Pole (80°S–90°S)
from real NASA LOLA DEM data in LUNAOPS.
"""

import os
import math
import numpy as np
from PIL import Image

def generate_polar_relief():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dem_path = os.path.join(base_dir, "public", "generated", "ldem_displacement_8bit.png")
    out_path = os.path.join(base_dir, "public", "generated", "south_pole_polar_relief.png")
    
    if not os.path.exists(dem_path):
        print(f"Error: DEM not found at {dem_path}")
        return

    print("Loading global LOLA DEM...")
    dem_img = Image.open(dem_path)
    dem_arr = np.asarray(dem_img, dtype=np.float32)
    dem_h, dem_w = dem_arr.shape # 2880 x 5760

    # Real lunar elevation range from metadata: -8.9815 km to +10.6855 km
    elev_min_m = -8981.5
    elev_max_m = 10685.5
    elev_range_m = elev_max_m - elev_min_m
    elev_m = elev_min_m + (dem_arr / 255.0) * elev_range_m

    # Polar stereographic grid parameters:
    # Extent: 330 km in each direction from pole (covers 80°S which is at ~304 km)
    out_size = 960
    max_dist_m = 330000.0
    R = 1737400.0 # Lunar radius

    xs = np.linspace(-max_dist_m, max_dist_m, out_size)
    ys = np.linspace(max_dist_m, -max_dist_m, out_size) # top is +Y (0° Prime Meridian)
    X, Y = np.meshgrid(xs, ys)

    Rho = np.hypot(X, Y)
    # Avoid divide by zero at exact pole
    Rho_safe = np.maximum(Rho, 1e-4)

    # Colatitude c = 2 * atan(Rho / (2*R))
    C = 2.0 * np.arctan(Rho_safe / (2.0 * R))
    Lat_rad = -math.pi / 2.0 + C
    Lat_deg = Lat_rad * 180.0 / math.pi

    # Longitude in radians: atan2(X, Y) gives 0 rad along +Y (Prime Meridian)
    Lam_rad = np.arctan2(X, Y)
    Lon_deg = (Lam_rad * 180.0 / math.pi) % 360.0

    # Sample from equirectangular DEM
    # Row index: +90° is row 0, -90° is row (dem_h - 1)
    row_f = (90.0 - Lat_deg) / 180.0 * (dem_h - 1)
    # Col index: 0° is col 0, 360° is col (dem_w - 1)
    col_f = Lon_deg / 360.0 * (dem_w - 1)

    # Bilinear interpolation
    r0 = np.clip(np.floor(row_f).astype(np.int32), 0, dem_h - 2)
    r1 = r0 + 1
    c0 = np.floor(col_f).astype(np.int32) % dem_w
    c1 = (c0 + 1) % dem_w

    wr1 = row_f - r0
    wr0 = 1.0 - wr1
    wc1 = col_f - np.floor(col_f)
    wc0 = 1.0 - wc1

    grid_elev = (
        wr0 * (wc0 * elev_m[r0, c0] + wc1 * elev_m[r0, c1]) +
        wr1 * (wc0 * elev_m[r1, c0] + wc1 * elev_m[r1, c1])
    )

    print("Computing lunar polar hillshade...")
    # Compute surface gradients in metres per pixel
    dx_m = (2.0 * max_dist_m) / (out_size - 1)
    dy_m = dx_m

    gy, gx = np.gradient(grid_elev, dy_m, dx_m)

    slope = np.arctan(np.hypot(gx, gy))
    aspect = np.arctan2(-gx, gy)

    # Illumination source: low-angle polar light (Sun altitude 18°, azimuth 315° NW)
    sun_alt_rad = math.radians(18.0)
    sun_az_rad = math.radians(315.0)

    # Lambertian hillshade
    shaded = (
        math.sin(sun_alt_rad) * np.cos(slope) +
        math.cos(sun_alt_rad) * np.sin(slope) * np.cos(sun_az_rad - aspect)
    )
    # Ambient fill + second subtle fill light from 135° SE to soften deep shadows
    sun2_alt_rad = math.radians(12.0)
    sun2_az_rad = math.radians(135.0)
    shaded2 = (
        math.sin(sun2_alt_rad) * np.cos(slope) +
        math.cos(sun2_alt_rad) * np.sin(slope) * np.cos(sun2_az_rad - aspect)
    )
    hillshade = np.clip(shaded * 0.78 + shaded2 * 0.22, 0.0, 1.0)

    # Natural elevation tint (subtle grayscale modulation from -5000m to +5000m)
    norm_elev = np.clip((grid_elev - (-4000.0)) / 9000.0, 0.0, 1.0)
    final_tone = hillshade * 0.72 + norm_elev * 0.28
    final_tone = np.clip(final_tone * 1.15, 0.0, 1.0) # Contrast enhance
    final_uint8 = (final_tone * 255.0).astype(np.uint8)

    out_img = Image.fromarray(final_uint8, mode="L")
    out_img.save(out_path, optimize=True)
    print(f"Saved authentic polar relief map to: {out_path} ({out_size}x{out_size})")

if __name__ == "__main__":
    generate_polar_relief()

