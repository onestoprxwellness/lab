import { InputHTMLAttributes, ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import { IconName } from '@/types/svg-icon.type';
import InputFooterText from '../input-footer-text';

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  name: string;
  label?: string;
  labelAction?: ReactNode;
  icon?: IconName;
  validation?: RegisterOptions;
  footerText?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  size?: 'md' | 'lg';
}

const Input = ({
  name,
  label,
  labelAction,
  validation,
  footerText,
  icon,
  readOnly = false,
  isRequired = false,
  size = 'md',
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <Show when={!!label || !!labelAction}>
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor={name}
            className="mb-1.5 block text-a-14 text-sub-title-2"
          >
            {label}
            <Show when={isRequired}>
              <span className="text-brand-error-700 dark:text-brand-error-500">
                {' '}
                *
              </span>
            </Show>
          </label>

          {labelAction}
        </div>
      </Show>

      <div
        className={cn(
          'flex h-11 w-full items-center gap-2 rounded-xl border bg-background px-3',
          size === 'lg' && 'shadow-xs',
          error ? 'border-brand-error-500' : 'border-app-border-3'
        )}
      >
        <Show when={!!icon}>
          <SvgIcon
            name={icon as IconName}
            className="h-5 w-5 shrink-0 text-sub-title-3"
          />
        </Show>

        <input
          {...register(name, validation)}
          {...props}
          id={name}
          readOnly={readOnly}
          className={cn(
            'min-h-6 w-full border-none bg-transparent py-2 text-a-16 text-main-title-2 outline-none placeholder:text-placeholder',
            size === 'md' && 'sm:text-a-14'
          )}
        />
      </div>

      <Show when={!!error || !!footerText}>
        <InputFooterText
          text={(error ?? footerText) as string}
          isError={!!error}
        />
      </Show>
    </div>
  );
};

export default Input;
