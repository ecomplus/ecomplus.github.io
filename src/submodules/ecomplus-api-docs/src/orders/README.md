## Group Orders

`.orders`

Use the **orders** resource to create, read, update and delete sales orders in
a merchant's store, you can edit all order properties and also work with all
order subresources directly at this resource

### Order Object [/orders/schema.json]

:[](.order-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Orders [/orders.json{?limit,offset,sort,fields}]

*/orders.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Orders [GET /orders.json]

:[](.list-all-store-orders.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Orders [GET /orders.json{?code}]

:[](.find-orders.apib)

### New Order [/orders.json]

*/orders.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/orders/order-object)

#### Create New Order [POST]

:[](.create-new-order.apib)

### Specific Order [/orders/{_id}.json]

*/orders/[_id].json*

> Authentication<br>_GET_: **optional**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/orders/order-object),
requests without authentication will receive order data without
`browser_ip`, `buyer`, `gift_to`, `shipping_lines`, `transactions`, `payments_history`,
`fulfillments`, `hidden_metafields`, `private_metafields` and `staff_notes` properties

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Order [GET /orders/{order}.json]

:[](.read-order.apib)

#### With Authentication [GET]

:[](.with-authentication.apib)

#### Edit Order [PATCH]

:[](.edit-order.apib)

#### Overwrite Order [PUT]

:[](.overwrite-order.apib)

#### Remove Order [DELETE]

:[](.remove-order.apib)
