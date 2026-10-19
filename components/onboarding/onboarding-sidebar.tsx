'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Logo from '@/components/logo';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { getStepIndex, onboardingSteps } from '@/lib/onboarding-steps';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

const OnboardingSidebar = () => {
  const { step } = useParams<{ step: string }>();

  const currentIndex = getStepIndex(step);

  return (
    <aside className="hidden w-84.5 shrink-0 flex-col overflow-y-auto border-r border-fade-stroke bg-brand-gray-800 p-8 lg:flex">
      <Logo className="h-8 w-36" />

      <p className="mt-13 text-a-12 uppercase text-sub-title-3">
        Your progress
      </p>

      <ol className="mt-5">
        {onboardingSteps.map(({ slug, title }, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={slug}
              className="relative flex items-center gap-2 pb-9 last:pb-0"
            >
              <span className="grid w-6 shrink-0 place-items-center">
                <span
                  className={cn(
                    'grid size-5 place-items-center rounded-full border bg-background',
                    isDone && 'border-primary-700 bg-primary',
                    isCurrent && 'border-dashed border-main-title-3',
                    !isDone && !isCurrent && 'border-app-border'
                  )}
                >
                  <Show when={isDone}>
                    <SvgIcon name="mark" className="h-2 w-a-10 text-white" />
                  </Show>
                </span>
              </span>

              {isDone ? (
                <Link
                  href={routes.onboarding(slug)}
                  className="text-a-14 font-medium text-main-title-3 hover:underline"
                >
                  {title}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? 'step' : undefined}
                  className={cn(
                    'text-a-14 font-medium',
                    isCurrent ? 'text-main-title-3' : 'text-sub-title-3'
                  )}
                >
                  {title}
                </span>
              )}

              <Show when={index < onboardingSteps.length - 1}>
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-5.25 bottom-px left-2.75 w-0.5',
                    isDone ? 'bg-primary' : 'bg-fade-stroke'
                  )}
                />
              </Show>
            </li>
          );
        })}
      </ol>
    </aside>
  );
};

export default OnboardingSidebar;
