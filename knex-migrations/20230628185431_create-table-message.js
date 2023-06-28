'use strict';

exports.up = async function (knex) {
  return knex.schema.createTable('message', table => {
    table.increments('id');
    table.uuid('guid').notNullable().unique();
    table.string('message').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('message');
};
