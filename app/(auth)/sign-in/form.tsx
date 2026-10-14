'use client';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Input from '@/components/form/input';

import { Button } from '@/components/button';
import PasswordInput from '@/components/form/password-input';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from './action';

interface SignInInput {
  email: string;
  password: string;
}

const defaultValues: SignInInput = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<SignInInput>({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;
  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    setIsPending(true);
    const redirectTo =
      typeof window !== 'undefined'
        ? new URL(window.location.href).searchParams.get('redirectTo')
        : null;

    try {
      const res = await signIn(data);

      if (res.success) {
        toast.success('Sign in success, you would be redirected shortly');
        reset();
        router.replace(redirectTo || routes.home());
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          styleType="boxed"
          name="username"
          label="Username"
          icon="profile"
          autoComplete="username"
          placeholder="Enter your email or phone number"
          validation={{
            required: 'Please enter your email or phone number',
          }}
        />

        <PasswordInput
          styleType="boxed"
          name="password"
          label="Password"
          placeholder="Enter your password"
          validation={{
            required: 'Please enter your password',
          }}
        />

        <Button
          variant="dark"
          loading={isPending}
          disabled={!isValid}
          className="mt-4 h-12 w-full"
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-a-14 text-sub-title">
        Don&apos;t have an account?{' '}
        <Link href="#" className="font-medium text-primary hover:underline">
          Contact Admin
        </Link>
      </p>
    </FormProvider>
  );
};

export default SignInForm;
