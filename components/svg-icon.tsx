import { SVGProps } from 'react';

import { cn } from '@/lib/utils';
import { IconName } from '@/types/svg-icon.type';

interface ISvgProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

const SvgIcon = ({ name, className, ...props }: ISvgProps) => {
  return (
    <svg fill="currentColor" {...props} className={cn('w-5 h-5', className)}>
      <use xlinkHref={`/assets/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
