import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Role } from '@prisma/client';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력하세요.' }, { status: 400 });
    }
    const user = await authenticateUser(email, password);
    // Generate JWT and set cookie
    const token = generateToken({ id: user.id, role: user.role });
    // Determine redirect path
    let redirect = '/dashboard';
    if (user.role === Role.CUSTOMER) {
      const sites = await prisma.site.findMany({ where: { customerId: user.id }, select: { id: true } });
      if (sites.length === 1) {
        redirect = `/sites/${sites[0].id}`;
      } else {
        redirect = `/sites`;
      }
    }
    const res = NextResponse.json({ success: true, redirect }, { status: 200 });
    res.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return res;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }
}