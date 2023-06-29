'use strict';
const MessageController = require('./message-controller');

module.exports = function Controllers({ repositories }) {
  this.messageController = new MessageController({ repositories });
};
