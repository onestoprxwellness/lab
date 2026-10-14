import DashboardLayout from '@/components/dashboard-layout';

const DLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DLayout;
