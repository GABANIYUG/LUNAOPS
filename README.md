# LUNAOPS - NASA Space Apps 2026

**Team SELENE LABS**

LUNAOPS is a high-fidelity, interactive 3D Moon visualization built with Three.js using official NASA scientific datasets. It serves as the foundation for a lunar mission-planning and visualization web application.

## Features
- **NASA LOLA Topographic Relief**: High-resolution 3D vertex displacement mapped directly from NASA LRO/LOLA DEM data (-8.98 km to +10.69 km elevation range).
- **LROC True Color Mapping**: High-contrast surface albedo mapping using official Lunar Reconnaissance Orbiter Camera (LROC) global mosaic (`lroc_color_2k.jpg`).
- **DEM-Derived Normal Mapping**: Tangent-space normal mapping generated directly from elevation gradients to render sharp crater rims, rilles, and micro-topography.
- **Dynamic Solar Terminator ("Sun Cycle")**: Directional solar illumination with animatable sun angles to observe changing crater shadow lengths along the lunar terminator, calibrated against NASA SVS reference visualization (`moon_mapping_720p30.webm`).
- **Interactive Telemetry & Altimetry**: Real-time cursor raycaster measuring accurate lunar coordinates (Latitude / Longitude) and true scientific elevation (km) at the cursor point.
- **Cinematic Rendering**: Multi-layered starfield, subtle limb Fresnel rim glow, ACES Filmic tone mapping, and bloom post-processing.
- **Interactive Controls**: Smooth orbital damping, camera reset, auto-rotation, wireframe inspection, and Topographic Relief vs Reference Sphere toggle.

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
