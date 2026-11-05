"""
scripts/prepare_terrain_registry.py — Preprocess NASA LOLA GeoTIFFs into Web-Ready Terrain Derivatives.

Generates for each dataset in public/generated/terrain/{site_id}/:
- elev_hill.png: 512x512 high-contrast hillshade-blended elevation visualization
- elev_raw.png: 512x512 8-bit normalized elevation for sampling
- slope.png: 512x512 slope visualization (degrees)
- toterr.png: 512x512 elevation uncertainty (metres)
- slperr.png: 512x512 slope uncertainty (degrees, where available)
- ldec.png: 512x512 observation count (where available)
- metadata.json: exact scientific bounds, min/max values, resolution, CRS, and layer catalogue.

Also generates public/generated/terrain/terrain_registry.json linking all candidates to their terrain datasets.
"""

import os
import glob
import json
import math
import numpy as np
import rasterio
from PIL import Image

def compute_hillshade(elev, res_m, altitude_deg=30.0, azimuth_deg=315.0):
    """Compute standard analytical hillshade from elevation array."""
    alt_rad = math.radians(altitude_deg)
    az_rad = math.radians(azimuth_deg)

    # Gradients using central differences
    gy, gx = np.gradient(elev, res_m, res_m)

    slope = np.arctan(np.sqrt(gx**2 + gy**2))
    aspect = np.arctan2(-gx, gy)

    shaded = np.sin(alt_rad) * np.cos(slope) + np.cos(alt_rad) * np.sin(slope) * np.cos(az_rad - aspect)
    shaded = np.clip(shaded, 0, 1)
    return (shaded * 255).astype(np.uint8)

def resample_to_512(array):
    """Downsample array to 512x512 using bilinear/area interpolation via PIL."""
    # Replace nan with median for clean resizing
    valid = array[np.isfinite(array)]
    med = float(np.median(valid)) if len(valid) else 0.0
    clean = np.where(np.isfinite(array), array, med).astype(np.float32)
    img = Image.fromarray(clean)
    resized = img.resize((512, 512), resample=Image.Resampling.BILINEAR)
    return np.array(resized, dtype=np.float32)

def polar_to_latlon(x, y):
    R = 1737400.0
    r = math.hypot(x, y)
    if r == 0:
        return -90.0, 0.0
    c = 2.0 * math.atan2(r, 2.0 * R)
    lat = -math.asin(math.cos(c)) * 180.0 / math.pi
    lon = (math.atan2(x, y) * 180.0 / math.pi + 360.0) % 360.0
    return lat, lon

