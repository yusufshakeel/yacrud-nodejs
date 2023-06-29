'use strict';
const { v4: uuidV4 } = require('uuid');

module.exports = function MessageController({ repositories }) {
  const formattedMessage = ({ guid: id, message, createdAt, updatedAt }) => {
    return { id, message, createdAt, updatedAt };
  };

  this.createMessage = async ({ message }) => {
    const timestamp = new Date().toISOString();
    const dataToInsert = {
      guid: uuidV4(),
      message,
      createdAt: timestamp
    };
    try {
      const result = await repositories.messageRepository.createMessage(dataToInsert);
      return { data: { id: result[0].guid } };
    } catch (e) {
      return {
        code: 400,
        error: { message: 'Failed to create a new message.', errorMessage: e.message }
      };
    }
  };

  this.fetchAllMessages = async () => {
    try {
      const result = await repositories.messageRepository.fetchAllMessages();
      const enrichedResult = result.map(formattedMessage);
      return { data: { messages: enrichedResult } };
    } catch (e) {
      return {
        code: 400,
        error: { message: 'Failed to fetch all the messages.', errorMessage: e.message }
      };
    }
  };

  this.fetchMessageByMessageId = async ({ messageId }) => {
    try {
      const result = await repositories.messageRepository.fetchMessageByMessageId(messageId);
      if (!result.length) {
        return { code: 404, error: { message: 'Message not found!' } };
      }
      const enrichedResult = result.map(formattedMessage);
      return { data: { message: enrichedResult[0] } };
    } catch (e) {
      return {
        code: 400,
        error: { message: 'Failed to fetch the message.', errorMessage: e.message }
      };
    }
  };

  this.updateMessageByMessageId = async ({ messageId, message }) => {
    try {
      const timestamp = new Date().toISOString();
      const dataToUpdate = { message, updatedAt: timestamp };
      const result = await repositories.messageRepository.updateMessageByMessageId(
        messageId,
        dataToUpdate
      );
      return { data: { id: result[0].guid } };
    } catch (e) {
      return {
        code: 400,
        error: { message: 'Failed to update the message.', errorMessage: e.message }
      };
    }
  };

  this.deleteMessageByMessageId = async ({ messageId }) => {
    try {
      const result = await repositories.messageRepository.deleteMessageByMessageId(messageId);
      return { data: { id: result[0].guid } };
    } catch (e) {
      return {
        code: 400,
        error: { message: 'Failed to delete the message.', errorMessage: e.message }
      };
    }
  };
};
