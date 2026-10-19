'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

import FieldLabel from '@/components/form/field-label';
import RadioGroup from '@/components/form/radio-group';
import Select from '@/components/form/select';
import InputFooterText from '@/components/input-footer-text';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import Show from '@/components/show-view';
import SvgIcon from '@/components/svg-icon';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { TechnologyCapability } from '@/types/onboarding.types';

const dashboardDuties = [
  'Receive patient bookings.',
  'Manage walk-in bookings.',
  'Verify payment status.',
  'Update booking/sample statuses.',
  'Manage laboratory tests.',
  'Upload laboratory results.',
  'Submit new tests for Admin approval.',
  'Send laboratory results to patients.',
  'Submit pricing for Admin approval.',
  'Maintain laboratory information.',
];

const dashboardOptions = [
  {
    label:
      'Yes, we have staff who can use a digital laboratory management dashboard',
    value: 'yes',
  },
  {
    label:
      'No, we currently do not have staff comfortable using a digital dashboard',
    value: 'no',
  },
  {
    label: 'We would require training before using the system',
    value: 'training',
  },
];

const capacityOptions = ['1–20', '21–50', '51–100', '101–250', '250+'].map(
  (range) => ({ label: range, value: range })
);

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const time = dayjs()
    .startOf('day')
    .add(index * 30, 'minute');

  return { label: time.format('h:mm A'), value: time.format('HH:mm') };
});

const specificTimeOptions = [
  { label: 'Closed', value: 'closed' },
  ...timeOptions,
];

const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
].map((day) => ({ label: day, value: day.toLowerCase() }));

const defaultValues: TechnologyCapability = {
  dashboardCapability: '',
  dailyCapacity: '',
  turnaroundTime: '',
  turnaroundUnit: 'hours',
  defaultOpenTime: '08:00',
  defaultCloseTime: '22:00',
  specificDays: [],
};

