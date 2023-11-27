import { mutationType } from "nexus";
import { stringArg } from "nexus";
import { hash } from "bcryptjs";
import { MyContext } from '../dto/idto';

export const Mutation = mutationType({
  definition(t) {
    t.boolean("register", {
      args: {
        email: stringArg(),
        password: stringArg(),
        name: stringArg(),
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
  },
});
