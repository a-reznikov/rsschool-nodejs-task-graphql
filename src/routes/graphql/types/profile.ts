import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { MemberTypeObject } from './member-type.js';
import { Context } from './context.js';
import { profileSchema } from '../../profiles/schemas.js';
import { Static } from '@sinclair/typebox';

export type ProfileProps = Static<typeof profileSchema>;

export const ProfileObject = new GraphQLObjectType<ProfileProps, Context>({
  name: SchemaTypeName.PROFILE,
  fields: () => ({
    id: {
      type: RequiredUUID,
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberTypeObject),
      resolve: async ({ id, memberTypeId }, _args, ctx) =>
        await ctx.prisma.memberType.findUnique({
          where: {
            id: memberTypeId,
            profiles: {
              some: {
                id,
              },
            },
          },
        }),
    },
  }),
});
