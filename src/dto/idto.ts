import express from 'express';
import { myPrismaClient } from '../db';
import { Session, SessionData } from 'express-session';
import Redis from 'ioredis';


export interface MySession extends Session, SessionData {
  userId?: string;
}

export interface MyContext {
  req: express.Request;
  res: express.Response;
  prisma: typeof myPrismaClient;
  session: MySession;
  redis: Redis;
}
