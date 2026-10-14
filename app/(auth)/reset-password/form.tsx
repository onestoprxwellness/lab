'use client';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import Input from '@/components/form/input';
import SvgIcon from '@/components/svg-icon';

import PasswordInput from '@/components/form/password-input';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ResetPasswordFormProps {
  email: string;
}

interface ResetPassword {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<ResetPassword>({
    mode: 'onTouched',
    defaultValues: {
      email,
      token: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<ResetPassword> = async () => {
    setIsPending(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success('Your password has been reset, please sign in');
    setIsPending(false);
    router.replace(routes.signIn());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input type="hidden" {...register('email')} />

        <div className="flex items-center gap-3 rounded-xl border border-foreground bg-foreground px-3.5 py-3 mb-6.5">
          <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-background text-primary">
            <SvgIcon name="sms" className="h-5 w-5" />
          </span>

          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-muted-foreground text-a-12 sm:text-a-14">
              You are resetting the password for
            </p>
            <p className="font-medium text-a-14 text-brand-gray dark:text-white truncate">
              {email}
            </p>
          </div>

          <Link
            href={`${routes.forgotPassword()}?email=${encodeURIComponent(email)}`}
            className="flex items-center gap-1 shrink-0 text-primary text-a-12 sm:text-a-14"
          >
            <SvgIcon name="edit-pen" className="h-4 w-4" />
            Edit
          </Link>
        </div>

        <Input
          name="token"
          label="Token"
          icon="lock"
          placeholder="Enter the token sent to your email"
          validation={{
            required: 'Please enter the token sent to your email',
          }}
        />

        <PasswordInput
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
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
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          isNewPassword
          validation={{
            required: 'Please confirm your new password',
            validate: (value) =>
              value === getValues('newPassword') || 'Passwords do not match',
          }}
        />

        <Button disabled={!isValid} loading={isPending} className="mt-10 h-12!">
          Reset Password
        </Button>

        <p className="w-max mx-auto mt-4">
          Didn&apos;t get a token?{' '}
          <Link href={routes.forgotPassword()} className="text-primary">
            Request again
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default ResetPasswordForm;