DATASET_CONFIGS = [
    {
        "id": "site01",
        "folder": "south-pole-site01",
        "name": "NASA LOLA Artemis Site 01 (Connecting Ridge)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": ["site-01"],
        "surf_file": "Site01_final_adj_5mpp_surf.tif",
        "slp_file": "Site01_final_adj_5mpp_slp.tif",
        "toterr_file": "Site01_final_adj_5mpp_toterr.tif",
        "slperr_file": None,
        "ldec_file": None,
        "hill_file": None,
    },
    {
        "id": "site04",
        "folder": "south-pole-site04",
        "name": "NASA LOLA Artemis Site 04 (Shackleton Rim / South Pole)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": ["shackleton-rim", "south-pole"],
        "surf_file": "Site04_final_adj_5mpp_surf.tif",
        "slp_file": "Site04_final_adj_5mpp_slp.tif",
        "toterr_file": "Site04_final_adj_5mpp_toterr.tif",
        "slperr_file": "Site04_final_adj_5mpp_slperr.tif",
        "ldec_file": "Site04_final_adj_5mpp_ldec.tif",
        "hill_file": None,
    },
    {
        "id": "site06",
        "folder": "south-pole-site06",
        "name": "NASA LOLA Artemis Site 06 (Nobile Rim)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": ["nobile-rim-1"],
        "surf_file": "Site06_final_adj_5mpp_surf.tif",
        "slp_file": "Site06_final_adj_5mpp_slp.tif",
        "toterr_file": "Site06_final_adj_5mpp_toterr.tif",
        "slperr_file": "Site06_final_adj_5mpp_slperr.tif",
        "ldec_file": "Site06_final_adj_5mpp_ldec.tif",
        "hill_file": None,
    },
    {
        "id": "site07",
        "folder": "south-pole-site07",
        "name": "NASA LOLA Artemis Site 07 (Faustini / Amundsen Rim)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": [],
        "surf_file": "Site07_final_adj_5mpp_surf.tif",
        "slp_file": "Site07_final_adj_5mpp_slp.tif",
        "toterr_file": "Site07_final_adj_5mpp_toterr.tif",
        "slperr_file": "Site07_final_adj_5mpp_slperr.tif",
        "ldec_file": "Site07_final_adj_5mpp_ldec.tif",
        "hill_file": None,
    },
    {
        "id": "site11",
        "folder": "south-pole-site11",
        "name": "NASA LOLA Artemis Site 11 (de Gerlache - Kocher Massif)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": [],
        "surf_file": "Site11_final_adj_5mpp_surf.tif",
        "slp_file": "Site11_final_adj_5mpp_slp.tif",
        "toterr_file": "Site11_final_adj_5mpp_toterr.tif",
        "slperr_file": "Site11_final_adj_5mpp_slperr.tif",
        "ldec_file": "Site11_final_adj_5mpp_ldec.tif",
        "hill_file": None,
    },
    {
        "id": "site23",
        "folder": "south-pole-site23",
        "name": "NASA LOLA Artemis Site 23 (Malapert Massif)",
        "resolution_m": 5.0,
        "is_regional": False,
        "matching_candidates": ["malapert"],
        "surf_file": "Site23_final_adj_5mpp_surf.tif",
        "slp_file": "Site23_final_adj_5mpp_slp.tif",
        "toterr_file": "Site23_final_adj_5mpp_toterr.tif",
        "slperr_file": "Site23_final_adj_5mpp_slperr.tif",
        "ldec_file": "Site23_final_adj_5mpp_ldec.tif",
        "hill_file": None,
    },
    {
        "id": "region80m",
        "folder": "south-pole-region-80m",
        "name": "NASA LOLA Regional South Pole Altimetry (80 m/px)",
        "resolution_m": 80.0,
        "is_regional": True,
        "matching_candidates": ["haworth-rim", "de-gerlache-rim"],
        "surf_file": "LDEM_80S_80MPP_ADJ.tiff",
        "slp_file": "LDSM_80S_80MPP_ADJ.tiff",
        "toterr_file": "LDEM_80S_80MPP_ADJ_ERR.tiff",
        "slperr_file": "LDSM_80S_80MPP_ADJ_ERR.tiff",
        "ldec_file": "LDEC_80S_80MPP_ADJ.tiff",
        "hill_file": "LDEM_80S_80MPP_ADJ_HILL.tiff",
    },
]

