import { GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { RequiredString } from './common.js';

export const PostObject = new GraphQLObjectType({
  name: SchemaTypeName.POST,
  fields: () => ({
    id: {
      type: RequiredUUID,
    },
    title: {
      type: RequiredString,
    },
    content: {
      type: RequiredString,
    },
  }),
});
