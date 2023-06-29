'use strict';

const {
  errorResponseSchema,
  createMessageSchema,
  patchMessageSchema,
  messagesResponseSchema,
  messageResponseSchema,
  idResponseSchema
} = require('../schemas/message-schema');

module.exports = async function MessagesRoutes(fastify, { controllers }) {
  fastify.route({
    method: 'POST',
    url: '/messages',
    schema: {
      tags: ['APIs'],
      description: 'Create a new message.',
      body: createMessageSchema,
      response: {
        200: idResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.messageController.createMessage({
        message: request.body.data.message
      });
      responseHandler(result, reply);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/messages',
    schema: {
      tags: ['APIs'],
      description: 'Fetch all the messages.',
      response: {
        200: messagesResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.messageController.fetchAllMessages();
      responseHandler(result, reply);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/messages/:messageId',
    schema: {
      tags: ['APIs'],
      description: 'Fetch a messages by messageId.',
      params: {
        type: 'object',
        required: ['messageId'],
        properties: {
          messageId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: messageResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.messageController.fetchMessageByMessageId({
        messageId: request.params.messageId
      });
      responseHandler(result, reply);
    }
  });

  fastify.route({
    method: 'PATCH',
    url: '/messages/:messageId',
    schema: {
      tags: ['APIs'],
      description: 'Patch a message by messageId.',
      body: patchMessageSchema,
      params: {
        type: 'object',
        required: ['messageId'],
        properties: {
          messageId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: idResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.messageController.updateMessageByMessageId({
        messageId: request.params.messageId,
        message: request.body.data.message
      });
      responseHandler(result, reply);
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/messages/:messageId',
    schema: {
      tags: ['APIs'],
      description: 'Delete a message by messageId.',
      params: {
        type: 'object',
        required: ['messageId'],
        properties: {
          messageId: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        200: idResponseSchema,
        400: errorResponseSchema,
        500: errorResponseSchema
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.messageController.deleteMessageByMessageId({
        messageId: request.params.messageId
      });
      responseHandler(result, reply);
    }
  });

  const responseHandler = (result, reply) => {
    if (result.error) {
      return reply.code(result.code).send(result);
    }
    reply.code(200).send(result);
  };

  return fastify;
};
