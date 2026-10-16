import { ReactNode } from 'react';
import {
  get,
  RegisterOptions,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import { IconName } from '@/types/svg-icon.type';
import FieldLabel from './field-label';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  name: string;
  label?: string;
  labelAction?: ReactNode;
  placeholder?: string;
  icon?: IconName;
  options: SelectOption[];
  isRequired?: boolean;
  validation?: RegisterOptions;
}

const Select = ({
  name,
  label,
  labelAction,
  placeholder,
  icon,
  options,
  isRequired,
  validation,
}: SelectProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ control, name });
  const error = get(errors, name)?.message as string | undefined;

  return (
    <div>
      <FieldLabel
        htmlFor={name}
        label={label}
        isRequired={isRequired}
        action={labelAction}
      />

      <div
        className={cn(
          'boxed-field relative',
          error ? 'border-brand-error-500' : 'border-app-border-3'
        )}
      >
        <Show when={!!icon}>
          <SvgIcon
            name={icon as IconName}
            className="h-5 w-5 shrink-0 text-sub-title-3"
          />
        </Show>

        <select
          {...register(name, validation)}
          id={name}
          aria-invalid={!!error}
          className={cn(
            'h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 outline-none',
            !value && 'text-placeholder'
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <SvgIcon
          name="nav-arrow-down"
          className="pointer-events-none absolute right-3 h-4 w-4 text-sub-title-3"
        />
      </div>

      <Show when={!!error}>
        <InputFooterText text={error as string} isError />
      </Show>
    </div>
  );
};

export default Select;
