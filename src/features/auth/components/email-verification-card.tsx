import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { EmailVerificationStep, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { EmailVerificationFormData, emailVerificationSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Error } from '@/components/core/error';

interface EmailVerificationCardProps {
  setSignInFlow: (data: SignInFlow) => void;
  verificationData: EmailVerificationStep;
}

export const EmailVerificationCard = ({
  setSignInFlow,
  verificationData,
}: EmailVerificationCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { signIn } = useAuthActions();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: EmailVerificationFormData) => {
    setError(null);

    try {
      await signIn('password', {
        code: data.code,
        flow: 'email-verification',
        email: verificationData.email,
        name: verificationData.name,
        password: verificationData.password,
      });

      toast('Email verified successfully! Welcome to Slackify!');
      reset();
      router.push('/');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      console.error('Email verification error:', err);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError(null);

    try {
      // Resend the verification code by calling signUp again
      await signIn('password', {
        name: verificationData.name,
        email: verificationData.email,
        password: verificationData.password,
        flow: 'signUp',
      });

      toast('Verification code sent to your email!');
    } catch (err) {
      setError('Failed to resend verification code. Please try again.');
      console.error('Resend code error:', err);
    } finally {
      setIsResending(false);
    }
  };

  const handleCancel = () => {
    setSignInFlow('signUp');
    setError(null);
  };

  return (
    <Card className={cn('h-full w-full p-8')}>
      <CardHeader className={cn('p-0')}>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification code to <strong>{verificationData.email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-5 px-0 pb-0')}>
        {error && <Error error={error} />}

        <div className={cn('rounded-lg border border-blue-200 bg-blue-50 p-4')}>
          <p className={cn('text-sm text-blue-700')}>
            📧 Check your email for a verification code and enter it below to complete your
            registration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          <div>
            <Label className={cn('mb-2')} htmlFor="code">
              Verification Code
            </Label>
            <Input
              type="text"
              {...register('code')}
              name="code"
              id="code"
              placeholder="Enter 8-digit code"
              autoComplete="one-time-code"
              disabled={isSubmitting}
              className={cn(errors.code && 'border-destructive focus-visible:ring-destructive/20')}
              maxLength={8}
              autoFocus
            />
            {errors.code && (
              <p className="text-destructive mt-1 text-xs" role="alert">
                {errors.code.message}
              </p>
            )}
          </div>

          <Button type="submit" className={cn('w-full')} size={'lg'} disabled={isSubmitting}>
            {isSubmitting ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className={cn('flex flex-col gap-y-3')}>
          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={isResending}
            className={cn('w-full')}
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </Button>

          <Button type="button" variant="ghost" onClick={handleCancel} className={cn('w-full')}>
            Back to Sign Up
          </Button>
        </div>

        <div className={cn('text-center')}>
          <p className={cn('text-muted-foreground text-xs')}>
            Didn&apos;t receive an email? Check your spam folder or{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className={cn('cursor-pointer text-sky-700 hover:underline')}
            >
              resend the code
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
