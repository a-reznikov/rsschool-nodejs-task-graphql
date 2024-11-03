import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { PostObject } from './post.js';
import { Context } from './context.js';
import { ProfileObject } from './profile.js';

export const UserObject: GraphQLObjectType = new GraphQLObjectType<unknown, Context>({
  name: SchemaTypeName.USER,
  fields: () => ({
    id: {
      type: RequiredUUID,
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
