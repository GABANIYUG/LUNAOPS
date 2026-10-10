# LUNAOPS - NASA Lunar Resources Inventory

This directory contains the original NASA scientific assets used for the LUNAOPS 3D Moon visualization.

## Inventory

| Filename | Source / Instrument | Original Dimensions | Format / Units | Usage in LUNAOPS |
| --- | --- | --- | --- | --- |
| `Moon_NASA_LRO_8k_Topo_Small.glb` | NASA / LRO (LOLA) | 8k resolution | GLB (3D Model) | Primary 3D mesh providing accurate topological relief of the lunar surface. |
| `Moon_NASA_LRO_15k_Grid.glb` | NASA / LRO (LOLA) | 15k resolution | GLB (3D Model) | Higher resolution mesh, kept as an alternative but omitted from web client by default due to size (116 MB). |
| `lroc_color_2k.jpg` | NASA / LRO (LROC) | 2048 x 1024 | JPG Color Map | Base color texture mapped onto the 3D Moon mesh to provide visual maria/highlands contrast. |
| `ldem_16.tif` | NASA / LRO (LOLA) | 5760 x 2880 | GeoTIFF (Float32) <br> Units: Kilometers | Global Lunar Digital Elevation Model (16 pixels/degree). Used in offline Python pipeline to generate displacement maps. |
| `moon_mapping_720p30.webm` | NASA SVS / LRO | 1280 x 720 (30 fps) | WebM (VP8 Video) | Scientific visualization ground truth reference for lunar rotation, surface albedo, and dynamic solar terminator lighting. |

## Preprocessing Pipeline

The original GeoTIFF (`ldem_16.tif`) is 63 MB and contains raw float32 elevation samples ranging from approximately -8.98 km to 10.68 km. 
To make this data web-compatible if we want to use displacement mapping instead of the `.glb` model, a reproducible local preprocessing pipeline has been implemented.

### Running the preprocessing pipeline

1. Ensure Python 3 is installed.
2. Install dependencies: `pip install tifffile numpy imageio`
3. Run the script from the project root: `python scripts/process_ldem.py`

**Outputs:**
- `public/generated/ldem_displacement_16bit.png`: A 1440x720 16-bit grayscale PNG normalized from the elevation range.
- `public/generated/ldem_metadata.json`: Metadata capturing the true elevation ranges, original dimensions, and conversion logic so the web client can reconstruct accurate scientific measurements if needed.

## Scientific Honesty and Data Integrity

- The assets in this folder are **unmodified original files** downloaded from NASA.
- No artificial coloring or fabricated craters have been added.
- The 3D geometry and elevations are directly derived from LRO/LOLA data.
- The sun lighting in the application is currently illustrative and not driven by a SPICE kernel for real-time ephemeris calculations (this will be added in a future update).

*Note: For further information on the LRO datasets, please refer to the official [NASA LRO/LOLA PDS nodes](https://pds-geosciences.wustl.edu/missions/lro/lola.htm).*
