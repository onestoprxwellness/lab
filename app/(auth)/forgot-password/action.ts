'use server';

import { cookies } from 'next/headers';

import { ApiResponse } from '@/types/api.type';
import { RESET_EMAIL_COOKIE } from '@/utils/constants';

export async function requestPasswordReset(
  email: string
): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const cookie = await cookies();

  cookie.set(RESET_EMAIL_COOKIE, email, {
    httpOnly: true,
    maxAge: 60 * 15,
    path: '/',
  });

  return { success: true, message: `We’ve sent a reset token to ${email}` };
}
