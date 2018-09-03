## Group Product Grids

`.products.grids`

Use **grids** subresource (of *products* resource)
to edit *grids* property of a specific product by ID, at this point you can
add and update titles of grids used with specifications and variations of the product

### Product Grids Object [/products/schema/grids.json]

:[](.product-grids-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### Grids of a Product [/products/{product}/grids.json]

*/products/[_id]/grids.json*

> Authentication<br>_GET_, _PATCH_: **required**

No URL parameters available at this endpoint

In read requests, response body will follow
[model above](#reference/product-grids/product-grid-object),
for editing, request body must obey the same specifications

#### Read Product Grids [GET]

:[](.read-product-grids.apib)

#### Edit Product Grids [PATCH]

:[](.edit-product-grids.apib)
