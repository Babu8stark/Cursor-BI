# 🚀 **Beauty AI Platform - Deployment Guide**

This guide provides comprehensive instructions for deploying the Beauty AI Platform across development, staging, and production environments.

## **Prerequisites**

### **Required Tools**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Firebase CLI
npm install -g firebase-tools

# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init

# Install Expo CLI for mobile development
npm install -g @expo/cli
```

### **Account Setup**
1. **Google Cloud Platform**
   - Create a new project
   - Enable billing
   - Enable required APIs
   
2. **Firebase Console**
   - Create Firebase project
   - Link to Google Cloud project
   - Configure authentication providers

3. **Third-party Services**
   - Stripe account for payments
   - SendGrid for emails
   - Sentry for error tracking

## **Environment Setup**

### **1. Development Environment**

```bash
# Clone repository
git clone https://github.com/your-org/beauty-ai-platform.git
cd beauty-ai-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with development credentials

# Start development servers
npm run dev
```

### **2. Google Cloud Configuration**

```bash
# Login to Google Cloud
gcloud auth login

# Set project
gcloud config set project your-project-id

# Enable required APIs
gcloud services enable \
  cloudbuild.googleapis.com \
  cloudrun.googleapis.com \
  cloudfunctions.googleapis.com \
  firestore.googleapis.com \
  storage.googleapis.com \
  vision.googleapis.com \
  ml.googleapis.com \
  pubsub.googleapis.com

# Create service account
gcloud iam service-accounts create beauty-ai-service \
  --display-name="Beauty AI Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding your-project-id \
  --member="serviceAccount:beauty-ai-service@your-project-id.iam.gserviceaccount.com" \
  --role="roles/owner"

# Create and download service account key
gcloud iam service-accounts keys create \
  ./beauty-ai-service-account.json \
  --iam-account=beauty-ai-service@your-project-id.iam.gserviceaccount.com
```

### **3. Firebase Configuration**

```bash
# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Select features:
# - Firestore
# - Functions
# - Hosting
# - Storage
# - Remote Config
# - Extensions

# Deploy Firebase configuration
firebase deploy --only firestore:rules,storage:rules
```

## **Database Setup**

### **Firestore Initialization**

```javascript
// Initialize collections with sample data
// Run this script once after setting up Firestore

const admin = require('firebase-admin');
const serviceAccount = require('./beauty-ai-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'your-project-id'
});

const db = admin.firestore();

