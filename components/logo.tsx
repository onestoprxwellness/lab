import Image from 'next/image';

import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('relative w-40 h-10', className)}>
      <Image
        src="/assets/logo.svg"
        alt="logo"
        fill
        sizes="100%"
        className="object-contain dark:hidden"
      />

      <Image
        src="/assets/logo-dark.svg"
        alt="logo"
        fill
        sizes="100%"
        className="object-contain hidden dark:block"
      />
    </div>
  );
};

export default Logo;
