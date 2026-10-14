'use client';

import Image from 'next/image';

import { useSignOut } from '@/hooks/useSignOut';
import { cn } from '@/lib/utils';
import Popover from './popover';
import SvgIcon from './svg-icon';

interface IProfileActionsButtonProps {
  hideOnMobile?: boolean;
  className?: string;
}

const ProfileActionsButton = ({
  hideOnMobile,
  className,
}: IProfileActionsButtonProps) => {
  const signOut = useSignOut();
  return (
    <Popover
      trigger={
        <div
          className={cn(
            'gap-2 w-full mt-5 lg:m-0 flex px-4 items-center lg:border-l border-app-border ',
            hideOnMobile && 'hidden lg:flex ',
            className
          )}
        >
          <div className="flex gap-6 w-full text-left lg:flex-row-reverse item-center">
            <div className="relative w-10 h-10 aspect-square ">
              <Image
                src={'/assets/logo-favicon.png'}
                alt={'profile picture'}
                fill
                className="w-full h-full bg-brand-gray-200 rounded-full"
                sizes="100%"
              />
            </div>

            <div>
              <p className="h4-semibold capitalize dark:text-gray-50">Name</p>
              <p className="main-body-regular text-brand-gray-600 text-a-12 dark:text-gray-400 whitespace-nowrap">
                Address
              </p>
            </div>
          </div>

          <SvgIcon name="nav-arrow-down" className={`h-[24px] w-[24px] `} />
        </div>
      }
      collisionPadding={20}
      className="shadow-sm w-full min-w-50 border "
    >
      <div className="option-menu">
        <button onClick={signOut} className="text-red-600">
          <SvgIcon name="logout" className={`h-6 w-6 `} />

          <p>Sign out</p>
        </button>
      </div>
    </Popover>
  );
};

export default ProfileActionsButton;
