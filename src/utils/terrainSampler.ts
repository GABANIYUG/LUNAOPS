/**
 * utils/terrainSampler.ts — Real-Time NASA Site 01 Terrain Data Sampler.
 *
 * Provides CPU-side sampling of:
 *  - Elevation (metres relative to 1737.4 km reference sphere)
 *  - Slope (degrees)
 *  - Total Elevation Uncertainty (metres)
 *
 * Reads from the pre-rasterized 512x512 dataset in public/generated/.
 */

import {
  polarStereoToRasterPixels,
  selenographicToPolarStereo,
} from './coordinates';

export interface Site01Metadata {
  dataset: string;
  center_lat: number;
  center_lon_E: number;
  elev_min_m: number;
  elev_max_m: number;
  slope_max_deg: number;
  uncertainty_max_m: number;
  mesh_size: number;
  scene_radius: number;
  lunar_radius_m: number;
}

export interface TerrainSampleResult {
  isInside: boolean;
  elevationM?: number;
  slopeDeg?: number;
  errorM?: number;
  px: number;
  py: number;
  xM: number;
  yM: number;
}

class TerrainSampler {
  private metadata: Site01Metadata | null = null;
  private elevCanvas: HTMLCanvasElement | null = null;
  private slopeCanvas: HTMLCanvasElement | null = null;
  private toterrCanvas: HTMLCanvasElement | null = null;
  private elevCtx: CanvasRenderingContext2D | null = null;
  private slopeCtx: CanvasRenderingContext2D | null = null;
  private toterrCtx: CanvasRenderingContext2D | null = null;
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  public async init(): Promise<void> {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const metaResp = await fetch('/generated/site01_metadata.json');
        if (!metaResp.ok) {
          console.warn('[TerrainSampler] Could not load site01_metadata.json');
          return;
        }
        this.metadata = await metaResp.json();

        // Load 8-bit normalized images for sampling
        const [elevImg, slopeImg, toterrImg] = await Promise.all([
          this.loadImage('/generated/site01_elev_norm.png'),
          this.loadImage('/generated/site01_slope.png'),
          this.loadImage('/generated/site01_toterr.png'),
        ]);

        this.elevCanvas = this.createCanvasFromImage(elevImg);
        this.elevCtx = this.elevCanvas.getContext('2d', { willReadFrequently: true });

        this.slopeCanvas = this.createCanvasFromImage(slopeImg);
        this.slopeCtx = this.slopeCanvas.getContext('2d', { willReadFrequently: true });

        this.toterrCanvas = this.createCanvasFromImage(toterrImg);
        this.toterrCtx = this.toterrCanvas.getContext('2d', { willReadFrequently: true });

        this.isLoaded = true;
      } catch (err) {
        console.warn('[TerrainSampler] Failed to initialize terrain rasters:', err);
      }
    })();

    return this.loadPromise;
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  private createCanvasFromImage(img: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) ctx.drawImage(img, 0, 0);
    return canvas;
  }

  public getMetadata(): Site01Metadata | null {
    return this.metadata;
  }

  public sample(lonDeg: number, latDeg: number): TerrainSampleResult {
    const { x, y } = selenographicToPolarStereo(lonDeg, latDeg);
    const { px512, py512, isInside } = polarStereoToRasterPixels(x, y);

    if (!isInside || !this.isLoaded || !this.metadata || !this.elevCtx) {
      return { isInside, px: px512, py: py512, xM: x, yM: y };
    }

    try {
      // Sample normalized 8-bit values [0..255]
      const ePix = this.elevCtx.getImageData(px512, py512, 1, 1).data[0];
      const sPix = this.slopeCtx?.getImageData(px512, py512, 1, 1).data[0] ?? 0;
      const tPix = this.toterrCtx?.getImageData(px512, py512, 1, 1).data[0] ?? 0;

      // Decode physical values using dataset metadata ranges
      const elevRange = this.metadata.elev_max_m - this.metadata.elev_min_m;
      const elevationM = this.metadata.elev_min_m + (ePix / 255.0) * elevRange;
      const slopeDeg = (sPix / 255.0) * this.metadata.slope_max_deg;
      const errorM = (tPix / 255.0) * this.metadata.uncertainty_max_m;

      return {
        isInside: true,
        elevationM: Math.round(elevationM * 10) / 10,
        slopeDeg: Math.round(slopeDeg * 10) / 10,
        errorM: Math.round(errorM * 100) / 100,
        px: px512,
        py: py512,
        xM: x,
        yM: y,
      };
    } catch {
      return { isInside, px: px512, py: py512, xM: x, yM: y };
    }
  }
}

export const terrainSampler = new TerrainSampler();
