'use strict';
const fastifyCors = require('@fastify/cors');
const fastifyHelmet = require('@fastify/helmet');
const fastifyMetrics = require('fastify-metrics');
const Services = require('./services');
const corsConfig = require('./configs/cors-config');
const Routes = require('./routes');
const Controllers = require('./controllers');
const Repositories = require('./repositories');

module.exports = function Server({ fastify, knex }) {
  const self = this;
  const services = new Services();
  const routes = Routes({ fastify });
  const repositories = new Repositories({ knex });
  const controllers = new Controllers({ repositories });

  this.setup = async () => {
    await fastify.register(fastifyCors, corsConfig);
    await fastify.register(fastifyHelmet);
    await fastify.register(fastifyMetrics, { endpoint: '/metrics' });
    await fastify.register(routes.MessageRoutes, { controllers });
    await fastify.register(routes.HealthCheckRoutes);
    return self;
  };

  this.start = async () => {
    const {
      configService: {
        fastify: { port, host }
      }
    } = services;
    fastify.listen({ port, host }, function (err) {
      if (err) {
        fastify.log.error(err);
        throw err;
      }
    });
  };
};
