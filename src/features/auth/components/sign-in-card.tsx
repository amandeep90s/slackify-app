import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

import { OnProvider, SignInFlow } from '@/types/auth';
import { cn } from '@/lib/utils';
import { SignInFormData, signInSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Error } from '@/components/core/error';

interface SignInCardProps {
  setSignInFlow: (data: SignInFlow) => void;
  onProviderSignIn: (provider: OnProvider) => void;
}

export const SignInCard = ({ setSignInFlow, onProviderSignIn }: SignInCardProps) => {
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    setError(null);
    const { email, password } = data;
    signIn('password', { email, password, flow: 'signIn' })
      .then(() => {
        toast('You are signed in successfully!');
        reset();
        router.push('/');
      })
      .catch(() => {
        setError('Invalid email or password');
      });
  };

  return (
    <Card className={cn('h-full w-full p-8')}>
      <CardHeader className={cn('p-0')}>
        <CardTitle>Sign In to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-5 px-0 pb-0')}>
        {error && <Error error={error} />}

        <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-5')}>
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
            {errors.email && (
              <p className="text-destructive mt-1 text-xs" role="alert">
                {errors.email.message}
              </p>
            )}
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
            {errors.password && (
              <p className="text-destructive mt-1 text-xs" role="alert">
                {errors.password.message}
              </p>
            )}
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
            Don&apos;t have an account?{' '}
            <span
              className={cn('cursor-pointer text-sky-700 hover:underline')}
              onClick={() => setSignInFlow('signUp')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
