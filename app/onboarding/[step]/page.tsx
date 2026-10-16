import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

import {
  getStepIndex,
  onboardingSteps,
  OnboardingStepSlug,
} from '@/lib/onboarding-steps';
import AccreditationStep from './steps/accreditation';
import ContactInformationStep from './steps/contact-information';
import DocumentsStep from './steps/documents';
import LaboratoryInformationStep from './steps/laboratory-information';
import LocationCoverageStep from './steps/location-coverage';
import PendingStep from './steps/pending-step';
import TechnologyStep from './steps/technology';

const stepComponents: Partial<Record<OnboardingStepSlug, ComponentType>> = {
  'laboratory-information': LaboratoryInformationStep,
  'contact-information': ContactInformationStep,
  'location-coverage': LocationCoverageStep,
  accreditation: AccreditationStep,
  documents: DocumentsStep,
  technology: TechnologyStep,
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

  const { slug } = onboardingSteps[stepIndex];
  const Step = stepComponents[slug];

  return Step ? <Step /> : <PendingStep slug={slug} />;
};

export default OnboardingStepPage;
