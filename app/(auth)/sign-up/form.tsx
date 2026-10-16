'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthFooter from '@/components/auth-footer';
import { Button } from '@/components/button';
import Input from '@/components/form/input';
import PasswordInput from '@/components/form/password-input';
import { routes } from '@/lib/routes';
import { EMAIL_REGEX } from '@/utils/constants';
import { useRouter } from 'next/navigation';

interface SignUpInput {
  email: string;
  password: string;
}

const defaultValues: SignUpInput = {
  email: '',
  password: '',
};

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpInput>({ mode: 'onTouched', defaultValues });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignUpInput> = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success('Your account has been created, please sign in');
    router.replace(routes.signIn());
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
          autoComplete="email"
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
          isNewPassword
          validation={{
            required: 'Please enter a password',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <Button
          variant="dark"
          loading={isSubmitting}
          disabled={!isValid}
          className="mt-2 h-10.5 w-full"
        >
          Create an account
        </Button>
      </form>

      <AuthFooter
        text="Have an account?"
        linkText="Login"
        href={routes.signIn()}
      />
    </FormProvider>
  );
};

export default SignUpForm;
