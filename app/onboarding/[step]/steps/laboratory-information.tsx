'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import DateInput from '@/components/form/date-input';
import Input from '@/components/form/input';
import RadioGroup from '@/components/form/radio-group';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import { routes } from '@/lib/routes';
import { LaboratoryInformation } from '@/types/onboarding.types';

const laboratoryTypes = [
  { label: 'Medical Laboratory', value: 'medical_laboratory' },
  { label: 'Diagnostic Centre', value: 'diagnostic_centre' },
  { label: 'Hospital Laboratory', value: 'hospital_laboratory' },
  { label: 'Specialist Laboratory', value: 'specialist_laboratory' },
  { label: 'Others', value: 'others' },
];

const registrationStatuses = [
  { label: 'Active/Valid', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Expired', value: 'expired' },
];

const defaultValues: LaboratoryInformation = {
  laboratoryName: '',
  registeredName: '',
  laboratoryType: '',
  yearEstablished: '',
  corporateRegistrationNumber: '',
  regulatoryBody: '',
  facilityRegistrationNumber: '',
  registrationStatus: '',
  registrationDate: '',
  registrationExpiryDate: '',
};

const LaboratoryInformationStep = () => {
  const router = useRouter();

  const form = useForm<LaboratoryInformation>({
    mode: 'onTouched',
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('contact-information'))
        )}
      >
        <StepHeading
          title="Laboratory (Organisation) Information"
          description="Tell us about your laboratory (organisation)"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <Input
            styleType="boxed"
            size="lg"
            name="laboratoryName"
            label="Laboratory Name"
            isRequired
            icon="home-04"
            placeholder="ABC Diagnostic Centre"
            validation={{ required: 'Please enter the laboratory name' }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="registeredName"
            label="Registered Business/Organization Name"
            isRequired
            icon="file-01"
            placeholder="ABC Diagnostic Centre"
            validation={{
              required: 'Please enter the registered business name',
            }}
          />

          <RadioGroup
            name="laboratoryType"
            label="Laboratory Type"
            isRequired
            inline
            options={laboratoryTypes}
            validation={{ required: 'Please select the laboratory type' }}
          />

          <DateInput
            name="yearEstablished"
            label="Year Established"
            isRequired
            displayFormat="D MMMM, YYYY"
            disabledDays={{ after: new Date() }}
            validation={{ required: 'Please select when it was established' }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="corporateRegistrationNumber"
            label="Corporate Registration Number"
            isRequired
            icon="card"
            placeholder="RC1234567"
            validation={{
              required: 'Please enter the corporate registration number',
            }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="regulatoryBody"
            label="Regulatory Body"
            isRequired
            icon="user-tag"
            placeholder="Medical Laboratory Science Council of Nigeria"
            validation={{ required: 'Please enter the regulatory body' }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="facilityRegistrationNumber"
            label="Facility Registration Number"
            isRequired
            icon="card"
            placeholder="Facility Registration Number"
            validation={{
              required: 'Please enter the facility registration number',
            }}
          />

          <RadioGroup
            name="registrationStatus"
            label="Registration Status"
            isRequired
            inline
            options={registrationStatuses}
            validation={{ required: 'Please select the registration status' }}
          />

          <div className="grid gap-a-30 sm:grid-cols-2 sm:gap-4">
            <DateInput
              name="registrationDate"
              label="Registration/Renewal Date"
              isRequired
              disabledDays={{ after: new Date() }}
              validation={{ required: 'Please select the registration date' }}
            />

            <DateInput
              name="registrationExpiryDate"
              label="Expiry Date"
              isRequired
              validation={{
                required: 'Please select the expiry date',
                validate: (value, values) =>
                  !values.registrationDate ||
                  value > values.registrationDate ||
                  'Expiry date must be after the registration date',
              }}
            />
          </div>
        </div>

        <StepActions slug="laboratory-information" />
      </form>
    </FormProvider>
  );
};

export default LaboratoryInformationStep;
