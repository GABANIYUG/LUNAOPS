"""
Generate a tangent-space normal map from the NASA LDEM elevation data.
This gives the Moon sharp crater detail even with modest geometry.
"""
import os
import json
import numpy as np
try:
    import tifffile
    from PIL import Image
except ImportError:
    print("Install dependencies: pip install tifffile numpy pillow")
    exit(1)


def compute_normal_map(elevation: np.ndarray, strength: float = 2.0) -> np.ndarray:
    """
    Compute a tangent-space normal map from a 2D elevation grid.
    Uses Sobel-like finite differences, wrapped horizontally (longitude)
    and clamped at poles (latitude).
    """
    h, w = elevation.shape
    # Normalize elevation to 0..1 range for gradient calculation
    emin, emax = elevation.min(), elevation.max()
    if emax - emin == 0:
        emin, emax = 0.0, 1.0
    elev = (elevation - emin) / (emax - emin)

    # Horizontal gradient (longitude wraps)
    dx = np.zeros_like(elev)
    dx[:, 1:-1] = elev[:, 2:] - elev[:, :-2]
    dx[:, 0] = elev[:, 1] - elev[:, -1]   # wrap
    dx[:, -1] = elev[:, 0] - elev[:, -2]   # wrap

    # Vertical gradient (latitude clamps)
    dy = np.zeros_like(elev)
    dy[1:-1, :] = elev[2:, :] - elev[:-2, :]
    dy[0, :] = elev[1, :] - elev[0, :]
    dy[-1, :] = elev[-1, :] - elev[-2, :]

    dx *= strength
    dy *= strength

    # Build normal vectors:  n = (-dx, -dy, 1)  then normalize
    nz = np.ones_like(elev)
    length = np.sqrt(dx * dx + dy * dy + nz * nz)
    nx = -dx / length
    ny = -dy / length
    nz = nz / length

    # Map from [-1,1] to [0,255]
    normal_map = np.zeros((h, w, 3), dtype=np.uint8)
    normal_map[:, :, 0] = ((nx * 0.5 + 0.5) * 255).clip(0, 255).astype(np.uint8)
    normal_map[:, :, 1] = ((ny * 0.5 + 0.5) * 255).clip(0, 255).astype(np.uint8)
    normal_map[:, :, 2] = ((nz * 0.5 + 0.5) * 255).clip(0, 255).astype(np.uint8)

    return normal_map


def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_file = os.path.join(base_dir, "Resources", "ldem_16.tif")
    out_dir = os.path.join(base_dir, "public", "generated")
    os.makedirs(out_dir, exist_ok=True)

    if not os.path.exists(input_file):
        print(f"DEM not found: {input_file}")
        return

    print(f"Reading DEM: {input_file}")
    with tifffile.TiffFile(input_file) as tif:
        data = tif.pages[0].asarray().astype(np.float64)

    h, w = data.shape
    print(f"  Original size: {w}x{h}, range [{data.min():.3f}, {data.max():.3f}]")

    # --- Full-res normal map (5760x2880) ---
    print("Computing full-resolution normal map (strength=2.5) ...")
    nmap_full = compute_normal_map(data, strength=2.5)
    out_full = os.path.join(out_dir, "ldem_normal_map.png")
    Image.fromarray(nmap_full).save(out_full, optimize=True)
    print(f"  Saved {out_full}  ({nmap_full.shape[1]}x{nmap_full.shape[0]})")

    # --- 2x downsampled normal map (2880x1440) for fallback ---
    ds2 = data[::2, ::2]
    print("Computing 2x-downsampled normal map ...")
    nmap_2x = compute_normal_map(ds2, strength=2.5)
    out_2x = os.path.join(out_dir, "ldem_normal_map_half.png")
    Image.fromarray(nmap_2x).save(out_2x, optimize=True)
    print(f"  Saved {out_2x}  ({nmap_2x.shape[1]}x{nmap_2x.shape[0]})")

    # --- Also save an 8-bit displacement preview (for debugging) ---
    emin, emax = data.min(), data.max()
    norm8 = ((data - emin) / (emax - emin) * 255).clip(0, 255).astype(np.uint8)
    out_disp8 = os.path.join(out_dir, "ldem_displacement_8bit.png")
    Image.fromarray(norm8).save(out_disp8, optimize=True)
    print(f"  Saved {out_disp8}")

    # Update metadata
    meta = {
        "source_file": "ldem_16.tif",
        "source": "NASA LRO / LOLA",
        "original_width": w,
        "original_height": h,
        "elevation_min_km": float(data.min()),
        "elevation_max_km": float(data.max()),
        "elevation_range_km": float(data.max() - data.min()),
        "units": "kilometers relative to 1737.4 km reference sphere",
        "lunar_reference_radius_km": 1737.4,
        "outputs": {
            "ldem_normal_map.png": f"{nmap_full.shape[1]}x{nmap_full.shape[0]} RGB tangent-space normal map, strength 2.5",
            "ldem_normal_map_half.png": f"{nmap_2x.shape[1]}x{nmap_2x.shape[0]} RGB tangent-space normal map (2x downsampled), strength 2.5",
            "ldem_displacement_8bit.png": f"{w}x{h} 8-bit grayscale displacement preview",
            "ldem_displacement_16bit.png": "1440x720 16-bit grayscale displacement (from previous pipeline)"
        }
    }
    meta_path = os.path.join(out_dir, "ldem_metadata.json")
    with open(meta_path, "w") as f:
        json.dump(meta, f, indent=2)
    print(f"  Metadata: {meta_path}")
    print("Done.")


if __name__ == "__main__":
    main()
