import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

import {
  getStepIndex,
  onboardingSteps,
  OnboardingStepSlug,
} from '@/lib/onboarding-steps';
import AccreditationStep from './steps/accreditation';
import ContactInformationStep from './steps/contact-information';
import DeclarationStep from './steps/declaration';
import DocumentsStep from './steps/documents';
import LaboratoryInformationStep from './steps/laboratory-information';
import LocationCoverageStep from './steps/location-coverage';
import PartnershipStep from './steps/partnership';
import TechnologyStep from './steps/technology';

const stepComponents: Record<OnboardingStepSlug, ComponentType> = {
  'laboratory-information': LaboratoryInformationStep,
  'contact-information': ContactInformationStep,
  'location-coverage': LocationCoverageStep,
  accreditation: AccreditationStep,
  documents: DocumentsStep,
  technology: TechnologyStep,
  partnership: PartnershipStep,
  declaration: DeclarationStep,
};

export const generateStaticParams = () =>
  onboardingSteps.map(({ slug }) => ({ step: slug }));

const OnboardingStepPage = async ({
  params,
}: {
  params: Promise<{ step: string }>;
}) => {
  const { step } = await params;

  const stepIndex = getStepIndex(step);

  if (stepIndex === -1) notFound();

  const Step = stepComponents[onboardingSteps[stepIndex].slug];

  return <Step />;
};

export default OnboardingStepPage;
