import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { UUIDType } from './uuid.js';
import { MemberTypeObject } from './member-type.js';
import { PostObject } from './post.js';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: SchemaTypeName.MEMBER_TYPE_ID,
  values: {
    [MemberTypeId.BASIC]: {
      value: MemberTypeId.BASIC,
    },
    [MemberTypeId.BUSINESS]: {
      value: MemberTypeId.BUSINESS,
    },
  },
});

export const MemberId = new GraphQLNonNull(MemberTypeIdEnum);

export const ProfileObject = new GraphQLObjectType({
  name: SchemaTypeName.PROFILE,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberTypeObject),
    },
  }),
});

export const UserObject = new GraphQLObjectType({
  name: SchemaTypeName.USER,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: ProfileObject,
    },
    post: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostObject))),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserObject))),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserObject))),
    },
  }),
});
