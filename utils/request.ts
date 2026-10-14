import { ApiResponse } from '@/types/api.type';
import axios, { AxiosError } from 'axios';

type ErrorShape = {
  message?: string;
  response?: {
    data?: unknown;
  };
};

export const extractErrorMessage = (err: unknown): string => {
  if (typeof err !== 'object' || err === null) {
    return 'Something went wrong, please try again.';
  }

  if (typeof err === 'string') {
    try {
      // err = JSON.parse(err) as unknown;
    } catch {
      return err as string;
    }
  }

  const maybeAxiosError = err as { response?: { data?: unknown } };
  const responseData = maybeAxiosError.response?.data;

  if (typeof responseData === 'object' && responseData !== null) {
    const resp = responseData as Record<string, unknown>;

    if (Array.isArray(resp.errors)) {
      const first = resp.errors[0];
      if (typeof first === 'object' && first !== null) {
        const firstKey = Object.keys(first)[0];
        const value = (first as Record<string, unknown>)[firstKey];
        if (Array.isArray(value) && typeof value[0] === 'string') {
          return value[0];
        }
      }
    }

    const possible =
      (resp.message &&
      typeof resp.message === 'object' &&
      'message' in resp.message
        ? (resp.message as Record<string, unknown>).message
        : undefined) ||
      (resp.error && typeof resp.error === 'object' && 'message' in resp.error
        ? (resp.error as Record<string, unknown>).message
        : undefined) ||
      (typeof resp.message === 'string' ? resp.message : undefined) ||
      (typeof resp.error === 'string' ? resp.error : undefined) ||
      (typeof resp.data === 'object' && resp.data !== null
        ? ((resp.data as Record<string, unknown>).message as string | undefined)
        : undefined);

    if (typeof possible === 'string') return possible;
  }

  if ('message' in err && (err as ErrorShape)) {
    return (err as { message: string }).message;
  }

  return 'Something went wrong, please try again.';
};

const extractErrorsMessage = (
  data: Record<string, unknown>
): string | undefined => {
  const errors = data.errors;

  if (!errors) return undefined;

  // Shape: { errors: { email: ['msg'], name: ['msg'] } }
  if (typeof errors === 'object' && !Array.isArray(errors)) {
    const firstKey = Object.keys(errors as Record<string, unknown>)[0];
    const firstValue = (errors as Record<string, unknown[]>)[firstKey];
    if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') {
      return firstValue[0];
    }
  }

  // Shape: { errors: [{ email: ['msg'] }] }
  if (Array.isArray(errors)) {
    const first = errors[0];
    if (typeof first === 'object' && first !== null) {
      const firstKey = Object.keys(first)[0];
      const value = (first as Record<string, unknown>)[firstKey];
      if (Array.isArray(value) && typeof value[0] === 'string') {
        return value[0];
      }
    }
  }

  return undefined;
};

export const normalizeToSuccess = <T>(
  response: ApiResponse<T>,
  message?: string
): ApiResponse<T> => {
  return {
    ...response,
    success: true,
    message: message ?? response.message ?? extractErrorMessage(response),
  };
};

export const normalizeToError = (
  error: unknown,
  fallbackMessage = 'Something went wrong'
): ApiResponse<never> => {
  const err = error as ErrorShape;

  console.log(
    err,
    err.response?.data,
    err.message,
    axios.isAxiosError(error),
    'normalize error'
  );

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<Record<string, unknown>>;
    const data = axiosError.response?.data;

    const errorsMessage = data
      ? extractErrorsMessage(data as Record<string, unknown>)
      : undefined;

    return {
      success: false,
      error:
        errorsMessage ??
        (data as Record<string, string>)?.error ??
        (data as Record<string, string>)?.message ??
        axiosError.message ??
        fallbackMessage,
      message:
        errorsMessage ??
        (data as Record<string, string>)?.message ??
        fallbackMessage,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      message: error.message,
    };
  }

  if (typeof error === 'string') {
    return {
      success: false,
      error,
      message: error,
    };
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;

    const errorsMessage = extractErrorsMessage(err);

    const errStr =
      errorsMessage ??
      (typeof err.error === 'string' ? err.error : undefined) ??
      (typeof err.message === 'string' ? err.message : undefined) ??
      fallbackMessage;

    return {
      success: false,
      error: errStr,
      message:
        errorsMessage ??
        (typeof err.message === 'string' ? err.message : undefined) ??
        fallbackMessage,
    };
  }

  return {
    success: false,
    error: fallbackMessage,
    message: fallbackMessage,
  };
};
export const inferFilename = (
  endpoint: string,
  contentType: string
): string => {
  const lower = endpoint.toLowerCase();
  if (lower.includes('pdf') || contentType.includes('pdf')) return 'export.pdf';
  if (lower.includes('excel') || contentType.includes('spreadsheet'))
    return 'export.xlsx';
  return 'export';
};
