import { Timestamp, SkinType, SkinTone } from './user';

export interface FacialLandmark {
  x: number;
  y: number;
  z?: number;
  confidence: number;
}

export interface FaceGeometry {
  landmarks: FacialLandmark[]; // 468+ landmarks
  boundingBox: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong';
  symmetryScore: number; // 0-100
  proportions: {
    faceLength: number;
    faceWidth: number;
    jawWidth: number;
    foreheadWidth: number;
    cheekboneWidth: number;
  };
}

export interface EyeAnalysis {
  shape: 'almond' | 'round' | 'hooded' | 'upturned' | 'downturned' | 'monolid';
  size: 'small' | 'medium' | 'large';
  spacing: 'close' | 'normal' | 'wide';
  landmarks: {
    innerCorner: FacialLandmark;
    outerCorner: FacialLandmark;
    upperLid: FacialLandmark[];
    lowerLid: FacialLandmark[];
    pupil: FacialLandmark;
  };
  recommendations: string[];
}

export interface LipAnalysis {
  shape: 'thin' | 'full' | 'heart' | 'round' | 'downturned' | 'upturned';
  size: 'small' | 'medium' | 'large';
  landmarks: {
    upperLip: FacialLandmark[];
    lowerLip: FacialLandmark[];
    corners: FacialLandmark[];
  };
  naturalColor: string; // hex
  recommendations: string[];
}

export interface SkinMetrics {
  oiliness: number; // 0-100
  hydration: number; // 0-100
  sensitivity: number; // 0-100
  clarity: number; // 0-100
  texture: number; // 0-100
  firmness: number; // 0-100
  evenness: number; // 0-100
  age: number; // estimated age
}

export interface SkinConcern {
  type: 'acne' | 'dark_spots' | 'fine_lines' | 'wrinkles' | 'pores' | 'redness' | 'dryness' | 'oiliness';
  severity: number; // 0-100
  location: {
    x: number;
    y: number;
    radius: number;
  };
  confidence: number; // 0-100
  recommendations: string[];
}

export interface ColorAnalysis {
  dominantColors: string[]; // hex colors
  undertone: 'warm' | 'cool' | 'neutral';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  recommendedColors: {
    eyeshadow: string[];
    lipstick: string[];
    blush: string[];
    foundation: string[];
  };
  colorsToAvoid: string[];
}

export interface BeautyAnalysis {
  id: string;
  userId: string;
  timestamp: Timestamp;
  imageUrl: string;
  thumbnailUrl: string;
  
  // Analysis Results
  faceGeometry: FaceGeometry;
  eyeAnalysis: {
    left: EyeAnalysis;
    right: EyeAnalysis;
  };
  lipAnalysis: LipAnalysis;
  skinMetrics: SkinMetrics;
  skinConcerns: SkinConcern[];
  colorAnalysis: ColorAnalysis;
  
  // Computed Scores
  beautyScore: number; // 0-100
  skinHealthScore: number; // 0-100
  symmetryScore: number; // 0-100
  
  // AI Model Information
  modelVersion: string;
  processingTime: number; // milliseconds
  confidence: number; // 0-100
  
  // Status
  status: 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface MakeupLook {
  id: string;
  name: string;
  category: 'natural' | 'evening' | 'dramatic' | 'bridal' | 'editorial' | 'everyday';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  
  products: Array<{
    type: string;
    color: string;
    placement: string;
    opacity: number; // 0-100
    blendMode?: string;
  }>;
  
  steps: Array<{
    order: number;
    instruction: string;
    productType: string;
    technique: string;
    duration: number; // seconds
    videoUrl?: string;
    imageUrl?: string;
  }>;
  
  suitableFor: {
    faceShapes: string[];
    eyeShapes: string[];
    skinTones: string[];
    occasions: string[];
  };
  
  tags: string[];
  createdBy: string; // user ID or 'system'
  createdAt: Timestamp;
  likes: number;
  saves: number;
}

export interface VirtualTryOn {
  id: string;
  userId: string;
  analysisId: string;
  makeupLookId: string;
  originalImageUrl: string;
  resultImageUrl: string;
  timestamp: Timestamp;
  
  appliedProducts: Array<{
    type: string;
    brand: string;
    productId: string;
    color: string;
    intensity: number; // 0-100
  }>;
  
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    warmth: number;
  };
  
  feedback?: {
    rating: number; // 1-5
    liked: boolean;
    saved: boolean;
    shared: boolean;
  };
}

export interface BeautyTutorial {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    bio: string;
    imageUrl: string;
    verified: boolean;
  };
  
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  
  steps: Array<{
    order: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    products: string[];
    techniques: string[];
  }>;
  
  requiredProducts: Array<{
    type: string;
    essential: boolean;
    alternatives: string[];
  }>;
  
  suitableFor: {
    skinTypes: SkinType[];
    experienceLevel: string[];
    occasions: string[];
  };
  
  engagement: {
    views: number;
    likes: number;
    saves: number;
    completions: number;
    rating: number;
    reviewCount: number;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  published: boolean;
  featured: boolean;
}