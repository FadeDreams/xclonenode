import { makeSchema } from 'nexus';
import { join } from 'path';
import Query from './query';

const schema = makeSchema({
  types: [Query], // Include your query type here
  outputs: {
    schema: join(__dirname, '../schema.graphql'),
    typegen: join(__dirname, '../nexus-typegen.ts'),
  },
});

export default schema;
