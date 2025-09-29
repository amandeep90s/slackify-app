'use client';

import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';

import { EmailVerificationStep, ForgotPasswordStep, OnProvider, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/core/loading-spinner';

// Lazy load components for better initial bundle size and code splitting
const SignInCard = lazy(() =>
  import('@/features/auth/components/sign-in-card').then((m) => ({ default: m.SignInCard }))
);
const SignUpCard = lazy(() =>
  import('@/features/auth/components/sign-up-card').then((m) => ({ default: m.SignUpCard }))
);
const EmailVerificationCard = lazy(() =>
  import('@/features/auth/components/email-verification-card').then((m) => ({
    default: m.EmailVerificationCard,
  }))
);
const ForgotPasswordCard = lazy(() =>
  import('@/features/auth/components/forgot-password-card').then((m) => ({
    default: m.ForgotPasswordCard,
  }))
);
const ResetPasswordCard = lazy(() =>
  import('@/features/auth/components/reset-password-card').then((m) => ({
    default: m.ResetPasswordCard,
  }))
);

// Component mapping for better performance and maintainability
interface ComponentMapProps {
  setSignInFlow: (flow: SignInFlow) => void;
  onProviderSignIn: (provider: OnProvider) => void;
  setVerificationData: (data: EmailVerificationStep | null) => void;
  setForgotPasswordData: (data: ForgotPasswordStep | null) => void;
  verificationData: EmailVerificationStep | null;
  forgotPasswordData: ForgotPasswordStep | null;
}

const createComponentMap = (props: ComponentMapProps) => ({
  signIn: () => (
    <SignInCard setSignInFlow={props.setSignInFlow} onProviderSignIn={props.onProviderSignIn} />
  ),
  signUp: () => (
    <SignUpCard
      setSignInFlow={props.setSignInFlow}
      onProviderSignIn={props.onProviderSignIn}
      setVerificationData={props.setVerificationData}
    />
  ),
  emailVerification: () =>
    props.verificationData ? (
      <EmailVerificationCard
        setSignInFlow={props.setSignInFlow}
        verificationData={props.verificationData}
      />
    ) : null,
  forgotPassword: () => (
    <ForgotPasswordCard
      setSignInFlow={props.setSignInFlow}
      setForgotPasswordData={props.setForgotPasswordData}
    />
  ),
  resetPassword: () =>
    props.forgotPasswordData ? (
      <ResetPasswordCard
        setSignInFlow={props.setSignInFlow}
        forgotPasswordData={props.forgotPasswordData}
      />
    ) : null,
});

export const AuthScreen = () => {
  const [signInFlow, setSignInFlow] = useState<SignInFlow>('signIn');
  const [verificationData, setVerificationData] = useState<EmailVerificationStep | null>(null);
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordStep | null>(null);
  const { signIn } = useAuthActions();

  // Memoize the provider sign-in handler to prevent unnecessary re-renders
  const onProviderSignIn = useCallback(
    (provider: OnProvider) => {
      signIn(provider);
    },
    [signIn]
  );

  // Memoize component props to prevent unnecessary re-renders
  const componentProps = useMemo(
    () => ({
      setSignInFlow,
      onProviderSignIn,
      setVerificationData,
      setForgotPasswordData,
      verificationData,
      forgotPasswordData,
    }),
    [onProviderSignIn, verificationData, forgotPasswordData]
  );

  // Memoize component map to prevent recreation on every render
  const componentMap = useMemo(() => createComponentMap(componentProps), [componentProps]);

  // Get current component from map
  const CurrentComponent = componentMap[signInFlow];

  // Memoize header to prevent unnecessary re-renders
  const header = useMemo(
    () => (
      <div className={cn('mb-3 text-center')}>
        <h1
          className={cn(
            'text-2xl font-semibold uppercase md:text-4xl',
            'from-white-100 bg-gradient-to-r to-gray-200',
            'bg-clip-text text-transparent'
          )}
        >
          Slackify
        </h1>
      </div>
    ),
    []
  );

  return (
    <div className={cn('flex min-h-screen items-center justify-center bg-[#3F0E40]')}>
      <div className={cn('w-full max-w-sm px-4 md:h-auto md:max-w-md md:px-0')}>
        {header}
        <Suspense fallback={<LoadingSpinner />}>
          {CurrentComponent ? <CurrentComponent /> : null}
        </Suspense>
      </div>
    </div>
  );
};
