'use strict';
const MessageRepository = require('./message-repository');

module.exports = function Repositories({ knex }) {
  this.messageRepository = new MessageRepository({ knex });
};
