import { Timestamp } from './user';

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';
export type SubscriptionTier = 'free' | 'premium' | 'pro' | 'enterprise';

export interface PaymentMethodInfo {
  id: string;
  userId: string;
  type: PaymentMethod;
  
  // Card Info (encrypted/tokenized)
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  
  // Billing Address
  billingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  
  // Status
  isDefault: boolean;
  isValid: boolean;
  
  // Provider Info
  providerToken: string; // Stripe/PayPal token
  fingerprint?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  
  // Billing
  billingCycle: 'monthly' | 'yearly';
  price: {
    amount: number;
    currency: Currency;
  };
  
  // Status
  status: 'active' | 'cancelled' | 'expired' | 'suspended' | 'trial';
  
  // Timeline
  startDate: Timestamp;
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: Timestamp;
  
  // Trial
  trialStart?: Timestamp;
  trialEnd?: Timestamp;
  
  // Payment
  paymentMethodId: string;
  providerSubscriptionId: string; // Stripe subscription ID
  
  // Features
  features: {
    unlimitedAnalyses: boolean;
    premiumTutorials: boolean;
    advancedAI: boolean;
    virtualTryon: boolean;
    expertConsultations: boolean;
    prioritySupport: boolean;
    customRecommendations: boolean;
    socialFeatures: boolean;
  };
  
  // Usage
  usage: {
    analysesUsed: number;
    analysesLimit?: number;
    tutorialsWatched: number;
    consultationsUsed: number;
    consultationsLimit?: number;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId?: string;
  
  // Transaction Details
  type: 'subscription' | 'one_time' | 'refund' | 'credit';
  description: string;
  
  // Amount
  amount: {
    gross: number;
    net: number;
    tax: number;
    currency: Currency;
  };
  
  // Payment Info
  paymentMethodId: string;
  paymentProvider: 'stripe' | 'paypal' | 'apple' | 'google';
  providerTransactionId: string;
  
  // Status
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'disputed';
  
  // Timing
  processedAt?: Timestamp;
  settledAt?: Timestamp;
  
  // Failure Info
  failureReason?: string;
  failureCode?: string;
  
  // Metadata
  metadata: Record<string, any>;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Invoice {
  id: string;
  userId: string;
  subscriptionId?: string;
  
  // Invoice Details
  invoiceNumber: string;
  description: string;
  
  // Line Items
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  
  // Amounts
  subtotal: number;
  tax: number;
  total: number;
  currency: Currency;
  
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  
  // Timeline
  issueDate: Timestamp;
  dueDate: Timestamp;
  paidAt?: Timestamp;
  
  // Payment
  transactionId?: string;
  
  // PDF
  pdfUrl?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PricingPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  description: string;
  
  // Pricing
  monthlyPrice: {
    amount: number;
    currency: Currency;
  };
  yearlyPrice: {
    amount: number;
    currency: Currency;
  };
  
  // Features
  features: Array<{
    name: string;
    description: string;
    included: boolean;
    limit?: number;
  }>;
  
  // Limits
  limits: {
    analysesPerMonth?: number;
    tutorialAccess: 'basic' | 'premium' | 'all';
    consultationsPerMonth?: number;
    storageGB?: number;
  };
  
  // Display
  popular: boolean;
  recommended: boolean;
  badge?: string;
  
  // Availability
  available: boolean;
  regions: string[];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Refund {
  id: string;
  transactionId: string;
  userId: string;
  
  // Refund Details
  reason: string;
  amount: {
    requested: number;
    approved: number;
    currency: Currency;
  };
  
  // Status
  status: 'requested' | 'approved' | 'denied' | 'processed';
  
  // Processing
  requestedBy: string; // user ID or 'system' or 'admin'
  approvedBy?: string;
  processedBy?: string;
  
  // Provider Info
  providerRefundId?: string;
  
  // Timeline
  requestedAt: Timestamp;
  approvedAt?: Timestamp;
  processedAt?: Timestamp;
  
  // Communication
  userMessage?: string;
  adminNotes?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}