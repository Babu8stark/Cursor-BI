/**
 * Color utility functions for beauty applications
 */

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Calculate color temperature (warm/cool)
 */
export function getColorTemperature(hex: string): 'warm' | 'cool' | 'neutral' {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Warm colors: red, orange, yellow (0-60, 300-360)
  // Cool colors: blue, green, purple (120-300)
  // Neutral: around orange-yellow (60-120)
  
  if ((hsl.h >= 0 && hsl.h <= 60) || (hsl.h >= 300 && hsl.h <= 360)) {
    return 'warm';
  } else if (hsl.h >= 120 && hsl.h <= 300) {
    return 'cool';
  } else {
    return 'neutral';
  }
}

/**
 * Generate complementary color
 */
export function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Add 180 degrees to hue for complementary color
  const complementaryHue = (hsl.h + 180) % 360;
  const complementaryRgb = hslToRgb(complementaryHue, hsl.s, hsl.l);
  
  return rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
}

/**
 * Generate analogous colors
 */
export function getAnalogousColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const analogous1 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
  const analogous2 = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
  
  return [
    rgbToHex(analogous1.r, analogous1.g, analogous1.b),
    rgbToHex(analogous2.r, analogous2.g, analogous2.b)
  ];
}

/**
 * Calculate color contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Determine if a color is light or dark
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
}

/**
 * Generate color palette based on base color
 */
export function generateColorPalette(baseColor: string, count: number = 5): string[] {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [];
  
  // Generate variations by adjusting lightness
  for (let i = 0; i < count; i++) {
    const lightness = (100 / (count - 1)) * i;
    const paletteRgb = hslToRgb(hsl.h, hsl.s, lightness);
    palette.push(rgbToHex(paletteRgb.r, paletteRgb.g, paletteRgb.b));
  }
  
  return palette;
}