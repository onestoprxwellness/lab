import { Metadata } from 'next';

import IconsPage from '@/components/icon-page';

export const metadata: Metadata = {
  title: 'Icons',
};
const page = () => {
  return <IconsPage />;
};

export default page;
