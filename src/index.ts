import express from 'express';
import schema from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';

const gate = async () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
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
