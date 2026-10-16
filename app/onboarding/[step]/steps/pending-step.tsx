'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import {
  getStepIndex,
  onboardingSteps,
  OnboardingStepSlug,
} from '@/lib/onboarding-steps';
import { routes } from '@/lib/routes';

const PendingStep = ({ slug }: { slug: OnboardingStepSlug }) => {
  const router = useRouter();

  const form = useForm();

  const stepIndex = getStepIndex(slug);
  const nextStep = onboardingSteps[stepIndex + 1];

  const onSubmit = () => {
    if (nextStep) return router.push(routes.onboarding(nextStep.slug));

    toast.success('Your application has been submitted');
    router.replace(routes.home());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepHeading
          title={onboardingSteps[stepIndex].title}
          description="This step is being built next"
        />

        <StepActions slug={slug} />
      </form>
    </FormProvider>
  );
};

export default PendingStep;
