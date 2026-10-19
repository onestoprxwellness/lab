'use client';

import { Close, Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { DayPicker, Matcher } from 'react-day-picker';
import { Controller, ControllerProps, useFormContext } from 'react-hook-form';

import InputFooterText from '@/components/input-footer-text';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { cn } from '@/lib/utils';
import FieldLabel from './field-label';

interface DateInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  displayFormat?: string;
  disabledDays?: Matcher | Matcher[];
  validation?: ControllerProps['rules'];
}

const DateInput = ({
  name,
  label,
  placeholder = 'DD/MM/YYYY',
  isRequired,
  displayFormat = 'DD/MM/YYYY',
  disabledDays,
  validation,
}: DateInputProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field, fieldState: { error } }) => {
        const selected = field.value ? dayjs(field.value).toDate() : undefined;

        return (
          <div>
            <FieldLabel htmlFor={name} label={label} isRequired={isRequired} />

            <Root onOpenChange={(isOpen) => !isOpen && field.onBlur()}>
              <Trigger asChild>
                <button
                  ref={field.ref}
                  id={name}
                  type="button"
                  className={cn(
                    'boxed-field text-left',
                    error ? 'border-brand-error-500' : 'border-app-border-3'
                  )}
                >
                  <SvgIcon
                    name="calendar"
                    className="h-5 w-5 shrink-0 text-sub-title-3"
                  />

                  <span
                    className={cn(
                      'flex-1 truncate',
                      !selected && 'text-placeholder'
                    )}
                  >
                    {selected
                      ? dayjs(selected).format(displayFormat)
                      : placeholder}
                  </span>

                  <SvgIcon
                    name="nav-arrow-down"
                    className="h-4 w-4 shrink-0 text-sub-title-3"
                  />
                </button>
              </Trigger>

              <Portal>
                <Content
                  onOpenAutoFocus={(event) => event.preventDefault()}
                  align="start"
                  sideOffset={8}
                  className="z-50 rounded-xl border border-app-border-3 bg-background p-3 text-a-14 text-main-title-2 shadow-lg"
                >
                  <DayPicker
                    mode="single"
                    required
                    autoFocus
                    captionLayout="dropdown"
                    selected={selected}
                    defaultMonth={selected}
                    startMonth={new Date(1950, 0)}
                    endMonth={new Date(2060, 11)}
                    disabled={disabledDays}
                    onSelect={(date) => {
                      field.onChange(dayjs(date).format('YYYY-MM-DD'));
                      closeRef.current?.click();
                    }}
                  />

                  <Close ref={closeRef} hidden />
                </Content>
              </Portal>
            </Root>

            <Show when={!!error}>
              <InputFooterText text={error?.message as string} isError />
            </Show>
          </div>
        );
      }}
    />
  );
};

export default DateInput;
