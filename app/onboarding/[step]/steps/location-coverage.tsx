'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import FieldLabel from '@/components/form/field-label';
import Input from '@/components/form/input';
import RadioGroup from '@/components/form/radio-group';
import Select from '@/components/form/select';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import SvgIcon from '@/components/svg-icon';
import { nigeriaStates } from '@/lib/nigeria-states';
import { routes } from '@/lib/routes';
import { LocationCoverage } from '@/types/onboarding.types';

const coverageOptions = [
  {
    label: "Only the laboratory's physical location",
    value: 'physical_location',
  },
  {
    label: 'Multiple locations within the state',
    value: 'multiple_locations',
  },
  { label: 'Multiple states', value: 'multiple_states' },
  { label: 'Nationwide', value: 'nationwide' },
];

const stateOptions = nigeriaStates.map(({ name }) => ({
  label: name,
  value: name,
}));

const defaultValues: LocationCoverage = {
  coverage: '',
  state: '',
  lga: '',
  streetAddress: '',
  postalCode: '',
};

const LocationCoverageStep = () => {
  const router = useRouter();

  const form = useForm<LocationCoverage>({
    mode: 'onTouched',
    defaultValues,
  });

  const [coverage, state] = useWatch({
    control: form.control,
    name: ['coverage', 'state'],
  });

  const isMainBranch = !!coverage && coverage !== 'physical_location';
  const branch = isMainBranch ? ' (Main Branch)' : '';

  const lgaOptions =
    nigeriaStates
      .find(({ name }) => name === state)
      ?.lgas.map((lga) => ({ label: lga, value: lga })) ?? [];

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('accreditation'))
        )}
      >
        <StepHeading
          title="Location & Service Coverage"
          description="Help us understand where you operate and the areas you serve"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <RadioGroup
            name="coverage"
            label="Which locations do you currently serve?"
            isRequired
            options={coverageOptions}
            validation={{ required: 'Please select the locations you serve' }}
          />

          <div>
            <FieldLabel label="Country" isRequired />

            <div
              aria-disabled
              className="boxed-field cursor-not-allowed border-app-border-3 bg-foreground"
            >
              <span
                aria-hidden
                className="flex h-a-18 w-6 shrink-0 overflow-hidden rounded-xs"
              >
                <span className="flex-1 bg-[#249250]" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#249250]" />
              </span>

              <span className="flex-1">Nigeria</span>

              <SvgIcon
                name="nav-arrow-down"
                className="h-4 w-4 text-sub-title-3"
              />
            </div>
          </div>

          <Select
            name="state"
            label={`State${branch}`}
            isRequired
            icon="state"
            placeholder="Select State"
            options={stateOptions}
            validation={{
              required: 'Please select the state',
              onChange: () => form.resetField('lga'),
            }}
          />

          <Select
            name="lga"
            label={`Local Government Area${branch}`}
            isRequired
            icon="map"
            placeholder="Select LGA"
            options={lgaOptions}
            validation={{ required: 'Please select the local government area' }}
          />

          <Input
            size="lg"
            name="streetAddress"
            label={`Street Address${branch}`}
            isRequired
            icon="location-pin"
            autoComplete="street-address"
            placeholder="Input Address"
            labelAction={
              <button
                type="button"
                disabled
                className="mb-1.5 text-a-14 font-medium text-primary"
              >
                Use Map for Location
              </button>
            }
            validation={{ required: 'Please enter the street address' }}
          />

          <Input
            size="lg"
            name="postalCode"
            label={`Postal Code (${isMainBranch ? 'Main Branch - ' : ''}Optional)`}
            icon="sms"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Enter Postal Code"
          />
        </div>

        <StepActions slug="location-coverage" />
      </form>
    </FormProvider>
  );
};

export default LocationCoverageStep;
