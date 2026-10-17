import { RegisterOptions, useFormContext } from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import { cn } from '@/lib/utils';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  isRequired?: boolean;
  inline?: boolean;
  validation?: RegisterOptions;
}

const RadioGroup = ({
  name,
  label,
  options,
  isRequired,
  inline = false,
  validation,
}: RadioGroupProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const labelId = `${name}-label`;

  return (
    <div>
      <Show when={!!label}>
        <p id={labelId} className="mb-a-14 text-a-14 text-sub-title-2">
          {label}
          <Show when={!!isRequired}>
            <span className="text-brand-error-700 dark:text-brand-error-500">
              {' '}
              *
            </span>
          </Show>
        </p>
      </Show>

      <div
        role="radiogroup"
        aria-labelledby={label ? labelId : undefined}
        className={cn(
          'flex gap-a-14',
          inline ? 'flex-wrap gap-x-5' : 'flex-col'
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="group relative flex min-h-a-22 cursor-pointer items-start gap-a-10 text-a-14 text-main-title-3"
          >
            <input
              {...register(name, validation)}
              type="radio"
              value={option.value}
              className="peer sr-only"
            />

            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-app-border bg-background transition-colors peer-checked:border-primary-700 peer-checked:bg-smooth-blue peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
              <span className="size-a-10 rounded-full transition-colors group-has-checked:bg-primary" />
            </span>

            {option.label}
          </label>
        ))}
      </div>

      <Show when={!!error}>
        <InputFooterText text={error as string} isError />
      </Show>
    </div>
  );
};

export default RadioGroup;
