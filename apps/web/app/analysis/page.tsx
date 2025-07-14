import { Metadata } from 'next';
import { BeautyAnalysisPage } from '@/components/pages/beauty-analysis-page';

export const metadata: Metadata = {
  title: 'AI Beauty Analysis - Discover Your Perfect Look',
  description: 'Get personalized beauty recommendations with our advanced AI analysis. Analyze your skin type, face shape, and get custom makeup suggestions.',
  keywords: ['beauty analysis', 'AI skin analysis', 'face shape analysis', 'makeup recommendations'],
  openGraph: {
    title: 'AI Beauty Analysis - Discover Your Perfect Look',
    description: 'Get personalized beauty recommendations with our advanced AI analysis.',
    images: ['/og-analysis.jpg'],
  },
};

export default function AnalysisPage() {
  return <BeautyAnalysisPage />;
}