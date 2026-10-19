export const onboardingSteps = [
  { slug: 'laboratory-information', title: 'Laboratory Information' },
  { slug: 'contact-information', title: 'Contact Information' },
  { slug: 'location-coverage', title: 'Location & Service Coverage' },
  { slug: 'accreditation', title: 'Accreditation & Verification' },
  { slug: 'documents', title: 'Document Upload' },
  { slug: 'technology', title: 'Technology & Dashboard Capability' },
  { slug: 'partnership', title: 'Partnership Information' },
  { slug: 'declaration', title: 'Declaration & Submission' },
] as const;

export type OnboardingStepSlug = (typeof onboardingSteps)[number]['slug'];

export const getStepIndex = (slug?: string) =>
  onboardingSteps.findIndex((step) => step.slug === slug);
