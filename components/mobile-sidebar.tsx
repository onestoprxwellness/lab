'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import logoDark from '@/public/assets/logo-dark.svg';
import logo from '@/public/assets/logo.svg';
import { IconName } from '@/types/svg-icon.type';
import { usePathname } from 'next/navigation';
import { menu, toolsMenu } from './dashboard-layout';
import ProfileActionsButton from './profile-action-button';
import SvgIcon from './svg-icon';

const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (route: string) => {
    return route === routes.home()
      ? pathname === route
      : pathname.startsWith(route);
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsOpen(false), 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className=" isolate z-90">
      <button
        className="rounded-full p-2 bg-foreground lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SvgIcon name="menu" className="w-6 h-6 dark:text-primary" />
      </button>

      <div
        className={cn(
          'blurred-bg fixed top-0 left-0 w-screen h-screen hidden -z-1 lg:hidden',
          isOpen && 'block'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'bg-background fixed top-0 right-0  max-w-150 transition-transform w-full h-lvh overflow-y-auto flex flex-col justify-between item-stretch lg:hidden pb-16 border-l',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center p-5 sticky top-0  default-bg-color">
            <Link href={routes.home()}>
              <Image src={logo} alt="logo" className="w-28.75 dark:hidden" />
              <Image
                src={logoDark}
                alt="logo"
                className="w-28.75 hidden dark:flex"
              />
            </Link>

            <div className="flex gap-3 items-center">
              <button
                className="bg-background h-max w-max rounded-[50%]"
                onClick={() => setIsOpen(false)}
                data-test="close-menu"
              >
                <SvgIcon
                  name="close"
                  className="w-10 h-10 dark:text-gray-300"
                />
              </button>
            </div>
          </div>

          <ul className="flex flex-col gap-3 border-y-2">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={cn(
                    'flex gap-3 items-center justify-start w-full p-5',
                    isActive(item.link) &&
                      'bg-active-link text-primary dark:text-white'
                  )}
                  data-test={item.label}
                >
                  <SvgIcon
                    name={item.svg as IconName}
                    className={`h-[24px] w-[24px] ${isActive(item.link) && 'text-primary'}`}
                  />
                  <p>{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3 border-b-2">
            {toolsMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={cn(
                    'flex gap-3 items-center justify-start w-full p-5',
                    isActive(item.link) &&
                      'bg-active-link text-primary dark:text-white'
                  )}
                  data-test={item.label}
                >
                  <SvgIcon
                    name={item.svg as IconName}
                    className={`h-[24px] w-[24px] ${isActive(item.link) && 'text-primary'}`}
                  />
                  <p>{item.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ProfileActionsButton className="max-lg:border-t pt-6" />
      </aside>
    </div>
  );
};

export default MobileSideBar;
