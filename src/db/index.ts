import { Prisma, PrismaClient } from '@prisma/client';

export const myPrismaClient = new PrismaClient({ log: ['info', 'query', 'warn', 'error'] });

