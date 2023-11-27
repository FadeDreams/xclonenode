import { makeSchema } from 'nexus';
import { join } from 'path';

import Query from './query';
import { Mutation } from './mutation';

const schema = makeSchema({
  types: [Query, Mutation], // Include your query type here
  outputs: {
    schema: join(__dirname, '../schema.graphql'),
    typegen: join(__dirname, '../nexus-typegen.ts'),
  },
});

export default schema;
