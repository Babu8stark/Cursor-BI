import { Timestamp } from './user';

export interface AIModel {
  id: string;
  name: string;
  version: string;
  type: 'face_detection' | 'skin_analysis' | 'color_matching' | 'recommendation' | 'virtual_tryon';
  
  // Model Metadata
  description: string;
  trainingData: {
    datasetSize: number;
    trainingDuration: number; // hours
    accuracy: number; // 0-100
    precision: number; // 0-100
    recall: number; // 0-100
    f1Score: number; // 0-100
  };
  
  // Deployment Info
  status: 'training' | 'testing' | 'deployed' | 'deprecated';
  deployedAt?: Timestamp;
  endpoint?: string;
  
  // Performance Requirements
  maxProcessingTime: number; // milliseconds
  maxMemoryUsage: number; // MB
  supportedPlatforms: string[];
  
  // Bias & Ethics
  biasMetrics: {
    skinToneFairness: number; // 0-100
    ageFairness: number; // 0-100
    genderFairness: number; // 0-100
    ethnicityFairness: number; // 0-100
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AIInference {
  id: string;
  modelId: string;
  userId: string;
  inputData: {
    imageUrl?: string;
    imageSize?: { width: number; height: number };
    additionalParams?: Record<string, any>;
  };
  
  // Processing Info
  startTime: Timestamp;
  endTime?: Timestamp;
  processingTime: number; // milliseconds
  status: 'queued' | 'processing' | 'completed' | 'failed';
  
  // Results
  output?: Record<string, any>;
  confidence: number; // 0-100
  error?: string;
  
  // Performance
  resourceUsage: {
    cpuTime: number; // milliseconds
    memoryPeak: number; // MB
    gpuTime?: number; // milliseconds
  };
  
  // Quality Metrics
  qualityScore?: number; // 0-100
  userFeedback?: {
    rating: number; // 1-5
    accurate: boolean;
    helpful: boolean;
    comments?: string;
  };
}

export interface MLTrainingJob {
  id: string;
  modelId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  
  // Training Configuration
  config: {
    datasetId: string;
    hyperparameters: Record<string, any>;
    epochs: number;
    batchSize: number;
    learningRate: number;
    validationSplit: number;
  };
  
  // Progress
  progress: {
    currentEpoch: number;
    totalEpochs: number;
    currentLoss: number;
    validationLoss: number;
    accuracy: number;
    estimatedTimeRemaining: number; // minutes
  };
  
  // Results
  finalMetrics?: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    loss: number;
  };
  
  // Resources
  computeResources: {
    instanceType: string;
    gpuCount: number;
    memoryGB: number;
    costPerHour: number;
  };
  
  startTime: Timestamp;
  endTime?: Timestamp;
  error?: string;
}

export interface BeautyDataset {
  id: string;
  name: string;
  description: string;
  type: 'training' | 'validation' | 'test';
  
  // Dataset Composition
  composition: {
    totalSamples: number;
    imageCount: number;
    annotationCount: number;
    diversityMetrics: {
      skinTones: Record<string, number>;
      ages: Record<string, number>;
      ethnicities: Record<string, number>;
      genders: Record<string, number>;
    };
  };
  
  // Quality Metrics
  quality: {
    averageImageQuality: number; // 0-100
    annotationAccuracy: number; // 0-100
    labelConsistency: number; // 0-100
    biasScore: number; // 0-100 (lower is better)
  };
  
  // Data Pipeline
  processingPipeline: Array<{
    step: string;
    parameters: Record<string, any>;
    order: number;
  }>;
  
  // Compliance
  privacyCompliant: boolean;
  consentObtained: boolean;
  dataRetentionPolicy: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface PersonalizationModel {
  userId: string;
  preferences: {
    skinCarePreferences: Record<string, number>;
    makeupPreferences: Record<string, number>;
    productPreferences: Record<string, number>;
    colorPreferences: string[];
    brandPreferences: string[];
  };
  
  // Behavioral Patterns
  behaviorProfile: {
    sessionPatterns: Record<string, number>;
    featureUsage: Record<string, number>;
    purchaseHistory: Array<{
      productId: string;
      satisfaction: number;
      timestamp: Timestamp;
    }>;
    searchHistory: string[];
  };
  
  // Recommendation Weights
  recommendationWeights: {
    collaborative: number; // weight for collaborative filtering
    contentBased: number; // weight for content-based filtering
    popularity: number; // weight for popularity-based recommendations
    novelty: number; // weight for novel/diverse recommendations
  };
  
  // Model Performance
  performance: {
    clickThroughRate: number;
    conversionRate: number;
    userSatisfaction: number;
    diversityScore: number;
    noveltyScore: number;
  };
  
  lastUpdated: Timestamp;
  nextUpdateScheduled: Timestamp;
}