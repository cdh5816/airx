// © AIRX (individual business). All rights reserved.
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSessionFromCookies } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json(); // { id, action: 'APPROVE'|'REJECT', reason? }
  const cookieHeader = req.headers.get('cookie');
  const session = getSessionFromCookies(cookieHeader);
  if (!session || session.type !== 'INTERNAL') return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const pcr = await prisma.passwordChangeRequest.findUnique({ where: { id: body.id } });
  if (!pcr) return NextResponse.json({ error: 'not found' }, { status: 404 });

  // authorization: MID approves ADMIN/STAFF/CLIENT; SUPER approves MID
  // simplified check:
  if (session.role === 'MID_ADMIN' && pcr.companyId !== session.activeCompanyId) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  if (body.action === 'APPROVE') {
    await prisma.user.update({
      where: { id: pcr.requesterUserId },
      data: { passwordHash: pcr.newPasswordHash, mustChangePassword: true }
    });
    await prisma.passwordChangeRequest.update({ where: { id: pcr.id }, data: { status: 'APPROVED', decidedByUserId: session.userId, decidedAt: new Date() } });
    // AuditLog + Notification omitted for brevity
    return NextResponse.json({ ok: true });
  } else {
    await prisma.passwordChangeRequest.update({ where: { id: pcr.id }, data: { status: 'REJECTED', decidedByUserId: session.userId, decidedAt: new Date(), reason: body.reason } });
    return NextResponse.json({ ok: true });
  }
}
