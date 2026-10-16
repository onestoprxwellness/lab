import { ReactNode } from 'react';

import OnboardingProgressBar from '@/components/onboarding/onboarding-progress-bar';
import OnboardingSidebar from '@/components/onboarding/onboarding-sidebar';

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <OnboardingSidebar />

      <main className="flex-1 overflow-y-auto">
        <OnboardingProgressBar />

        <div className="mx-auto w-full max-w-148 px-4 pt-8 pb-10 lg:pt-29">
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
