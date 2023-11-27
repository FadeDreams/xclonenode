import { queryType } from 'nexus';

const Query = queryType({
  definition(t) {
    t.string('hello', {
      resolve: () => 'Hello, World!',
    });
  },
});

export default Query;
