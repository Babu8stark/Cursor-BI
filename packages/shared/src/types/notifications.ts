import { Timestamp, Platform } from './user';

export type NotificationType = 
  | 'beauty_analysis_complete'
  | 'product_recommendation' 
  | 'tutorial_available'
  | 'social_interaction'
  | 'subscription_reminder'
  | 'payment_update'
  | 'system_announcement'
  | 'security_alert'
  | 'feature_update';

export type NotificationChannel = 'push' | 'email' | 'in_app' | 'sms';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  name: string;
  description: string;
  
  // Content Templates
  templates: {
    push: {
      title: string;
      body: string;
      icon?: string;
      image?: string;
      badge?: number;
      sound?: string;
    };
    email: {
      subject: string;
      htmlBody: string;
      textBody: string;
      attachments?: Array<{
        name: string;
        url: string;
        type: string;
      }>;
    };
    inApp: {
      title: string;
      message: string;
      imageUrl?: string;
      actionButtons?: Array<{
        text: string;
        action: string;
        style: 'primary' | 'secondary' | 'danger';
      }>;
    };
    sms?: {
      message: string;
    };
  };
  
  // Personalization
  variables: string[]; // {{userName}}, {{productName}}, etc.
  
  // Targeting
  targetAudience: {
    platforms: Platform[];
    subscriptionTiers: string[];
    userSegments: string[];
    countries?: string[];
    languages?: string[];
  };
  
  // Scheduling
  scheduling: {
    immediate: boolean;
    delayMinutes?: number;
    timeZoneAware: boolean;
    optimizeDeliveryTime: boolean;
    respectQuietHours: boolean;
  };
  
  // Settings
  enabled: boolean;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  
  // A/B Testing
  variants?: Array<{
    name: string;
    weight: number;
    templates: any;
  }>;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface NotificationPreferences {
  userId: string;
  
  // Channel Preferences
  channels: {
    push: {
      enabled: boolean;
      quietHours: {
        enabled: boolean;
        startTime: string; // HH:MM
        endTime: string; // HH:MM
        timezone: string;
      };
      deviceTokens: Array<{
        token: string;
        platform: Platform;
        active: boolean;
        lastSeen: Timestamp;
      }>;
    };
    email: {
      enabled: boolean;
      address: string;
      verified: boolean;
      frequency: 'immediate' | 'daily' | 'weekly';
    };
    inApp: {
      enabled: boolean;
      showBadges: boolean;
      soundEnabled: boolean;
    };
    sms: {
      enabled: boolean;
      phoneNumber?: string;
      verified: boolean;
    };
  };
  
  // Type Preferences
  typePreferences: Record<NotificationType, {
    enabled: boolean;
    channels: NotificationChannel[];
    priority: NotificationPriority;
  }>;
  
  // Global Settings
  globalSettings: {
    enabled: boolean;
    marketing: boolean;
    transactional: boolean;
    social: boolean;
    beauty: boolean;
    security: boolean;
  };
  
  updatedAt: Timestamp;
}

export interface NotificationCampaign {
  id: string;
  name: string;
  description: string;
  type: NotificationType;
  
  // Targeting
  targetCriteria: {
    userIds?: string[];
    userSegments?: string[];
    platforms?: Platform[];
    subscriptionTiers?: string[];
    countries?: string[];
    lastActiveWithin?: number; // days
    customFilters?: Array<{
      field: string;
      operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
      value: any;
    }>;
  };
  
  // Content
  templateId: string;
  variables: Record<string, any>;
  
  // Scheduling
  scheduling: {
    type: 'immediate' | 'scheduled' | 'triggered';
    scheduledAt?: Timestamp;
    triggerConditions?: Array<{
      event: string;
      conditions: Record<string, any>;
    }>;
  };
  
  // Status
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'cancelled' | 'failed';
  
  // Results
  results?: {
    targetedUsers: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    cost: number;
  };
  
  // A/B Testing
  abTest?: {
    enabled: boolean;
    variants: Array<{
      name: string;
      templateId: string;
      percentage: number;
    }>;
    winnerCriteria: 'open_rate' | 'click_rate' | 'conversion_rate';
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  startedAt?: Timestamp;
  completedAt?: Timestamp;
}

export interface NotificationDelivery {
  id: string;
  campaignId?: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  
  // Content
  content: {
    title?: string;
    message: string;
    imageUrl?: string;
    actionUrl?: string;
    metadata?: Record<string, any>;
  };
  
  // Delivery Info
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';
  sentAt?: Timestamp;
  deliveredAt?: Timestamp;
  
  // Provider Info
  providerMessageId?: string;
  providerResponse?: any;
  
  // User Interaction
  opened: boolean;
  openedAt?: Timestamp;
  clicked: boolean;
  clickedAt?: Timestamp;
  
  // Failure Info
  failureReason?: string;
  retryCount: number;
  nextRetryAt?: Timestamp;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NotificationAnalytics {
  date: string; // ISO date
  type?: NotificationType;
  channel?: NotificationChannel;
  platform?: Platform;
  
  // Volume Metrics
  sent: number;
  delivered: number;
  failed: number;
  bounced: number;
  
  // Engagement Metrics
  opened: number;
  clicked: number;
  unsubscribed: number;
  
  // Performance Metrics
  openRate: number; // percentage
  clickRate: number; // percentage
  deliveryRate: number; // percentage
  bounceRate: number; // percentage
  unsubscribeRate: number; // percentage
  
  // Response Times
  averageDeliveryTime: number; // seconds
  averageOpenTime: number; // seconds from delivery
  
  // Conversion Metrics
  conversions: number;
  conversionRate: number; // percentage
  revenue?: number;
  
  // Cost Metrics
  cost: number;
  costPerDelivery: number;
  costPerClick: number;
  costPerConversion: number;
}