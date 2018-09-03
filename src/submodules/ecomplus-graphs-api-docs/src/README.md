# E-Com Plus Graphs API

[E-Com Plus](https://www.e-com.plus)
is a robust and flexible cloud commerce software,
totally based on REST APIs, providing a large library of methods and specifications
to deploy any digital commerce operation easly

**Graphs API** is our public REST interface to
[Neo4j](https://neo4j.com/) (graph database),
our real-time recommendation engine, used to better implementations of
products recommendations systems

## Overview

All requests are proxy passed to Neo4j
[Transactional Cypher HTTP endpoint](https://neo4j.com/docs/developer-manual/3.3/http-api/#http-api-transactional)
with predefined cyphers, varying only by the resource ID

This API pass only
[MATCH](https://neo4j.com/docs/developer-manual/current/cypher/clauses/match/)
cyphers and the responses are the same as returned from _Neo4j HTTP API_,
so you can read their documentation to get more info and examples

### Host

Should be accessed from `https://apx-graphs.e-com.plus/api/{version}/`

Current version: **v1**

https://apx-graphs.e-com.plus/api/v1/

Note that every request must be with `https` (SSL)

All endpoints will end with `.json`:

https://apx-graphs.e-com.plus/api/v1/example.json

### Verbs

| Verb    | CRUD           | Description             |
|:--------|----------------|-------------------------|
| GET     | Read           | View object             |

### Status Codes

Based on HTTP/1.1 Status Code Definitions:

- *2xx* - Successful
- *4xx* - Client error, must check the request
- *5xx* - Server error, report us and try again later

### Format

Response body is formatted as JSON, always an object like the one below:

```json
{
  "results": [
    {
      "columns": [
        "products.id"
      ],
      "data": [
        [ "{_id}" ],
        [ "{_id}" ]
      ]
    }
  ],
  "errors": [
  ]
}
```

## Error Handling

#### 404

```json
{
  "status": 404,
  "error_code": -44,
  "message": "Page not found"
}
```

Incorrect URL paths (check [API Host](#introduction/overview/host))
or invalid resource ID, it must match the
[RegEx](https://regexr.com/) pattern _[a-f0-9]{24}_,
being a valid 24 chars hexadecimal string

#### 503

```json
{
  "status": 503,
  "error_code": -53,
  "message": "Service unavailable (DDoS?), wait few seconds"
}
```

NGINX is blocking your requests for security reasons, please wait few seconds and try again

## Server Limits

Responses are limited to 2 requests per IP per second,
and 5 simultaneous connections per IP

In almost all cases you will not receive an error if you go beyond the limits,
the response will only be delayed, but even so,
we recommend that you create treatments in case you receive a *503* status code

## See Also

- [Developers site](https://developers.e-com.plus)
- [GitHub organization](https://github.com/ecomclub)
- [Community](https://community.e-com.plus)

#### Other REST APIs

- [Store](https://ecomstore.docs.apiary.io):
E-Com Plus Store API, with all store resources
- [Main](https://ecomplus.docs.apiary.io):
E-Com Plus Main API, with some public data about stores and channels
- [Search](https://ecomsearch.docs.apiary.io):
Powerful text search API using Elasticsearch to find and suggest items (products) and terms

## Getting Help

Feel free to get help or suggest alterations on
[GitHub repo](https://github.com/ecomclub/ecomplus-api-docs) or by e-mail
[ti@e-com.club](mailto:ti@e-com.club)

:[](products/blueprint.apib)
