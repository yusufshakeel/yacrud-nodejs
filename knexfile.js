'use strict';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

const databaseConfigurations = {
  client: 'postgresql',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
  },
  pool: {
    min: 3,
    max: 5
  },
  migrations: {
    directory: 'knex-migrations',
    tableName: 'knex_migrations'
  }
};

module.exports = {
  dev: databaseConfigurations,
  test: databaseConfigurations,
  stage: databaseConfigurations,
  production: databaseConfigurations
};
