// © AIRX (individual business). All rights reserved.
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSessionFromCookies } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  // get session from cookie header
  const cookieHeader = req.headers.get('cookie');
  const session = getSessionFromCookies(cookieHeader);
  if (!session) return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) return NextResponse.json({ error: 'not found' }, { status: 404 });

  // enforce company scope
  if (session.type === 'INTERNAL') {
    if (session.activeCompanyId !== doc.companyId && session.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
    // internal can access if company matches
    return NextResponse.json({ fileUrl: doc.fileUrl });
  } else {
    // guest: only if GuestSiteAccess exists and isPublicToGuest true
    const guestId = session.userId;
    const access = await prisma.guestSiteAccess.findFirst({
      where: { guestId, siteId: doc.siteId, companyId: doc.companyId }
    });
    if (!access || !doc.isPublicToGuest) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    return NextResponse.json({ fileUrl: doc.fileUrl });
  }
}
