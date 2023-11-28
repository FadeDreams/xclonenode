import { mutationType, nonNull, stringArg } from "nexus";
import { compare } from "bcryptjs";
import { MyContext } from '../dto/idto';
import * as constatns from '../constants';
import { hash } from "bcryptjs";
import { User } from './types'



export const Mutation = mutationType({
  definition(t) {
    // Registration Mutation
    t.boolean("register", {
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (_, { email, password, name }, ctx: MyContext) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });
        return true;
      },
    });

    // Login Mutation
    t.boolean("login", {
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, ctx: MyContext) => {
        const user = await ctx.prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error(constatns.INVALID_CREDENTIALS);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          throw new Error(constatns.INVALID_CREDENTIALS);
        }

        // You can set some values in the session to indicate the user is logged in if needed
        ctx.req.session.userId = user.id;

        return true;
      },
    });

    // Logout Mutation
    t.boolean("logout", {
      resolve: async (_, __, ctx: MyContext) => {
        // Clear the session data to log the user out
        ctx.req.session = null;

        return true;
      },
    });

    // IsAuthenticated Query
    t.field("isAuth", {
      type: User,
      resolve: async (_, __, ctx: MyContext) => {
        // Check if the user is authenticated
        if (!ctx.req.session.userId) {
          return null;
        }

        // If the user is authenticated, return the user
        const user = await ctx.prisma.user.findUnique({ where: { id: ctx.req.session.userId } });

        // Convert the id to a string
        user.id = user.id.toString();

        return user;
      },
    });
  },
});
