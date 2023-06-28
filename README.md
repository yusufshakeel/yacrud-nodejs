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

## Prerequisite

This project depends on the following.

* NodeJS (v14 or higher)
* Docker (Optional. Needed only if you want to create docker image and run the project in a container.)

## Getting started

This is a NodeJS project. First, install all the packages by running the following command in the terminal.

```shell
npm i
```

## Environment variables

Set the following environment variables.

```
export NODE_ENV=dev
export FASTIFY_KEEP_ALIVE_TIMEOUT=10000
export FASTIFY_HOST=0.0.0.0
export FASTIFY_PORT=3000
export FASTIFY_LOGGER_ENABLED=enabled
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_NAME=yacrud
export DATABASE_USER=
export DATABASE_PASSWORD=
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