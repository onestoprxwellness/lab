import { ReactNode } from 'react';

import Show from '@/components/show-view';

interface FieldLabelProps {
  htmlFor?: string;
  label?: string;
  isRequired?: boolean;
  action?: ReactNode;
}

const FieldLabel = ({
  htmlFor,
  label,
  isRequired,
  action,
}: FieldLabelProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-a-14 text-sub-title-2"
      >
        {label}
        <Show when={!!isRequired}>
          <span className="text-brand-error-700 dark:text-brand-error-500">
            {' '}
            *
          </span>
        </Show>
      </label>

      {action}
    </div>
  );
};

export default FieldLabel;
