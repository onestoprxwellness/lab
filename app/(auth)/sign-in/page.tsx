import AuthHeading from '@/components/auth-heading';

import SignInForm from './form';

const SignInPage = () => {
  return (
    <>
      <AuthHeading
        title="Welcome!"
        description="Sign in to your laboratory portal"
      />

      <SignInForm />
    </>
  );
};

export default SignInPage;
