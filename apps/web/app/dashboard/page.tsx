import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { DashboardPage } from '@/components/pages/dashboard-page';
import { getServerSession } from '@/lib/auth/server-session';

export const metadata: Metadata = {
  title: 'Dashboard - Your Beauty Journey',
  description: 'Track your beauty progress, view analysis history, and manage your personalized recommendations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Dashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/auth/signin');
  }

  return <DashboardPage />;
}