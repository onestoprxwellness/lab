'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import DateInput from '@/components/form/date-input';
import Input from '@/components/form/input';
import RadioGroup from '@/components/form/radio-group';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import Show from '@/components/show-view';
import { routes } from '@/lib/routes';
import { Accreditation } from '@/types/onboarding.types';

const accreditationOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Pending', value: 'pending' },
];

const defaultValues: Accreditation = {
  hasAccreditation: '',
  accreditationBody: '',
  accreditationNumber: '',
  accreditationExpiryDate: '',
};

const AccreditationStep = () => {
  const router = useRouter();

  const form = useForm<Accreditation>({
    mode: 'onTouched',
    shouldUnregister: true,
    defaultValues,
  });

  const hasAccreditation = useWatch({
    control: form.control,
    name: 'hasAccreditation',
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('documents'))
        )}
      >
        <StepHeading
          title="Accreditation & Verification"
          description="Provide your accreditation and regulatory details for verification"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <RadioGroup
            name="hasAccreditation"
            label="Do you have a separate Accreditation?"
            isRequired
            options={accreditationOptions}
            validation={{ required: 'Please select an option' }}
          />

          <Show when={hasAccreditation === 'yes'}>
            <Input
              styleType="boxed"
              size="lg"
              name="accreditationBody"
              label="Accreditation Body"
              isRequired
              icon="user-tag"
              placeholder="Nigeria Laboratory Accreditation Service (NiLAS)"
              validation={{ required: 'Please enter the accreditation body' }}
            />

            <Input
              styleType="boxed"
              size="lg"
              name="accreditationNumber"
              label="Accreditation Number"
              isRequired
              icon="card"
              placeholder="Enter Accreditation Number"
              validation={{
                required: 'Please enter the accreditation number',
              }}
            />

            <DateInput
              name="accreditationExpiryDate"
              label="Accreditation Expiry/Renewal Date"
              isRequired
              validation={{ required: 'Please select the expiry date' }}
            />
          </Show>
        </div>

        <StepActions slug="accreditation" />
      </form>
    </FormProvider>
  );
};

export default AccreditationStep;
