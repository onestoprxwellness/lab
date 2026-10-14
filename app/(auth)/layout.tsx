import Logo from '@/components/logo';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen overflow-y-auto bg-background p-6 py-20">
      <div className="px-5 py-6 sm:py-10 rounded-3xl shadow-lg  w-full max-w-a-500 m-auto grid gap-3">
        <div className="mx-auto w-max mb-3">
          <Logo />
        </div>

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
