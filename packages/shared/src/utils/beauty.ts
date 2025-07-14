import { SkinType, SkinTone } from '../types/user';
import { FaceGeometry, BeautyAnalysis } from '../types/beauty';

/**
 * Calculate skin health score based on multiple metrics
 */
export function calculateSkinHealthScore(analysis: BeautyAnalysis): number {
  const metrics = analysis.skinMetrics;
  
  // Weighted calculation of skin health
  const weights = {
    clarity: 0.25,
    hydration: 0.20,
    evenness: 0.20,
    texture: 0.15,
    firmness: 0.10,
    oiliness: 0.05, // inverse weight for oiliness
    sensitivity: 0.05 // inverse weight for sensitivity
  };
  
  const score = 
    (metrics.clarity * weights.clarity) +
    (metrics.hydration * weights.hydration) +
    (metrics.evenness * weights.evenness) +
    (metrics.texture * weights.texture) +
    (metrics.firmness * weights.firmness) +
    ((100 - metrics.oiliness) * weights.oiliness) +
    ((100 - metrics.sensitivity) * weights.sensitivity);
  
  return Math.round(score);
}

/**
 * Calculate beauty score based on facial symmetry and proportions
 */
export function calculateBeautyScore(faceGeometry: FaceGeometry): number {
  const symmetryWeight = 0.4;
  const proportionWeight = 0.6;
  
  // Calculate proportion score based on golden ratio
  const proportionScore = calculateProportionScore(faceGeometry.proportions);
  
  const beautyScore = 
    (faceGeometry.symmetryScore * symmetryWeight) +
    (proportionScore * proportionWeight);
  
  return Math.round(beautyScore);
}

/**
 * Calculate proportion score based on facial measurements
 */
function calculateProportionScore(proportions: FaceGeometry['proportions']): number {
  const goldenRatio = 1.618;
  
  // Calculate how close measurements are to golden ratio
  const faceRatio = proportions.faceLength / proportions.faceWidth;
  const jawToForehead = proportions.jawWidth / proportions.foreheadWidth;
  const cheekToJaw = proportions.cheekboneWidth / proportions.jawWidth;
  
  // Score based on proximity to ideal ratios
  const faceRatioScore = 100 - Math.abs(faceRatio - goldenRatio) * 50;
  const jawScore = 100 - Math.abs(jawToForehead - 0.9) * 100;
  const cheekScore = 100 - Math.abs(cheekToJaw - 1.1) * 100;
  
  return Math.max(0, (faceRatioScore + jawScore + cheekScore) / 3);
}

/**
 * Determine skin type from analysis metrics
 */
export function determineSkinType(metrics: BeautyAnalysis['skinMetrics']): SkinType {
  if (metrics.oiliness > 70) {
    return 'oily';
  } else if (metrics.hydration < 30) {
    return 'dry';
  } else if (metrics.sensitivity > 60) {
    return 'sensitive';
  } else if (metrics.oiliness > 40 && metrics.hydration < 50) {
    return 'combination';
  } else if (metrics.age > 45) {
    return 'mature';
  } else {
    return 'normal';
  }
}

/**
 * Get recommended makeup techniques based on face shape
 */
export function getRecommendedTechniques(faceShape: FaceGeometry['faceShape']): string[] {
  const techniques: Record<string, string[]> = {
    oval: [
      'Natural contouring along cheekbones',
      'Balanced eye makeup',
      'Subtle highlighting on forehead and chin'
    ],
    round: [
      'Contour sides of face to add definition',
      'Elongate eyes with winged eyeliner',
      'Highlight center of face vertically'
    ],
    square: [
      'Soften jaw with blush placement',
      'Round out features with curved lines',
      'Avoid harsh angles in makeup application'
    ],
    heart: [
      'Balance forehead with chin highlighting',
      'Soften pointed chin with rounded blush',
      'Emphasize eyes to draw attention upward'
    ],
    diamond: [
      'Widen forehead and chin with highlighting',
      'Soften cheekbones with strategic contouring',
      'Create horizontal lines to balance face'
    ],
    oblong: [
      'Add width with horizontal blush placement',
      'Avoid elongating techniques',
      'Focus on creating fuller, wider features'
    ]
  };
  
  return techniques[faceShape] || techniques.oval;
}

/**
 * Calculate color compatibility score between skin tone and product color
 */
export function calculateColorCompatibility(skinTone: SkinTone, productColor: string): number {
  // This would implement color theory calculations
  // For now, return a simplified compatibility score
  const skinHue = parseHexColor(skinTone.hex);
  const productHue = parseHexColor(productColor);
  
  // Calculate undertone compatibility
  const undertoneScore = calculateUndertoneCompatibility(skinTone.undertone, productHue);
  
  // Calculate depth compatibility
  const depthScore = calculateDepthCompatibility(skinTone.depth, productHue);
  
  return Math.round((undertoneScore + depthScore) / 2);
}

