import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('email');
    t.string('password');
  },
});

export const types = [User];
