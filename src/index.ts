import express from 'express';
import schema from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';
import { myPrismaClient } from './db';
import { MyContext } from './dto/idto'
import session from 'express-session';
import dotenv from 'dotenv';

import Redis from 'ioredis';
import connectRedis from 'connect-redis';

const gate = async () => {
  dotenv.config();
  const prismaClnt = myPrismaClient;

  const RedisClnt = new Redis();
  // const RedisStore = connectRedis(session);
  const RedisStore = require("connect-redis").default;
  const redisStore = new RedisStore({ client: RedisClnt });


  const app = express();
  app.use(
    session({
      name: 'qid',
      store: redisStore,
      proxy: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: false, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'secret',
      resave: false,
    })
  );

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req, res }): MyContext => {
      return { req, res, prisma: prismaClnt, session: req.session, redis: RedisClnt };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, () => {
    console.log('app listening on port 3000!');
  });

};

gate().catch((err) => {
  console.error(err);
});
