'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import Show from './show-view';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: 'btn-default',
      white: 'btn-white',
      primary: 'btn-primary',
      warning: 'btn-warning',
      primary_II: 'btn-primary-ii',
      primary_III: 'btn-primary-iii',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      transparent: 'btn-transparent',
      link: 'btn-link',
      dark: 'btn-dark',
      stale: 'btn-stale',
      icon: 'btn-icon',
    },

    size: {
      default: 'btn-size-default',
      sm: 'btn-size-sm',
      lg: 'btn-size-lg',
      icon: 'btn-size-icon',
      xl: 'btn-size-xl',
      '2xl': 'btn-size-2xl',
      'icon-sm': 'btn-size-icon-sm',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  dataTest?: string;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  dataTest,
  children,
  ref,
  ...props
}: ButtonProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={loading || disabled}
      data-test={dataTest}
    >
      <Show when={loading}>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
        </div>
      </Show>

      <Show when={!loading}>{children}</Show>
    </Comp>
  );
};

export { Button, buttonVariants };
