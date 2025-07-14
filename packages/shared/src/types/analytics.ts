import { Timestamp, Platform } from './user';

export interface AnalyticsEvent {
  id: string;
  userId: string;
  sessionId: string;
  eventName: string;
  eventCategory: 'user_action' | 'system' | 'beauty' | 'commerce' | 'social';
  
  properties: Record<string, any>;
  
  // Context
  platform: Platform;
  appVersion: string;
  deviceInfo: {
    model?: string;
    os: string;
    osVersion: string;
    screenSize?: string;
    locale: string;
    timezone: string;
  };
  
  // Location (if available)
  location?: {
    country: string;
    region?: string;
    city?: string;
  };
  
  timestamp: Timestamp;
}

export interface BeautyAnalyticsEvent extends AnalyticsEvent {
  beautyData?: {
    analysisId?: string;
    skinType?: string;
    productId?: string;
    makeupLookId?: string;
    tutorialId?: string;
    accuracy?: number;
    duration?: number;
  };
}

export interface UserEngagement {
  userId: string;
  date: string; // ISO date
  
  // Session Data
  sessionCount: number;
  totalDuration: number; // minutes
  averageSessionDuration: number;
  
  // Feature Usage
  featuresUsed: Record<string, number>;
  beautyAnalysesCount: number;
  tutorialsWatched: number;
  productsViewed: number;
  socialInteractions: number;
  
  // Conversion Metrics
  purchaseIntent: number; // 0-100
  productRecommendationsClicked: number;
  shoppingListItems: number;
  
  // Content Engagement
  contentLiked: number;
  contentShared: number;
  contentSaved: number;
  reviewsWritten: number;
  
  platform: Platform;
}

export interface AppPerformance {
  id: string;
  timestamp: Timestamp;
  platform: Platform;
  appVersion: string;
  
  // Performance Metrics
  loadTime: number; // milliseconds
  renderTime: number;
  memoryUsage: number; // MB
  cpuUsage: number; // percentage
  networkLatency: number;
  
  // Error Metrics
  crashCount: number;
  errorCount: number;
  anrCount: number; // Android Not Responding
  
  // AI Performance
  analysisProcessingTime: number;
  modelLoadTime: number;
  inferenceTime: number;
  
  // User Experience
  userSatisfactionScore?: number; // 1-10
  taskCompletionRate: number; // 0-100
  
  deviceInfo: {
    model: string;
    os: string;
    osVersion: string;
    memoryTotal: number;
    storageAvailable: number;
  };
}

export interface BusinessMetrics {
  date: string; // ISO date
  
  // User Metrics
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  newUsers: number;
  returningUsers: number;
  churnRate: number; // percentage
  
  // Engagement Metrics
  averageSessionDuration: number;
  sessionsPerUser: number;
  beautyAnalysesPerUser: number;
  tutorialsCompletionRate: number;
  
  // Conversion Metrics
  conversionRate: number; // percentage
  subscriptionConversions: number;
  productClickThroughRate: number;
  
  // Revenue Metrics
  revenue: number;
  revenuePerUser: number;
  subscriptionRevenue: number;
  
  // Platform Distribution
  platformBreakdown: Record<Platform, number>;
  
  // Feature Adoption
  featureAdoption: Record<string, {
    users: number;
    sessions: number;
    adoptionRate: number;
  }>;
}