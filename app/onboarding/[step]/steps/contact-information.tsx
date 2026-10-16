'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import DateInput from '@/components/form/date-input';
import Input from '@/components/form/input';
import PhoneInput from '@/components/form/phone-input';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import { routes } from '@/lib/routes';
import { ContactInformation } from '@/types/onboarding.types';
import { EMAIL_REGEX, NG_PHONE_REGEX } from '@/utils/constants';

const defaultValues: ContactInformation = {
  fullName: '',
  role: '',
  phoneNumber: '',
  email: '',
  practicingLicense: '',
  licenseExpiryDate: '',
};

const ContactInformationStep = () => {
  const router = useRouter();

  const form = useForm<ContactInformation>({
    mode: 'onTouched',
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('location-coverage'))
        )}
      >
        <StepHeading
          title="Contact Information"
          description="Tell us who we can contact regarding this partnership"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <Input
            styleType="boxed"
            size="lg"
            name="fullName"
            label="Full Name"
            isRequired
            icon="profile"
            autoComplete="name"
            placeholder="John Doe"
            validation={{ required: 'Please enter the full name' }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="role"
            label="Position/Role"
            isRequired
            icon="user-tag"
            autoComplete="organization-title"
            placeholder="Enter Role"
            validation={{ required: 'Please enter the position or role' }}
          />

          <PhoneInput
            name="phoneNumber"
            label="Phone number"
            isRequired
            placeholder="000-0000-000"
            validation={{
              required: 'Please enter the phone number',
              validate: (value: string) =>
                NG_PHONE_REGEX.test(value.replace(/\D/g, '')) ||
                'Please enter a valid phone number',
            }}
          />

          <Input
            styleType="boxed"
            size="lg"
            name="email"
            type="email"
            label="Email"
            isRequired
            icon="sms"
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            validation={{
              required: 'Please enter the email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please enter a valid email',
              },
            }}
          />

          <div className="grid gap-a-30 sm:grid-cols-[1fr_15rem] sm:gap-3">
            <Input
              styleType="boxed"
              size="lg"
              name="practicingLicense"
              label="Practicing License"
              isRequired
              icon="user-id-outline"
              placeholder="Enter License"
              validation={{ required: 'Please enter the practicing license' }}
            />

            <DateInput
              name="licenseExpiryDate"
              label="Expiry Date"
              isRequired
              validation={{ required: 'Please select the expiry date' }}
            />
          </div>
        </div>

        <StepActions slug="contact-information" />
      </form>
    </FormProvider>
  );
};

export default ContactInformationStep;
