'use strict';
const configService = require('./src/services/config-service')();
const Server = require('./src/server');
const Knex = require('./src/knex-setup');
const fastify = require('fastify')({
  logger: configService.fastify.logger,
  keepAliveTimeout: configService.fastify.keepAliveTimeout
});
const knex = Knex({
  client: 'pg',
  connection: {
    ...configService.database
  },
  pool: configService.connectionPool,
  debug: configService.queryLogging
});
new Server({ fastify, knex }).setup().then(server => server.start());
