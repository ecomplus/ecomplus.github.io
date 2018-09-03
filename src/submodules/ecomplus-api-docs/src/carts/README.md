## Group Carts

`.carts`

Use the **carts** resource to create, read, update and delete shopping carts in
a merchant's store, you can edit all cart properties and also work with all
cart subresources directly at this resource

### Cart Object [/carts/schema.json]

:[](.cart-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Carts [/carts.json{?limit,offset,sort,fields}]

*/carts.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Carts [GET /carts.json]

:[](.list-all-store-carts.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Carts [GET /carts.json{?customers}]

:[](.find-carts.apib)

### New Cart [/carts.json]

*/carts.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/carts/cart-object)

#### Create New Cart [POST]

:[](.create-new-cart.apib)

### Specific Cart [/carts/{_id}.json]

*/carts/[_id].json*

> Authentication<br>_GET_: **none**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/carts/cart-object)

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Cart [GET]

:[](.read-cart.apib)

#### Edit Cart [PATCH]

:[](.edit-cart.apib)

#### Overwrite Cart [PUT]

:[](.overwrite-cart.apib)

#### Remove Cart [DELETE]

:[](.remove-cart.apib)
