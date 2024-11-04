import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from './constants.js';
import {
  DTOChangeUserInput,
  DTOCreateUserInput,
  DTOPayloadChangeUserInput,
  DTOPayloadCreateUserInput,
  UserObject,
} from './types/user.js';
import { Context } from './types/context.js';
import {
  DTOChangeProfileInput,
  DTOCreateProfileInput,
  DTOPayloadChangeProfileInput,
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
import { RequiredString } from './types/common.js';

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
    changeProfile: {
      type: new GraphQLNonNull(ProfileObject),
      args: {
        id: {
          type: RequiredUUID,
        },
        dto: {
          type: DTOChangeProfileInput,
        },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: DTOPayloadChangeProfileInput },
        ctx,
      ) =>
        await ctx.prisma.profile.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
    changeUser: {
      type: new GraphQLNonNull(UserObject),
      args: {
        id: {
          type: RequiredUUID,
        },
        dto: {
          type: DTOChangeUserInput,
        },
      },
      resolve: async (
        _source,
        { id, dto }: { id: string; dto: DTOPayloadChangeUserInput },
        ctx,
      ) =>
        await ctx.prisma.user.update({
          where: {
            id,
          },
          data: dto,
        }),
    },
    deleteUser: {
      type: RequiredString,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) => {
        await ctx.prisma.user.delete({
          where: {
            id,
          },
        });

        return 'User has been deleted.';
      },
    },
    deletePost: {
      type: RequiredString,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) => {
        await ctx.prisma.post.delete({
          where: {
            id,
          },
        });

        return 'Post has been deleted.';
      },
    },
    deleteProfile: {
      type: RequiredString,
      args: {
        id: {
          type: RequiredUUID,
        },
      },
      resolve: async (_source, { id }: { id: string }, ctx) => {
        await ctx.prisma.profile.delete({
          where: {
            id,
          },
        });

        return 'Profile has been deleted.';
      },
    },
    subscribeTo: {
      type: RequiredString,
      args: {
        userId: {
          type: RequiredUUID,
        },
        authorId: {
          type: RequiredUUID,
        },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        ctx,
      ) => {
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId,
              },
            },
          },
        });

        return 'User has been subscribed to author';
      },
    },
    unsubscribeFrom: {
      type: RequiredString,
      args: {
        userId: {
          type: RequiredUUID,
        },
        authorId: {
          type: RequiredUUID,
        },
      },
      resolve: async (
        _source,
        { userId, authorId }: { userId: string; authorId: string },
        ctx,
      ) => {
        await ctx.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
        });

        return 'User has been unsubscribed from author';
      },
    },
  }),
});
