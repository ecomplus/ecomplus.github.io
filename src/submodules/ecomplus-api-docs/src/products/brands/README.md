## Group Product Brands

`.products.brands`

Use **brands** subresource (of *products* resource) to
create, read and delete brands of a specific product by ID, to add brands to product from this subresource
you must specify only the ID of an existent brand, other brand properties will be syncronized from
*brands* resource

### Product Brand Object [/products/schema/brands.json]

:[](.product-brand-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Brands of a Product [/products/{product}/brands.json{?limit,offset,sort,fields}]

*/products/[_id]/brands.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Product Brands [GET /products/{product}/brands.json]

:[](.list-all-product-brands.apib)

### New Brand to a Product [/products/{product}/brands.json]

*/products/[_id]/brands.json*

> Authentication<br>_POST_: **required**

Request body must be an object with valid brand `_id` and no more properties

#### Add New Product Brand [POST]

:[](.add-new-product-brand.apib)

### Specific Brand of a Product [/products/{product}/brands/{_id}.json]

*/products/[_id]/brands/[_id].json*

> Authentication<br>_GET_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/product-brands/product-brand-object)

#### Read Product Brand [GET]

:[](.read-product-brand.apib)

#### Remove Brand From Product [DELETE]

:[](.remove-brand-from-product.apib)
