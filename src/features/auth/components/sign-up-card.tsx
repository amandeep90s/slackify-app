import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'convex/react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

import { EmailVerificationStep, OnProvider, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { SignUpFormData, signUpSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Error } from '@/components/core/error';
import { InputError } from '@/components/core/input-error';

import { api } from '../../../../convex/_generated/api';

interface SignUpCardProps {
  setSignInFlow: (data: SignInFlow) => void;
  onProviderSignIn: (provider: OnProvider) => void;
  setVerificationData: (data: EmailVerificationStep) => void;
}

const SignUpCardComponent = ({
  setSignInFlow,
  onProviderSignIn,
  setVerificationData,
}: SignUpCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();
  const checkUserExists = useAction(api.authActions.checkUserExistsAction);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError(null);
    const { name, email, password } = data;

    try {
      // First, check if user already exists
      const userExists = await checkUserExists({ email });

      if (userExists) {
        setError('Email already exists. Please choose another one.');
        return;
      }

      await signIn('password', { name, email, password, flow: 'signUp' });

      // Store verification data for the next step
      setVerificationData({ email, name, password });

      // Move to email verification step
      setSignInFlow('emailVerification');

      toast('Verification code sent to your email!');
      reset();
    } catch (err) {
      setError('Failed to send verification email. Please try again.');
      console.error('Sign up error:', err);
    }
  };

  const handleBackToSignIn = () => {
    setSignInFlow('signIn');
    setError(null);
  };

  return (
    <Card className={cn('h-full w-full p-8')}>
      <CardHeader className={cn('p-0')}>
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-5 px-0 pb-0')}>
        {error && <Error error={error} />}

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          <div>
            <Label className={cn('mb-2')} htmlFor="name">
              Full Name
            </Label>
            <Input
              type="text"
              {...register('name')}
              name="name"
              id="name"
              autoComplete="name"
              disabled={isSubmitting}
              className={cn(errors.name && 'border-destructive focus-visible:ring-destructive/20')}
            />
            <InputError error={errors.name?.message} />
          </div>
          <div>
            <Label className={cn('mb-2')} htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              {...register('email')}
              name="email"
              id="email"
              autoComplete="email"
              disabled={isSubmitting}
              className={cn(errors.email && 'border-destructive focus-visible:ring-destructive/20')}
            />
            <InputError error={errors.email?.message} />
          </div>
          <div>
            <Label className={cn('mb-2')} htmlFor="password">
              Password
            </Label>
            <Input
              type="password"
              {...register('password')}
              name="password"
              id="password"
              autoComplete="new-password"
              disabled={isSubmitting}
              className={cn(
                errors.password && 'border-destructive focus-visible:ring-destructive/20'
              )}
            />
            <InputError error={errors.password?.message} />
          </div>
          <div>
            <Label className={cn('mb-2')} htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              type="password"
              {...register('confirmPassword')}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              disabled={isSubmitting}
              className={cn(
                errors.confirmPassword && 'border-destructive focus-visible:ring-destructive/20'
              )}
            />
            <InputError error={errors.confirmPassword?.message} />
          </div>
          <Button type="submit" className={cn('w-full')} size={'lg'} disabled={isSubmitting}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className={cn('flex flex-col gap-y-3')}>
          <Button
            type="button"
            variant={'outline'}
            onClick={() => onProviderSignIn('google')}
            className={cn('w-full')}
          >
            <FcGoogle className={cn('size-5')} />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant={'outline'}
            onClick={() => onProviderSignIn('github')}
            className={cn('w-full')}
          >
            <FaGithub className={cn('size-5')} />
            Continue with Github
          </Button>
        </div>
        <div className={cn('text-center')}>
          <p className={cn('text-muted-foreground text-xs')}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleBackToSignIn}
              className={cn('cursor-pointer text-sky-700 hover:underline')}
            >
              Sign In
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const SignUpCard = React.memo(SignUpCardComponent);
