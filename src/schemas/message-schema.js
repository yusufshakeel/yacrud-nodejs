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

const errorResponseSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'number'
    },
    error: {
      type: 'object',
      properties: {
        message: {
          type: 'string'
        },
        error: {
          type: 'string'
        }
      }
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

module.exports = {
  errorResponseSchema,
  createMessageSchema,
  patchMessageSchema,
  messagesResponseSchema,
  messageResponseSchema,
  idResponseSchema
};
