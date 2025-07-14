/**
 * Platform constants
 */

export const BEAUTY_CONSTANTS = {
  // Skin Analysis
  SKIN_TYPES: ['oily', 'dry', 'combination', 'sensitive', 'mature', 'normal'] as const,
  UNDERTONES: ['warm', 'cool', 'neutral'] as const,
  FACE_SHAPES: ['oval', 'round', 'square', 'heart', 'diamond', 'oblong'] as const,
  
  // Product Categories
  PRODUCT_CATEGORIES: [
    'foundation',
    'concealer',
    'primer',
    'powder',
    'blush',
    'bronzer',
    'highlighter',
    'eyeshadow',
    'eyeliner',
    'mascara',
    'eyebrow',
    'lipstick',
    'lip_gloss',
    'lip_liner',
    'setting_spray',
    'tools',
    'skincare'
  ] as const,
  
  // Analysis Thresholds
  ANALYSIS_THRESHOLDS: {
    MIN_CONFIDENCE: 70,
    MIN_IMAGE_SIZE: 300,
    MAX_IMAGE_SIZE: 4096,
    MAX_PROCESSING_TIME: 30000, // 30 seconds
  },
  
  // Subscription Limits
  SUBSCRIPTION_LIMITS: {
    FREE: {
      ANALYSES_PER_MONTH: 3,
      STORAGE_GB: 0.1,
      TUTORIAL_ACCESS: 'basic'
    },
    PREMIUM: {
      ANALYSES_PER_MONTH: 50,
      STORAGE_GB: 1,
      TUTORIAL_ACCESS: 'premium'
    },
    PRO: {
      ANALYSES_PER_MONTH: -1, // unlimited
      STORAGE_GB: 5,
      TUTORIAL_ACCESS: 'all'
    }
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_IMAGE_SIZE_MB: 10,
    MAX_VIDEO_SIZE_MB: 100,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/quicktime']
  },
  
  // Social Features
  SOCIAL: {
    MAX_POST_LENGTH: 2000,
    MAX_COMMENT_LENGTH: 500,
    MAX_IMAGES_PER_POST: 10,
    MAX_HASHTAGS: 30
  },
  
  // Notification Settings
  NOTIFICATIONS: {
    QUIET_HOURS_DEFAULT: {
      START: '22:00',
      END: '08:00'
    },
    BATCH_SIZE: 1000,
    RETRY_ATTEMPTS: 3
  }
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  ANALYSIS: '/analysis',
  PRODUCTS: '/products',
  SOCIAL: '/social',
  PAYMENTS: '/payments',
  NOTIFICATIONS: '/notifications',
  UPLOAD: '/upload'
};

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
    ACCESS_DENIED: 'Access denied. Please check your permissions.'
  },
  ANALYSIS: {
    INVALID_IMAGE: 'Please upload a valid image file',
    PROCESSING_FAILED: 'Analysis failed. Please try again.',
    QUOTA_EXCEEDED: 'Monthly analysis limit reached. Upgrade your plan.'
  },
  UPLOAD: {
    FILE_TOO_LARGE: 'File size exceeds maximum limit',
    INVALID_FORMAT: 'Invalid file format',
    UPLOAD_FAILED: 'Upload failed. Please try again.'
  },
  PAYMENT: {
    PAYMENT_FAILED: 'Payment processing failed',
    INVALID_CARD: 'Invalid payment method',
    SUBSCRIPTION_EXPIRED: 'Your subscription has expired'
  }
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

export const SKIN_TONE_PALETTE = [
  { name: 'Very Fair', hex: '#FDE7D6', depth: 1 },
  { name: 'Fair', hex: '#F7E7CE', depth: 2 },
  { name: 'Light', hex: '#F0D5A8', depth: 3 },
  { name: 'Light Medium', hex: '#E8C4A0', depth: 4 },
  { name: 'Medium', hex: '#D4A574', depth: 5 },
  { name: 'Medium Deep', hex: '#C19A6B', depth: 6 },
  { name: 'Deep', hex: '#A67C5A', depth: 7 },
  { name: 'Dark', hex: '#8B4513', depth: 8 },
  { name: 'Very Dark', hex: '#5D4037', depth: 9 },
  { name: 'Deepest', hex: '#3E2723', depth: 10 }
];

export const MAKEUP_FINISHES = [
  'matte',
  'satin',
  'dewy',
  'shimmer',
  'metallic',
  'glitter',
  'natural',
  'luminous'
] as const;

export const DIFFICULTY_LEVELS = [
  'beginner',
  'intermediate',
  'advanced'
] as const;