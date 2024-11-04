import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { PostObject } from './post.js';
import { Context } from './context.js';
import { ProfileObject } from './profile.js';
import { userSchema } from '../../users/schemas.js';
import { Static } from '@sinclair/typebox';

export type UserProps = Static<typeof userSchema>;

export const UserObject: GraphQLObjectType = new GraphQLObjectType<UserProps, Context>({
  name: SchemaTypeName.USER,
  fields: () => ({
    id: {
      type: RequiredUUID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: ProfileObject,
      resolve: async ({ id }, _args, ctx) =>
        await ctx.prisma.profile.findUnique({
          where: {
            userId: id,
          },
        }),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostObject))),
      resolve: async ({ id }, _args, ctx) =>
        await ctx.prisma.post.findMany({
          where: {
            authorId: {
              equals: id,
            },
          },
        }),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserObject))),
      resolve: async ({ id }, _args, ctx) =>
        await ctx.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: {
                  equals: id,
                },
              },
            },
          },
        }),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserObject))),
      resolve: async ({ id }, _args, ctx) =>
        await ctx.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: {
                  equals: id,
                },
              },
            },
          },
        }),
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: SchemaTypeName.CREATE_USER_INPUT,
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export const DTOCreateUserInput = new GraphQLNonNull(CreateUserInput);
export type DTOPayloadCreateUserInput = {
  name: string;
  balance: number;
};
