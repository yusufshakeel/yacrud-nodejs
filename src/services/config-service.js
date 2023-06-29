'use strict';
const config = require('config');
const { ENABLED } = require('../contants');
module.exports = function () {
  const environment = config.get('environment');
  const nodeEnvironment = config.get('nodeEnvironment');
  const fastify = {
    keepAliveTimeout: parseInt(config.get('fastify.keepAliveTimeout')),
    host: config.get('fastify.host'),
    port: config.get('fastify.port'),
    logger: config.get('fastify.loggerEnabled') === ENABLED
  };
  const database = {
    host: config.get('database.host'),
    port: config.get('database.port'),
    database: config.get('database.database'),
    user: config.get('database.user'),
    password: config.get('database.password')
  };
  return { environment, nodeEnvironment, fastify, database };
};
