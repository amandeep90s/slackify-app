import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ForgotPasswordStep, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { ResetPasswordFormData, resetPasswordSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Error } from '@/components/core/error';
import { InputError } from '@/components/core/input-error';

interface ResetPasswordCardProps {
  setSignInFlow: (data: SignInFlow) => void;
  forgotPasswordData: ForgotPasswordStep;
}

const ResetPasswordCardComponent = ({
  setSignInFlow,
  forgotPasswordData,
}: ResetPasswordCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { signIn } = useAuthActions();
  const router = useRouter();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = form;

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);

    try {
      await signIn('password', {
        code: data.code,
        newPassword: data.newPassword,
        email: forgotPasswordData.email,
        flow: 'reset-verification',
      });

      toast('Password reset successfully! You are now signed in.');
      reset();
      router.push('/');
    } catch (err) {
      setError('Invalid verification code or password reset failed. Please try again.');
      console.error('Reset password error:', err);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError(null);

    try {
      // Resend the password reset code
      await signIn('password', {
        email: forgotPasswordData.email,
        flow: 'reset',
      });

      toast('Password reset code sent to your email!');
    } catch (err) {
      setError('Failed to resend password reset code. Please try again.');
      console.error('Resend code error:', err);
    } finally {
      setIsResending(false);
    }
  };

  const handleCancel = () => {
    setSignInFlow('forgotPassword');
    setError(null);
  };

  const codeValue = watch('code');

  return (
    <Card className={cn('h-full w-full p-8')}>
      <CardHeader className={cn('p-0')}>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Enter the verification code sent to <strong>{forgotPasswordData.email}</strong> and your
          new password
        </CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-5 px-0 pb-0')}>
        {error && <Error error={error} />}

        <div className={cn('rounded-lg border border-blue-200 bg-blue-50 p-4')}>
          <p className={cn('text-sm text-blue-700')}>
            🔐 Enter the 6-digit verification code from your email and choose a new secure password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
          {/* Verification Code Input */}
          <div className={cn('space-y-3')}>
            <Label className={cn('block text-center')}>Verification Code</Label>
            <div className={cn('flex justify-center')}>
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
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
            <InputError error={errors.code?.message} className="text-center" />
            <p className={cn('text-muted-foreground text-center text-sm')}>
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* New Password Input */}
          <div>
            <Label className={cn('mb-2')} htmlFor="newPassword">
              New Password
            </Label>
            <Input
              type="password"
              {...register('newPassword')}
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              autoComplete="new-password"
              disabled={isSubmitting}
              className={cn(
                errors.newPassword && 'border-destructive focus-visible:ring-destructive/20'
              )}
            />
            <InputError error={errors.newPassword?.message} />
          </div>

          {/* Confirm Password Input */}
          <div>
            <Label className={cn('mb-2')} htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              type="password"
              {...register('confirmPassword')}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your new password"
              autoComplete="new-password"
              disabled={isSubmitting}
              className={cn(
                errors.confirmPassword && 'border-destructive focus-visible:ring-destructive/20'
              )}
            />
            <InputError error={errors.confirmPassword?.message} />
          </div>

          <Button
            type="submit"
            className={cn('w-full')}
            size={'lg'}
            disabled={
              isSubmitting ||
              codeValue.length < 6 ||
              !watch('newPassword') ||
              !watch('confirmPassword')
            }
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
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
            Back to Email Entry
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

export const ResetPasswordCard = React.memo(ResetPasswordCardComponent);
