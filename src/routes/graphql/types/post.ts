import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
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

export const CreatePostInput = new GraphQLInputObjectType({
  name: SchemaTypeName.CREATE_POST_INPUT,
  fields: () => ({
    title: {
      type: RequiredString,
    },
    content: {
      type: RequiredString,
    },
    authorId: {
      type: RequiredUUID,
    },
  }),
});

export const DTOCreatePostInput = new GraphQLNonNull(CreatePostInput);
export type DTOPayloadCreatePostInput = {
  title: string;
  content: string;
  authorId: string;
};

export const ChangePostInput = new GraphQLInputObjectType({
  name: SchemaTypeName.CHANGE_POST_INPUT,
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  }),
});

export const DTOChangePostInput = new GraphQLNonNull(ChangePostInput);
export type DTOPayloadChangePostInput = {
  title?: string;
  content?: string;
};
