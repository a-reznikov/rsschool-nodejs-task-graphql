import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { UUIDType } from './uuid.js';
import { MemberTypeObject } from './member-type.js';
import { PostObject } from './post.js';
import { Context } from './context.js';

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

export const UserId = new GraphQLNonNull(UUIDType);

export const UserObject: GraphQLObjectType = new GraphQLObjectType<unknown, Context>({
  name: SchemaTypeName.USER,
  fields: () => ({
    id: {
      type: UserId,
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
