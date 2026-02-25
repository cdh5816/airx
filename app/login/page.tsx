// © AIRX (individual business). All rights reserved.
'use client';
import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) window.location.href = '/';
    else alert('로그인 실패');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <div className="mb-6 flex items-center justify-center">
          <img src="/logo.svg" alt="LOOKUP9" className="h-12" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="w-full border px-3 py-2 rounded" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
          <button className="w-full bg-[#1B3FAE] hover:bg-[#162F86] text-white py-2 rounded">로그인</button>
        </form>
      </div>
    </div>
  );
}
