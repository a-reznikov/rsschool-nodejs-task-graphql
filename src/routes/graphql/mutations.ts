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
import {
  DTOChangePostInput,
  DTOCreatePostInput,
  DTOPayloadChangePostInput,
  DTOPayloadCreatePostInput,
  PostObject,
} from './types/post.js';
import { RequiredUUID } from './types/uuid.js';

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
    createPost: {
      type: new GraphQLNonNull(PostObject),
      args: {
        dto: {
          type: DTOCreatePostInput,
        },
      },
      resolve: async (_source, { dto }: { dto: DTOPayloadCreatePostInput }, ctx) =>
        await ctx.prisma.post.create({
          data: dto,
        }),
    },
    changePost: {
      type: new GraphQLNonNull(PostObject),
      args: {
        id: {
          type: RequiredUUID,
        },
        dto: {
          type: DTOChangePostInput,
        },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: DTOPayloadChangePostInput },
        ctx,
      ) =>
        await ctx.prisma.post.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
  }),
});
