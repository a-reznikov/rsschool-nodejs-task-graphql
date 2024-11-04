import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from './constants.js';
import {
  DTOCreateUserInput,
  DTOPayloadCreateUserInput,
  UserObject,
} from './types/user.js';
import { Context } from './types/context.js';
import {
  DTOCreateProfileInput,
  DTOPayloadCreateProfileInput,
  ProfileObject,
} from './types/profile.js';

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
    createProfile: {
      type: new GraphQLNonNull(ProfileObject),
      args: {
        dto: {
          type: DTOCreateProfileInput,
        },
      },
      resolve: async (_source, { dto }: { dto: DTOPayloadCreateProfileInput }, ctx) =>
        await ctx.prisma.profile.create({
          data: dto,
        }),
    },
  }),
});
