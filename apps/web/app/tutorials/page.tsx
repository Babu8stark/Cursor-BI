import { Metadata } from 'next';
import { Suspense } from 'react';
import { TutorialsPage } from '@/components/pages/tutorials-page';
import { TutorialsSkeleton } from '@/components/skeletons/tutorials-skeleton';

export const metadata: Metadata = {
  title: 'Beauty Tutorials - Learn & Master New Techniques',
  description: 'Master new beauty techniques with our comprehensive tutorial library. From beginner basics to advanced artistry, learn at your own pace.',
  keywords: ['beauty tutorials', 'makeup tutorials', 'skincare routine', 'beauty tips', 'makeup techniques'],
  openGraph: {
    title: 'Beauty Tutorials - Learn & Master New Techniques',
    description: 'Master new beauty techniques with our comprehensive tutorial library.',
    images: ['/og-tutorials.jpg'],
  },
};

export default function Tutorials() {
  return (
    <Suspense fallback={<TutorialsSkeleton />}>
      <TutorialsPage />
    </Suspense>
  );
}