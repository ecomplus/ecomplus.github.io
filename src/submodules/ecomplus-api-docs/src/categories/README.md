## Group Categories

`.categories`

Use the **categories** resource to create, read, update and delete categories (taxonomy) in
a merchant's store, you can edit all category properties and also work with all
category subresources directly at this resource

### Category Object [/categories/schema.json]

:[](.category-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Categories [/categories.json{?limit,offset,sort,fields}]

*/categories.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **none**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Categories [GET /categories.json]

:[](.list-all-store-categories.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Categories [GET /categories.json{?slug}]

:[](.find-categories.apib)

### New Category [/categories.json]

*/categories.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/categories/category-object)

#### Create New Category [POST]

:[](.create-new-category.apib)

### Specific Category [/categories/{_id}.json]

*/categories/[_id].json*

> Authentication<br>_GET_: **none**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/categories/category-object)

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Category [GET]

:[](.read-category.apib)

#### Edit Category [PATCH]

:[](.edit-category.apib)

#### Overwrite Category [PUT]

:[](.overwrite-category.apib)

#### Remove Category [DELETE]

:[](.remove-category.apib)
