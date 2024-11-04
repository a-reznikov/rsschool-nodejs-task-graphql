import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from './constants.js';
import {
  DTOCreateUserInput,
  DTOPayloadCreateUserInput,
  UserObject,
} from './types/user.js';
import { Context } from './types/context.js';

export const Mutations = new GraphQLObjectType<unknown, Context>({
  name: SchemaTypeName.MUTATIONS,
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserObject),
      args: {
        dto: {
          type: DTOCreateUserInput,
        },
      },
      resolve: async (_source, { dto }: { dto: DTOPayloadCreateUserInput }, ctx) =>
        await ctx.prisma.user.create({
          data: dto,
        }),
    },
  }),
});
