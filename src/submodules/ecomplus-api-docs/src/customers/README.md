## Group Customers

`.customers`

Use the **customers** resource to create, read, update and delete end users in
a merchant's store, you can edit all customer properties and also work with all
customer subresources directly at this resource

### Customer Object [/customers/schema.json]

:[](.customer-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Customers [/customers.json{?limit,offset,sort,fields}]

*/customers.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Customers [GET /customers.json]

:[](.list-all-store-customers.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Customers [GET /customers.json{?main_email}]

:[](.find-customers.apib)

### New Customer [/customers.json]

*/customers.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/customers/customer-object)

The properties `orders_count`, `orders_total_value`,
`total_spent`, `total_cancelled` and `orders`
will be filled automatically (except if disabled by merchant),
but you can also preset these values if you want to

#### Create New Customer [POST]

:[](.create-new-customer.apib)

### Specific Customer [/customers/{_id}.json]

*/customers/[_id].json*

> Authentication<br>_GET_: **optional**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/customers/customer-object),
requests without authentication will receive customer data without
`main_email`, `emails`, `name`, `photos`, `phones`, `doc_number`, `inscription_number`,
`corporate_name`, `addresses`, `hidden_metafields` and `staff_notes` properties

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Customer [GET /customers/{customer}.json]

:[](.read-customer.apib)

#### With Authentication [GET]

:[](.with-authentication.apib)

#### Edit Customer [PATCH]

:[](.edit-customer.apib)

#### Overwrite Customer [PUT]

:[](.overwrite-customer.apib)

#### Remove Customer [DELETE]

:[](.remove-customer.apib)
