'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthFooter from '@/components/auth-footer';
import { Button } from '@/components/button';
import Input from '@/components/form/input';
import PasswordInput from '@/components/form/password-input';
import { routes } from '@/lib/routes';
import { EMAIL_REGEX } from '@/utils/constants';
import { getSafeRedirect } from '@/utils/getSafeRedirect';
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
  const router = useRouter();

  const form = useForm<SignInInput>({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const redirectTo = new URL(window.location.href).searchParams.get(
      'redirectTo'
    );

    const res = await signIn({
      username: data.email,
      password: data.password,
    });

    if (res.success) {
      toast.success('Sign in success, you would be redirected shortly');
      reset();
      router.replace(getSafeRedirect(redirectTo));
    } else {
      toast.error(res.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          styleType="boxed"
          name="email"
          label="Email"
          icon="sms"
          type="email"
          autoComplete="username"
          placeholder="youremail@gmail.com"
          validation={{
            required: 'Please enter your email',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email',
            },
          }}
        />

        <PasswordInput
          styleType="boxed"
          name="password"
          label="Password"
          placeholder="Enter password"
          labelAction={
            <Link
              href={routes.forgotPassword()}
              className="mb-1.5 text-a-14 font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
          validation={{
            required: 'Please enter your password',
          }}
        />

        <Button
          variant="dark"
          loading={isSubmitting}
          disabled={!isValid}
          className="mt-2 h-10.5 w-full"
        >
          Login
        </Button>
      </form>

      <AuthFooter
        text="Don’t have an account?"
        linkText="Register"
        href={routes.signUp()}
      />
    </FormProvider>
  );
};

export default SignInForm;