async function initializeDatabase() {
  // Create initial product categories
  const categories = [
    'foundation', 'concealer', 'primer', 'powder',
    'blush', 'bronzer', 'highlighter', 'eyeshadow',
    'eyeliner', 'mascara', 'lipstick', 'skincare'
  ];
  
  for (const category of categories) {
    await db.collection('productCategories').doc(category).set({
      name: category,
      displayName: category.charAt(0).toUpperCase() + category.slice(1),
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
  
  // Create default beauty challenges
  await db.collection('challenges').doc('natural-glow').set({
    title: 'Natural Glow Challenge',
    description: 'Create a natural, everyday makeup look',
    category: 'makeup_look',
    difficulty: 'beginner',
    duration: 7,
    active: true,
    featured: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  console.log('Database initialized successfully!');
}

initializeDatabase().catch(console.error);
```

## **Cloud Functions Deployment**

### **Functions Structure**
```bash
functions/
├── src/
│   ├── index.ts          # Main exports
│   ├── api/              # HTTP functions
│   ├── triggers/         # Database triggers
│   └── scheduled/        # Cron jobs
├── package.json
└── tsconfig.json
```

### **Deploy Functions**
```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:analyzeBeautyImage

# Deploy with environment variables
firebase functions:config:set \
  openai.key="your-openai-key" \
  stripe.secret="your-stripe-secret"

firebase deploy --only functions
```

### **Sample Cloud Function**
```typescript
// functions/src/api/analysis.ts
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

export const analyzeBeautyImage = onCall(
  { 
    cors: true,
    timeoutSeconds: 300,
    memory: '2GiB',
    region: 'us-central1'
  },
  async (request) => {
    try {
      const { imageUrl, userId } = request.data;
      
      if (!request.auth) {
        throw new HttpsError('unauthenticated', 'User must be authenticated');
      }
      
      // Implement beauty analysis logic
      const analysis = await performBeautyAnalysis(imageUrl);
      
      // Save to Firestore
      const db = getFirestore();
      await db.collection('analyses').add({
        userId,
        ...analysis,
        createdAt: new Date()
      });
      
      return { success: true, analysis };
      
    } catch (error) {
      console.error('Analysis error:', error);
      throw new HttpsError('internal', 'Analysis failed');
    }
  }
);
```

## **Web Application Deployment**

### **Next.js Build Configuration**
```javascript
// next.config.js for production
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  experimental: {
    serverComponentsExternalPackages: ['@beauty-ai/shared']
  }
};

module.exports = nextConfig;
```

### **Firebase Hosting Deployment**
```bash
# Build the application
cd apps/web
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy to specific site
firebase deploy --only hosting:beauty-ai-web
```

### **Cloud Run Deployment (Alternative)**
```dockerfile
# Dockerfile for Next.js
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```bash
# Build and deploy to Cloud Run
docker build -t gcr.io/your-project-id/beauty-ai-web .
docker push gcr.io/your-project-id/beauty-ai-web

gcloud run deploy beauty-ai-web \
  --image gcr.io/your-project-id/beauty-ai-web \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2
```

## **Mobile Application Deployment**

### **React Native + Expo Setup**
```bash
# Navigate to mobile app
cd apps/mobile

# Install dependencies
npm install

# Configure app.json
{
  "expo": {
    "name": "Beauty AI",
    "slug": "beauty-ai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ea7c47"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.beautyai.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.beautyai.app"
    }
  }
}
```

### **iOS Deployment**
```bash
# Build for iOS
expo build:ios

# Or with EAS Build (recommended)
npx eas-cli build --platform ios

# Submit to App Store
npx eas-cli submit --platform ios
```

### **Android Deployment**
```bash
# Build for Android
expo build:android

# Or with EAS Build
npx eas-cli build --platform android

# Submit to Google Play
npx eas-cli submit --platform android
```

## **CI/CD Pipeline Setup**

### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy Beauty AI Platform

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Run E2E tests
        run: npm run test:e2e

  build-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build web application
        run: npm run build:web
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}

  deploy-functions:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Firebase CLI
        run: npm install -g firebase-tools
      
      - name: Deploy Functions
        run: firebase deploy --only functions
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

  build-mobile:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Expo
        uses: expo/expo-github-action@v7
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build mobile app
        run: |
          cd apps/mobile
          expo build:ios --non-interactive
          expo build:android --non-interactive
```

## **Production Deployment Checklist**

### **Pre-deployment**
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Security rules deployed
- [ ] SSL certificates configured
- [ ] Monitoring alerts set up
- [ ] Backup procedures verified

### **Deployment Steps**
1. **Deploy Infrastructure**
   ```bash
   # Deploy Firestore rules and indexes
   firebase deploy --only firestore
   
   # Deploy storage rules
   firebase deploy --only storage
   ```

2. **Deploy Backend Services**
   ```bash
   # Deploy Cloud Functions
   firebase deploy --only functions
   
   # Deploy Cloud Run services
   gcloud run deploy beauty-analysis-service \
     --source . \
     --region us-central1
   ```

3. **Deploy Frontend Applications**
   ```bash
   # Deploy web application
   firebase deploy --only hosting
   
   # Deploy mobile apps
   eas build --platform all
   eas submit --platform all
   ```

### **Post-deployment**
- [ ] Health checks passing
- [ ] Monitoring dashboards active
- [ ] Error rates within thresholds
- [ ] Performance metrics good
- [ ] User acceptance testing
- [ ] Load testing completed

## **Monitoring & Maintenance**

### **Setup Monitoring**
```bash
# Configure alerting policies
gcloud alpha monitoring policies create \
  --policy-from-file=monitoring/error-rate-policy.yaml

# Set up uptime checks
gcloud compute url-maps create beauty-ai-lb \
  --default-service=beauty-ai-web
```

### **Backup Configuration**
```bash
# Export Firestore data
gcloud firestore export gs://your-backup-bucket/firestore-backup

# Backup Cloud Storage
gsutil -m cp -r gs://your-storage-bucket gs://your-backup-bucket/storage-backup
```

### **Performance Optimization**
```bash
# Enable Cloud CDN
gcloud compute backend-services update beauty-ai-backend \
  --enable-cdn \
  --cache-mode=CACHE_ALL_STATIC

# Configure auto-scaling
gcloud run services update beauty-ai-web \
  --max-instances=100 \
  --min-instances=1
```

## **Troubleshooting**

### **Common Issues**

1. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Firebase Deploy Issues**
   ```bash
   # Check Firebase CLI version
   firebase --version
   
   # Update to latest
   npm install -g firebase-tools@latest
   
   # Re-login if needed
   firebase logout
   firebase login
   ```

3. **Cloud Function Timeout**
   ```javascript
   // Increase timeout in function configuration
   export const longRunningFunction = onCall({
     timeoutSeconds: 540, // 9 minutes max
     memory: '2GiB'
   }, async (request) => {
     // Function implementation
   });
   ```

### **Rollback Procedures**
```bash
# Rollback Firebase hosting
firebase hosting:clone source-site:source-version target-site

# Rollback Cloud Functions
gcloud functions deploy function-name \
  --source=gs://bucket/previous-version.zip

# Rollback Cloud Run
gcloud run services update service-name \
  --image=gcr.io/project/image:previous-tag
```

## **Security Hardening**

### **Production Security Checklist**
- [ ] API keys rotated and secured
- [ ] IAM permissions minimized
- [ ] HTTPS enforced everywhere
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Vulnerability scanning enabled
- [ ] Audit logging enabled

### **Security Monitoring**
```bash
# Enable Security Command Center
gcloud services enable securitycenter.googleapis.com

# Set up vulnerability scanning
gcloud container images scan IMAGE_URL
```

This deployment guide ensures a robust, secure, and scalable deployment of the Beauty AI Platform across all environments.