import { ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import InputFooterText from '../input-footer-text';
import Show from '../show-view';
import SvgIcon from '../svg-icon';

interface CheckboxOption {
  value: string | number;
  label: ReactNode;
}

interface CheckboxListProps {
  name: string;
  label?: ReactNode;
  options: CheckboxOption[];
  maxSelectable?: number;
  validation?: RegisterOptions;
  footerText?: string;
}

const CheckboxList = ({
  name,
  label,
  options,
  maxSelectable,
  validation,
  footerText,
}: CheckboxListProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const selected: (string | number)[] = watch(name) ?? [];

  const toggle = (value: string | number) => {
    if (selected.includes(value)) {
      setValue(
        name,
        selected.filter((s) => s !== value),
        { shouldValidate: true }
      );
    } else {
      if (maxSelectable !== undefined && selected.length >= maxSelectable)
        return;
      setValue(name, [...selected, value], { shouldValidate: true });
    }
  };

  return (
    <div className="mb-4 md:mb-6.5">
      <input type="hidden" {...register(name, validation)} />

      <Show when={!!label}>
        <div className="mb-3">{label}</div>
      </Show>

      <div className="flex flex-col gap-1">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          const disabled =
            !checked &&
            maxSelectable !== undefined &&
            selected.length >= maxSelectable;
          const order = selected.indexOf(option.value) + 1;

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() => toggle(option.value)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent text-left transition-colors w-full hover:bg-primary/10',
                checked && 'bg-primary/10',
                disabled && 'opacity-40 cursor-not-allowed',
                error && 'border-brand-error-500'
              )}
            >
              <span
                className={cn(
                  'shrink-0 w-a-18 h-a-18 rounded border-[1.8px] flex items-center justify-center transition-colors',
                  checked
                    ? 'bg-primary border-primary'
                    : 'border-app-border dark:bg-transparent'
                )}
              >
                <Show when={checked}>
                  <SvgIcon name="mark" className="w-a-10 h-a-10 text-white" />
                </Show>
              </span>

              <div className="flex-1 min-w-0">{option.label}</div>

              {checked && maxSelectable !== undefined && (
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                  {order}
                </span>
              )}
            </button>
          );
        })}
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

export default CheckboxList;
