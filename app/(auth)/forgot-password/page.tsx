import AuthLayout from '@/components/auth-heading';
import ForgotPasswordForm from './form';

const ForgotPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  return (
    <>
      <AuthLayout
        title="Forgot Password"
        description="Enter the email linked to your account and we'll send you a token to reset your password."
      />

      <ForgotPasswordForm email={email ?? ''} />
    </>
  );
};

export default ForgotPasswordPage;
