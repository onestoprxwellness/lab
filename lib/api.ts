import { decrypt, encrypt } from '@/lib/encryption';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

const BASE_URL = process.env.BASE_URL as string;
const APP_ID = process.env.HMAC_APP_ID as string;
const APP_KEY = process.env.HMAC_APP_KEY as string;

const isEncryptionEnabled = false;

const generateNonce = () =>
  Math.random().toString(36).substring(2) +
  Math.random().toString(36).substring(2);

const generateSignature = (nonce: string, timestamp: number): string => {
  if (!BASE_URL || !APP_ID || !APP_KEY) {
    throw new Error('Missing required environment variables for HMAC');
  }
  const signatureData = nonce + timestamp + APP_ID;
  const signature = CryptoJS.HmacSHA256(signatureData, APP_KEY);
  return signature.toString();
};

const createAuthHeaders = async (
  withToken: boolean
): Promise<Record<string, string>> => {
  const cookie = (await cookies()).get('access_token');
  const token = cookie?.value;
  const nonce = generateNonce();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(nonce, timestamp);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Nonce': nonce,
    'X-Timestamp': timestamp.toString(),
    'X-App-Id': APP_ID,
    'X-Signature': signature,
  };

  if (withToken && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hmacApi = {
  async post<T>(
    path: string,
    data: T,
    config?: AxiosRequestConfig & { withToken?: boolean }
  ) {
    try {
      const headers = await createAuthHeaders(config?.withToken ?? true);

      // 🔑 IMPORTANT: allow FormData to override Content-Type
      if (config?.headers?.['Content-Type'] === 'multipart/form-data') {
        delete headers['Content-Type'];
      }

      const payload = isEncryptionEnabled ? encrypt(data) : data;

      const res = await axiosInstance.post(path, payload, {
        ...config,
        headers: {
          ...headers,
          ...config?.headers,
        },
      });

      return isEncryptionEnabled ? decrypt(res.data) : res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async get(path: string, props?: ApiRequestConfig) {
    try {
      const headers = await createAuthHeaders(true);

      const res = await axiosInstance.get(path, { ...props, headers });
      return isEncryptionEnabled ? decrypt(res.data) : res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async put<T>(path: string, data: T) {
    try {
      const headers = await createAuthHeaders(true);
      const payload = isEncryptionEnabled ? encrypt(data) : data;

      const res = await axiosInstance.put(path, payload, { headers });
      return isEncryptionEnabled ? decrypt(res.data) : res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async patch<T>(path: string, data: T) {
    try {
      const headers = await createAuthHeaders(true);
      const payload = isEncryptionEnabled ? encrypt(data) : data;

      const res = await axiosInstance.patch(path, payload, { headers });
      return isEncryptionEnabled ? decrypt(res.data) : res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async download(path: string) {
    try {
      const headers = await createAuthHeaders(true);
      const res = await axiosInstance.get(path, {
        headers,
        responseType: 'arraybuffer',
      });
      return res;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async delete(path: string, payload?: unknown) {
    try {
      const headers = await createAuthHeaders(true);
      const res = await axiosInstance.delete(path, { headers, data: payload });
      return isEncryptionEnabled ? decrypt(res.data) : res.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw error.response.data;
      }
      throw error;
    }
  },

  upload(path: string, formData: FormData) {
    return this.post(path, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withToken: true,
    });
  },
};

export type ApiRequestConfig = AxiosRequestConfig & {
  withToken?: boolean;
};
