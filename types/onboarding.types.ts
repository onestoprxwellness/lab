export interface LaboratoryInformation {
  laboratoryName: string;
  registeredName: string;
  laboratoryType: string;
  yearEstablished: string;
  corporateRegistrationNumber: string;
  regulatoryBody: string;
  facilityRegistrationNumber: string;
  registrationStatus: string;
  registrationDate: string;
  registrationExpiryDate: string;
}

export interface LocationCoverage {
  coverage: string;
  state: string;
  lga: string;
  streetAddress: string;
  postalCode: string;
}

export interface Accreditation {
  hasAccreditation: string;
  accreditationBody: string;
  accreditationNumber: string;
  accreditationExpiryDate: string;
}

export interface DocumentUpload {
  cacCertificate: File[];
  registrationCertificate: File[];
  accreditationCertificate: File[];
  operatingLicence: File[];
  indemnityCover: File[];
  otherDocuments: File[];
}

export interface TechnologyCapability {
  dashboardCapability: string;
  dailyCapacity: string;
  turnaroundTime: string;
  turnaroundUnit: string;
  defaultOpenTime: string;
  defaultCloseTime: string;
  specificDays: { day: string; open: string; close: string }[];
}

export interface ContactInformation {
  fullName: string;
  role: string;
  phoneNumber: string;
  email: string;
  practicingLicense: string;
  licenseExpiryDate: string;
}
