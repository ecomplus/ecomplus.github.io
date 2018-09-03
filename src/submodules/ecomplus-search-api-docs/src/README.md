# E-Com Plus Search API

[E-Com Plus](https://www.e-com.plus)
is a robust and flexible cloud commerce software,
totally based on REST APIs, providing a large library of methods and specifications
to deploy any digital commerce operation easly

**Search API** is our public REST interface to
[Elasticsearch](https://www.elastic.co/products/elasticsearch),
implemented as store search engine,
for faster and flexible products and terms searches

## Overview

All requests are proxy passed to Elasticsearch
[Search APIs](https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html)
with _XGET_ method (read only)

You must follow
[Request Body Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)
specifications

Responses are the same as returned from _Eslasticsearch REST API_,
so you can read their documentation to get more info and examples

### Host

Should be accessed from `https://apx-search.e-com.plus/api/{version}/`

Current version: **v1**

https://apx-search.e-com.plus/api/v1/

Note that every request must be with `https` (SSL)

All endpoints will end with `.json`:

https://apx-search.e-com.plus/api/v1/example.json

### Verbs

| Verb    | CRUD           | Description             |
|:--------|----------------|-------------------------|
| GET     | Read           | View object             |
| POST    | Read           | View object             |

### Status Codes

Based on HTTP/1.1 Status Code Definitions:

- *2xx* - Successful
- *4xx* - Client error, must check the request
- *5xx* - Server error, report us and try again later

### Format

Both request and response body are formatted as JSON, always an object `{}`

Check
[this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)
of Elasticsearch documentation to examples of successful responses

## Error Handling

#### ELS Errors

All *4xx* (client error) and *5xx* (server error) responses from Elasticsearch
will have body following the model below:

- *(object)*
    - `error` *(object)* - ELS error object
        - `root_cause` *(array)*
            - *(object)*
                - `type` *(string)*
                - `reason` *(string)*
                - `resource.type` *(string)*
                - `resource.id` *(string)*
                - `index` *(string)*
        - `type` *(string)*
        - `reason` *(string)*
        - `resource.type` *(string)*
        - `resource.id` *(string)*
        - `index` *(string)*
    - `status` *(number)* - HTTP status code

**Example**

```json
{
  "error": {
    "root_cause": [
      {
        "type": "index_not_found_exception",
        "reason": "no such index",
        "resource.type": "index_or_alias",
        "resource.id": "items",
        "index": "items"
      }
    ],
    "type": "index_not_found_exception",
    "reason": "no such index",
    "resource.type": "index_or_alias",
    "resource.id": "items",
    "index": "items"
  },
  "status": 404
}
```

#### Web Server Errors

In some cases you can receive an error directly from NGINX web server,
even in this case the response will be a JSON object

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

Responses are limited to 30 requests per IP per second

If the server is overloaded with too many pending connections,
it will respond with *503* status code,
so you **need to create treatments** for this case

We recommend to wait 400ms after a 503 response,
then resend the request

## See Also

- [Developers site](https://developers.e-com.plus)
- [GitHub organization](https://github.com/ecomclub)
- [Community](https://community.e-com.plus)

#### Other REST APIs

- [Store](https://ecomstore.docs.apiary.io):
E-Com Plus Store API, with all store resources
- [Main](https://ecomplus.docs.apiary.io):
E-Com Plus Main API, with some public data about stores and channels
- [Graphs](https://ecomgraphs.docs.apiary.io):
Recommendations API using Neo4j to define related products by categories, brands and common orders

## Getting Help

Feel free to get help or suggest alterations on
[GitHub repo](https://github.com/ecomclub/ecomplus-api-docs) or by e-mail
[ti@e-com.club](mailto:ti@e-com.club)

:[](items/blueprint.apib)

:[](terms/blueprint.apib)
