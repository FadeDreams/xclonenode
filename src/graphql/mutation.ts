import { mutationType } from "nexus";
import { stringArg } from "nexus";
import { hash } from "bcryptjs";



export const Mutation = mutationType({
  definition(t) {
    t.boolean("register", {
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      resolve: async (_, { email, password, name }, ctx) => {
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
  },
});
