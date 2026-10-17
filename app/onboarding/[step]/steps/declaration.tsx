'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import SvgIcon from '@/components/svg-icon';
import { routes } from '@/lib/routes';
import { Declaration } from '@/types/onboarding.types';

const declarations: {
  name: keyof Declaration;
  title: string;
  paragraphs: string[];
  agreement: string;
}[] = [
  {
    name: 'acceptDataProcessing',
    title: 'Data Processing Agreement',
    paragraphs: [
      'As a OneStopRx laboratory partner, your laboratory will process patient personal data, including test results and contact information, in connection with bookings made through the platform.',
      "By proceeding, your laboratory agrees to handle this data in accordance with the Nigeria Data Protection Act (NDPA) and OneStopRx's Data Processing Agreement, including limiting its use of patient contact information to fulfilling the booking.",
    ],
    agreement: 'I have read and accept the Data Processing Agreement.',
  },
  {
    name: 'acceptNonCircumvention',
    title: 'Non-Circumvention Undertaking',
    paragraphs: [
      'Patient contact information shared with your laboratory through OneStopRx is provided solely to fulfil the specific booking.',
      'Your laboratory agrees not to contact a OneStopRx patient to solicit bookings, payments, or services outside the OneStopRx platform.',
      'Remedy: A breach of this undertaking may result in suspension or termination of laboratory partner status, in addition to any other remedy available to OneStopRx.',
    ],
    agreement: 'I agree to the Non-Circumvention Undertaking above.',
  },
  {
    name: 'acceptDeclaration',
    title: 'Declaration',
    paragraphs: [
      'I confirm that the information provided in this application is accurate and that the documents submitted belong to the laboratory identified in this application.',
      'I understand that submission of this application does not guarantee approval as a OneStopRx laboratory partner.',
      'I understand that OneStopRx may contact my laboratory to verify the information provided and request additional documentation where necessary.',
    ],
    agreement: 'I agree to the declaration above.',
  },
];

const defaultValues: Declaration = {
  acceptDataProcessing: false,
  acceptNonCircumvention: false,
  acceptDeclaration: false,
};

const DeclarationStep = () => {
  const router = useRouter();

  const form = useForm<Declaration>({ defaultValues });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          toast.success('Your application has been submitted');
          router.replace(routes.home());
        })}
      >
        <StepHeading
          title="Declaration & Submission"
          description="Please read the following carefully before submitting"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          {declarations.map(({ name, title, paragraphs, agreement }) => (
            <div key={name}>
              <div className="rounded-xl bg-foreground p-4">
                <p className="text-a-14 font-medium text-main-title-3">
                  {title}
                </p>

                <div className="mt-a-14 flex flex-col gap-4 text-a-14 leading-5 text-sub-title-2">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <label className="group relative mt-4 flex cursor-pointer items-center gap-a-10 text-a-14 text-main-title-3">
                <input
                  {...form.register(name, { required: true })}
                  type="checkbox"
                  className="peer sr-only"
                />

                <span className="grid size-4 shrink-0 place-items-center rounded-sm border border-app-border bg-background transition-colors peer-checked:border-primary-700 peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40">
                  <SvgIcon
                    name="mark"
                    className="h-2 w-a-10 text-white opacity-0 group-has-checked:opacity-100"
                  />
                </span>

                {agreement}
              </label>
            </div>
          ))}
        </div>

        <StepActions slug="declaration" submitLabel="Complete & Submit" />
      </form>
    </FormProvider>
  );
};

export default DeclarationStep;
