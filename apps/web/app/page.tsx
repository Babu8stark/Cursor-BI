import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TrustedBySection } from '@/components/sections/trusted-by-section';
import { Loading } from '@/components/ui/loading';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>

      {/* Trusted By Section */}
      <Suspense fallback={<div className="h-32" />}>
        <TrustedBySection />
      </Suspense>

      {/* Stats Section */}
      <Suspense fallback={<div className="h-40" />}>
        <StatsSection />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={<div className="h-96" />}>
        <FeaturesSection />
      </Suspense>

      {/* How It Works Section */}
      <Suspense fallback={<div className="h-96" />}>
        <HowItWorksSection />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<div className="h-96" />}>
        <TestimonialsSection />
      </Suspense>

      {/* Call to Action Section */}
      <Suspense fallback={<div className="h-64" />}>
        <CTASection />
      </Suspense>
    </div>
  );
}