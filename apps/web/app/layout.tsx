import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Beauty AI - Revolutionary AI-Powered Beauty Platform',
    template: '%s | Beauty AI',
  },
  description: 'Transform your beauty routine with AI-powered analysis, personalized recommendations, and virtual try-on experiences. Discover your perfect makeup look with advanced facial recognition technology.',
  keywords: [
    'beauty AI',
    'makeup analysis',
    'virtual try-on',
    'skin analysis',
    'beauty recommendations',
    'facial recognition',
    'makeup tutorial',
    'beauty app',
    'cosmetics',
    'skincare',
  ],
  authors: [{ name: 'Beauty AI Team' }],
  creator: 'Beauty AI Platform',
  publisher: 'Beauty AI Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://beautyai.app',
    siteName: 'Beauty AI',
    title: 'Beauty AI - Revolutionary AI-Powered Beauty Platform',
    description: 'Transform your beauty routine with AI-powered analysis, personalized recommendations, and virtual try-on experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beauty AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty AI - Revolutionary AI-Powered Beauty Platform',
    description: 'Transform your beauty routine with AI-powered analysis, personalized recommendations, and virtual try-on experiences.',
    images: ['/twitter-image.jpg'],
    creator: '@beautyai',
    site: '@beautyai',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://beautyai.app',
    languages: {
      'en-US': 'https://beautyai.app',
      'es-ES': 'https://beautyai.app/es',
      'fr-FR': 'https://beautyai.app/fr',
    },
  },
  category: 'beauty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ea7c47" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Beauty AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://firebase.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Structured data for beauty app */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Beauty AI',
              description: 'AI-powered beauty analysis and recommendation platform',
              url: 'https://beautyai.app',
              applicationCategory: 'BeautyApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Organization',
                name: 'Beauty AI Inc.',
              },
              featureList: [
                'AI Beauty Analysis',
                'Virtual Try-On',
                'Personalized Recommendations',
                'Skin Type Detection',
                'Color Matching',
                'Tutorial Learning',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}