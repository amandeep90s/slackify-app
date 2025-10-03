import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ForgotPasswordStep, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Error } from '@/components/core/error';
import { InputError } from '@/components/core/input-error';

interface ForgotPasswordCardProps {
  setSignInFlow: (data: SignInFlow) => void;
  setForgotPasswordData: (data: ForgotPasswordStep) => void;
}

const ForgotPasswordCardComponent = ({
  setSignInFlow,
  setForgotPasswordData,
}: ForgotPasswordCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    try {
      await signIn('password', {
        email: data.email,
        flow: 'reset',
      });

      // Store email for the next step
      setForgotPasswordData({ email: data.email });

      // Move to reset password step
      setSignInFlow('resetPassword');

      toast('Password reset code sent to your email!');
      reset();
    } catch (err) {
      setError(
        'Failed to send password reset email. Please check your email address and try again.'
      );
      console.error('Forgot password error:', err);
    }
  };

  const handleBackToSignIn = () => {
    setSignInFlow('signIn');
    setError(null);
  };

  return (
    <Card className={cn('h-full w-full p-8')}>
      <CardHeader className={cn('p-0')}>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a verification code to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-5 px-0 pb-0')}>
        {error && <Error error={error} />}

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          <div>
            <Label className={cn('mb-2')} htmlFor="email">
              Email Address
            </Label>
            <Input
              type="email"
              {...register('email')}
              name="email"
              id="email"
              placeholder="Enter your email address"
              autoComplete="email"
              disabled={isSubmitting}
              className={cn(errors.email && 'border-destructive focus-visible:ring-destructive/20')}
              autoFocus
            />
            <InputError error={errors.email?.message} />
          </div>

          <Button type="submit" className={cn('w-full')} size={'lg'} disabled={isSubmitting}>
            {isSubmitting ? 'Sending Code...' : 'Send Reset Code'}
          </Button>
        </form>

        <div className={cn('text-center')}>
          <p className={cn('text-muted-foreground text-xs')}>
            Remember your password?{' '}
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

export const ForgotPasswordCard = React.memo(ForgotPasswordCardComponent);
