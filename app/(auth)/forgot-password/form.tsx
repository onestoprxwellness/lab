'use client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthFooter from '@/components/auth-footer';
import { Button } from '@/components/button';
import Input from '@/components/form/input';
import { routes } from '@/lib/routes';
import { EMAIL_REGEX } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { requestPasswordReset } from './action';

interface ForgotPasswordInput {
  email: string;
}

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPasswordForm = ({ email }: ForgotPasswordFormProps) => {
  const router = useRouter();

  const form = useForm<ForgotPasswordInput>({ defaultValues: { email } });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    const res = await requestPasswordReset(data.email);

    if (res.success) {
      toast.success(res.message);
      router.push(routes.resetPassword());
    } else {
      toast.error(res.message);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
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

        <Button
          variant="dark"
          loading={isSubmitting}
          disabled={!isValid}
          className="mt-2 h-10.5 w-full"
        >
          Send reset token
        </Button>
      </form>

      <AuthFooter
        text="Remembered your password?"
        linkText="Login"
        href={routes.signIn()}
      />
    </FormProvider>
  );
};

export default ForgotPasswordForm;
