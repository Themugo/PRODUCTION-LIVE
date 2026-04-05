// lib/db.js
import { PrismaClient } from '@prisma/client';

let prisma;

// Avoid multiple instances in development
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export { prisma };
