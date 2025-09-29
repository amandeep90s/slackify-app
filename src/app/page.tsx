'use client';

import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';

import { UserButton } from '@/features/auth/components/user-button';

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/auth');
  };

  return (
    <div>
      Logged In
      <UserButton />
    </div>
  );
}
