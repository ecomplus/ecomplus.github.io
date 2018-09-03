## Group Products

`.products`

Use the **products** resource to create, read, update and delete items for sale in
a merchant's store, you can edit all product properties and also work with all
product subresources directly at this resource, such as product images, variations, brands and categories

### Product Object [/products/schema.json]

:[](.product-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Products [/products.json{?sku}]

*/products.json?sku*

> Authentication<br>_GET_: **none**

Pagination is not available, the unique possible filter is by `sku`

Returns only `_id` and `sku` of each product

#### List All Store Products [GET /products.json]

:[](.list-all-store-products.apib)

#### Find Product [GET]

:[](.find-product.apib)

### New Product [/products.json]

*/products.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/products/product-object)

#### Create New Product [POST]

:[](.create-new-product.apib)

### Specific Product [/products/{_id}.json]

*/products/[_id].json*

> Authentication<br>_GET_: **optional**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/products/product-object),
requests without authentication will receive product data without `hidden_metafields` property

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Product [GET /products/{product}.json]

:[](.read-product.apib)

#### With Authentication [GET]

:[](.with-authentication.apib)

#### Edit Product [PATCH]

:[](.edit-product.apib)

#### Overwrite Product [PUT]

:[](.overwrite-product.apib)

#### Remove Product [DELETE]

:[](.remove-product.apib)
