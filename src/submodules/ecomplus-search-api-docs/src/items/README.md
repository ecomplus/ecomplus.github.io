## Group Items

### Items Object Map

The `items` type has the
[mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html) above:

```javascript
'items': {
  'properties': {
    'created_at': {
      'type': 'date'
    },
    'sku': {
      'type': 'keyword'
    },
    'name': {
      'type': 'text'
    },
    'slug': {
      'type': 'keyword'
    },
    'permalink': {
      'type': 'keyword',
      'index': false
    },
    'mobile_link': {
      'type': 'keyword',
      'index': false
    },
    'status': {
      'type': 'keyword'
    },
    'available': {
      'type': 'boolean'
    },
    'visible': {
      'type': 'boolean'
    },
    'ad_relevance': {
      'type': 'byte'
    },
    'ad_type': {
      'type': 'keyword'
    },
    'short_description': {
      'type': 'text',
      'index': false
    },
    'price': {
      'type': 'float'
    },
    'price_effective_date': {
      'properties': {
        'start': {
          'type': 'date'
        },
        'end': {
          'type': 'date'
        }
      }
    },
    'base_price': {
      'type': 'float'
    },
    'currency_id': {
      'type': 'keyword',
      'index': false
    },
    'currency_symbol': {
      'type': 'keyword',
      'index': false
    },
    'quantity': {
      'type': 'float'
    },
    'measurement': {
      'enabled': false
    },
    'condition': {
      'type': 'keyword'
    },
    'warranty': {
      'type': 'keyword'
    },
    'specs': {
      'type': 'nested',
      'properties': {
        'grid': {
          'type': 'keyword'
        },
        'text': {
          'type': 'keyword'
        }
      }
    },
    'pictures': {
      'enabled': false
    },
    'installments': {
      'enabled': false
    },
    'discount': {
      'enabled': false
    },
    'views': {
      'type': 'integer'
    },
    'sales': {
      'type': 'integer'
    },
    'brands': {
      'properties': {
        '_id': {
          'type': 'keyword'
        },
        'name': {
          'type': 'keyword'
        },
        'slug': {
          'type': 'keyword'
        }
      }
    },
    'categories': {
      'properties': {
        '_id': {
          'type': 'keyword'
        },
        'name': {
          'type': 'keyword'
        },
        'slug': {
          'type': 'keyword'
        }
      }
    },
    'keywords': {
      'type': 'text'
    },
    // map variations as product nested object
    'variations': {
      'type': 'nested',
      'properties': {
        'sku': {
          'type': 'keyword'
        },
        'name': {
          'type': 'keyword'
        },
        'price': {
          'type': 'float'
        },
        'price_effective_date': {
          'properties': {
            'start': {
              'type': 'date'
            },
            'end': {
              'type': 'date'
            }
          }
        },
        'base_price': {
          'type': 'float'
        },
        'installments': {
          'enabled': false
        },
        'discount': {
          'enabled': false
        },
        'quantity': {
          'type': 'float'
        },
        'picture_id': {
          'type': 'keyword',
          'index': false
        }
      }
    }
  }
}
```

Note that the item object is similar to the
[Product Object](https://ecomstore.docs.apiary.io/#reference/products/product-object),
but with less properties and converting `specifications` object to `specs` array of nested objects

### Items Search [/items.json]

#### Simple Search [GET /items.json?q={field}:{value}]

ELS [URI Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html)

:[](.simple-search.apib)

#### Complex Search [POST]

ELS [Request Body Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)

:[](.complex-search.apib)
