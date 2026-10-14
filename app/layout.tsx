import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { Toaster } from 'sonner';

import OfflineScreen from '@/components/offline';
import { ThemeProvider } from '@/components/theme-provider';

import '../styles/globals.css';

const font = Onest({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Onestop RX', template: '%s | Onestop RX' },
  description: 'Add meta description here',
  icons: '/assets/logo-favicon.png',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <OfflineScreen />
        </ThemeProvider>

        <Toaster position="top-right" expand richColors />
      </body>
    </html>
  );
}