def process_all():
    base_out = os.path.join("public", "generated", "terrain")
    os.makedirs(base_out, exist_ok=True)
    registry_list = []

    for cfg in DATASET_CONFIGS:
        site_id = cfg["id"]
        folder = os.path.join("Resources", cfg["folder"])
        out_dir = os.path.join(base_out, site_id)
        os.makedirs(out_dir, exist_ok=True)

        print(f"--> Processing dataset {site_id} ({cfg['name']})...")

        surf_path = os.path.join(folder, cfg["surf_file"])
        with rasterio.open(surf_path) as src:
            surf_raw = src.read(1)
            bounds = src.bounds
            crs_wkt = src.crs.to_wkt()
            orig_shape = src.shape
            orig_res = src.res[0]

        # Read or compute hillshade
        if cfg["hill_file"]:
            hill_path = os.path.join(folder, cfg["hill_file"])
            with rasterio.open(hill_path) as src:
                hill_raw = src.read(1)
                # Resample hillshade
                hill_512 = np.clip(resample_to_512(hill_raw), 0, 255).astype(np.uint8)
        else:
            # Resample elevation first, then compute analytical hillshade on 512x512
            surf_for_hill = resample_to_512(surf_raw)
            effective_res = (bounds.right - bounds.left) / 512.0
            hill_512 = compute_hillshade(surf_for_hill, effective_res, altitude_deg=28.0, azimuth_deg=315.0)

        # Resample elevation to 512x512
        elev_512 = resample_to_512(surf_raw)
        valid_elev = elev_512[np.isfinite(elev_512)]
        emin = float(np.min(valid_elev))
        emax = float(np.max(valid_elev))
        p1_elev = float(np.percentile(valid_elev, 1))
        p99_elev = float(np.percentile(valid_elev, 99))

        # Normalized elevation [0..255]
        elev_range = max(1.0, emax - emin)
        elev_norm = np.clip((elev_512 - emin) / elev_range * 255.0, 0, 255).astype(np.uint8)
        Image.fromarray(elev_norm).save(os.path.join(out_dir, "elev_raw.png"), "PNG")

        # Blend hillshade + elevation for crisp, high-contrast, visually stunning relief
        elev_contrast = np.clip((elev_512 - p1_elev) / max(1.0, p99_elev - p1_elev) * 255.0, 0, 255).astype(np.float32)
        blended_hill = np.clip(0.60 * hill_512.astype(np.float32) + 0.40 * elev_contrast, 0, 255).astype(np.uint8)
        Image.fromarray(blended_hill).save(os.path.join(out_dir, "elev_hill.png"), "PNG")

        # ── Slope ──────────────────────────────────────────────────────────
        slp_path = os.path.join(folder, cfg["slp_file"])
        with rasterio.open(slp_path) as src:
            slp_raw = src.read(1)
        slp_512 = resample_to_512(slp_raw)
        valid_slp = slp_512[np.isfinite(slp_512)]
        smin = float(np.min(valid_slp))
        smax = float(np.max(valid_slp))
        p99_slp = float(np.percentile(valid_slp, 99))
        slp_disp_max = min(smax, max(30.0, p99_slp * 1.15))

        # Grayscale slope normalized to [0..255]
        slp_norm = np.clip((slp_512 / slp_disp_max) * 255.0, 0, 255).astype(np.uint8)
        Image.fromarray(slp_norm).save(os.path.join(out_dir, "slope.png"), "PNG")

        # ── Total Uncertainty (toterr) ─────────────────────────────────────
        toterr_path = os.path.join(folder, cfg["toterr_file"])
        with rasterio.open(toterr_path) as src:
            err_raw = src.read(1)
        err_512 = resample_to_512(err_raw)
        valid_err = err_512[np.isfinite(err_512)]
        errmin = float(np.min(valid_err))
        errmax = float(np.max(valid_err))
        p99_err = float(np.percentile(valid_err, 99))
        err_disp_max = min(errmax, max(2.0, p99_err * 1.2))

        err_norm = np.clip((err_512 / err_disp_max) * 255.0, 0, 255).astype(np.uint8)
        Image.fromarray(err_norm).save(os.path.join(out_dir, "toterr.png"), "PNG")

        # ── Slope Uncertainty (slperr) if available ────────────────────────
        has_slperr = False
        slperr_max = None
        if cfg["slperr_file"]:
            slperr_path = os.path.join(folder, cfg["slperr_file"])
            if os.path.exists(slperr_path):
                with rasterio.open(slperr_path) as src:
                    slperr_raw = src.read(1)
                slperr_512 = resample_to_512(slperr_raw)
                valid_se = slperr_512[np.isfinite(slperr_512)]
                if len(valid_se):
                    has_slperr = True
                    slperr_max = float(np.percentile(valid_se, 99) * 1.2)
                    se_norm = np.clip((slperr_512 / slperr_max) * 255.0, 0, 255).astype(np.uint8)
                    Image.fromarray(se_norm).save(os.path.join(out_dir, "slperr.png"), "PNG")

        # ── Observation Count (ldec) if available ──────────────────────────
        has_ldec = False
        ldec_max = None
        if cfg["ldec_file"]:
            ldec_path = os.path.join(folder, cfg["ldec_file"])
            if os.path.exists(ldec_path):
                with rasterio.open(ldec_path) as src:
                    ldec_raw = src.read(1)
                ldec_512 = resample_to_512(ldec_raw)
                valid_ld = ldec_512[np.isfinite(ldec_512)]
                if len(valid_ld):
                    has_ldec = True
                    ldec_max = float(np.max(valid_ld))
                    ld_norm = np.clip((ldec_512 / max(1.0, ldec_max)) * 255.0, 0, 255).astype(np.uint8)
                    Image.fromarray(ld_norm).save(os.path.join(out_dir, "ldec.png"), "PNG")

        # Center in lat/lon
        cx = (bounds.left + bounds.right) / 2.0
        cy = (bounds.bottom + bounds.top) / 2.0
        clat, clon = polar_to_latlon(cx, cy)

        # 4 corners in lat/lon
        c_lb = polar_to_latlon(bounds.left, bounds.bottom)
        c_lt = polar_to_latlon(bounds.left, bounds.top)
        c_rb = polar_to_latlon(bounds.right, bounds.bottom)
        c_rt = polar_to_latlon(bounds.right, bounds.top)

        meta = {
            "dataset_id": site_id,
            "dataset_name": cfg["name"],
            "source": "NASA Lunar Reconnaissance Orbiter (LRO) / LOLA Instrument Team",
            "is_regional": cfg["is_regional"],
            "resolution_m": cfg["resolution_m"],
            "resolution_label": f"{cfg['resolution_m']:.1f} m/px" if cfg["resolution_m"] < 10 else f"{int(cfg['resolution_m'])} m/px",
            "matching_candidates": cfg["matching_candidates"],
            "original_raster": {
                "shape": list(orig_shape),
                "resolution": orig_res,
                "crs": crs_wkt,
            },
            "bounds_polar_m": {
                "minX": bounds.left,
                "maxX": bounds.right,
                "minY": bounds.bottom,
                "maxY": bounds.top,
                "widthM": bounds.right - bounds.left,
                "heightM": bounds.top - bounds.bottom,
            },
            "center": {
                "lat": round(clat, 5),
                "lon": round(clon, 5),
                "x_m": cx,
                "y_m": cy,
            },
            "lat_range": [round(min(c_lb[0], c_lt[0], c_rb[0], c_rt[0]), 4), round(max(c_lb[0], c_lt[0], c_rb[0], c_rt[0]), 4)],
            "lon_range": [round(min(c_lb[1], c_lt[1], c_rb[1], c_rt[1]), 4), round(max(c_lb[1], c_lt[1], c_rb[1], c_rt[1]), 4)],
            "elevation": {
                "min_m": round(emin, 2),
                "max_m": round(emax, 2),
                "p1_m": round(p1_elev, 2),
                "p99_m": round(p99_elev, 2),
                "units": "meters (IAU Moon 2000 R=1737.4 km)",
            },
            "slope": {
                "min_deg": round(smin, 2),
                "max_deg": round(smax, 2),
                "display_max_deg": round(slp_disp_max, 2),
                "units": "degrees",
            },
            "elevation_uncertainty": {
                "min_m": round(errmin, 2),
                "max_m": round(errmax, 2),
                "display_max_m": round(err_disp_max, 2),
                "units": "meters (1-sigma RMS)",
            },
            "slope_uncertainty": {
                "available": has_slperr,
                "max_deg": round(slperr_max, 2) if slperr_max is not None else None,
                "units": "degrees",
            },
            "observation_density": {
                "available": has_ldec,
                "max_count": int(ldec_max) if ldec_max is not None else None,
                "units": "LOLA laser altimeter shots per pixel",
            },
            "layers": {
                "elev_hill": f"/generated/terrain/{site_id}/elev_hill.png",
                "elev_raw": f"/generated/terrain/{site_id}/elev_raw.png",
                "slope": f"/generated/terrain/{site_id}/slope.png",
                "toterr": f"/generated/terrain/{site_id}/toterr.png",
                "slperr": f"/generated/terrain/{site_id}/slperr.png" if has_slperr else None,
                "ldec": f"/generated/terrain/{site_id}/ldec.png" if has_ldec else None,
            },
        }

        with open(os.path.join(out_dir, "metadata.json"), "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2)

        registry_list.append(meta)

    # Master registry file
    registry_file = os.path.join(base_out, "terrain_registry.json")
    with open(registry_file, "w", encoding="utf-8") as f:
        json.dump({"registry_version": "2.0.0", "datasets": registry_list}, f, indent=2)

    print(f"SUCCESS! Preprocessed {len(registry_list)} datasets to {base_out}")

if __name__ == "__main__":
    process_all()

