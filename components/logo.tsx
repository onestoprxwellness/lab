import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative w-40 h-10">
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
