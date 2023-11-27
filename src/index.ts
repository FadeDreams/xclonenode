import express from 'express';
import schema from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';
import { myPrismaClient } from './db';
import { MyContext } from './dto/idto'

const gate = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const prismaClnt = myPrismaClient;
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req, res }): MyContext => {
      return { req, res, prisma: prismaClnt };
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
