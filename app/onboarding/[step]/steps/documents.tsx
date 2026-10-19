'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import FileUpload from '@/components/form/file-upload';
import StepActions from '@/components/onboarding/step-actions';
import StepHeading from '@/components/onboarding/step-heading';
import { routes } from '@/lib/routes';
import { DocumentUpload } from '@/types/onboarding.types';

const defaultValues: DocumentUpload = {
  cacCertificate: [],
  registrationCertificate: [],
  accreditationCertificate: [],
  operatingLicence: [],
  indemnityCover: [],
  otherDocuments: [],
};

const DocumentsStep = () => {
  const router = useRouter();

  const form = useForm<DocumentUpload>({ mode: 'onTouched', defaultValues });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          router.push(routes.onboarding('technology'))
        )}
      >
        <StepHeading
          title="Document Upload"
          description="Upload the relevant documents required to verify your laboratory"
        />

        <div className="mt-a-30 flex flex-col gap-a-30">
          <FileUpload
            name="cacCertificate"
            label="CAC Certificate"
            isRequired
          />

          <FileUpload
            name="registrationCertificate"
            label="Regulatory Registration Certificate"
            isRequired
          />

          <FileUpload
            name="accreditationCertificate"
            label="Accreditation Certificate"
            isRequired
          />

          <FileUpload
            name="operatingLicence"
            label="Operating Licence"
            isRequired
          />

          <FileUpload
            name="indemnityCover"
            label="Professional Indemnity Cover"
            isRequired
          />

          <FileUpload
            name="otherDocuments"
            label="Other Regulatory/Certification Documents (Optional)"
            multiple
          />
        </div>

        <StepActions slug="documents" />
      </form>
    </FormProvider>
  );
};

export default DocumentsStep;
