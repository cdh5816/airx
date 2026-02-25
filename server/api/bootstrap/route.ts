// © AIRX (individual business). All rights reserved.
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const token = process.env.SUPER_ADMIN_BOOTSTRAP_TOKEN;
  const body = await req.json();
  if (!token || body.token !== token) {
    return NextResponse.json({ error: 'invalid token' }, { status: 401 });
  }

  const existing = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
  if (existing) return NextResponse.json({ error: 'super exists' }, { status: 409 });

  const company = await prisma.company.create({ data: { name: 'LOOKUP9 HQ' } });
  const passwordHash = await hashPassword(body.password || 'SuperPass123!');
  const user = await prisma.user.create({
    data: {
      username: body.username || 'super',
      passwordHash,
      role: 'SUPER_ADMIN',
      companyId: company.id,
      mustChangePassword: false
    }
  });

  return NextResponse.json({ ok: true, userId: user.id, companyId: company.id });
}
