import { hmacApi } from '@/lib/api';
import type { ApiResponse } from '@/types/api.type';
import { normalizeToError } from '@/utils/request';

const debugLog = (path: string, payload: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(path.toUpperCase(), payload);
  }
};

export const buildQuery = (
  params: Record<string, string | number | undefined | null>
): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : '';
};

export const toErrorMessage = (error: unknown, fallback: string): string => {
  const err = error as { message?: string; error?: string } | undefined;
  return err?.message || err?.error || fallback;
};

export async function fetchResource<T>(
  path: string,
  fallback: string
): Promise<ApiResponse<T>> {
  try {
    const response = await hmacApi.get(path);
    debugLog(path, { response });

    return {
      success: response?.status ?? true,
      status: response?.status,
      message: response?.message,
      data: response?.data as T,
    };
  } catch (error) {
    debugLog(path, { error });
    return normalizeToError(error, fallback);
  }
}

export async function postResource<T>(
  path: string,
  payload: unknown,
  fallback: string
): Promise<ApiResponse<T>> {
  try {
    const response = await hmacApi.post(path, payload);
    debugLog(path, { response });

    return {
      success: response?.status ?? true,
      status: response?.status,

      message: response?.message,
      data: response?.data as T,
    };
  } catch (error) {
    debugLog(path, { error });

    return normalizeToError(error, fallback);
  }
}

export async function patchResource<T>(
  path: string,
  payload: unknown,
  fallback: string
): Promise<ApiResponse<T>> {
  try {
    const response = await hmacApi.patch(path, payload);
    debugLog(path, { response });
    return {
      success: response?.status ?? true,
      status: response?.status,
      message: response?.message,
      data: response?.data as T,
    };
  } catch (error) {
    debugLog(path, { error });

    return normalizeToError(error, fallback);
  }
}
export async function putResource<T>(
  path: string,
  payload: unknown,
  fallback: string
): Promise<ApiResponse<T>> {
  try {
    const response = await hmacApi.put(path, payload);
    debugLog(path, { response });
    return {
      success: response?.status ?? true,
      status: response?.status,
      message: response?.message,
      data: response?.data as T,
    };
  } catch (error) {
    debugLog(path, { error });

    return normalizeToError(error, fallback);
  }
}

export async function deleteResource<T>(
  path: string,
  fallback: string,
  payload?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await hmacApi.delete(path, payload);
    debugLog(path, { response });

    return {
      success: response?.status ?? true,
      status: response?.status,
      message: response?.message,
      data: response?.data as T,
    };
  } catch (error) {
    debugLog(path, { error });
    return normalizeToError(error, fallback);
  }
}
