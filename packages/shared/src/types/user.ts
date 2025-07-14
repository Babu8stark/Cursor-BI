// Generic Timestamp type that works with Firebase
export type Timestamp = {
  seconds: number;
  nanoseconds: number;
} | Date;

export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'mature' | 'normal';
export type Undertone = 'warm' | 'cool' | 'neutral';
export type Platform = 'web' | 'ios' | 'android';

export interface SkinTone {
  hex: string;
  undertone: Undertone;
  depth: number; // 1-10 scale
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface UserPreferences {
  brands: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  skinConcerns: string[];
  makeupStyle: 'natural' | 'bold' | 'classic' | 'trendy' | 'dramatic';
  notifications: {
    tutorials: boolean;
    productRecommendations: boolean;
    socialUpdates: boolean;
    reminders: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    allowDataProcessing: boolean;
    shareWithCommunity: boolean;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  dateOfBirth?: Date;
  skinType: SkinType;
  skinTone: SkinTone;
  preferences: UserPreferences;
  subscription: {
    tier: 'free' | 'premium' | 'pro';
    expiresAt?: Timestamp;
    features: string[];
  };
  onboarding: {
    completed: boolean;
    step: number;
    skinAnalysisCompleted: boolean;
    tutorialCompleted: boolean;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt: Timestamp;
}

export interface UserAnalytics {
  userId: string;
  appUsage: Array<{
    platform: Platform;
    duration: number; // minutes
    sessionsCount: number;
    featuresUsed: Record<string, number>;
    date: string; // ISO date
  }>;
  beautyGoals: {
    skinImprovement: boolean;
    makeupSkills: boolean;
    productDiscovery: boolean;
    socialEngagement: boolean;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: Timestamp;
    category: 'analysis' | 'social' | 'learning' | 'consistency';
  }>;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  platform: Platform;
  startTime: Timestamp;
  endTime?: Timestamp;
  activities: Array<{
    type: 'analysis' | 'tutorial' | 'product_view' | 'social_interaction';
    timestamp: Timestamp;
    data: Record<string, any>;
  }>;
  location?: {
    country: string;
    region?: string;
    city?: string;
  };
}