import { ReactNode } from 'react';
import TopBar from '@/components/TopBar';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6f7]">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
