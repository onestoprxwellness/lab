import { cn } from '@/lib/utils';

interface InputFooterTextProps {
  text: string;
  isError?: boolean;
}

const InputFooterText = ({ text, isError }: InputFooterTextProps) => {
  return (
    <small
      className={cn(
        'text-a-12 first-letter:uppercase text-brand-gray-400',
        isError && 'text-red-500'
      )}
    >
      {text}
    </small>
  );
};

export default InputFooterText;
