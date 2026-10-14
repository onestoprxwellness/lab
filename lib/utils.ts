import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CompleteUrlOptions, ParamsMap } from '@/types/api.type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';

export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';

const replaceUrlParams = (url: string, paramsMap: ParamsMap) => {
  let replaced = url;

  const keys = Object.keys(paramsMap);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = paramsMap[key];

    replaced = replaced.replace(`:${key}`, value);
  }

  return replaced;
};

export default replaceUrlParams;

export const getCompleteUrl = (url: string, options?: CompleteUrlOptions) => {
  let finalUrl = url;

  // 1️⃣ Replace path params
  if (options?.pathParams) {
    Object.entries(options.pathParams).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  // 2️⃣ Append query params
  if (options?.queryParams) {
    const searchParams = new URLSearchParams();

    Object.entries(options.queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (queryString) {
      finalUrl += `?${queryString}`;
    }
  }

  return finalUrl;
};
