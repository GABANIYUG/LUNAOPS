import os
import json
import numpy as np
try:
    import tifffile
    import imageio.v3 as imageio
except ImportError:
    print("Please install required packages: pip install tifffile numpy imageio")
    exit(1)

def process_dem(input_path, output_dir):
    print(f"Reading DEM from {input_path}...")
    
    # Read the TIFF
    with tifffile.TiffFile(input_path) as tif:
        page = tif.pages[0]
        data = page.asarray()
        tags = page.tags
        
        width = page.shape[1]
        height = page.shape[0]
        dtype = data.dtype
        
        print(f"Original size: {width}x{height}, dtype: {dtype}")
        
        # NASA LDEM typically has a scale/offset or uses true elevation in meters
        # In LDEM 16-bit integer (ldem_16.tif), usually the pixel value is elevation in meters
        # Let's verify min/max
        min_val = np.min(data)
        max_val = np.max(data)
        print(f"Elevation range: {min_val} to {max_val}")

        # Let's downsample by a factor of 4 for the web (e.g., 1440x720 from 5760x2880)
        # Using simple strided slicing for speed (or average pooling)
        scale_factor = 4
        downsampled = data[::scale_factor, ::scale_factor]
        
        d_height, d_width = downsampled.shape
        print(f"Downsampled size: {d_width}x{d_height}")

        # Normalize to 0-255 for a preview PNG map (or 16-bit PNG for displacement)
        # For true displacement in Three.js, a 16-bit grayscale PNG is best.
        # We need to shift and scale to 0-65535 for 16-bit png
        # Let's map min_val to 0 and max_val to 65535
        range_val = max_val - min_val
        if range_val == 0:
            range_val = 1
        
        normalized = ((downsampled - min_val) / range_val) * 65535
        normalized = normalized.astype(np.uint16)
        
        os.makedirs(output_dir, exist_ok=True)
        out_png = os.path.join(output_dir, "ldem_displacement_16bit.png")
        imageio.imwrite(out_png, normalized)
        print(f"Saved 16-bit displacement map to {out_png}")
        
        # Save metadata
        metadata = {
            "source_file": os.path.basename(input_path),
            "original_width": width,
            "original_height": height,
            "downsampled_width": d_width,
            "downsampled_height": d_height,
            "elevation_min": float(min_val),
            "elevation_max": float(max_val),
            "elevation_range": float(range_val),
            "units": "kilometers (based on min/max of ~ -9 to 10.7)",
            "processing": f"Downsampled by factor of {scale_factor}. Mapped to 16-bit grayscale."
        }
        
        out_json = os.path.join(output_dir, "ldem_metadata.json")
        with open(out_json, "w") as f:
            json.dump(metadata, f, indent=2)
        print(f"Saved metadata to {out_json}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_file = os.path.join(base_dir, "Resources", "ldem_16.tif")
    out_dir = os.path.join(base_dir, "public", "generated")
    
    if os.path.exists(input_file):
        process_dem(input_file, out_dir)
    else:
        print(f"Could not find input file: {input_file}")
