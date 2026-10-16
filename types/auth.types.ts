export interface SignInResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    user_type: string;
    profile_data: {
      hospital: string;
      specialization: string;
      medical_license: string;
    };
    is_active: boolean;
    last_login_at: string;
    created_at: string;
    updated_at: string;
    roles: string[];
  };
  token: string;
  token_type: string;
  expires_in: number;
}

export interface SignIn {
  username: string;
  password: string;
}

export interface SignUpArgs {
  pharmacy_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export interface SignUpResponse {
  token: string;
  external_token: string;
  user: {
    id: 37;
    external_user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: 'pharmacy';
    sync_status: string;
  };

  pharmacy: {
    id: number;
    name: string;
  };
}

export interface SignUpErrorResponse {
  success?: false;
  message: string;
  errors: Record<string, string[]>;
}
