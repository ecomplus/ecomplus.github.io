## Group Brands

`.brands`

Use the **brands** resource to create, read, update and delete brands (manufacturers) in
a merchant's store, you can edit all brand properties and also work with all
brand subresources directly at this resource

### Brand Object [/brands/schema.json]

:[](.brand-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Brands [/brands.json{?limit,offset,sort,fields}]

*/brands.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **none**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Brands [GET /brands.json]

:[](.list-all-store-brands.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Brands [GET /brands.json{?slug}]

:[](.find-brands.apib)

### New Brand [/brands.json]

*/brands.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/brands/brand-object)

#### Create New Brand [POST]

:[](.create-new-brand.apib)

### Specific Brand [/brands/{_id}.json]

*/brands/[_id].json*

> Authentication<br>_GET_: **none**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/brands/brand-object)

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Brand [GET]

:[](.read-brand.apib)

#### Edit Brand [PATCH]

:[](.edit-brand.apib)

#### Overwrite Brand [PUT]

:[](.overwrite-brand.apib)

#### Remove Brand [DELETE]

:[](.remove-brand.apib)
