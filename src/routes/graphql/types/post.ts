import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { UUIDType } from './uuid.js';

export const PostObject = new GraphQLObjectType({
  name: SchemaTypeName.POST,
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
