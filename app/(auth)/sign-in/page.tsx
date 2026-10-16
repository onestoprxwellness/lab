import AuthHeading from '@/components/auth-heading';

import SignInForm from './form';

const SignInPage = () => {
  return (
    <>
      <AuthHeading
        title="Welcome!"
        description="Sign in to your influencer portal"
      />

      <SignInForm />
    </>
  );
};

export default SignInPage;
