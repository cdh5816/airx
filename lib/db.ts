import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client.
 *
 * In development, the PrismaClient is re-used across module reloads to
 * prevent exhausting database connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}