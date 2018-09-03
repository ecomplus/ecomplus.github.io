## Group Product Categories

`.products.categories`

Use **categories** subresource (of *products* resource) to
create, read and delete categories of a specific product by ID,
to add categories to product from this subresource
you must specify only the ID of an existent category, other category properties will be syncronized from
*categories* resource

### Product Category Object [/products/schema/categories.json]

:[](.product-category-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Categories of a Product [/products/{product}/categories.json{?limit,offset,sort,fields}]

*/products/[_id]/categories.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Product Categories [GET /products/{product}/categories.json]

:[](.list-all-product-categories.apib)

### New Category to a Product [/products/{product}/categories.json]

*/products/[_id]/categories.json*

> Authentication<br>_POST_: **required**

Request body must be an object with valid category `_id` and no more properties

#### Add New Product Category [POST]

:[](.add-new-product-category.apib)

### Specific Category of a Product [/products/{product}/categories/{_id}.json]

*/products/[_id]/brands/[_id].json*

> Authentication<br>_GET_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/product-categories/product-category-object)

#### Read Product Category [GET]

:[](.read-product-category.apib)

#### Remove Category From Product [DELETE]

:[](.remove-category-from-product.apib)
