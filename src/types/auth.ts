export type SignInFlow = 'signIn' | 'signUp' | 'emailVerification';

export type OnProvider = 'github' | 'google';

export interface EmailVerificationStep {
  email: string;
  name: string;
  password: string;
}
