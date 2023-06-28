'use strict';

const responseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  }
};

module.exports = async function HealthRoutes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/liveness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for liveness',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({ data: { message: 'I am alive!' } });
    }
  });

  fastify.route({
    method: 'GET',
    url: '/readiness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for readiness',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({ data: { message: 'I am ready!' } });
    }
  });

  return fastify;
};
