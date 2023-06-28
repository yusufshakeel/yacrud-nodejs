'use strict';

const databaseConfiguration = require('../src/configs/db-config');

const knex = require('../src/knex-setup')({
  client: 'pg',
  connection: {
    ...databaseConfiguration,
    database: 'postgres'
  }
});

async function terminateAllConnections() {
  await knex.raw(`SELECT pg_terminate_backend(pid)
    FROM pg_stat_get_activity(NULL::integer)
    WHERE datid=(SELECT oid from pg_database where datname = '${databaseConfiguration.database}')`);
}

async function createDatabase() {
  console.info(`CREATING DATABASE: ${databaseConfiguration.database}`);
  await knex.raw(`CREATE DATABASE ${databaseConfiguration.database}`);
  console.info(`CREATED DATABASE: ${databaseConfiguration.database}`);
}

async function dropDatabase() {
  const isDatabasePresent = await knex.raw(`select exists(
        SELECT datname FROM pg_catalog.pg_database WHERE datname = '${databaseConfiguration.database}'
       )`);
  if (isDatabasePresent !== 't') {
    console.info(`DROPPING DATABASE: ${databaseConfiguration.database}`);
    await knex.raw(`DROP DATABASE ${databaseConfiguration.database}`);
    console.info(`DROPPED DATABASE! ${databaseConfiguration.database}`);
  }
}

async function run() {
  try {
    console.info('TERMINATING ALL DATABASE CONNECTIONS...');
    await terminateAllConnections();
    console.info('TERMINATED ALL DATABASE CONNECTIONS.');
    await dropDatabase();
    await createDatabase();
  } catch (error) {
    console.error('CATCH_BLOCK - KNEX_SCRIPT - run', error);
    throw error;
  }
}

run()
  .then(() => {
    console.info('Done!');
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  })
  .catch(err => {
    console.error('CATCH_BLOCK - KNEX_SCRIPT - Failed to recreate database.', err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  })
  .finally(() => knex.destroy());
