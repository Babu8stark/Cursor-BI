import { Timestamp } from './user';

export interface SocialPost {
  id: string;
  userId: string;
  type: 'before_after' | 'tutorial' | 'product_review' | 'makeup_look' | 'question' | 'tip';
  
  // Content
  title: string;
  description: string;
  imageUrls: string[];
  videoUrl?: string;
  
  // Beauty Context
  beautyData?: {
    analysisId?: string;
    makeupLookId?: string;
    productsUsed: Array<{
      productId: string;
      shadeId?: string;
      rating?: number;
    }>;
    techniques: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    timeSpent: number; // minutes
  };
  
  // Engagement
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    views: number;
  };
  
  // Visibility
  visibility: 'public' | 'followers' | 'private';
  featured: boolean;
  moderated: boolean;
  
  // Tags & Discovery
  tags: string[];
  mentions: string[]; // user IDs
  challenges: string[]; // challenge IDs
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  parentCommentId?: string; // for replies
  
  content: string;
  imageUrls?: string[];
  
  // Engagement
  likes: number;
  replies: number;
  reported: boolean;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Timestamp;
  notificationsEnabled: boolean;
}

export interface BeautyChallenge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  
  // Challenge Details
  category: 'makeup_look' | 'skincare_routine' | 'product_test' | 'technique' | 'transformation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // days
  
  // Requirements
  requirements: {
    productsRequired?: string[]; // product categories
    techniques?: string[];
    timeCommitment: number; // minutes per day
  };
  
  // Prizes & Incentives
  prizes?: Array<{
    rank: number;
    description: string;
    value?: number;
    sponsorId?: string;
  }>;
  
  // Participation
  participantCount: number;
  maxParticipants?: number;
  
  // Timeline
  startDate: Timestamp;
  endDate: Timestamp;
  submissionDeadline: Timestamp;
  
  // Organization
  organizer: {
    type: 'platform' | 'brand' | 'influencer' | 'community';
    id: string;
    name: string;
  };
  
  // Status
  status: 'upcoming' | 'active' | 'judging' | 'completed' | 'cancelled';
  featured: boolean;
  
  // Rules & Guidelines
  rules: string[];
  guidelines: string[];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ChallengeParticipation {
  id: string;
  challengeId: string;
  userId: string;
  
  // Submission
  submissionPostId?: string;
  progress: Array<{
    day: number;
    completed: boolean;
    postId?: string;
    notes?: string;
    timestamp: Timestamp;
  }>;
  
  // Status
  status: 'joined' | 'in_progress' | 'completed' | 'withdrawn';
  completionPercentage: number;
  
  // Results
  ranking?: number;
  score?: number;
  feedback?: string;
  
  joinedAt: Timestamp;
  completedAt?: Timestamp;
}

export interface SocialGroup {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  
  // Group Type
  type: 'public' | 'private' | 'invite_only';
  category: 'general' | 'skincare' | 'makeup' | 'product_reviews' | 'tutorials' | 'challenges';
  
  // Membership
  memberCount: number;
  maxMembers?: number;
  adminIds: string[];
  moderatorIds: string[];
  
  // Activity
  postCount: number;
  weeklyActivity: number;
  
  // Rules & Guidelines
  rules: string[];
  guidelines: string[];
  
  // Settings
  settings: {
    requireApproval: boolean;
    allowPostsByMembers: boolean;
    allowImagePosts: boolean;
    allowVideoPosts: boolean;
  };
  
  createdAt: Timestamp;
  createdBy: string;
}

export interface GroupMembership {
  id: string;
  groupId: string;
  userId: string;
  role: 'member' | 'moderator' | 'admin';
  
  status: 'pending' | 'approved' | 'banned';
  
  // Activity
  postsCount: number;
  commentsCount: number;
  lastActive: Timestamp;
  
  joinedAt: Timestamp;
  approvedAt?: Timestamp;
  approvedBy?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'challenge' | 'product' | 'system';
  
  // Content
  title: string;
  message: string;
  imageUrl?: string;
  
  // Action Data
  actionData?: {
    postId?: string;
    commentId?: string;
    challengeId?: string;
    productId?: string;
    fromUserId?: string;
    groupId?: string;
  };
  
  // Status
  read: boolean;
  delivered: boolean;
  
  // Delivery
  channels: ('push' | 'email' | 'in_app')[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  createdAt: Timestamp;
  readAt?: Timestamp;
  expiresAt?: Timestamp;
}