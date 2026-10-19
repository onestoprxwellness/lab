import AuthHeading from '@/components/auth-heading';

import SignUpForm from './form';

const SignUpPage = () => {
  return (
    <>
      <AuthHeading
        title="Create an Account"
        description="We collect your details to help you keep your progress"
      />

      <SignUpForm />
    </>
  );
};

export default SignUpPage;
