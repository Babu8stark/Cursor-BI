import { z } from 'zod';

// User validation schemas
export const UserProfileSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  photoURL: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
  skinType: z.enum(['oily', 'dry', 'combination', 'sensitive', 'mature', 'normal']),
  skinTone: z.object({
    hex: z.string().regex(/^#([A-Fa-f0-9]{6})$/),
    undertone: z.enum(['warm', 'cool', 'neutral']),
    depth: z.number().min(1).max(10),
    season: z.enum(['spring', 'summer', 'autumn', 'winter']).optional()
  }),
  preferences: z.object({
    brands: z.array(z.string()),
    priceRange: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string().length(3)
    }),
    skinConcerns: z.array(z.string()),
    makeupStyle: z.enum(['natural', 'bold', 'classic', 'trendy', 'dramatic']),
    notifications: z.object({
      tutorials: z.boolean(),
      productRecommendations: z.boolean(),
      socialUpdates: z.boolean(),
      reminders: z.boolean()
    }),
    privacy: z.object({
      shareAnalytics: z.boolean(),
      allowDataProcessing: z.boolean(),
      shareWithCommunity: z.boolean()
    })
  })
});

// Beauty analysis validation schemas
export const BeautyAnalysisSchema = z.object({
  id: z.string(),
  userId: z.string(),
  imageUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  faceGeometry: z.object({
    landmarks: z.array(z.object({
      x: z.number(),
      y: z.number(),
      z: z.number().optional(),
      confidence: z.number().min(0).max(100)
    })),
    boundingBox: z.object({
      left: z.number(),
      top: z.number(),
      width: z.number(),
      height: z.number()
    }),
    faceShape: z.enum(['oval', 'round', 'square', 'heart', 'diamond', 'oblong']),
    symmetryScore: z.number().min(0).max(100)
  }),
  skinMetrics: z.object({
    oiliness: z.number().min(0).max(100),
    hydration: z.number().min(0).max(100),
    sensitivity: z.number().min(0).max(100),
    clarity: z.number().min(0).max(100),
    texture: z.number().min(0).max(100),
    firmness: z.number().min(0).max(100),
    evenness: z.number().min(0).max(100),
    age: z.number().min(1).max(120)
  }),
  beautyScore: z.number().min(0).max(100),
  skinHealthScore: z.number().min(0).max(100),
  status: z.enum(['processing', 'completed', 'failed'])
});

// Product validation schemas
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(200),
  brand: z.string().min(1).max(100),
  category: z.enum([
    'foundation', 'concealer', 'primer', 'powder', 'blush', 'bronzer',
    'highlighter', 'eyeshadow', 'eyeliner', 'mascara', 'eyebrow',
    'lipstick', 'lip_gloss', 'lip_liner', 'setting_spray', 'tools', 'skincare'
  ]),
  description: z.string().max(1000),
  shades: z.array(z.object({
    id: z.string(),
    name: z.string(),
    hex: z.string().regex(/^#([A-Fa-f0-9]{6})$/),
    undertone: z.enum(['warm', 'cool', 'neutral']),
    depth: z.number().min(1).max(10),
    available: z.boolean()
  })),
  pricing: z.array(z.object({
    retailer: z.string(),
    price: z.number().min(0),
    currency: z.string().length(3),
    onSale: z.boolean(),
    originalPrice: z.number().min(0).optional(),
    url: z.string().url(),
    availability: z.enum(['in-stock', 'out-of-stock', 'limited'])
  })),
  ratings: z.object({
    average: z.number().min(1).max(5),
    count: z.number().min(0)
  })
});

// Social validation schemas
export const SocialPostSchema = z.object({
  type: z.enum(['before_after', 'tutorial', 'product_review', 'makeup_look', 'question', 'tip']),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  imageUrls: z.array(z.string().url()).max(10),
  videoUrl: z.string().url().optional(),
  tags: z.array(z.string()).max(30),
  visibility: z.enum(['public', 'followers', 'private'])
});

// API request validation schemas
export const AnalyzeImageRequestSchema = z.object({
  imageUrl: z.string().url(),
  analysisType: z.enum(['face', 'skin', 'color', 'full']),
  options: z.object({
    highAccuracy: z.boolean().optional(),
    includeRecommendations: z.boolean().optional(),
    includeColorAnalysis: z.boolean().optional()
  }).optional()
});

export const SearchProductsRequestSchema = z.object({
  query: z.string().optional(),
  category: z.array(z.string()).optional(),
  brand: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  }).optional(),
  skinType: z.array(z.string()).optional(),
  skinTone: z.array(z.string()).optional(),
  pagination: z.object({
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional()
  })
});

// Payment validation schemas
export const PaymentMethodSchema = z.object({
  type: z.enum(['credit_card', 'paypal', 'apple_pay', 'google_pay', 'bank_transfer']),
  billingAddress: z.object({
    name: z.string().min(1),
    addressLine1: z.string().min(1),
    addressLine2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().optional(),
    postalCode: z.string().min(1),
    country: z.string().length(2)
  })
});

export const SubscriptionSchema = z.object({
  tier: z.enum(['free', 'premium', 'pro', 'enterprise']),
  billingCycle: z.enum(['monthly', 'yearly']),
  paymentMethodId: z.string()
});

// File upload validation
export const FileUploadSchema = z.object({
  type: z.enum(['image', 'video', 'document']),
  category: z.enum(['profile', 'analysis', 'post', 'tutorial']),
  metadata: z.record(z.any()).optional()
});

// Notification validation
export const NotificationPreferencesSchema = z.object({
  channels: z.object({
    push: z.object({
      enabled: z.boolean(),
      quietHours: z.object({
        enabled: z.boolean(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        timezone: z.string()
      })
    }),
    email: z.object({
      enabled: z.boolean(),
      frequency: z.enum(['immediate', 'daily', 'weekly'])
    }),
    inApp: z.object({
      enabled: z.boolean(),
      showBadges: z.boolean(),
      soundEnabled: z.boolean()
    })
  }),
  globalSettings: z.object({
    enabled: z.boolean(),
    marketing: z.boolean(),
    transactional: z.boolean(),
    social: z.boolean(),
    beauty: z.boolean(),
    security: z.boolean()
  })
});

// Export types inferred from schemas
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type BeautyAnalysis = z.infer<typeof BeautyAnalysisSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type SocialPost = z.infer<typeof SocialPostSchema>;
export type AnalyzeImageRequest = z.infer<typeof AnalyzeImageRequestSchema>;
export type SearchProductsRequest = z.infer<typeof SearchProductsRequestSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;