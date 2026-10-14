import AuthLayout from '@/components/auth-heading';
import SignInForm from './form';

const SignInPage = () => {
  return (
    <>
      <AuthLayout title="Welcome!" description="Sign in to your portal." />

      <SignInForm />
    </>
  );
};

export default SignInPage;
