import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { EmailVerificationStep, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { EmailVerificationFormData, emailVerificationSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
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

  const form = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      code: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

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
            Check your email for a verification code and enter it below to complete your
            registration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          <div className={cn('space-y-3')}>
            <Label className={cn('block text-center')}>Enter Verification Code</Label>
            <div className={cn('flex justify-center')}>
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      // Auto-submit when all 6 digits are entered
                      if (value.length === 6) {
                        handleSubmit(onSubmit)();
                      }
                    }}
                    disabled={isSubmitting}
                    className={cn('gap-2', errors.code && 'border-destructive')}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                      <InputOTPSlot
                        index={1}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                      <InputOTPSlot
                        index={2}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                      <InputOTPSlot
                        index={3}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                      {/* </InputOTPGroup>
                    <div className={cn('mx-2 flex items-center')}>
                      <div className={cn('bg-border h-px w-2')}></div>
                    </div>
                    <InputOTPGroup className={cn('gap-2')}> */}
                      <InputOTPSlot
                        index={4}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                      <InputOTPSlot
                        index={5}
                        className={cn(
                          'h-12 w-12 text-lg font-semibold',
                          errors.code && 'border-destructive'
                        )}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
            {errors.code && (
              <p className="text-destructive mt-1 text-center text-xs" role="alert">
                {errors.code.message}
              </p>
            )}
            <p className={cn('text-muted-foreground text-center text-sm')}>
              Please enter the 6-digit code sent to your email
            </p>
          </div>

          <Button
            type="submit"
            className={cn('w-full')}
            size={'lg'}
            disabled={isSubmitting || form.watch('code').length < 6}
          >
            {isSubmitting
              ? 'Verifying...'
              : form.watch('code').length === 6
                ? 'Verifying...'
                : 'Enter Code Above'}
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
