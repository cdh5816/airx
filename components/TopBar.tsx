'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    // 서버에 로그아웃 API가 있으면 그걸 쓰고,
    // 없으면 쿠키 만료 처리용 API 추가하면 됨.
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.replace('/login');
    router.refresh();
  }

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="font-semibold tracking-tight">
            AIRX 업무관리
          </Link>

          <nav className="hidden sm:flex items-center gap-1 text-sm text-gray-600">
            <Link
              href="/dashboard"
              className={`px-3 py-1.5 rounded-lg hover:bg-gray-100 ${
                isActive('/dashboard') ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              대시보드
            </Link>
            <Link
              href="/sites"
              className={`px-3 py-1.5 rounded-lg hover:bg-gray-100 ${
                isActive('/sites') ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              현장
            </Link>
            <Link
              href="/production"
              className={`px-3 py-1.5 rounded-lg hover:bg-gray-100 ${
                isActive('/production') ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              생산관리
            </Link>
            <Link
              href="/notifications"
              className={`px-3 py-1.5 rounded-lg hover:bg-gray-100 ${
                isActive('/notifications') ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              알람
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="h-9 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm flex items-center gap-2"
            title="알람"
          >
            <span aria-hidden>🔔</span>
            <span className="hidden sm:inline">알람</span>
          </Link>

          <button
            onClick={handleLogout}
            className="h-9 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
