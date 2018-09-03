## Group Cart Items

`.carts.items`

Use the **items** subresource to create, read, update and delete
items from an specific shopping cart in a merchant's store

### Cart Item Object [/carts/schema/items.json]

:[](.cart-item-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Items of a Cart [/carts/{cart}/items.json{?limit,offset,sort,fields}]

*/carts/[_id]/items.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Cart Items [GET /carts/{cart}/items.json]

:[](.list-all-cart-items.apib)

### New Item to a Cart [/carts/{cart}/items.json]

*/carts/[_id]/items.json*

> Authentication<br>_GET_, _POST_: **required**

Request body must obey the specifications of
[this model](#reference/cart-items/cart-items-object)

#### Add New Cart Item [POST]

:[](.add-new-cart-item.apib)

### Specific Item of a Cart [/carts/{cart}/items/{_id}.json]

*/carts/[_id]/items/[_id].json*

> Authentication<br>_GET_, _PATCH_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/cart-items/cart-items-object)

For editing, request body must obey the same specifications,
without required fields

#### Read Cart Item [GET]

:[](.read-cart-item.apib)

#### Edit Cart Item [PATCH]

:[](.edit-cart-item.apib)

#### Remove Cart Item [DELETE]

:[](.remove-cart-item.apib)
