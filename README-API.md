# Joke Api

[![version][version-img]](.)
[![docker][docker-img]][docker-url]
[![typescript][typescript-img]][typescript-url]
[![mysql][mysql-img]][mysql-url]
[![corticalio][corticalio-img]][corticalio-url]
[![giphy][giphy-img]][giphy-url]
[![license][license-img]](LICENSE)

## Functionality

The Joke API project is an web api, where authors can puplish and evaluate jokes, that are assigned in categories. The whole API is dockerized and easy to setup. It stores its data in a MySQL database using typeORM, which runs in a parallel docker container. To communicate with the API you can use a [REST](##rest-routes) interface. All data gets signed with an updatedAt and createdAt tag, so you can easily see, when the data has changed.

### Basic

#### Author

As author you can have a username and a signature. When an author gets created the API generates an author id, which can be used to publish jokes to the API.

#### Joke

A joke has a title, a text for the actual joke, a visibility where you can hide the joke from getting outputed, a funniness as positive number starting from 0, an author who published the joke and categories in which the joke is assigned.

#### CSV export

The jokes can be exported and downloaded as a CSV file. The file then contains the joke data, the authors name and the categories.

### Additional

#### Language checking

This joke api only accepting english jokes. This will be checked with the CorticalIO api. If a joke isnt in english the post returning a bad request.

#### Getting gifs

The joke api can give you a list of gifs, that matching to a specific joke, This can be useful to show the gifs in the frontend for example. To do this, the api first extract the keywords of the joke with the CorticalIO api and then finds matching gifs with the Giphy api. Then the gifs with keywords will be returned.

## Setup Project

The api is fully dockerized and can be started with a predefined docker compose environment:

1. Install [Docker](https://docs.docker.com/docker-for-windows/install/)
2. Open a console and navigate into the cloned _fwe-ws19-20-756891-ha1_ repository, where the _docker-compose.yml_ file is located
3. Execute the command **docker-compose up**
    - Alternatively on windows you can just start the _startEnv.bat_ file

After the console outputs "Server is running on port 8080..." the API is successfully running and listening on port \*:8080

## REST Routes

Here is an overview of all REST routes of the api.

#### Joke routes

| HTTP Verb | Route                    | Body                 | Returns                                           |
| --------- | ------------------------ | -------------------- | ------------------------------------------------- |
| GET       | /api/v1/joke             | -                    | all jokes as JSON                                 |
| GET       | /api/v1/joke/:jokeId     | -                    | specific joke as JSON                             |
| GET       | /api/v1/joke/jokes.csv   | -                    | all jokes as CSV file download                    |
| GET       | /api/v1/joke/:jokeId/gif | -                    | Getting gifs that matching the joke as JSON array |
| POST      | /api/v1/joke/            | joke as JSON         | created joke as JSON                              |
| PATCH     | /api/v1/joke/:jokeId     | updated joke as JSON | updated joke as JSON                              |
| DELETE    | /api/v1/joke/:jokeId     | -                    | -                                                 |

#### Author routes

| HTTP Verb | Route                    | Body                   | Returns                 |
| --------- | ------------------------ | ---------------------- | ----------------------- |
| GET       | /api/v1/author           | -                      | all authors as JSON     |
| GET       | /api/v1/author/:authorId | -                      | specific author as JSON |
| POST      | /api/v1/author/          | author as JSON         | created author as JSON  |
| PATCH     | /api/v1/author/:authorId | updated author as JSON | updated author as JSON  |
| DELETE    | /api/v1/author/:authorId | -                      | -                       |

#### Category routes

| HTTP Verb | Route                        | Body                     | Return Data               |
| --------- | ---------------------------- | ------------------------ | ------------------------- |
| GET       | /api/v1/category             | -                        | all categories as JSON    |
| GET       | /api/v1/category/:categoryId | -                        | specific category as JSON |
| POST      | /api/v1/category/            | category as JSON         | created category as JSON  |
| PATCH     | /api/v1/category/:categoryId | updated category as JSON | updated category as JSON  |
| DELETE    | /api/v1/category/:categoryId | -                        | -                         |

#### Joke-Category routes

| HTTP Verb | Route                                     | Description               |
| --------- | ----------------------------------------- | ------------------------- |
| POST      | /api/v1/joke/:jokeId/category/:categoryId | adding category to joke   |
| DELETE    | /api/v1/joke/:jokeId/category/:categoryId | remove category from joke |

## Testing

#### Postman

To test the collection with postman, there is a collection available. To import the collection:

1. Open Postman
2. Click on import at the top left corner
3. Click on choose files and select the _api.postman_collection.json_ file of this repository

Now the collection is imported and is shown the left. The api can now be tested by selecting the route to test from the collection and fill in the test values.

## License

**BSD 2-Clause License**

Copyright (c) 2019, Darius Dinger<br>
All rights reserved.

<!-- Shields -->

[version-img]: https://img.shields.io/badge/version-1.0.0-red.svg?style=flat-square
[typescript-img]: https://img.shields.io/badge/typescript-3.6.4-green.svg?style=flat-square
[docker-img]: https://img.shields.io/badge/docker--compose-3.0-green.svg?style=flat-square
[mysql-img]: https://img.shields.io/badge/mysql-5.7-green.svg?style=flat-square
[corticalio-img]: https://img.shields.io/badge/api-corticalio-orange.svg?style=flat-square
[giphy-img]: https://img.shields.io/badge/api-giphy-orange.svg?style=flat-square
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square

<!-- Links -->

[typescript-url]: https://www.typescriptlang.org/
[docker-url]: https://docs.docker.com/compose/
[mysql-url]: https://hub.docker.com/_/mysql
[corticalio-url]: https://www.cortical.io/
[giphy-url]: https://giphy.com/
