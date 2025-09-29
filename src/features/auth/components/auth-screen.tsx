'use client';

import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

import { OnProvider, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { SignInCard } from '@/features/auth/components/sign-in-card';
import { SignUpCard } from '@/features/auth/components/sign-up-card';

export const AuthScreen = () => {
  const [signInFlow, setSignInFlow] = useState<SignInFlow>('signIn');
  const { signIn } = useAuthActions();

  const onProviderSignIn = (provider: OnProvider) => {
    signIn(provider);
  };

  return (
    <div className={cn('flex min-h-screen items-center justify-center bg-[#3F0E40]')}>
      <div className={cn('w-full max-w-sm px-4 md:h-auto md:max-w-md md:px-0')}>
        {signInFlow === 'signIn' ? (
          <SignInCard setSignInFlow={setSignInFlow} onProviderSignIn={onProviderSignIn} />
        ) : (
          <SignUpCard setSignInFlow={setSignInFlow} onProviderSignIn={onProviderSignIn} />
        )}
      </div>
    </div>
  );
};
