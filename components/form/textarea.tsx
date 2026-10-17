import { RegisterOptions, useFormContext } from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import { cn } from '@/lib/utils';
import FieldLabel from './field-label';

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  validation?: RegisterOptions;
}

const Textarea = ({
  name,
  label,
  placeholder,
  isRequired,
  validation,
}: TextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <FieldLabel htmlFor={name} label={label} isRequired={isRequired} />

      <textarea
        {...register(name, validation)}
        id={name}
        aria-invalid={!!error}
        placeholder={placeholder}
        className={cn(
          'h-40 w-full resize-none rounded-xl border bg-background p-3 text-a-16 leading-6 text-main-title-2 shadow-xs outline-none placeholder:text-placeholder',
          error ? 'border-brand-error-500' : 'border-app-border-3'
        )}
      />

      <Show when={!!error}>
        <InputFooterText text={error as string} isError />
      </Show>
    </div>
  );
};

export default Textarea;
