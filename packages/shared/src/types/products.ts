import { Timestamp, SkinType, Undertone } from './user';

export type ProductCategory = 
  | 'foundation' 
  | 'concealer' 
  | 'primer' 
  | 'powder' 
  | 'blush' 
  | 'bronzer' 
  | 'highlighter' 
  | 'eyeshadow' 
  | 'eyeliner' 
  | 'mascara' 
  | 'eyebrow' 
  | 'lipstick' 
  | 'lip_gloss' 
  | 'lip_liner' 
  | 'setting_spray' 
  | 'tools' 
  | 'skincare';

export type PriceRange = 'drugstore' | 'mid-range' | 'high-end' | 'luxury';

export interface ProductShade {
  id: string;
  name: string;
  hex: string;
  undertone: Undertone;
  depth: number; // 1-10 scale
  finish: 'matte' | 'satin' | 'dewy' | 'shimmer' | 'metallic' | 'glitter';
  coverage?: 'sheer' | 'light' | 'medium' | 'full';
  available: boolean;
  swatchImageUrl?: string;
}

export interface Ingredient {
  name: string;
  purpose: string;
  concerns?: string[]; // potential allergens or issues
  benefits?: string[];
  concentration?: number; // percentage
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  description: string;
  longDescription: string;
  
  // Visual Assets
  imageUrls: string[];
  swatchImageUrl?: string;
  videoUrl?: string;
  
  // Product Details
  shades: ProductShade[];
  size: {
    amount: number;
    unit: string; // ml, g, oz, etc.
  };
  ingredients: Ingredient[];
  keyIngredients: string[];
  
  // Suitability
  suitableFor: {
    skinTypes: SkinType[];
    skinTones: string[];
    concerns: string[];
    ageRange?: {
      min: number;
      max: number;
    };
  };
  
  // Claims & Features
  claims: string[]; // waterproof, long-wearing, etc.
  features: string[]; // buildable, blendable, etc.
  benefits: string[];
  finishes: string[];
  
  // Commercial Information
  pricing: Array<{
    retailer: string;
    price: number;
    currency: string;
    onSale: boolean;
    originalPrice?: number;
    url: string;
    availability: 'in-stock' | 'out-of-stock' | 'limited';
  }>;
  
  priceRange: PriceRange;
  
  // Ratings & Reviews
  ratings: {
    average: number; // 1-5
    count: number;
    distribution: Record<string, number>; // "5": 120, "4": 80, etc.
  };
  
  // Performance Metrics
  performance: {
    longevity: number; // 1-10
    pigmentation: number; // 1-10
    blendability: number; // 1-10
    buildability: number; // 1-10
    wearComfort: number; // 1-10
  };
  
  // Metadata
  launchDate: Timestamp;
  discontinued: boolean;
  limitedEdition: boolean;
  vegan: boolean;
  crueltyFree: boolean;
  organic: boolean;
  paraben_free: boolean;
  sulfate_free: boolean;
  
  // SEO & Discovery
  tags: string[];
  searchKeywords: string[];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  title: string;
  content: string;
  
  // Detailed Ratings
  detailedRatings: {
    quality: number;
    value: number;
    pigmentation?: number;
    longevity?: number;
    packaging?: number;
  };
  
  // User Context
  userSkinType: SkinType;
  userSkinTone: string;
  userAge?: number;
  purchaseVerified: boolean;
  
  // Helpful Metrics
  helpfulCount: number;
  reportedCount: number;
  
  // Media
  imageUrls: string[];
  videoUrl?: string;
  
  // Metadata
  createdAt: Timestamp;
  verified: boolean;
  featured: boolean;
}

export interface ProductRecommendation {
  productId: string;
  confidence: number; // 0-100
  reason: string;
  category: 'ai_match' | 'trending' | 'similar_users' | 'expert_pick' | 'best_seller';
  
  matchFactors: {
    skinToneMatch: number; // 0-100
    skinTypeMatch: number; // 0-100
    preferenceMatch: number; // 0-100
    trendingScore: number; // 0-100
  };
  
  alternatives: Array<{
    productId: string;
    reason: string;
    confidence: number;
  }>;
  
  generatedAt: Timestamp;
  expiresAt: Timestamp;
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  
  items: Array<{
    productId: string;
    shadeId?: string;
    quantity: number;
    priority: 'high' | 'medium' | 'low';
    notes?: string;
    addedAt: Timestamp;
  }>;
  
  totalEstimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
  
  shared: boolean;
  collaborators: string[]; // user IDs
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  
  // Brand Values
  vegan: boolean;
  crueltyFree: boolean;
  sustainablePractices: boolean;
  inclusiveShadeRange: boolean;
  
  // Business Info
  founded: number; // year
  headquarters: string;
  parentCompany?: string;
  
  // Platform Integration
  verified: boolean;
  featured: boolean;
  
  // Social Media
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
  };
  
  // Performance Metrics
  popularity: number; // 1-100
  rating: number; // 1-5
  productCount: number;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductComparison {
  id: string;
  userId: string;
  products: string[]; // product IDs
  criteria: string[]; // what to compare
  
  results: Array<{
    productId: string;
    scores: Record<string, number>;
    pros: string[];
    cons: string[];
    bestFor: string[];
  }>;
  
  recommendation: {
    winner: string; // product ID
    reason: string;
    confidence: number;
  };
  
  createdAt: Timestamp;
  shared: boolean;
}