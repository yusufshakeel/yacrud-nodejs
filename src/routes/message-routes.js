'use strict';

const messageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    message: {
      type: 'string'
    },
    createdAt: {
      type: 'string',
      format: 'date-time'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time'
    }
  }
};

const createMessageSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  }
};

const patchMessageSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['message'],
      properties: {
        message: {
          type: 'string'
        }
      }
    }
  }
};

const messagesResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          items: {
            ...messageSchema
          }
        }
      }
    }
  }
};

const messageResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        message: {
          ...messageSchema
        }
      }
    }
  }
};

const idResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }
};

module.exports = async function MessagesRoutes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/messages',
    schema: {
      tags: ['APIs'],
      description: 'Fetch all the messages.',
      response: {
        200: messagesResponseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          messages: [
            {
              id: 'af94356f-8ef8-41fd-b46d-fa23af83058b',
              message: 'Hello, World!',
              createdAt: '2023-06-28T17:30:51.439Z',
              updatedAt: '2023-06-28T17:30:51.439Z'
            }
          ]
        }
      });
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
        200: messageResponseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          message: {
            id: 'af94356f-8ef8-41fd-b46d-fa23af83058b',
            message: 'Hello, World!',
            createdAt: '2023-06-28T17:30:51.439Z',
            updatedAt: '2023-06-28T17:30:51.439Z'
          }
        }
      });
    }
  });

  fastify.route({
    method: 'POST',
    url: '/messages',
    schema: {
      tags: ['APIs'],
      description: 'Create a new message.',
      body: createMessageSchema,
      response: {
        200: idResponseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          id: 'af94356f-8ef8-41fd-b46d-fa23af83058b'
        }
      });
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
        200: idResponseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          id: 'af94356f-8ef8-41fd-b46d-fa23af83058b'
        }
      });
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
        200: idResponseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          id: 'af94356f-8ef8-41fd-b46d-fa23af83058b'
        }
      });
    }
  });

  return fastify;
};
