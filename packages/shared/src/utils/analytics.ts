/**
 * Analytics utility functions
 */

import { Platform } from '../types/user';

/**
 * Track custom analytics event
 */
export function trackEvent(
  eventName: string,
  properties: Record<string, any> = {},
  userId?: string
) {
  // This would integrate with your analytics provider (Firebase Analytics, etc.)
  const event = {
    eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      platform: getPlatform(),
      userId
    }
  };
  
  // Send to analytics service
  console.log('Analytics Event:', event);
}

/**
 * Track beauty analysis event
 */
export function trackBeautyAnalysis(
  analysisType: string,
  processingTime: number,
  accuracy: number,
  userId: string
) {
  trackEvent('beauty_analysis_completed', {
    analysisType,
    processingTime,
    accuracy,
    category: 'beauty'
  }, userId);
}

/**
 * Track product interaction
 */
export function trackProductInteraction(
  action: 'view' | 'like' | 'save' | 'share' | 'purchase_intent',
  productId: string,
  userId: string,
  additionalData?: Record<string, any>
) {
  trackEvent('product_interaction', {
    action,
    productId,
    category: 'commerce',
    ...additionalData
  }, userId);
}

/**
 * Track tutorial engagement
 */
export function trackTutorialEngagement(
  tutorialId: string,
  action: 'start' | 'complete' | 'skip' | 'replay',
  watchTime: number,
  userId: string
) {
  trackEvent('tutorial_engagement', {
    tutorialId,
    action,
    watchTime,
    category: 'learning'
  }, userId);
}

/**
 * Track social interaction
 */
export function trackSocialInteraction(
  action: 'like' | 'comment' | 'share' | 'follow' | 'post_create',
  targetId: string,
  userId: string
) {
  trackEvent('social_interaction', {
    action,
    targetId,
    category: 'social'
  }, userId);
}

/**
 * Track conversion funnel step
 */
export function trackConversionStep(
  funnelName: string,
  step: string,
  userId: string,
  value?: number
) {
  trackEvent('conversion_step', {
    funnelName,
    step,
    value,
    category: 'conversion'
  }, userId);
}

/**
 * Track error event
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  context?: Record<string, any>
) {
  trackEvent('error_occurred', {
    errorType,
    errorMessage,
    context,
    category: 'error'
  });
}

/**
 * Track performance metric
 */
export function trackPerformance(
  metricName: string,
  value: number,
  unit: string = 'ms'
) {
  trackEvent('performance_metric', {
    metricName,
    value,
    unit,
    category: 'performance'
  });
}

/**
 * Get current platform
 */
function getPlatform(): Platform {
  if (typeof window !== 'undefined') {
    // Web environment
    return 'web';
  } else if (typeof navigator !== 'undefined') {
    // React Native environment
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'ios';
    } else if (/android/i.test(userAgent)) {
      return 'android';
    }
  }
  return 'web'; // Default fallback
}

/**
 * Calculate engagement score based on user actions
 */
export function calculateEngagementScore(
  sessionDuration: number, // minutes
  actionsCount: number,
  featuresUsed: number
): number {
  const durationScore = Math.min(sessionDuration / 30, 1) * 40; // Max 40 points for 30+ minutes
  const actionsScore = Math.min(actionsCount / 10, 1) * 30; // Max 30 points for 10+ actions
  const featuresScore = Math.min(featuresUsed / 5, 1) * 30; // Max 30 points for 5+ features
  
  return Math.round(durationScore + actionsScore + featuresScore);
}

/**
 * Calculate retention rate
 */
export function calculateRetentionRate(
  totalUsers: number,
  returningUsers: number
): number {
  if (totalUsers === 0) return 0;
  return (returningUsers / totalUsers) * 100;
}

/**
 * Calculate conversion rate
 */
export function calculateConversionRate(
  totalVisitors: number,
  conversions: number
): number {
  if (totalVisitors === 0) return 0;
  return (conversions / totalVisitors) * 100;
}

/**
 * Format analytics data for reporting
 */
export function formatAnalyticsReport(
  data: any[],
  groupBy: 'day' | 'week' | 'month'
): Record<string, any> {
  const grouped = data.reduce((acc, item) => {
    const date = new Date(item.timestamp);
    let key: string;
    
    switch (groupBy) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      default:
        key = date.toISOString().split('T')[0];
    }
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    
    return acc;
  }, {} as Record<string, any[]>);
  
  return grouped;
}