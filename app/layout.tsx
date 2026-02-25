// © AIRX (individual business). All rights reserved.
import './globals.css';
import TopBar from '@/components/ui/topbar';

export const metadata = {
  title: 'LOOKUP9',
  description: 'LOOKUP9 management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // server-side session read can be implemented in layout server component if needed
  return (
    <html lang="ko">
      <body>
        <TopBar companyName="LOOKUP9" isSuper={false} />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

