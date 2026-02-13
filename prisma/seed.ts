import { prisma } from '../lib/db';
import { hashPassword } from '../lib/auth';
import { Role } from '@prisma/client';

async function main() {
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL;
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.log('ADMIN_DEFAULT_EMAIL or ADMIN_DEFAULT_PASSWORD not set. Skip seeding admin.');
    return;
  }
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }
  const passwordHash = await hashPassword(adminPassword);
  await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin',
      role: Role.ADMIN,
      passwordHash
    }
  });
  console.log('Admin user created:', adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });