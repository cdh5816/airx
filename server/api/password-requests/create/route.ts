// © AIRX (individual business). All rights reserved.
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, getSessionFromCookies } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const cookieHeader = req.headers.get('cookie');
  const session = getSessionFromCookies(cookieHeader);
  if (!session || session.type !== 'INTERNAL') return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const newHash = await hashPassword(body.newPassword);
  const pcr = await prisma.passwordChangeRequest.create({
    data: {
      companyId: session.activeCompanyId || session.companyId || '',
      requesterUserId: session.userId,
      newPasswordHash: newHash,
      status: 'PENDING'
    }
  });

  // create notification to approver(s) - simplified: find MID or SUPER depending on role
  // ... omitted for brevity

  return NextResponse.json({ ok: true, id: pcr.id });
}