/**
 * Parse hex color to HSL values
 */
function parseHexColor(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Convert RGB to HSL
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
 * Calculate undertone compatibility
 */
function calculateUndertoneCompatibility(undertone: SkinTone['undertone'], color: { h: number; s: number; l: number }): number {
  // Simplified undertone compatibility logic
  if (undertone === 'warm') {
    return color.h >= 30 && color.h <= 90 ? 90 : 60; // Yellow/orange range
  } else if (undertone === 'cool') {
    return color.h >= 180 && color.h <= 270 ? 90 : 60; // Blue/purple range
  } else {
    return 75; // Neutral works with most colors
  }
}

/**
 * Calculate depth compatibility
 */
function calculateDepthCompatibility(skinDepth: number, color: { h: number; s: number; l: number }): number {
  // Deeper skin tones can handle more intense colors
  const idealSaturation = skinDepth * 10; // Convert to 0-100 scale
  const saturationDiff = Math.abs(color.s - idealSaturation);
  
  return Math.max(0, 100 - saturationDiff);
}

/**
 * Get personalized product recommendations based on analysis
 */
export function getPersonalizedRecommendations(
  analysis: BeautyAnalysis,
  preferences: any
): string[] {
  const recommendations: string[] = [];
  
  // Skin type specific recommendations
  const skinType = determineSkinType(analysis.skinMetrics);
  recommendations.push(...getSkinTypeRecommendations(skinType));
  
  // Face shape specific recommendations
  recommendations.push(...getRecommendedTechniques(analysis.faceGeometry.faceShape));
  
  // Color analysis recommendations
  recommendations.push(...getColorRecommendations(analysis.colorAnalysis));
  
  // Skin concern specific recommendations
  analysis.skinConcerns.forEach(concern => {
    recommendations.push(...getConcernRecommendations(concern.type));
  });
  
  return recommendations;
}

/**
 * Get skin type specific recommendations
 */
function getSkinTypeRecommendations(skinType: SkinType): string[] {
  const recommendations: Record<SkinType, string[]> = {
    oily: [
      'Use oil-free, mattifying foundation',
      'Apply powder to control shine',
      'Use blotting papers throughout the day'
    ],
    dry: [
      'Use hydrating primer before foundation',
      'Choose dewy finish products',
      'Avoid powder-heavy makeup'
    ],
    combination: [
      'Use different products for T-zone and cheeks',
      'Apply powder only to oily areas',
      'Use cream blush on dry areas'
    ],
    sensitive: [
      'Choose hypoallergenic products',
      'Avoid fragranced cosmetics',
      'Test products on small area first'
    ],
    mature: [
      'Use hydrating, anti-aging formulas',
      'Avoid heavy powder application',
      'Focus on luminous, youthful finishes'
    ],
    normal: [
      'Most products will work well',
      'Focus on enhancing natural features',
      'Experiment with different textures'
    ]
  };
  
  return recommendations[skinType] || [];
}

/**
 * Get color analysis recommendations
 */
function getColorRecommendations(colorAnalysis: BeautyAnalysis['colorAnalysis']): string[] {
  return [
    `Your ${colorAnalysis.season} color palette emphasizes ${colorAnalysis.undertone} tones`,
    'Recommended eyeshadow shades: ' + colorAnalysis.recommendedColors.eyeshadow.slice(0, 3).join(', '),
    'Recommended lip colors: ' + colorAnalysis.recommendedColors.lipstick.slice(0, 3).join(', '),
    'Avoid these colors: ' + colorAnalysis.colorsToAvoid.slice(0, 2).join(', ')
  ];
}

/**
 * Get skin concern specific recommendations
 */
function getConcernRecommendations(concern: string): string[] {
  const recommendations: Record<string, string[]> = {
    acne: ['Use non-comedogenic products', 'Apply concealer after treating blemishes'],
    dark_spots: ['Use color-correcting concealer', 'Consider highlighting to redirect attention'],
    fine_lines: ['Use primer to fill in lines', 'Avoid settling into creases'],
    wrinkles: ['Use hydrating formulas', 'Apply with patting motions'],
    pores: ['Use pore-minimizing primer', 'Avoid thick, cakey products'],
    redness: ['Use green color corrector', 'Choose neutral-toned products'],
    dryness: ['Use hydrating formulas', 'Avoid matte finishes'],
    oiliness: ['Use oil-controlling products', 'Set with powder']
  };
  
  return recommendations[concern] || [];
}