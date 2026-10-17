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
