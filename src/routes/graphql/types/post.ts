import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';

export const PostObject = new GraphQLObjectType({
  name: SchemaTypeName.POST,
  fields: () => ({
    id: {
      type: RequiredUUID,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
