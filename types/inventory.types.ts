export interface PaginatedInventoryData {
  current_page: number;
  data: InventoryItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
export interface InventoryItem {
  id: number;
  pharmacy_id: number;
  drug_name: string;
  generic_name: string;
  brand_name: string;
  manufacturer: string;
  batch_number: string;
  nafdac_number: string;
  expiry_date: string;
  manufacture_date: string;
  quantity_available: number;
  quantity_reserved: number;
  unit_price: string;
  unit_type: string;
  strength: string;
  dosage_form: string;
  barcode: string;
  qr_code: string;
  requires_prescription: boolean;
  reorder_level: number;
  auto_reorder_enabled: boolean;
  storage_conditions: string[];
  last_updated_at: string;
  created_at: string;
  updated_at: string;
  pharmacy: Pharmacy;
}

export interface Pharmacy {
  id: number;
  name: string;
  pcn_license: string;
  cac_certificate: string;
  pharmacist_name: string;
  pharmacist_license: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  lga: string;
  latitude: string;
  longitude: string;
  delivery_enabled: boolean;
  delivery_radius_km: number;
  delivery_fee: string;
  smart_match_enabled: boolean;
  rating: string;
  total_ratings: number;
  status: 'pending' | 'approved' | 'rejected'; // Adjust based on known statuses
  verified_at: string | null;
  sla_accepted_at: string | null;
  operating_hours: OperatingHour[];
  verification_documents: string[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface OperatingHour {
  day: string;
  open: string;
  close: string;
}
