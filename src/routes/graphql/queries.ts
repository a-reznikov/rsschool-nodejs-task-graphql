import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from './types/context.js';
import { SchemaTypeName } from './constants.js';
import { MemberId, MemberTypeObject } from './types/member-type.js';
import { UserObject } from './types/user.js';
import { RequiredUUID } from './types/uuid.js';
import { PostObject } from './types/post.js';
import { ProfileObject } from './types/profile.js';

export const rootQuery = new GraphQLObjectType<unknown, Context>({
  name: SchemaTypeName.ROOT_QUERY_TYPE,
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberTypeObject))),
      resolve: async (_source, _args, ctx) => await ctx.prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberTypeObject,
      args: {
        id: {
          type: MemberId,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) =>
        await ctx.prisma.memberType.findUnique({
          where: {
            id,
          },
        }),
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserObject))),
      resolve: async (_source, _args, ctx) => await ctx.prisma.user.findMany(),
    },
    user: {
      type: UserObject,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) =>
        await ctx.prisma.user.findUnique({
          where: {
            id,
          },
        }),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostObject))),
      resolve: async (_source, _args, ctx) => await ctx.prisma.post.findMany(),
    },
    post: {
      type: PostObject,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) =>
        await ctx.prisma.post.findUnique({
          where: {
            id,
          },
        }),
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileObject))),
      resolve: async (_source, _args, ctx) => await ctx.prisma.profile.findMany(),
    },
    profile: {
      type: ProfileObject,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) =>
        await ctx.prisma.profile.findUnique({
          where: {
            id,
          },
        }),
    },
  }),
});
