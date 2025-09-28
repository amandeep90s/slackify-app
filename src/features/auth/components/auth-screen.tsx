'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { SignInFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
  const [signInFlow, setSignInFlow] = useState<SignInFlow>('signIn');

  return (
    <div className={cn('flex min-h-screen items-center justify-center bg-[#5c3b58]')}>
      <div className={cn('w-full max-w-md px-4 md:h-auto md:max-w-lg md:px-0')}>
        {signInFlow === 'signIn' ? (
          <SignInCard setSignInFlow={setSignInFlow} />
        ) : (
          <SignUpCard setSignInFlow={setSignInFlow} />
        )}
      </div>
    </div>
  );
};
