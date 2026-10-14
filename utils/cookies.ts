const DEFAULT_EXPIRY_MS = 6 * 60 * 60 * 1000; // 6 hours

const saveToCookie = (
  key: string,
  value: unknown,
  expireTime?: number,
  noExpire?: boolean
) => {
  if (typeof document === 'undefined') return;

  // No expiry (session cookie)
  if (noExpire) {
    document.cookie = `${key}=${value};path=/`;
    return;
  }

  const expirationDate = new Date();

  // Use provided expireTime OR fallback to default
  const expiryMs =
    typeof expireTime === 'number'
      ? expireTime
      : Date.now() + DEFAULT_EXPIRY_MS;

  expirationDate.setTime(expiryMs);

  document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
};

const getFromCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=');
      if (cookieKey === key) {
        return cookieValue;
      }
    }
    return null;
  }
};

const clearCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1270 00:00:00 GMT;path=/`;
  }
};

const clearAllCookies = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieKey] = cookie.split('=');
      document.cookie = `${cookieKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
};

export const cookieStorage = {
  set: saveToCookie,
  get: getFromCookie,
  clear: clearCookie,
  clearAll: clearAllCookies,
};
