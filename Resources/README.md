# LUNAOPS - NASA Lunar Resources Inventory

This directory contains the original NASA scientific assets used for the LUNAOPS 3D Moon visualization.

## Inventory

| Filename | Source / Instrument | Original Dimensions | Format / Units | Usage in LUNAOPS |
| --- | --- | --- | --- | --- |
| `Moon_NASA_LRO_8k_Topo_Small.glb` | NASA / LRO (LOLA) | 8k resolution | GLB (3D Model) | Primary 3D mesh providing accurate topological relief of the lunar surface. |
| `Moon_NASA_LRO_15k_Grid.glb` | NASA / LRO (LOLA) | 15k resolution | GLB (3D Model) | Higher resolution mesh, kept as an alternative but omitted from web client by default due to size (116 MB). |
| `lroc_color_16bit_srgb_4k.tif` | NASA SVS (#4720) / LRO (LROC) | 4096 x 2048 | 16-bit sRGB TIFF (LZW) | Official high-resolution 4K true color albedo map. Converted via `scripts/process_color_texture.py` to `public/generated/lroc_color_4k.webp` and `public/generated/lroc_color_4k.jpg` for high-fidelity surface rendering. |
| `lroc_color_2k.jpg` | NASA / LRO (LROC) | 2048 x 1024 | JPG Color Map | Base 2K color texture retained as graceful offline fallback. |
| `ldem_16.tif` | NASA / LRO (LOLA) | 5760 x 2880 | GeoTIFF (Float32) <br> Units: Kilometers | Global Lunar Digital Elevation Model (16 pixels/degree). Used in offline Python pipeline to generate displacement maps. |
| `moon_mapping_720p30.webm` | NASA SVS / LRO | 1280 x 720 (30 fps) | WebM (VP8 Video) | Scientific visualization ground truth reference for lunar rotation, surface albedo, and dynamic solar terminator lighting. |

## Preprocessing Pipelines

### 1. 4K Color Texture Pipeline (`scripts/process_color_texture.py`)

- **NASA Source Asset**: `Resources/lroc_color_16bit_srgb_4k.tif`
- **NASA Source Entry**: [NASA Scientific Visualization Studio — Tour of the Moon (SVS #4720)](https://svs.gsfc.nasa.gov/4720/)
- **Original Specifications**: 4096 × 2048, 16-bit per channel (uint16 RGB48), LZW compressed, embedded sRGB IEC 61966-2.1 color profile (61,891,324 bytes).
- **Conversion Settings & Logic**:
  - Exact affine quantization from 16-bit uint16 `[0..65535]` to 8-bit uint8 `[0..255]` (`np.round(uint16_val / 257.0).astype(np.uint8)`), preserving black point (0 -> 0) and white point (65535 -> 255).
  - Preserves exact image coordinates with zero pixel translation (`dx=0`, `dy=0` vs baseline reference), zero cropping, zero flipping, and zero recoloring.
  - Generates `public/generated/lroc_color_4k.webp` (WebP quality 92, method 6, 1.87 MB).
  - Generates `public/generated/lroc_color_4k.jpg` (JPEG quality 92, optimize, 2.05 MB) for universal fallback.
  - Provides `public/generated/lroc_color_2k.jpg` (2048 × 1024, 447 KB) for resilient fallback.
  - Exports provenance record `public/generated/lroc_color_metadata.json`.
- **Runtime Web Integration**:
  - Color space: `THREE.SRGBColorSpace`.
  - Mipmapping: Enabled (`minFilter = THREE.LinearMipmapLinearFilter`).
  - Anisotropic filtering: Set to GPU hardware maximum (`renderer.capabilities.getMaxAnisotropy()`).
  - Multi-tier resilience: Primary 4K WebP -> 4K JPEG fallback -> 2K JPEG fallback (`lroc_color_2k.jpg`).

### 2. Lunar Elevation DEM Pipeline (`scripts/process_ldem.py`)

The original GeoTIFF (`ldem_16.tif`) is 63 MB and contains raw float32 elevation samples ranging from approximately -8.98 km to 10.68 km. 
To make this data web-compatible if we want to use displacement mapping instead of the `.glb` model, a reproducible local preprocessing pipeline has been implemented:

1. Ensure Python 3 is installed: `pip install tifffile numpy imageio pillow`
2. Run from project root: `python scripts/process_ldem.py`
3. Generate normal map: `python scripts/generate_normal_map.py`

**Outputs:**
- `public/generated/ldem_displacement_16bit.png`: A 1440x720 16-bit grayscale PNG normalized from the elevation range.
- `public/generated/ldem_displacement_8bit.png`: An 8-bit grayscale preview used for CPU displacement.
- `public/generated/ldem_normal_map_half.png`: 2880x1440 tangent-space normal map.
- `public/generated/ldem_metadata.json`: Metadata capturing elevation ranges and units.

## Scientific Honesty and Data Integrity

- The assets in this folder are **unmodified original files** downloaded from NASA.
- No artificial coloring or fabricated craters have been added.
- The 3D geometry and elevations are directly derived from LRO/LOLA data.
- **Scientific limits of the 4K color upgrade**: The 4K color map improves surface albedo and photographic detail (maria boundaries, ejecta rays around Tycho and Copernicus). It does **not** alter the geometric elevation model or invent terrain heights; relief continues to be governed by NASA LRO/LOLA topographic DEM data.
- The sun lighting in the application is currently illustrative and not driven by a SPICE kernel for real-time ephemeris calculations (planned for future update).

*Note: For further information on the LRO datasets, please refer to the official [NASA LRO/LOLA PDS nodes](https://pds-geosciences.wustl.edu/missions/lro/lola.htm).*
