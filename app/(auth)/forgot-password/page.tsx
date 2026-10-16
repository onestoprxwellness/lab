import { cookies } from 'next/headers';

import AuthHeading from '@/components/auth-heading';
import { RESET_EMAIL_COOKIE } from '@/utils/constants';

import ForgotPasswordForm from './form';

const ForgotPasswordPage = async () => {
  const email = (await cookies()).get(RESET_EMAIL_COOKIE)?.value ?? '';

  return (
    <>
      <AuthHeading
        title="Forgot Password"
        description="Enter the email linked to your account and we’ll send you a token to reset your password"
      />

      <ForgotPasswordForm email={email} />
    </>
  );
};

export default ForgotPasswordPage;
