import { mutationType, nonNull, stringArg } from "nexus";
import { compare } from "bcryptjs";
import { MyContext } from '../dto/idto';
import * as constatns from '../constants';
import { hash } from "bcryptjs";
import { User, Tweet } from './types'

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

    // GetAllUsers Mutation
    t.list.field("getAllUsers", {
      type: User,
      resolve: async (_, __, ctx: MyContext) => {
        // Get all users
        const users = await ctx.prisma.user.findMany();

        // Convert the ids to strings
        // users.forEach(user => {
        //   user.id = user.id.toString();
        // });

        return users;
      },
    });

    // Create Tweet Mutation
    t.field("createTweet", {
      type: Tweet,
      args: {
        content: nonNull(stringArg()),
      },
      resolve: async (_, { content }, ctx: MyContext) => {
        // Check if the user is authenticated
        if (!ctx.req.session.userId) {
          throw new Error(constatns.NOT_AUTHENTICATED);
        }

        // Create the tweet
        const tweet = await ctx.prisma.tweet.create({
          data: {
            content,
            user: {
              connect: {
                id: ctx.req.session.userId,
              },
            },
          },
        });

        return tweet;
      },
    });

    // Get Tweets Mutation
    t.list.field("getTweets", {
      type: Tweet,
      resolve: async (_, __, ctx: MyContext) => {
        // Check if the user is authenticated
        if (!ctx.req.session.userId) {
          throw new Error(constatns.NOT_AUTHENTICATED);
        }

        // Get tweets for the authenticated user
        const tweets = await ctx.prisma.tweet.findMany({
          where: {
            user: {
              id: ctx.req.session.userId,
            },
          },
        });

        return tweets;
      },
    });
    t.field("deleteTweet", {
      type: Tweet,
      args: {
        tweetId: nonNull(stringArg()),
      },
      resolve: async (_, { tweetId }, ctx: MyContext) => {
        // Check if the user is authenticated
        if (!ctx.req.session.userId) {
          throw new Error(constatns.NOT_AUTHENTICATED);
        }

        // Find the tweet by ID
        const tweet = await ctx.prisma.tweet.findUnique({
          where: {
            id: tweetId,
          },
        });

        // Check if the tweet exists
        if (!tweet) {
          throw new Error("Tweet not found");
        }

        // Check if the authenticated user owns the tweet
        if (tweet.userId !== ctx.req.session.userId) {
          throw new Error("Unauthorized: You don't own this tweet");
        }

        // Delete the tweet
        const deletedTweet = await ctx.prisma.tweet.delete({
          where: {
            id: tweetId,
          },
        });

        return deletedTweet;
      },
    });
  },
});
