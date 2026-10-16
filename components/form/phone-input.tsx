import { RegisterOptions, useFormContext } from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import FieldLabel from './field-label';

interface PhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  validation?: RegisterOptions;
}

const PhoneInput = ({
  name,
  label,
  placeholder,
  isRequired,
  validation,
}: PhoneInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <FieldLabel htmlFor={name} label={label} isRequired={isRequired} />

      <div
        className={cn(
          'boxed-field gap-0 px-0',
          error ? 'border-brand-error-500' : 'border-app-border-3'
        )}
      >
        <span className="flex h-full shrink-0 items-center gap-a-10 border-r border-app-border-3 px-a-14">
          <span
            aria-hidden
            className="flex h-a-18 w-6 overflow-hidden rounded-xs"
          >
            <span className="flex-1 bg-[#249250]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#249250]" />
          </span>
          <SvgIcon name="nav-arrow-down" className="h-4 w-4 text-placeholder" />
        </span>

        <span className="pl-4">+234</span>

        <input
          {...register(name, validation)}
          id={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          aria-invalid={!!error}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent pr-3 pl-1.5 text-main-title-2 outline-none placeholder:text-placeholder"
        />
      </div>

      <Show when={!!error}>
        <InputFooterText text={error as string} isError />
      </Show>
    </div>
  );
};

export default PhoneInput;
