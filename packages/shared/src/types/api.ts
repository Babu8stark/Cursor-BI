import { Timestamp } from './user';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    requestId: string;
    timestamp: Timestamp;
    processingTime: number; // milliseconds
    version: string;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string; // for validation errors
  statusCode: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextCursor?: string;
    previousCursor?: string;
  };
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  filters?: Record<string, any>;
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Beauty Analysis API
export interface AnalyzeImageRequest {
  imageUrl: string;
  analysisType: 'face' | 'skin' | 'color' | 'full';
  options?: {
    highAccuracy?: boolean;
    includeRecommendations?: boolean;
    includeColorAnalysis?: boolean;
  };
}

export interface AnalyzeImageResponse {
  analysisId: string;
  status: 'processing' | 'completed' | 'failed';
  results?: any; // BeautyAnalysis type
  estimatedCompletionTime?: number; // seconds
}

// Product API
export interface SearchProductsRequest {
  query?: string;
  category?: string[];
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  skinType?: string[];
  skinTone?: string[];
  tags?: string[];
  availability?: 'in_stock' | 'all';
  sortBy?: 'relevance' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
  pagination: PaginationParams;
}

export interface ProductRecommendationRequest {
  userId: string;
  analysisId?: string;
  category?: string[];
  maxResults?: number;
  includeAlternatives?: boolean;
}

// User API
export interface UpdateUserProfileRequest {
  displayName?: string;
  skinType?: string;
  skinTone?: any;
  preferences?: any;
  dateOfBirth?: string;
}

export interface UpdateUserPreferencesRequest {
  notifications?: any;
  privacy?: any;
  brands?: string[];
  priceRange?: any;
  skinConcerns?: string[];
}

// Social API
export interface CreatePostRequest {
  type: string;
  title: string;
  description: string;
  imageUrls: string[];
  videoUrl?: string;
  beautyData?: any;
  tags?: string[];
  visibility: 'public' | 'followers' | 'private';
}

export interface GetSocialFeedRequest {
  feedType: 'home' | 'trending' | 'following' | 'explore';
  pagination: PaginationParams;
  filters?: {
    postType?: string[];
    tags?: string[];
    dateRange?: {
      start: string;
      end: string;
    };
  };
}

// Subscription API
export interface CreateSubscriptionRequest {
  planId: string;
  paymentMethodId: string;
  billingCycle: 'monthly' | 'yearly';
  promoCode?: string;
}

export interface UpdateSubscriptionRequest {
  planId?: string;
  paymentMethodId?: string;
  cancelAtPeriodEnd?: boolean;
}

// File Upload API
export interface UploadFileRequest {
  file: File | Blob;
  type: 'image' | 'video' | 'document';
  category: 'profile' | 'analysis' | 'post' | 'tutorial';
  metadata?: Record<string, any>;
}

export interface UploadFileResponse {
  fileId: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  dimensions?: {
    width: number;
    height: number;
  };
  processingStatus?: 'uploading' | 'processing' | 'completed' | 'failed';
}

// Cloud Function Types
export interface CloudFunctionRequest<T = any> {
  data: T;
  context: {
    auth?: {
      uid: string;
      token: any;
    };
    rawRequest: any;
  };
}

export interface CloudFunctionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    requestId: string;
    processingTime: number;
    timestamp: string;
  };
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Timestamp;
  messageId: string;
}

export interface RealtimeEvent {
  eventType: 'analysis_update' | 'social_interaction' | 'notification' | 'system_update';
  userId?: string;
  data: any;
  timestamp: Timestamp;
}

// Rate Limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Timestamp;
  retryAfter?: number; // seconds
}

// Cache Types
export interface CacheConfig {
  ttl?: number; // seconds
  tags?: string[];
  version?: string;
  compress?: boolean;
}

// Error Codes
export enum APIErrorCode {
  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  
  // Resource
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  RESOURCE_LOCKED = 'RESOURCE_LOCKED',
  
  // Rate Limiting
  RATE_LIMITED = 'RATE_LIMITED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  
  // Payment
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUBSCRIPTION_EXPIRED = 'SUBSCRIPTION_EXPIRED',
  
  // File Upload
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  
  // AI/ML
  ANALYSIS_FAILED = 'ANALYSIS_FAILED',
  MODEL_UNAVAILABLE = 'MODEL_UNAVAILABLE',
  PROCESSING_TIMEOUT = 'PROCESSING_TIMEOUT',
  
  // System
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE = 'MAINTENANCE_MODE'
}