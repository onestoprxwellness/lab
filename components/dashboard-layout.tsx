'use client';

import ProfileActionsButton from '@/components/profile-action-button';
import SvgIcon from '@/components/svg-icon';
import ThemeToggle from '@/components/theme-toggle';
import { routes } from '@/lib/routes';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

import ShowView from '@/components/show-view';
import logo from '@/public/assets/logo.svg';
import textLogo from '@/public/assets/text-logo.png';
import { DATE_FORMAT_MDY } from '@/utils/constants';

import logoDark from '@/public/assets/logo-dark.svg';
import { IconName } from '@/types/svg-icon.type';
import MobileSideBar from './mobile-sidebar';

export const menu = [
  {
    label: 'Overview',
    link: routes.home(),
    svg: 'dashboard-circle',
  },
  // {
  //   label: 'Prescriptions',
  //   link: routes.prescriptions(),
  //   svg: 'file-01',
  // },
  // {
  //   label: 'Inventory',
  //   link: routes.inventory(),
  //   svg: 'inventory',
  // },
  // {
  //   label: 'Transactions',
  //   link: routes.transactions(),
  //   svg: 'money',
  // },
];

export const toolsMenu = [
  {
    label: 'Settings',
    link: routes.home(),
    svg: 'settings',
  },
  // {
  //   label: 'Help Center',
  //   link: '#',
  //   svg: 'help',
  // },
  // {
  //   label: 'Refer Family & Friends',
  //   link: '#',
  //   svg: 'gift',
  // },
];

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Readonly<Props>) => {
  const [expanded, setExpanded] = useState(false);

  const location = usePathname();

  const isActive = (route: string) => {
    return route === routes.home()
      ? location === route
      : location.startsWith(route);
  };

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();

  return (
    <div className="flex">
      <aside
        className={`hidden transition-[width] h-lvh custom-scrollbar bg-background relative duration-200 gap-12 overflow-y-auto overflow-x-hidden
           lg:flex flex-col justify-between h4-medium border-app-border border-r ease-linear
           ${expanded ? 'w-80' : ' w-21.25'} 
      `}
      >
        <div className="flex flex-col gap-10 ">
          <div className="sticky w-full top-0 pb-4 pt-5 px-4 ">
            <Link href={routes.home()} className="flex gap-2">
              <div className="relative aspect-square w-10 h-10">
                <Image
                  src="/assets/logo-favicon.png"
                  alt="logo"
                  className={`h-10 w-10 block'`}
                  sizes="100%"
                  fill
                />
              </div>

              <Image
                src={textLogo}
                alt="one stop"
                className={`w-24 h-7 self-end dark:invert  ${!expanded && 'scale-0'}`}
                sizes="100%"
              />
            </Link>

            <button
              aria-label={expanded ? 'contract sidebar' : 'expand sidebar'}
              onClick={() => setExpanded(!expanded)}
              className={`absolute right-1 -bottom-4 `}
            >
              <SvgIcon
                name={expanded ? 'arrow-left-filled' : 'arrow-right-filled'}
                className="w-6 h-6"
                stroke="bg-primary "
              />
            </button>
          </div>

          <ul className="flex flex-col gap-3  px-4">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={` 
                  hover:bg-active-link/90  p-3 duration-100 grid grid-flow-col auto-cols-auto
                 ${isActive(item.link) && 'bg-active-link text-primary dark:text-white'} 
                 ${expanded ? 'gap-3 items-center justify-start w-full rounded-[100px]' : 'max-w-12 w-12.5 rounded-[50%]'} `}
                  data-test={item.label}
                >
                  <SvgIcon
                    name={item.svg as IconName}
                    className={`h-6 w-6 ${isActive(item.link) && 'dark:text-primary'} `}
                  />

                  <p
                    className={`${expanded ? 'flex-1' : 'scale-0'} whitespace-nowrap`}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3 px-4">
            {toolsMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  target={item.label === 'Help Center' ? '_blank' : '_self'}
                  className={` 
                 hover:bg-active-link/90  p-3 duration-100 grid grid-flow-col auto-cols-auto
                ${isActive(item.link) && 'bg-active-link text-primary dark:text-white'} 
                ${expanded ? 'gap-3 items-center justify-start w-full rounded-[100px]' : 'max-w-12 w-12.5 rounded-[50%]'} `}
                  data-test={item.label}
                >
                  <SvgIcon
                    name={item.svg as IconName}
                    className={`h-[24px] w-[24px] ${isActive(item.link) && 'dark:text-primary'} `}
                  />

                  <p
                    className={`${expanded ? 'flex-1' : 'scale-0'} whitespace-nowrap`}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={` 
                p-3 duration-100 grid grid-flow-col auto-cols-auto ml-2 mb-4
                ${expanded ? 'gap-3 items-center justify-start w-full' : 'max-w-12 w-12.5  rounded-50'}
                `}
        >
          <div className="p-3 rounded-full h-max bg-active-link">
            <ShowView when={expanded}>
              <SvgIcon name="calendar" className={`h-[24px] w-[24px] `} />
            </ShowView>
            <ShowView when={!expanded}>
              <p className="font-medium text-a-16">{dayOfMonth}</p>
            </ShowView>
          </div>

          <div
            className={`${expanded ? 'flex-1' : 'scale-0'} whitespace-nowrap`}
          >
            <p className="main-body-regular">Today&apos;s Date</p>
            <p className="font-medium">{dayjs().format(DATE_FORMAT_MDY)}</p>
          </div>
        </div>
      </aside>

      <div className={`grow h-screen w-full bg-foreground overflow-y-auto`}>
        <div className="p-6 bg-background border-b border-app-border flex justify-between lg:justify-end items-center sticky top-0 z-10">
          <Link href={routes.home()} className="lg:hidden">
            <Image src={logo} alt="logo" className="w-28.75 dark:hidden" />
            <Image
              src={logoDark}
              alt="logo"
              className="w-28.75 hidden dark:flex"
            />
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <button className="rounded-full p-2 bg-foreground">
                <SvgIcon name="notification" className="w-5 h-5" />
              </button>
            </div>

            <ProfileActionsButton hideOnMobile />

            <MobileSideBar />
          </div>
        </div>

        <main className="pb-10">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
