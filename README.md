# LUNAOPS - NASA Space Apps 2026

**Team SELENE LABS**

LUNAOPS is a high-fidelity, interactive 3D Moon visualization built with Three.js using official NASA scientific datasets. It serves as the foundation for a lunar mission-planning and visualization web application.

## Features
- **Physically Plausible Moon**: Uses real NASA lunar color maps (`lroc_color_2k.jpg`).
- **Actual Topographic Relief**: Loads the 8k Topo GLB mesh derived from the Lunar Orbiter Laser Altimeter (LOLA) for accurate lunar terrain.
- **Scientific Data Preprocessing**: Includes a reproducible Python pipeline to process massive NASA GeoTIFF elevation data into optimized web formats.
- **Interactive Controls**: Smooth orbital controls (rotate, zoom, pan) and real-time visualization toggles (Wireframe).

## Prerequisites
- **Node.js**: v18+ (for building and running the Vite web app)
- **Python**: 3.10+ (for optional offline elevation map preprocessing)

## Installation & Setup

1. **Install Node dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173/` by default.*

## Data Processing (Optional)

The original high-resolution lunar elevation dataset (`ldem_16.tif`, 63 MB) is provided in the `Resources` directory.
If you need to process this DEM into a displacement map for the web client (e.g., for use with a basic sphere instead of the GLB model), run the Python pipeline:

1. **Install Python dependencies:**
   ```bash
   pip install tifffile numpy imageio
   ```
2. **Run the pipeline script:**
   ```bash
   python scripts/process_ldem.py
   ```
   *This reads the float32 GeoTIFF, correctly handles its min/max elevations, scales it to 16-bit grayscale, and exports `public/generated/ldem_displacement_16bit.png` and `public/generated/ldem_metadata.json` without modifying the source NASA file.*

## Project Structure
- `src/` - The Three.js application written in TypeScript.
- `scripts/` - Offline data processing scripts for handling large scientific assets.
- `Resources/` - Unmodified, original NASA assets downloaded from NASA LRO/LOLA PDS nodes.
- `public/generated/` - Processed output files from the Python pipeline.

## Acceptance Criteria Handled
- ✅ 3D web application set up locally without complex external dependencies.
- ✅ Renders the Moon using *local* NASA assets, not random internet images.
- ✅ Respects the data: The geometry represents real lunar relief; color aligns with actual features.
- ✅ Clean, professional, deep midnight-navy space-science interface suitable for NASA Space Apps.
- ✅ Camera interactions (orbit, zoom, reset).
- ✅ Preprocessing script successfully handles scientific GeoTIFFs (with metadata extraction).
- ✅ A complete Resource provenance manifest is located in `Resources/README.md`.

*Built for the 2026 NASA Space Apps Challenge.*
