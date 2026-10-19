'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import RadioGroup from '@/components/form/radio-group';
import Textarea from '@/components/form/textarea';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import { routes } from '@/lib/routes';
import { PartnershipInformation } from '@/types/onboarding.types';

const referralOptions = [
  { label: 'OneStopRx Website', value: 'website' },
  { label: 'Social Media', value: 'social_media' },
  { label: 'Referral', value: 'referral' },
  { label: 'OneStopRx Representative', value: 'representative' },
  { label: 'Search Engine', value: 'search_engine' },
  { label: 'Other', value: 'other' },
];

const defaultValues: PartnershipInformation = {
  referralSource: '',
  partnershipReason: '',
  additionalInformation: '',
};

const PartnershipStep = () => {
  const router = useRouter();

  const form = useForm<PartnershipInformation>({
    mode: 'onTouched',
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('declaration'))
        )}
      >
        <StepHeading
          title="Partnership Information"
          description="Tell us about your partnership interests"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <RadioGroup
            name="referralSource"
            label="How did you hear about OneStopRx?"
            options={referralOptions}
          />

          <Textarea
            name="partnershipReason"
            label="Why would you like to partner with OneStopRx?"
            isRequired
            placeholder="Enter reason here..."
            validation={{ required: 'Please tell us why you want to partner' }}
          />

          <Textarea
            name="additionalInformation"
            label="Additional Information (Optional)"
            placeholder="Enter any other information you may have here..."
          />
        </div>

        <StepActions slug="partnership" />
      </form>
    </FormProvider>
  );
};

export default PartnershipStep;
