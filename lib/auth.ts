import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-secret';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

export type SessionUser = {
  id: string;
  role: string;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: SessionUser): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as SessionUser;
  } catch (err) {
    return null;
  }
}

/**
 * Authenticate a user using email/password. Throws if invalid credentials.
 */
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    throw new Error('Invalid credentials');
  }
  return user;
}