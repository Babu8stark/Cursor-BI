import { Metadata } from 'next';
import { Suspense } from 'react';
import { SocialPage } from '@/components/pages/social-page';
import { SocialSkeleton } from '@/components/skeletons/social-skeleton';

export const metadata: Metadata = {
  title: 'Beauty Community - Share & Discover',
  description: 'Join our vibrant beauty community. Share your looks, discover new trends, and connect with beauty enthusiasts worldwide.',
  keywords: ['beauty community', 'makeup sharing', 'beauty challenges', 'beauty inspiration', 'beauty social'],
  openGraph: {
    title: 'Beauty Community - Share & Discover',
    description: 'Join our vibrant beauty community. Share your looks, discover new trends, and connect with beauty enthusiasts worldwide.',
    images: ['/og-social.jpg'],
  },
};

export default function Social() {
  return (
    <Suspense fallback={<SocialSkeleton />}>
      <SocialPage />
    </Suspense>
  );
}