const TechnologyStep = () => {
  const router = useRouter();

  const form = useForm<TechnologyCapability>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specificDays',
  });

  const specificDays = useWatch({ control, name: 'specificDays' });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('partnership'))
        )}
      >
        <StepHeading
          title="Technology & Dashboard Capability"
          description="Tell us about your current systems and digital capabilities"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <div className="rounded-xl border border-dashed border-primary/60 bg-smooth-blue p-4">
            <p className="text-a-14 font-medium text-main-title-3">
              Laboratory partners will be expected to use the dashboard to:
            </p>

            <ul className="mt-1 list-disc pl-5 text-a-14 leading-6 text-sub-title-2">
              {dashboardDuties.map((duty) => (
                <li key={duty}>{duty}</li>
              ))}
            </ul>
          </div>

          <RadioGroup
            name="dashboardCapability"
            label="Are you able to use a digital dashboard to manage laboratory bookings, tests, sample collection, and results?"
            isRequired
            options={dashboardOptions}
            validation={{ required: 'Please select an option' }}
          />

          <hr className="border-dashed border-app-border-3" />

          <div>
            <p className="mb-4 text-a-12 uppercase text-sub-title-3">
              Laboratory capacity
            </p>

            <RadioGroup
              name="dailyCapacity"
              label="Approximately how many laboratory tests can your laboratory process per day?"
              isRequired
              options={capacityOptions}
              validation={{ required: 'Please select your daily capacity' }}
            />
          </div>

          <div>
            <FieldLabel
              htmlFor="turnaroundTime"
              label="What is your typical laboratory result turnaround time?"
              isRequired
            />

            <div
              className={cn(
                'boxed-field gap-0 pr-0',
                errors.turnaroundTime
                  ? 'border-brand-error-500'
                  : 'border-app-border-3'
              )}
            >
              <SvgIcon
                name="clock"
                className="mr-2 h-5 w-5 shrink-0 text-sub-title-3"
              />

              <input
                {...register('turnaroundTime', {
                  required: 'Please enter the turnaround time',
                  validate: (value) =>
                    /^\d+$/.test(value) && Number(value) > 0
                      ? true
                      : 'Please enter a whole number',
                })}
                id="turnaroundTime"
                inputMode="numeric"
                aria-invalid={!!errors.turnaroundTime}
                placeholder="Enter value"
                className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-placeholder"
              />

              <span className="relative flex h-full shrink-0 items-center border-l border-app-border-3">
                <select
                  {...register('turnaroundUnit')}
                  aria-label="Turnaround unit"
                  className="h-full cursor-pointer appearance-none bg-transparent pr-9 pl-a-14 text-a-14 font-medium outline-none"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>

                <SvgIcon
                  name="nav-arrow-down"
                  className="pointer-events-none absolute right-3 h-4 w-4 text-sub-title-3"
                />
              </span>
            </div>

            <Show when={!!errors.turnaroundTime}>
              <InputFooterText
                text={errors.turnaroundTime?.message as string}
                isError
              />
            </Show>
          </div>

          <hr className="border-dashed border-app-border-3" />

          <div>
            <p className="mb-4 text-a-12 uppercase text-sub-title-3">
              Operating hours
            </p>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-a-10 sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-1">
                  <FieldLabel label="Day" />
                  <div className="boxed-field border-app-border-3">
                    <span className="truncate">All Day (Default)</span>
                  </div>
                </div>

                <Select
                  name="defaultOpenTime"
                  label="Open"
                  placeholder="Select"
                  options={timeOptions}
                  validation={{ required: 'Select a time' }}
                />

                <Select
                  name="defaultCloseTime"
                  label="Close"
                  placeholder="Select"
                  options={timeOptions}
                  validation={{ required: 'Select a time' }}
                />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-2 gap-a-10 sm:grid-cols-3"
                >
                  <div className="col-span-2 sm:col-span-1">
                    <Select
                      name={`specificDays.${index}.day`}
                      label="Day"
                      placeholder="Select Day"
                      options={dayOptions.map((option) => ({
                        ...option,
                        disabled:
                          option.value !== specificDays[index]?.day &&
                          specificDays.some((row) => row.day === option.value),
                      }))}
                      validation={{ required: 'Select a day' }}
                    />
                  </div>

                  <Select
                    name={`specificDays.${index}.open`}
                    label="Open"
                    placeholder="Select"
                    options={specificTimeOptions}
                    validation={{
                      required: 'Select a time',
                      onChange: (event) =>
                        event.target.value === 'closed' &&
                        setValue(`specificDays.${index}.close`, 'closed', {
                          shouldValidate: true,
                        }),
                    }}
                  />

                  <Select
                    name={`specificDays.${index}.close`}
                    label="Close"
                    labelAction={
                      <button
                        type="button"
                        aria-label="Remove day"
                        onClick={() => remove(index)}
                        className="mb-1.5 grid size-5 place-items-center rounded-full bg-brand-error-50 text-brand-error-500 transition-opacity hover:opacity-80"
                      >
                        <SvgIcon name="trash" className="h-3 w-3" />
                      </button>
                    }
                    placeholder="Select"
                    options={specificTimeOptions}
                    validation={{
                      required: 'Select a time',
                      onChange: (event) =>
                        event.target.value === 'closed' &&
                        setValue(`specificDays.${index}.open`, 'closed', {
                          shouldValidate: true,
                        }),
                    }}
                  />
                </div>
              ))}

              <Show when={fields.length < dayOptions.length}>
                <button
                  type="button"
                  onClick={() => append({ day: '', open: '', close: '' })}
                  className="flex w-max items-center gap-2 text-a-14 font-medium text-primary hover:underline"
                >
                  <SvgIcon name="plus" className="h-4 w-4" />
                  Add Specific Days
                </button>
              </Show>
            </div>
          </div>
        </div>

        <StepActions slug="technology" />
      </form>
    </FormProvider>
  );
};

export default TechnologyStep;
