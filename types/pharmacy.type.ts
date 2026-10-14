import { Gender, GovernmentIdType } from './common.type';

export type PharmacyOwner = {
  id: number;
  user_id: number;
  external_owner_id: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  date_of_birth: string;
  address: string;
  state: string;
  city: string;
  government_id_type: GovernmentIdType;
  government_id_document_url: string | null;
  profile_picture_url: string;
  verification_status: string;
  rejection_reason: string | null;
  verified_at: string | null;
  last_synced_at: string;
  created_at: string;
  updated_at: string;
  sync_status: string;
};

export type Pharmacy = {
  id: number;
  external_pharmacy_id: number;
  name: string;
  email: string;
  phone: string;
  smart_match_enabled: boolean;
  rating: string;
  total_ratings: number;
  status: string;
  pharmacy_lga: string;
  pharmacy_landmark: string;
  pharmacy_postal_code: string;
  business_verification_status: string;
  admin_verification_notes: string | null;
  verified_at: string | null;
  sla_accepted_at: string | null;
  created_at: string;
  updated_at: string;
  owner_id: number;
  company_logo_url: string | null;
  cac_certificate_url: string | null;
  pharmacist_license_url: string | null;
  pharmacy_info_completed: boolean;
  pharmacy_info_completed_at: string | null;
  sync_status: string;
  last_synced_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  user_type: 'pharmacy';
  external_user_type: string | null;
  external_user_id: string | null;
  external_token_expires_at: string | null;
  external_user_name: string | null;
  sync_status: string;
  last_synced_at: string;
  profile_data: unknown | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;

  pharmacy_id: number | null;
  pharmacy_role: string | null;
  joined_pharmacy_at: string | null;

  first_name: string;
  last_name: string;
  gender: Gender | null;
  date_of_birth: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  profile_image_url: string | null;
  govt_id_number: string | null;
  govt_id_type: string | null;

  profile_completed: boolean;
  profile_completed_at: string | null;

  pharmacy_owner: PharmacyOwner | null;
};

export type CurrentUserInfo = {
  owner: PharmacyOwner;
  pharmacy: Pharmacy;
  user: User;
};
