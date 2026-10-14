export type PharmacySession = {
  id: number;
  session_id: string;
  pharmacy_name: string;
  staff_name: string;
  status: 'active' | 'inactive';
  created_at: string;
};

export type Medication = {
  id: number;
  drug_name: string;
  generic_name: string;
  manufacturer: string;
  strength: string;
  unit_price: number;
  available_stock: number;
  image_url: string | null;
};

export type AddMedication = {
  session_id: string;
  medication_id: number;
  quantity: number;
};
