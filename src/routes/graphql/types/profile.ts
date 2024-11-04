import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { MemberId, MemberTypeIdEnum, MemberTypeObject } from './member-type.js';
import { Context } from './context.js';
import { profileSchema } from '../../profiles/schemas.js';
import { Static } from '@sinclair/typebox';
import { RequiredBoolean, RequiredInt } from './common.js';

export type ProfileProps = Static<typeof profileSchema>;

export const ProfileObject = new GraphQLObjectType<ProfileProps, Context>({
  name: SchemaTypeName.PROFILE,
  fields: () => ({
    id: {
      type: RequiredUUID,
    },
    isMale: {
      type: RequiredBoolean,
    },
    yearOfBirth: {
      type: RequiredInt,
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

export const CreateProfileInput = new GraphQLInputObjectType({
  name: SchemaTypeName.CREATE_PROFILE_INPUT,
  fields: () => ({
    isMale: {
      type: RequiredBoolean,
    },
    yearOfBirth: {
      type: RequiredInt,
    },
    userId: {
      type: RequiredUUID,
    },
    memberTypeId: {
      type: MemberId,
    },
  }),
});

export const DTOCreateProfileInput = new GraphQLNonNull(CreateProfileInput);
export type DTOPayloadCreateProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: SchemaTypeName.CHANGE_PROFILE_INPUT,
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeIdEnum,
    },
  }),
});

export const DTOChangeProfileInput = new GraphQLNonNull(ChangeProfileInput);
export type DTOPayloadChangeProfileInput = {
  isMale?: boolean;
  yearOfBirth?: number;
  memberTypeId?: string;
};
