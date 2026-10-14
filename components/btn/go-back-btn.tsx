'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface GoBackBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const GoBackBtn = ({
  children,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel = 'Go back',
  ...props
}: GoBackBtnProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      history.back();
    }
  };

  return (
    <button
      {...props}
      type={type}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(className)}
    >
      {children}
    </button>
  );
};

export default GoBackBtn;
