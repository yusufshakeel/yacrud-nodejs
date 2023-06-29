'use strict';

module.exports = function MessageRepository({ knex }) {
  this.createMessage = async (dataToInsert, dbTransaction = knex) => {
    return dbTransaction('message').insert(dataToInsert).returning(['guid']);
  };

  this.fetchAllMessages = async (dbTransaction = knex) => {
    return dbTransaction('message').select(['guid', 'message', 'createdAt', 'updatedAt']);
  };

  this.fetchMessageByMessageId = async (messageId, dbTransaction = knex) => {
    return dbTransaction('message')
      .where({ guid: messageId })
      .select(['guid', 'message', 'createdAt', 'updatedAt']);
  };

  this.updateMessageByMessageId = async (messageId, dataToUpdate, dbTransaction = knex) => {
    return dbTransaction('message')
      .where({ guid: messageId })
      .update(dataToUpdate)
      .returning(['guid']);
  };

  this.deleteMessageByMessageId = async (messageId, dbTransaction = knex) => {
    return dbTransaction('message')
      .where({ guid: messageId })
      .delete(['guid', 'message', 'createdAt', 'updatedAt'])
      .returning(['guid']);
  };
};
