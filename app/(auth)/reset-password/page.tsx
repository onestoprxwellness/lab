import AuthLayout from '@/components/auth-heading';
import ResetPasswordForm from './form';

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) => {
  const { email } = await searchParams;

  return (
    <>
      <AuthLayout
        title="Reset Password"
        description="Enter the token sent to your email along with your new password to reset your password."
      />

      <ResetPasswordForm email={email ?? ''} />
    </>
  );
};

export default ResetPasswordPage;
