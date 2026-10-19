'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/button';
import {
  getStepIndex,
  onboardingSteps,
  OnboardingStepSlug,
} from '@/lib/onboarding-steps';
import { routes } from '@/lib/routes';

interface StepActionsProps {
  slug: OnboardingStepSlug;
  submitLabel?: string;
}

const StepActions = ({ slug, submitLabel = 'Next' }: StepActionsProps) => {
  const router = useRouter();

  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();

  const previousStep = onboardingSteps[getStepIndex(slug) - 1];

  return (
    <div className="mt-14 flex justify-end gap-4">
      <Button
        type="button"
        variant="light"
        disabled={!previousStep}
        onClick={() => router.push(routes.onboarding(previousStep?.slug))}
        className="h-12 flex-1 px-6 text-a-16 sm:flex-none"
      >
        Go back
      </Button>

      <Button
        type="submit"
        variant="dark"
        loading={isSubmitting}
        disabled={!isValid}
        className="h-12 flex-1 px-6 text-a-16 sm:flex-none"
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default StepActions;
