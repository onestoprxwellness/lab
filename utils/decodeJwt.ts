type JwtPayload = {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
};

export const decodeJwt = (token: string): JwtPayload => {
  const payload = token.split('.')[1];

  const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

  return JSON.parse(decoded);
};
