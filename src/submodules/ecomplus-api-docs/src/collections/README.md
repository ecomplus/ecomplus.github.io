## Group Collections

`.collections`

Use the **collections** resource to create, read, update and delete groups of products in
a merchant's store, you can edit all collection properties and also work with all
collection subresources directly at this resource

### Collection Object [/collections/schema.json]

:[](.collection-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Collections [/collections.json{?limit,offset,sort,fields}]

*/collections.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **none**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Collections [GET /collections.json]

:[](.list-all-store-collections.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Collections [GET /collections.json{?slug}]

:[](.find-collections.apib)

### New Collection [/collections.json]

*/collections.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/collections/collection-object)

#### Create New Collection [POST]

:[](.create-new-collection.apib)

### Specific Collection [/collections/{_id}.json]

*/collections/[_id].json*

> Authentication<br>_GET_: **none**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/collections/collection-object)

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Collection [GET]

:[](.read-collection.apib)

#### Edit Collection [PATCH]

:[](.edit-collection.apib)

#### Overwrite Collection [PUT]

:[](.overwrite-collection.apib)

#### Remove Collection [DELETE]

:[](.remove-collection.apib)
