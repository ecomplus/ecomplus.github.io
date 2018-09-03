## Group Product Customizations

`.products.customizations`

The **customizations** is a subresource of *products* resource,
use it to create, read, update and delete customization fields of a specific product by ID

### Product Field Object [/products/schema/customizations.json]

:[](.product-field-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Fields of a Product [/products/{product}/customizations.json{?limit,offset,sort,fields}]

*/products/[_id]/customizations.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Product Customization Fields [GET /products/{product}/customizations.json]

:[](.list-all-product-customization-fields.apib)

#### List Fields With Options [GET /products/{product}/customizations.json{?fields}]

:[](.list-fields-with-options.apib)

### New Field to a Product [/products/{product}/customizations.json]

*/products/[_id]/customizations.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/product-customizations/product-field-object)

#### Add New Customization Field [POST]

:[](.add-new-customization-field.apib)

### Specific Field of a Product [/products/{product}/customizations/{_id}.json]

*/products/[_id]/customizations/[_id].json*

> Authentication<br>_GET_, _PATCH_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/product-customizations/product-field-object)

For editing, request body must obey the same specifications,
but there are no required fields, object should have at least one valid property

#### Read Product Customization Field [GET]

:[](.read-product-customization-field.apib)

#### Edit Customization Field [PATCH]

:[](.edit-customization-field.apib)

#### Remove Customization Field [DELETE]

:[](.remove-customization-field.apib)
