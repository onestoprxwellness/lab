'use client';

import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';
import SvgIcon from './svg-icon';

type SwitchVariant = 'theme' | 'input';

interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> {
  variant?: SwitchVariant;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant = 'theme', ...props }, ref) => {
  if (variant === 'theme') {
    return (
      <div className="rounded-full grid place-items-center bg-foreground w-max border border-app-border p-1">
        <SwitchPrimitives.Root
          ref={ref}
          data-slot="switch"
          className={cn(
            'peer data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
            className
          )}
          {...props}
        >
          <SwitchPrimitives.Thumb
            data-slot="switch-thumb"
            className="group bg-white dark:data-[state=checked]:bg-primary pointer-events-none size-6 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-0px)] data-[state=unchecked]:translate-x-0 grid place-items-center border border-app-border"
          >
            <SvgIcon
              name="sun"
              className="h-3 w-3 group-data-[state=checked]:hidden text-primary"
            />
            <SvgIcon
              name="moon"
              className="h-3 w-3 group-data-[state=unchecked]:hidden"
            />
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
      </div>
    );
  }

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-slate-900 data-[state=unchecked]:bg-slate-200',
        'dark:border-brand-green-300 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-gray-200',
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-a-22 data-[state=unchecked]:translate-x-0.5 data-[state=unchecked]:bg-gray-700" />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = 'Switch';

export { Switch };
