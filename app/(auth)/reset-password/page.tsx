import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AuthHeading from '@/components/auth-heading';
import { routes } from '@/lib/routes';
import { RESET_EMAIL_COOKIE } from '@/utils/constants';

import ResetPasswordForm from './form';

const ResetPasswordPage = async () => {
  const email = (await cookies()).get(RESET_EMAIL_COOKIE)?.value;

  if (!email) redirect(routes.forgotPassword());

  return (
    <>
      <AuthHeading
        title="Reset Password"
        description="Enter the token sent to your email and choose a new password"
      />

      <ResetPasswordForm email={email} />
    </>
  );
};

export default ResetPasswordPage;
