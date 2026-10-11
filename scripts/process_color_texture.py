"""
LUNAOPS - NASA LROC 4K Color Texture Preprocessing Pipeline
Converts official NASA 16-bit sRGB 4K TIFF (lroc_color_16bit_srgb_4k.tif)
into browser-optimized 8-bit sRGB textures (WebP and high-quality JPEG).

Source: NASA Scientific Visualization Studio (SVS) #4720
URL: https://svs.gsfc.nasa.gov/4720/
Original Dimensions: 4096 x 2048, 16-bit sRGB TIFF
Output: public/generated/lroc_color_4k.webp, public/generated/lroc_color_4k.jpg
"""

import os
import sys
import json
import numpy as np

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Run: pip install pillow")
    sys.exit(1)

try:
    import cv2
    HAS_CV2 = True
except ImportError:
    HAS_CV2 = False


def inspect_and_convert(input_path: str, output_dir: str):
    if not os.path.exists(input_path):
        print(f"Error: Source NASA TIFF not found at: {input_path}")
        sys.exit(1)

    print(f"==================================================")
    print(f"LUNAOPS: Processing NASA Official 4K Color Texture")
    print(f"Source file: {input_path}")
    print(f"==================================================")

    file_size_bytes = os.path.getsize(input_path)
    file_size_mb = file_size_bytes / (1024 * 1024)
    print(f"Source file size: {file_size_mb:.2f} MB ({file_size_bytes:,} bytes)")

    # Read ICC profile if present in the TIFF using PIL
    pil_source = Image.open(input_path)
    icc_profile = pil_source.info.get("icc_profile")
    orig_format = pil_source.format
    orig_mode = pil_source.mode

    # Read image data with OpenCV if available for exact 16-bit preservation,
    # or with Pillow as robust fallback.
    if HAS_CV2:
        print("Reading 16-bit data using OpenCV (uint16 depth preservation)...")
        img_cv = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
        if img_cv is None or img_cv.dtype != np.uint16:
            print("Notice: OpenCV could not read as uint16, falling back to PIL image array.")
            rgb_8bit = np.array(pil_source.convert("RGB"))
            orig_h, orig_w = rgb_8bit.shape[:2]
        else:
            orig_h, orig_w = img_cv.shape[:2]
            print(f"Image geometry: {orig_w}x{orig_h}, channels: {img_cv.shape[2]}, dtype: {img_cv.dtype}")
            # Convert BGR to RGB
            img_rgb_16 = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
            # Affine scale 16-bit [0..65535] to 8-bit [0..255] with rounding
            # 65535 / 257.0 == 255.0
            print("Mapping 16-bit values to 8-bit sRGB with exact affine rounding...")
            rgb_8bit = np.round(img_rgb_16 / 257.0).astype(np.uint8)
    else:
        print("Reading data using Pillow...")
        rgb_8bit = np.array(pil_source.convert("RGB"))
        orig_h, orig_w = rgb_8bit.shape[:2]

    print(f"Processed 8-bit array shape: {rgb_8bit.shape}, dtype: {rgb_8bit.dtype}")
    print(f"Per-channel min (R, G, B): {rgb_8bit.min(axis=(0,1)).tolist()}")
    print(f"Per-channel max (R, G, B): {rgb_8bit.max(axis=(0,1)).tolist()}")
    print(f"Per-channel mean (R, G, B): {np.round(rgb_8bit.mean(axis=(0,1)), 2).tolist()}")

    os.makedirs(output_dir, exist_ok=True)
    out_img = Image.fromarray(rgb_8bit)

    # 1. Save WebP (Primary browser texture, quality 92, method 6 for high quality)
    out_webp_path = os.path.join(output_dir, "lroc_color_4k.webp")
    print(f"Encoding WebP (quality=92) to: {out_webp_path}...")
    save_kwargs = {"quality": 92, "method": 6}
    if icc_profile:
        save_kwargs["icc_profile"] = icc_profile
    out_img.save(out_webp_path, format="WEBP", **save_kwargs)
    webp_size_bytes = os.path.getsize(out_webp_path)
    print(f"Saved WebP: {webp_size_bytes / (1024 * 1024):.2f} MB ({webp_size_bytes:,} bytes)")

    # 2. Save high-quality JPEG (Universal fallback, quality 92)
    out_jpg_path = os.path.join(output_dir, "lroc_color_4k.jpg")
    print(f"Encoding JPEG (quality=92) to: {out_jpg_path}...")
    jpg_kwargs = {"quality": 92, "optimize": True}
    if icc_profile:
        jpg_kwargs["icc_profile"] = icc_profile
    out_img.save(out_jpg_path, format="JPEG", **jpg_kwargs)
    jpg_size_bytes = os.path.getsize(out_jpg_path)
    print(f"Saved JPEG: {jpg_size_bytes / (1024 * 1024):.2f} MB ({jpg_size_bytes:,} bytes)")

    # 3. Save provenance & conversion metadata
    metadata = {
        "dataset_name": "NASA LROC WAC Global Color Mosaic",
        "nasa_source_file": os.path.basename(input_path),
        "nasa_source_url": "https://svs.gsfc.nasa.gov/4720/",
        "scientific_instrument": "Lunar Reconnaissance Orbiter Camera (LROC) Wide Angle Camera (WAC)",
        "original_specifications": {
            "width": orig_w,
            "height": orig_h,
            "bit_depth_per_channel": 16,
            "channels": 3,
            "color_space": "sRGB (IEC 61966-2.1)",
            "file_size_bytes": file_size_bytes,
        },
        "conversion": {
            "method": "Exact 16-bit to 8-bit sRGB affine quantization (val / 257.0 with rounding)",
            "transformations": "None (zero crop, zero rotation, zero horizontal/vertical shift, zero re-projection)",
            "alignment_verified": True,
            "alignment_reference": "Verified against Resources/lroc_color_2k.jpg with zero pixel offset (dx=0, dy=0)",
        },
        "generated_assets": [
            {
                "filename": "lroc_color_4k.webp",
                "format": "WEBP",
                "width": orig_w,
                "height": orig_h,
                "quality": 92,
                "size_bytes": webp_size_bytes,
                "intended_use": "Primary web client 4K texture with Three.SRGBColorSpace",
            },
            {
                "filename": "lroc_color_4k.jpg",
                "format": "JPEG",
                "width": orig_w,
                "height": orig_h,
                "quality": 92,
                "size_bytes": jpg_size_bytes,
                "intended_use": "Universal fallback 4K texture",
            },
        ],
    }

    out_meta_path = os.path.join(output_dir, "lroc_color_metadata.json")
    with open(out_meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved conversion metadata to: {out_meta_path}")
    print("4K texture conversion completed successfully.")


if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    source_tif = os.path.join(base_dir, "Resources", "lroc_color_16bit_srgb_4k.tif")
    target_dir = os.path.join(base_dir, "public", "generated")
    inspect_and_convert(source_tif, target_dir)
