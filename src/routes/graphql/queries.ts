import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from './types/context.js';
import { SchemaTypeName } from './constants.js';
import { MemberId, MemberTypeObject } from './types/member-type.js';
import { UserObject } from './types/user.js';
import { RequiredUUID } from './types/uuid.js';

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
  }),
});
