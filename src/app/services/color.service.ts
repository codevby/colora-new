import { Injectable } from '@angular/core';
import { ColorScheme } from '../models/color-scheme.model';
import { MaterialPalette, MaterialScaleKey } from '../models/color-palette.model';

@Injectable({ providedIn: 'root' })
export class ColorService {

  // --- VARIATIONS ---
  private vary(value: number, variation: number, range: number): number {
    const delta = (Math.random() * 2 - 1) * range * variation;
    return value + delta;
  }

  private varyClamped(value: number, variation: number, range: number, min: number, max: number): number {
    return this.clamp(this.vary(value, variation, range), min, max);
  }

  // --- VALIDATIONS ---
  isValidHex(hex: string): boolean {
    return /^#?([0-9a-fA-F]{6})$/.test(hex);
  }

  ensureHash(hex: string): string {
    return hex.startsWith('#') ? hex : `#${hex}`;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private normalizeHue(h: number): number {
    return (h + 360) % 360;
  }

  // --- CONVERSTIONS ---
  hexToHsl(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return this.rgbToHsl(r, g, b);
  }

  hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = this.hslToRgb(h, s, l);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  hslToRgb(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return { r: f(0), g: f(8), b: f(4) };
  }

  rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    const d = max - min;

    if (d !== 0) {
      s = d / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r: h = ((g - b) / d) % 6; break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // --- GENERATIONS OF PALETTES AND SCHEMES ---
  generateScheme(hex: string, scheme: ColorScheme, variation: number): string[] {
    const { h, s, l } = this.hexToHsl(hex);

    switch (scheme) {
      case 'analogous': return this.generateAnalogous(h, s, l, variation);
      case 'complementary': return this.generateComplementary(h, s, l, variation);
      case 'triadic': return this.generateTriadic(h, s, l, variation);
      case 'monochromatic': return this.generateMonochromatic(h, s, variation);
      default: return [];
    }
  }

  generateMaterialPalette(hex: string): MaterialPalette[] {
    const { h, s, l } = this.hexToHsl(hex);
    const levels: MaterialScaleKey[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const scale: Record<number, number> = { 50: 95, 100: 90, 200: 80, 300: 70, 400: 60, 500: l, 600: 45, 700: 35, 800: 25, 900: 15 };

    const palette = {} as any;
    for (const level of levels) {
      const adjustedS = this.adjustSaturation(s, level);
      palette[level] = this.hslToHex(h, adjustedS, scale[level]);
    }
    return palette;
  }

  private adjustSaturation(baseS: number, level: number): number {
    if (level <= 200) return Math.max(10, baseS * 0.6);
    if (level <= 400) return baseS * 0.8;
    if (level === 500) return baseS;
    return Math.min(100, baseS * (level <= 700 ? 1.1 : 1.2));
  }

  private generateAnalogous(h: number, s: number, l: number, variation: number) {
    return [h - 30, h, h + 30].map(baseHue => {
      const hue = this.normalizeHue(this.vary(baseHue, variation, 10));
      const sat = this.varyClamped(s, variation, 10, 0, 100);
      const lig = this.varyClamped(l, variation, 10, 0, 100);

      return this.hslToHex(hue, sat, lig);
    });
  }

  private generateComplementary(h: number, s: number, l: number, variation: number) {
    return [0, 180].map(offset => {
      const hue = this.normalizeHue(
        this.vary(h + offset, variation, 8)
      );
      const sat = this.varyClamped(s, variation, 8, 0, 100);
      const lig = this.varyClamped(l, variation, 8, 0, 100);

      return this.hslToHex(hue, sat, lig);
    });
  }

  private generateTriadic(h: number, s: number, l: number, variation: number) {
    return [0, 120, 240].map(offset => {
      const hue = this.normalizeHue(
        this.vary(h + offset, variation, 10)
      );
      const sat = this.varyClamped(s, variation, 10, 0, 100);
      const lig = this.varyClamped(l, variation, 10, 0, 100);

      return this.hslToHex(hue, sat, lig);
    });
  }

  private generateMonochromatic(h: number, s: number, variation: number) {
    return [15, 30, 45, 60, 75, 90].map(baseL => {
      const hue = this.normalizeHue(this.vary(h, variation, 5));
      const sat = this.varyClamped(s, variation, 5, 0, 100);
      const lig = this.varyClamped(baseL, variation, 8, 0, 100);

      return this.hslToHex(hue, sat, lig);
    });
  }
}
