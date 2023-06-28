'use strict';
const MessageRoutes = require('./message-routes');
const HealthCheckRoutes = require('./health-routes');

module.exports = function Routes() {
  return { MessageRoutes, HealthCheckRoutes };
};
