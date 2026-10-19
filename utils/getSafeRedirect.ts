import { routes } from '@/lib/routes';

export const getSafeRedirect = (value: string | null) =>
  value?.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')
    ? value
    : routes.home();
