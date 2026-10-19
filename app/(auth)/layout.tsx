import Link from 'next/link';
import { ReactNode } from 'react';

import Logo from '@/components/logo';
import { routes } from '@/lib/routes';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen overflow-y-auto bg-background px-4 py-16 sm:pt-26">
      <div className="mx-auto flex w-full max-w-90 flex-col">
        <Link
          href={routes.signIn()}
          aria-label="OneStopRx home"
          className="mx-auto mb-5 block w-max transition-opacity hover:opacity-70"
        >
          <Logo className="h-8 w-36" />
        </Link>

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
