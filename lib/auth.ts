// © AIRX (individual business). All rights reserved.
import { cookies } from 'next/headers';
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const INTERNAL_SECRET = process.env.INTERNAL_AUTH_SECRET!;
const GUEST_SECRET = process.env.GUEST_AUTH_SECRET!;

export type SessionPayload = {
  userId: string;
  companyId?: string;
  role?: string;
  type: 'INTERNAL' | 'GUEST';
  activeCompanyId?: string | null;
};

export function signInternalSession(payload: SessionPayload) {
  return jwt.sign(payload, INTERNAL_SECRET, { expiresIn: '8h' });
}

export function signGuestSession(payload: SessionPayload) {
  return jwt.sign(payload, GUEST_SECRET, { expiresIn: '8h' });
}

export function verifyInternalSession(token: string) {
  return jwt.verify(token, INTERNAL_SECRET) as SessionPayload;
}

export function verifyGuestSession(token: string) {
  return jwt.verify(token, GUEST_SECRET) as SessionPayload;
}

export async function setSessionCookie(res: any, token: string, type: 'INTERNAL' | 'GUEST') {
  // In App Router, set cookie via Response headers in API routes.
  // Helper provided for server handlers.
  const cookieName = type === 'INTERNAL' ? 'lookup9_internal' : 'lookup9_guest';
  res.headers.append('Set-Cookie', `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`);
}

export async function hashPassword(plain: string) {
  return await hash(plain, 10);
}

export async function verifyPassword(plain: string, hashed: string) {
  return await compare(plain, hashed);
}

// helper to get session from request cookies (server-side)
export function getSessionFromCookies(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const cookiesObj: Record<string,string> = {};
  cookieHeader.split(';').forEach((c) => {
    const [k,v] = c.split('=').map(s=>s.trim());
    if (k && v) cookiesObj[k] = v;
  });
  if (cookiesObj['lookup9_internal']) {
    try { return verifyInternalSession(cookiesObj['lookup9_internal']); } catch { return null; }
  }
  if (cookiesObj['lookup9_guest']) {
    try { return verifyGuestSession(cookiesObj['lookup9_guest']); } catch { return null; }
  }
  return null;
}
