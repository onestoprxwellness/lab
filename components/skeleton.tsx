import { cn } from '@/lib/utils';

export interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <span
    aria-hidden="true"
    className={cn('block animate-pulse rounded-full bg-foreground', className)}
  />
);

export default Skeleton;
