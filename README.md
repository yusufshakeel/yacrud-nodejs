# yacrud-nodejs
Yet Another Create, Read, Update and Delete project in Node.js.

## Table of Content
* [Prerequisite](#prerequisite)
* [Getting started](#getting-started)
* [Localhost server](#localhost-server)
* [API endpoints](#api-endpoints)
  * [Create a new message](#create-a-new-message)
  * [Read messages](#read-messages)
  * [Update a message by messageId](#update-a-message-by-messageid)
  * [Delete a message by messageId](#delete-a-message-by-messageid)

## Note!

This is just a basic CRUD project for learning and demo purposes.

## Prerequisite

This project depends on the following.

* NodeJS (v14 or higher)
* Docker (Optional. Needed only if you want to create docker image and run the project in a container.)
* DBeaver (Optional. Database administration tool)

## Getting started

This is a NodeJS project. First, install all the packages by running the following command in the terminal.

```shell
npm i
```

### Environment variables

Set the following environment variables.

```
export NODE_ENV=dev
export FASTIFY_KEEP_ALIVE_TIMEOUT=30000
export FASTIFY_HOST=0.0.0.0
export FASTIFY_PORT=3000
export FASTIFY_LOGGER_ENABLED=enabled
export DATABASE_HOST=localhost
export DATABASE_PORT=
export DATABASE_NAME=yacrud
export DATABASE_USER=
export DATABASE_PASSWORD=
export DATABASE_CONNECTION_POOL_MIN_CONNECTIONS=1
export DATABASE_CONNECTION_POOL_MAX_CONNECTIONS=2
export DATABASE_QUERY_LOGGING_ENABLED=disabled
```

### Create a database in local machine.

We can use `psql` and create the database or run the following command.

```
npm run recreate-database

> yacrud-nodejs@1.0.0 recreate-database
> node script/recreate-database-script.js

TERMINATING ALL DATABASE CONNECTIONS...
TERMINATED ALL DATABASE CONNECTIONS.
DROPPING DATABASE: yacrud
DROPPED DATABASE! yacrud
CREATING DATABASE: yacrud
CREATED DATABASE: yacrud
Done!
```

### Run knex migrations

```
npm run knex:migrate:latest

> yacrud-nodejs@1.0.0 knex:migrate:latest
> knex migrate:latest --debug --knexfile ./knexfile.js

Using environment: dev
[
  {
    sql: 'select * from information_schema.tables where table_name = ? and table_schema = current_schema()',
    bindings: [ 'knex_migrations' ],
    output: [Function: output]
  }
]
[
  {
    sql: 'create table "knex_migrations" ("id" serial primary key, "name" varchar(255), "batch" integer, "migration_time" timestamptz)',
    bindings: []
  }
]
[
  {
    sql: 'select * from information_schema.tables where table_name = ? and table_schema = current_schema()',
    bindings: [ 'knex_migrations_lock' ],
    output: [Function: output]
  }
]
[
  {
    sql: 'create table "knex_migrations_lock" ("index" serial primary key, "is_locked" integer)',
    bindings: []
  }
]
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: 'ezWOhSB5TtCKEB-Z6zIPc',
  sql: 'select * from "knex_migrations_lock"'
}
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: 'idh6HkW3nDeNm39vj_Gci',
  sql: 'select * from "knex_migrations_lock"'
}
{
  method: 'insert',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [ 0 ],
  __knexQueryUid: 'DGgtAu4G7J15VEqihsNwN',
  sql: 'insert into "knex_migrations_lock" ("is_locked") values (?)',
  returning: undefined
}
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: '_3-lY4WL7nhyLWx-qIR-7',
  sql: 'select "name" from "knex_migrations" order by "id" asc'
}
{
  method: 'update',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [ 1, 0 ],
  __knexQueryUid: 'p1dSF04FIfbR7WvwIH6rH',
  sql: 'update "knex_migrations_lock" set "is_locked" = ? where "is_locked" = ?',
  returning: undefined
}
[
  {
    sql: 'select * from information_schema.tables where table_name = ? and table_schema = current_schema()',
    bindings: [ 'knex_migrations' ],
    output: [Function: output]
  }
]
[
  {
    sql: 'select * from information_schema.tables where table_name = ? and table_schema = current_schema()',
    bindings: [ 'knex_migrations_lock' ],
    output: [Function: output]
  }
]
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: 'EbH2rvR1_xJ9jEdz6hHH3',
  sql: 'select * from "knex_migrations_lock"'
}
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: 'obN0nhGenmm36gJaH8SzS',
  sql: 'select "name" from "knex_migrations" order by "id" asc'
}
{
  method: 'select',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [],
  __knexQueryUid: 'HT3wmJI0INSgWw4jJ12cD',
  sql: 'select max("batch") as "max_batch" from "knex_migrations"'
}
[
  {
    sql: 'create table "message" ("id" serial primary key, "guid" uuid not null, "message" varchar(255) not null, "createdAt" timestamptz not null default CURRENT_TIMESTAMP, "updatedAt" timestamptz)',
    bindings: []
  },
  {
    sql: 'alter table "message" add constraint "message_guid_unique" unique ("guid")',
    bindings: []
  }
]
{
  method: 'insert',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [
    1,
    2023-06-28T18:59:46.713Z,
    '20230628185431_create-table-message.js'
  ],
  __knexQueryUid: 'dAhl_BP00j-MpnvjTAxtP',
  sql: 'insert into "knex_migrations" ("batch", "migration_time", "name") values (?, ?, ?)',
  returning: undefined
}
{
  method: 'update',
  options: {},
  timeout: false,
  cancelOnTimeout: false,
  bindings: [ 0 ],
  __knexQueryUid: 'cHs5pOLTVc_o_cFWVtgCn',
  sql: 'update "knex_migrations_lock" set "is_locked" = ?',
  returning: undefined
}
Batch 1 run: 1 migrations
```

### Checking tables.

Note! Replace -h -p -U -d values with your own.
```
➜ psql -h 127.0.0.1 -p 5432 -U yusufshakeel -d yacrud

psql (12.14)
Type "help" for help.

yacrud=# \dt;
                  List of relations
 Schema |         Name         | Type  |    Owner
--------+----------------------+-------+--------------
 public | knex_migrations      | table | yusufshakeel
 public | knex_migrations_lock | table | yusufshakeel
 public | message              | table | yusufshakeel
(3 rows)

yacrud=#
```

## Localhost server

To start the localhost server.

```shell
npm run start
```

## API endpoints

Check out the `docs` folder. It has the Postman collection.

### Create a new message

##### Request
```
curl --location 'http://localhost:3000/messages' \
--header 'Content-Type: application/json' \
--data '{
    "data": {
        "message": "Hello, World!"
    }
}'
```

##### Response
```
{
    "data": {
        "id": "af94356f-8ef8-41fd-b46d-fa23af83058b"
    }
}
```

### Read messages

#### Fetch all messages

##### Request
```
curl --location 'http://localhost:3000/messages'
```

##### Response
```
{
    "data": {
        "messages": [
            {
                "id": "af94356f-8ef8-41fd-b46d-fa23af83058b",
                "message": "Hello, World!",
                "createdAt": "2023-06-28T17:30:51.439Z",
                "updatedAt": "2023-06-28T17:30:51.439Z"
            }
        ]
    }
}
```

#### Fetch a message by messageId

##### Request
```
curl --location 'http://localhost:3000/messages/af94356f-8ef8-41fd-b46d-fa23af83058b'
```

##### Response
```
{
    "data": {
        "message": {
            "id": "af94356f-8ef8-41fd-b46d-fa23af83058b",
            "message": "Hello, World!",
            "createdAt": "2023-06-28T17:30:51.439Z",
            "updatedAt": "2023-06-28T17:30:51.439Z"
        }
    }
}
```

### Update a message by messageId

##### Request
```
curl --location --request PATCH 'http://localhost:3000/messages/af94356f-8ef8-41fd-b46d-fa23af83058b' \
--header 'Content-Type: application/json' \
--data '{
    "data": {
        "message": "Hello, World!"
    }
}'
```

##### Response
```
{
    "data": {
        "id": "af94356f-8ef8-41fd-b46d-fa23af83058b"
    }
}
```

### Delete a message by messageId

##### Request
```
curl --location --request DELETE 'http://localhost:3000/messages/af94356f-8ef8-41fd-b46d-fa23af83058b'
```

##### Response
```
{
    "data": {
        "id": "af94356f-8ef8-41fd-b46d-fa23af83058b"
    }
}
```

## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/yacrud-nodejs/blob/main/LICENSE) Copyright (c) 2023 Yusuf Shakeel

## Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)