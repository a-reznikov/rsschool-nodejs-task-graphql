import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { SchemaTypeName } from '../constants.js';
import { MemberTypeId } from '../../member-types/schemas.js';

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

export const MemberTypeObject = new GraphQLObjectType({
  name: SchemaTypeName.MEMBER_TYPE,
  fields: () => ({
    id: {
      type: MemberId,
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
