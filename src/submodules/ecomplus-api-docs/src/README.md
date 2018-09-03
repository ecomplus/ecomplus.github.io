# E-Com Plus Store API

[E-Com Plus](https://www.e-com.plus)
is a robust and flexible cloud commerce software,
totally based on REST APIs, providing a large library of methods and specifications
to deploy any digital commerce operation easly

**Store API** is the "hearth" of our software, a REST interface to the
[MongoDB](https://www.mongodb.com/) stores database,
given full access to all store data, so be creative, but be careful too

_With great power comes great responsibility_, _may the force be with you_!

## Overview

This API tries to be truly *RESTful*, following Web API Standards, taking as specifications references:

- https://github.com/WhiteHouse/api-standards
- https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

### Host

Should be accessed from `https://api.e-com.plus/{version}/`

Current version: **v1**

https://api.e-com.plus/v1/

Note that every request must be with `https` (SSL)

All endpoints will end with `.json`:

https://api.e-com.plus/v1/example.json

### Sandbox

Sandbox environment is available at `https://sandbox.e-com.plus/{version}/`,
must be used for tests only, after homologation you should migrate to
[production](#introduction/overview/host)

Current version and formats will always be the same of
[production environment](#introduction/overview/host)

**All data in the sandbox environment is deleted after 7 days**

This documentation uses sandbox by reference on the examples

### Format

Both request and response body are formatted as JSON, always an object `{}`

#### Object Modeling

Based on [JSON Schema](http://json-schema.org/) Draft-06 specifications

API uses JSON Schema
[built-in string formats](https://spacetelescope.github.io/understanding-json-schema/reference/string.html#built-in-formats)
and [Regular Expressions](https://regexr.com/) (RegEx) to validate string fields on body

For example purposes, you can generate random objects with the schemas using
[JSON Schema Faker](http://json-schema-faker.js.org/)

#### List Of Documents

At root of a resource or an embedded documents subresource, response body will follow this pattern:

- Always an object with *meta* and *result* properties
- `meta` is an object
- `result` is an array of objects

```json
{
  "meta": {
  },
  "result": [
    {}, {}
  ]
}
```

### URL Params

URL parameters (query string) are used only at endpoints that returns
[lists of documents](#introduction/overview/format),
setting metadata (`meta`) for filtering and pagination purposes, accepted params will vary by each endpoint

#### Common Parameters

- *limit*
    - Set the maximum number of documents to return
    - Must be an integer > 0
    - eg.: `?limit=1000`
- *offset*
    - Specifies the first entry to return
    - An integer >= 0
    - eg.: `?offset=1000`, `?offset=0`
- *sort*
    - Specifies rules to order the resultant objects
    - Default is ascending order, use - for descending
    - eg.: `?sort=-popularity`, `?sort=price,-popularity`
- *fields*
    - Specifies the object properties to return
    - eg.: `?fields=code`, `?fields=name,code,date`

Other parameters must be valid properties of the objects, will be used to filter results

It's possible to use
[MongoDB dot notation](https://docs.mongodb.com/manual/core/document/#dot-notation)
to filter by embedded arrays and objects

### Headers

All requests must have the header `X-Store-ID` with the unique ID (integer) of respective store

Optionally *X-Cache-Tag* with any value to refuse or update browser cache, *Content-Type*
(*application/json, charset=utf-8*) and *Accept-Encoding*

### Verbs

| Verb    | CRUD           | Description             |
|:--------|----------------|-------------------------|
| GET     | Read           | View object             |
| POST    | Create         | Create new object       |
| PATCH   | Update/Modify  | Update some properties  |
| PUT     | Update/Replace | Overwrite entire object |
| DELETE  | Delete         | Remove object           |
| OPTIONS | -              | Return allowed methods  |

### Authentication

Authentication is not required always, the majority of the resources accept GET requests
without authentication, in some cases, authenticated requests return different body, more complete response

OPTIONS requests are always public

POST, PATCH, PUT and DELETE always require authentication

#### Authentication Headers

You must complete the [steps to authenticate](#reference/authenticate-yourself),
then use the received *access_token* and *my_id* on headers `X-Access-Token` and `X-My-ID` respectively

### Status Codes

Based on HTTP/1.1 Status Code Definitions:

- *2xx* - Successful
- *4xx* - Client error, must check the request
- *5xx* - Server error, report us and try again later

#### Response HTTP Status Code

| Code  | Description  |
|:------|--------------|
| `200` | OK, successful GET request |
| `201` | Created, successful POST request |
| `202` | Accepted, at root (/) only |
| `204` | No content, successful PATCH, PUT or DELETE request |
| `400` | Bad request, problem in request body or URL params |
| `401` | Unauthorized, need authentication and permission |
| `403` | Forbidden, plan limits reached or client blocked |
| `404` | Not found, resource or ID doesn't exists |
| `405` | Method not allowed, resource doesn't accept used verb |
| `406` | Not acceptable, problem with resource ID or subresource |
| `412` | Precondition failed, no store found with provided ID |
| `417` | Expectation failed, missing some header |
| `500` | Internal server error, please report and try again later |
| `502` | Bad gateway, try again later |
| `503` | Service unavailable, probably blocked by proxy, wait |
| `504` | Gateway timeout, try again later |

## Error Handling

#### App Errors

All *4xx* (client error) and *5xx* (server error) responses from application
will have body following the model below:

- *(object)*
    - `status` *(number)* - HTTP status code
    - `error_code` *(string, number)* - API error code
    - `message` *(string)* - Message to developer
    - `user_message` *(object)* - Messages to end user
        - `en_us` *(string)*
        - `pt_br` *(string)*
    - `more_info` *(string, null)* - External link

**Example**

```json
{
  "status": 406,
  "error_code": 123,
  "message": "Invalid value on resource ID",
  "user_message": {
    "en_us": "The informed ID is invalid",
    "pt_br": "O ID informado é inválido"
  },
  "more_info": null
}
```

To know how to treat this errors, see
[status codes reference](#introduction/overview/status-codes)

#### Web Server Errors

In some cases you can receive an error directly from NGINX web server,
even in this case the response will be a JSON object, almost in the same model
of [App Errors](#introduction/error-handling/app-errors),
but without properties `user_message` and `more_info`,
the `error_code` will be an negative integer

##### NGINX 404

```json
{
  "status": 404,
  "error_code": -44,
  "message": "Page not found"
}
```

Incorrect URL paths, check [API Host](#introduction/overview/host)

##### NGINX 503

```json
{
  "status": 503,
  "error_code": -53,
  "message": "Service unavailable (DDoS?), wait few seconds"
}
```

NGINX is blocking your requests for security reasons, please wait few seconds and try again

## Server Limits

Whenever possible, **avoid using requests with query string**,
then you will be able to consume cache and send up to 30 _GET_ requests per second
with the same IP, to different endpoints

Not cached responses are limited by default to 6 requests per IP per second, but it can vary (to low)
depending of the resource

The same API user (authentication) can make up to 6 authenticated requests per second

In almost all cases you will not receive an error if you go beyond the limits,
the response will only be delayed, but even so,
we recommend that you create treatments in case you receive a *503* status code

## See Also

- [Developers site](https://developers.e-com.plus)
- [GitHub organization](https://github.com/ecomclub)
- [Community](https://community.e-com.plus)

#### Other REST APIs

- [Main](https://ecomplus.docs.apiary.io):
E-Com Plus Main API, with some public data about stores and channels
- [Graphs](https://ecomgraphs.docs.apiary.io):
Recommendations API using Neo4j to define related products by categories, brands and common orders
- [Search](https://ecomsearch.docs.apiary.io):
Powerful text search API using Elasticsearch to find and suggest items (products) and terms

## Getting Help

Feel free to get help or suggest alterations on
[GitHub repo](https://github.com/ecomclub/ecomplus-api-docs) or by e-mail
[ti@e-com.club](mailto:ti@e-com.club)

:[](authenticate-yourself/blueprint.apib)

:[](authenticate-app/blueprint.apib)

:[](products/blueprint.apib)

:[](brands/blueprint.apib)

:[](categories/blueprint.apib)

:[](collections/blueprint.apib)

:[](grids/blueprint.apib)

:[](customers/blueprint.apib)

:[](carts/blueprint.apib)

:[](orders/blueprint.apib)

:[](applications/blueprint.apib)

:[](triggers/blueprint.apib)

:[](procedures/blueprint.apib)

:[](stores/blueprint.apib)

:[](authentications/blueprint.apib)
