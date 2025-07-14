import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductsPage } from '@/components/pages/products-page';
import { ProductsSkeleton } from '@/components/skeletons/products-skeleton';

export const metadata: Metadata = {
  title: 'Beauty Products - Discover Your Perfect Match',
  description: 'Explore thousands of beauty products with AI-powered recommendations. Find makeup and skincare products that match your unique skin tone and preferences.',
  keywords: ['beauty products', 'makeup', 'skincare', 'product recommendations', 'beauty shopping'],
  openGraph: {
    title: 'Beauty Products - Discover Your Perfect Match',
    description: 'Explore thousands of beauty products with AI-powered recommendations.',
    images: ['/og-products.jpg'],
  },
};

export default function Products() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsPage />
    </Suspense>
  );
}