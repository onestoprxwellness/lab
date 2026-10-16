'use server';

import { cookies } from 'next/headers';

import { ApiResponse } from '@/types/api.type';
import { RESET_EMAIL_COOKIE } from '@/utils/constants';

export async function resetPassword(payload: {
  token: string;
  newPassword: string;
}): Promise<ApiResponse> {
  const cookie = await cookies();
  const email = cookie.get(RESET_EMAIL_COOKIE)?.value;

  if (!email) {
    return {
      success: false,
      message: 'Your reset session has expired, please request a new token',
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  cookie.delete(RESET_EMAIL_COOKIE);

  return {
    success: true,
    message: 'Your password has been reset, please sign in',
  };
}
