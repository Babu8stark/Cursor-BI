import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SignInPage } from '@/components/auth/signin-page';
import { getServerSession } from '@/lib/auth/server-session';

export const metadata: Metadata = {
  title: 'Sign In - Beauty AI',
  description: 'Sign in to your Beauty AI account to access personalized beauty analysis and recommendations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignIn() {
  const session = await getServerSession();
  
  if (session) {
    redirect('/dashboard');
  }

  return <SignInPage />;
}