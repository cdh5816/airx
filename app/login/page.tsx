'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '로그인에 실패했습니다.');
      }

      router.replace(data.redirect ?? '/dashboard');
    } catch (err: any) {
      setError(err?.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6f7] px-4">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              AIRX 업무관리
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              사내 업무 시스템에 로그인하세요
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                아이디 (Email)
              </label>
              <input
                id="email"
                type="text"   // 🔥 @ 없어도 가능
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#03c75a] focus:border-[#03c75a]
                           transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#03c75a] focus:border-[#03c75a]
                           transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#03c75a] hover:bg-[#02b351]
                         text-white text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-xs text-gray-400 text-center">
            관리자 계정은 환경변수로 자동 생성됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
