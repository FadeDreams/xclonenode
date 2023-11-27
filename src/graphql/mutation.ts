import { mutationType, nonNull, stringArg } from "nexus";
import { compare } from "bcryptjs";
import { MyContext } from '../dto/idto';

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
          throw new Error("User not found");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // You can set some values in the session to indicate the user is logged in if needed
        ctx.req.session.userId = user.id;

        return true;
      },
    });
  },
});
