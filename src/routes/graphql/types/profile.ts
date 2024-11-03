import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { RequiredUUID } from './uuid.js';
import { MemberTypeObject } from './member-type.js';

export const ProfileObject = new GraphQLObjectType({
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
    },
  }),
});
