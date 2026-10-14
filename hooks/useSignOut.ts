import { usePathname, useRouter } from 'next/navigation';

import { routes } from '@/lib/routes';
import { cookieStorage } from '@/utils/cookies';

export const useSignOut = (aFunction?: () => void) => {
  const router = useRouter();

  const pathname = usePathname();

  const signOut = () => {
    cookieStorage.clearAll();
    aFunction?.();
    return router.push(`${routes.signIn()}?redirectTo=${pathname}`);
  };

  return signOut;
};
