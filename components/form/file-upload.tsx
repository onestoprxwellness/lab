import { Controller, useFormContext } from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import FieldLabel from './field-label';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface FileUploadProps {
  name: string;
  label: string;
  isRequired?: boolean;
  multiple?: boolean;
}

const FileUpload = ({
  name,
  label,
  isRequired,
  multiple = false,
}: FileUploadProps) => {
  const { control, setError, clearErrors } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (files: File[]) =>
          !isRequired || files.length > 0 || `Please upload the ${label}`,
      }}
      render={({ field, fieldState: { error } }) => {
        const files: File[] = field.value;

        const addFiles = (selected: File[]) => {
          const hasInvalidFile = selected.some(
            (file) =>
              !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
          );

          if (hasInvalidFile) {
            setError(name, {
              message: 'Only png, jpeg or pdf files up to 5MB are allowed',
            });
            return;
          }

          clearErrors(name);
          field.onChange(
            multiple ? [...files, ...selected] : selected.slice(0, 1)
          );
        };

        return (
          <div>
            <FieldLabel htmlFor={name} label={label} isRequired={isRequired} />

            <div className="flex flex-col gap-3">
              {files.map((file, index) => {
                const type =
                  file.type === 'application/pdf'
                    ? 'pdf'
                    : file.type === 'image/png'
                      ? 'png'
                      : 'jpg';

                return (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-3 rounded-xl bg-brand-gray-800 px-a-14 py-3"
                  >
                    <span className="relative shrink-0">
                      <SvgIcon
                        name="file-01"
                        className="h-8 w-8 text-sub-title-3"
                      />
                      <span
                        className={cn(
                          'absolute bottom-1 -left-1 rounded-xs px-0.5 text-a-8 font-semibold uppercase text-white',
                          type === 'pdf' && 'bg-brand-error-500',
                          type === 'png' && 'bg-[#dd2590]',
                          type === 'jpg' && 'bg-brand-warning-600'
                        )}
                      >
                        {type}
                      </span>
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-a-16 text-main-title-2">
                        {file.name}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1.5 text-a-12 text-sub-title-3">
                        <span className="grid size-3 place-items-center rounded-full bg-brand-green-500">
                          <SvgIcon
                            name="mark"
                            className="h-1.5 w-2 text-white"
                          />
                        </span>
                        Completed
                        <span aria-hidden>•</span>
                        {file.size < 1024 * 1024
                          ? `${Math.ceil(file.size / 1024)}kb`
                          : `${(file.size / 1024 / 1024).toFixed(1)}mb`}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${file.name}`}
                      onClick={() =>
                        field.onChange(files.filter((_, i) => i !== index))
                      }
                      className="shrink-0 text-sub-title-3 transition-opacity hover:opacity-70"
                    >
                      <SvgIcon name="trash" className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}

              <Show when={multiple || files.length === 0}>
                <label
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    addFiles(Array.from(event.dataTransfer.files));
                  }}
                  className={cn(
                    'relative flex h-35 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-brand-gray-800 px-4 text-center transition-colors hover:border-primary has-focus-visible:border-primary',
                    error ? 'border-brand-error-500' : 'border-app-border'
                  )}
                >
                  <input
                    ref={field.ref}
                    id={name}
                    type="file"
                    multiple={multiple}
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="sr-only"
                    onBlur={field.onBlur}
                    onChange={(event) => {
                      addFiles(Array.from(event.target.files ?? []));
                      event.target.value = '';
                    }}
                  />

                  <span className="grid size-6 place-items-center rounded-full bg-primary text-white">
                    <SvgIcon name="plus" className="h-a-14 w-a-14" />
                  </span>

                  <span className="mt-3 text-a-14 text-primary">
                    Choose a file or drag &amp; drop it here.
                  </span>

                  <span className="mt-1 text-a-12 text-sub-title-2">
                    png, jpeg or pdf document (max. of 5MB)
                  </span>
                </label>
              </Show>
            </div>

            <Show when={!!error}>
              <InputFooterText text={error?.message as string} isError />
            </Show>
          </div>
        );
      }}
    />
  );
};

export default FileUpload;
