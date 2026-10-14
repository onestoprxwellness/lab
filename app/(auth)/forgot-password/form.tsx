'use client';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import Input from '@/components/form/input';

import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ForgotPassword {
  email: string;
}

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPasswordForm = ({ email }: ForgotPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<ForgotPassword>({ defaultValues: { email } });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<ForgotPassword> = async (data) => {
    setIsPending(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success(`We've sent a reset token to ${data.email}`);
    setIsPending(false);
    router.push(
      `${routes.resetPassword()}?email=${encodeURIComponent(data.email)}`
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input
          name="email"
          label="Email"
          icon="sms"
          type="email"
          placeholder="Enter your email"
          validation={{
            required: 'Please enter your email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          }}
        />

        <Button disabled={!isValid} loading={isPending} className="mt-10 h-12!">
          Send Reset Token
        </Button>

        <p className="w-max mx-auto mt-4">
          Remembered your password?{' '}
          <Link href={routes.signIn()} className="text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
