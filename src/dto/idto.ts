import express from 'express';
import { myPrismaClient } from '../db';

export interface MyContext {
  req: express.Request;
  res: express.Response;
  prisma: typeof myPrismaClient;
}
