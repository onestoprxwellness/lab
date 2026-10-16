import Link from 'next/link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthFooter = ({ text, linkText, href }: AuthFooterProps) => {
  return (
    <div className="mt-4 border-t-2 border-dashed border-brand-gray-800 pt-4.5">
      <p className="flex flex-wrap justify-center gap-x-2 text-a-14 text-sub-title-2">
        {text}
        <Link href={href} className="font-medium text-primary hover:underline">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
