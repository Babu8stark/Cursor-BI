/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  
  // Performance optimizations
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=self, microphone=self, geolocation=self',
          },
        ],
      },
    ];
  },
  
  // PWA configuration
  async generateBuildId() {
    return 'beauty-ai-build-' + Date.now();
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  },
  
  // Webpack customization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add support for WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    
    // Add custom loaders for beauty analysis workers
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    });
    
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          beauty: {
            test: /[\\/]beauty[\\/]/,
            name: 'beauty',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Enable strict mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Transpile packages
  transpilePackages: ['@beauty-ai/shared'],
  
  // Output configuration
  output: 'standalone',
  
  // Enable experimental features
  experimental: {
    serverComponentsExternalPackages: ['@beauty-ai/shared'],
    optimizeCss: true,
    optimizeServerReact: true,
  },
};

// Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);