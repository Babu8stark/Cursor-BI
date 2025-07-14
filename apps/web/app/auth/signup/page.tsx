import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SignUpPage } from '@/components/auth/signup-page';
import { getServerSession } from '@/lib/auth/server-session';

export const metadata: Metadata = {
  title: 'Sign Up - Beauty AI',
  description: 'Create your Beauty AI account and start your personalized beauty journey today.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignUp() {
  const session = await getServerSession();
  
  if (session) {
    redirect('/dashboard');
  }

  return <SignUpPage />;
}