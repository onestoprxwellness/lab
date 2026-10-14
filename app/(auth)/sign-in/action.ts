'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

import { hmacApi } from '@/lib/api';
import { ApiResponse } from '@/types/api.type';
import { SignIn, SignInResponse } from '@/types/auth.types';
import { decodeJwt } from '@/utils/decodeJwt';

export async function signIn(
  payload: SignIn
): Promise<ApiResponse<SignInResponse>> {
  const cookie = await cookies();
  try {
    const response = await hmacApi.post('/login', payload, {
      withToken: false,
    });

    const token = response.token;

    const extendedToken = response.extendedToken;

    const decodedToken = decodeJwt(token);
    const decodedRefreshToken = decodeJwt(extendedToken);

    const nowInSeconds = Math.floor(Date.now() / 1000);
    const accessTokenMaxAge = decodedToken.exp - nowInSeconds;
    const refreshTokenMaxAge = decodedRefreshToken.exp - nowInSeconds;

    if (token) {
      cookie.set('access_token', token, {
        maxAge: accessTokenMaxAge,
        path: '/',
      });
    }

    if (extendedToken) {
      cookie.set('refresh_token', extendedToken, {
        maxAge: refreshTokenMaxAge,
        path: '/',
      });
    }

    console.log('Permissions', response.user.permissions);

    return {
      ...response,
      success: true,
      message: 'Sign in success, you would be redirected shortly',
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    const axiosErr = error as AxiosError<{ message?: string; error: string }>;

    return { success: false, message: axiosErr.message };
  }
}
