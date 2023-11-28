import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('password');
  },
});

export const Tweet = objectType({
  name: 'Tweet',
  definition(t) {
    t.string('id');
    t.string('content');
    t.string('createdAt');
    t.field('user', {
      type: 'User',
      resolve: async (parent, args, context) => {
        return context.prisma.tweet.findUnique({ where: { id: parent.id } }).user();
      },
    });
  },
});

export const types = [User, Tweet];
