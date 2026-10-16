const home = () => '/';
const signIn = () => '/sign-in';
const signUp = () => '/sign-up';
const forgotPassword = () => '/forgot-password';
const resetPassword = () => '/reset-password';
const onboarding = (step?: string) =>
  step ? `/onboarding/${step}` : '/onboarding';

export const routes = {
  home,
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  onboarding,
};
