'use client';

import { useParams } from 'next/navigation';

import Logo from '@/components/logo';
import { getStepIndex, onboardingSteps } from '@/lib/onboarding-steps';

const OnboardingProgressBar = () => {
  const { step } = useParams<{ step: string }>();

  const stepIndex = Math.max(getStepIndex(step), 0);
  const total = onboardingSteps.length;

  return (
    <div className="border-b border-fade-stroke bg-brand-gray-800 px-4 py-5 lg:hidden">
      <Logo className="h-7 w-32" />

      <p className="mt-5 text-a-12 uppercase text-sub-title-3">
        Step {stepIndex + 1} of {total}
      </p>

      <p className="mt-1 text-a-14 font-medium text-main-title-3">
        {onboardingSteps[stepIndex].title}
      </p>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-fade-stroke">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingProgressBar;
