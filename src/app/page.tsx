'use client';

import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';

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
      <Button type="button" onClick={handleSignOut}>
        Signout
      </Button>
    </div>
  );
}
