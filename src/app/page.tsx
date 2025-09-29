'use client';

import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      Logged In
      <Button type="button" onClick={signOut}>
        Signout
      </Button>
    </div>
  );
}
