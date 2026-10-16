import { InputHTMLAttributes, ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import { IconName } from '@/types/svg-icon.type';
import InputFooterText from '../input-footer-text';

const typeClasses = {
  boxed: {
    wrapperCl: '',
    labelCl: 'mb-1.5 block text-a-14 text-sub-title',
    fieldCl:
      'flex h-11 w-full items-center gap-2 rounded-xl border border-app-border-3 bg-background px-3 text-a-14',
    inputCl:
      'min-h-6 w-full border-none bg-transparent py-2 text-a-16 text-main-title-2 outline-none placeholder:text-placeholder sm:text-a-14',
    errorCl: 'border-brand-error-500',
  },
  default: {
    wrapperCl: 'mb-4 md:mb-a-26',
    labelCl: 'regular-sm ml-7 block font-medium text-placeholder',
    fieldCl: 'flex w-full items-center gap-2 border-b border-app-border pb-1',
    inputCl:
      'min-h-6 w-full border-none bg-transparent py-2 text-brand-gray outline-none dark:text-white',
    errorCl: 'text-brand-error-500',
  },
} as const;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelAction?: ReactNode;
  icon?: IconName;
  validation?: RegisterOptions;
  footerText?: string;
  readOnly?: boolean;
  styleType?: keyof typeof typeClasses;
}

const Input = ({
  name,
  label,
  labelAction,
  validation,
  footerText,
  icon,
  readOnly = false,
  styleType = 'default',
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  const { wrapperCl, labelCl, fieldCl, inputCl, errorCl } =
    typeClasses[styleType];

  return (
    <div className={wrapperCl}>
      <Show when={!!label || !!labelAction}>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={name} className={labelCl}>
            {label}
          </label>

          {labelAction}
        </div>
      </Show>

      <div className={cn(fieldCl, error && errorCl)}>
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
          className={inputCl}
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
