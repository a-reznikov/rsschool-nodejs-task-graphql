import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { RootQueryType } from './queries.js';
import { Mutations } from './mutations.js';
import depthLimit from 'graphql-depth-limit';
import { isErrorObject } from './utils/typeguards.js';

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
      try {
        const graphQlErrors = validate(schema, parse(req.body.query), [depthLimit(5)]);

        if (graphQlErrors.length) {
          return { errors: graphQlErrors };
        }
      } catch (error) {
        if (isErrorObject(error)) {
          throw fastify.httpErrors.badRequest(error.message);
        }

        throw new Error('Unknown error');
      }

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

export const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});

export default plugin;
