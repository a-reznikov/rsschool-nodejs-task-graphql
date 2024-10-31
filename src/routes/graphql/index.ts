import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, graphql } from 'graphql';

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
      });
    },
  });
};

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    testField: {
      type: GraphQLString,
      resolve: async () => 'Some test text',
    },
  }),
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
});

export default plugin;
