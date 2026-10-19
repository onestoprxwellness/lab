import { FC, InputHTMLAttributes, ReactNode, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import { IconName } from '@/types/svg-icon.type';
import InputFooterText from '../input-footer-text';

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  name: string;
  label: string;
  labelAction?: ReactNode;
  validation?: RegisterOptions;
  footerText?: string;
  isNewPassword?: boolean;
  iconName?: IconName;
}

const PasswordInput: FC<InputProps> = ({
  name,
  label,
  labelAction,
  validation,
  footerText,
  isNewPassword,
  iconName = 'lock-key',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={name}
          className="mb-1.5 block text-a-14 text-sub-title-2"
        >
          {label}
        </label>

        {labelAction}
      </div>

      <div
        className={cn(
          'flex h-11 w-full items-center gap-2 rounded-xl border bg-background px-3',
          error ? 'border-brand-error-500' : 'border-app-border-3'
        )}
      >
        <SvgIcon
          name={iconName}
          className="h-5 w-5 shrink-0 text-sub-title-3"
        />

        <input
          {...register(name, validation)}
          {...props}
          id={name}
          type={showPassword ? 'text' : 'password'}
          autoComplete={isNewPassword ? 'new-password' : 'current-password'}
          className="min-h-6 w-full border-none bg-transparent py-2 text-a-16 text-main-title-2 outline-none placeholder:text-placeholder sm:text-a-14"
        />

        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
          className="shrink-0 text-sub-title-3 transition-opacity hover:opacity-70"
        >
          <SvgIcon
            name={showPassword ? 'eye' : 'password-eye'}
            className="h-5 w-5"
          />
        </button>
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

export default PasswordInput;
