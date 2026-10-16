'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthFooter from '@/components/auth-footer';
import { Button } from '@/components/button';
import Input from '@/components/form/input';
import PasswordInput from '@/components/form/password-input';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { resetPassword } from './action';

interface ResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

const defaultValues: ResetPasswordInput = {
  token: '',
  newPassword: '',
  confirmPassword: '',
};

interface ResetPasswordFormProps {
  email: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    const res = await resetPassword({
      token: data.token,
      newPassword: data.newPassword,
    });

    if (res.success) {
      toast.success(res.message);
      router.replace(routes.signIn());
    } else {
      toast.error(res.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-xl border border-app-border-3 px-3.5 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-a-12 text-sub-title-3">
              Resetting the password for
            </p>
            <p className="truncate text-a-14 font-medium text-main-title-2">
              {email}
            </p>
          </div>

          <Link
            href={routes.forgotPassword()}
            className="shrink-0 text-a-14 font-medium text-primary hover:underline"
          >
            Change
          </Link>
        </div>

        <Input
          styleType="boxed"
          name="token"
          label="Token"
          icon="key"
          autoComplete="one-time-code"
          placeholder="Enter the token sent to your email"
          validation={{
            required: 'Please enter the token sent to your email',
          }}
        />

        <PasswordInput
          styleType="boxed"
          name="newPassword"
          label="New password"
          placeholder="Enter new password"
          isNewPassword
          validation={{
            required: 'Please enter your new password',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <PasswordInput
          styleType="boxed"
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Re-enter new password"
          isNewPassword
          validation={{
            required: 'Please confirm your new password',
            validate: (value) =>
              value === getValues('newPassword') || 'Passwords do not match',
          }}
        />

        <Button
          variant="dark"
          loading={isSubmitting}
          disabled={!isValid}
          className="mt-2 h-10.5 w-full"
        >
          Reset password
        </Button>
      </form>

      <AuthFooter
        text="Didn’t get a token?"
        linkText="Request again"
        href={routes.forgotPassword()}
      />
    </FormProvider>
  );
};

export default ResetPasswordForm;
