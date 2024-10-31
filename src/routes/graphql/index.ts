import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';
import { MemberTypeObject } from './types/member-type.js';
import { SchemaTypeName } from './constants.js';
import { Context } from './types/context.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          prisma,
        },
      });
    },
  });
};

const rootQuery = new GraphQLObjectType<unknown, Context>({
  name: SchemaTypeName.ROOT_QUERY_TYPE,
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberTypeObject))),
      resolve: async (_source, _args, ctx) => await ctx.prisma.memberType.findMany(),
    },
  }),
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: rootQuery,
});

export default plugin;
