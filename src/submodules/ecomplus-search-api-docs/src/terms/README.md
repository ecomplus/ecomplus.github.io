## Group Terms

### Terms Object Map

The `terms` type has the
[mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html) above:

```javascript
'terms': {
  'properties': {
    'date': {
      'type': 'date'
    },
    'term': {
      'type': 'text'
    },
    'results': {
      'type': 'short'
    },
    'count': {
      'type': 'integer'
    }
  }
}
```

### Terms Search [/terms.json]

#### Simple Search [GET /terms.json?q={field}:{value}]

ELS [URI Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html)

:[](.simple-search.apib)

#### Complex Search [POST]

ELS [Request Body Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)

:[](.complex-search.apib)
