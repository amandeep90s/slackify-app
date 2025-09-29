export type SignInFlow =
  | 'signIn'
  | 'signUp'
  | 'emailVerification'
  | 'forgotPassword'
  | 'resetPassword';

export type OnProvider = 'github' | 'google';

export interface EmailVerificationStep {
  email: string;
  name: string;
  password: string;
}

export interface ForgotPasswordStep {
  email: string;
}
