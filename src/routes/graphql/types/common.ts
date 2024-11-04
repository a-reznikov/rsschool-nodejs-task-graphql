import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export const RequiredFloat = new GraphQLNonNull(GraphQLFloat);
export const RequiredInt = new GraphQLNonNull(GraphQLInt);
export const RequiredBoolean = new GraphQLNonNull(GraphQLBoolean);
export const RequiredString = new GraphQLNonNull(GraphQLString);
