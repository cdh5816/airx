// © AIRX (individual business). All rights reserved.
'use client';

import React, { useState } from 'react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || '로그인 실패');
        setLoading(false);
        return;
      }

      // 서버가 mustChangePassword 플래그를 응답으로 줄 경우 처리
      // 예: { ok: true, mustChangePassword: true, redirect: '/account/change-password' }
      if (data.mustChangePassword) {
        window.location.href = '/account/change-password';
        return;
      }

      // SUPER: activeCompanyId 없으면 회사 선택 화면으로 유도(서버가 redirectUrl 제공 권장)
      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('네트워크 오류');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-3">
          <Logo size={48} />
          <h1 className="text-gray-800 font-semibold text-lg">회사 내부 로그인</h1>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">아이디</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B3FAE]"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">비밀번호</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B3FAE]"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-[#1B3FAE] hover:bg-[#162F86] text-white py-2 rounded font-medium disabled:opacity-60"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <a href="/guest/login" className="underline">게스트 로그인</a>
            <a href="/account/forgot-password" className="underline">비밀번호 분실</a>
          </div>
        </form>
      </div>
    </div>
  );
}
