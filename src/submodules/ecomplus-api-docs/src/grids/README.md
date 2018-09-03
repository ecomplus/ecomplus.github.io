## Group Grids

`.grids`

Use the **grids** resource to create, read, update and delete product grids in
a merchant's store, you can edit all grid properties and also work with all
grid subresources directly at this resource

### Grid Object [/grids/schema.json]

:[](.grid_object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Grids [/grids.json{?limit,offset,sort,fields}]

*/grids.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **none**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Grids [GET /grids.json]

:[](.list-all-store-grids.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Grids [GET /grids.json{?grid_id}]

:[](.find-grids.apib)

### New Grid [/grids.json]

*/grids.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/grids/grid-object)

#### Create New Grid [POST]

:[](.create-new-grid.apib)

### Specific Grid [/grids/{_id}.json]

*/grids/[_id].json*

> Authentication<br>_GET_: **none**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/grids/grid-object)

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Grid [GET]

:[](.read-grid.apib)

#### Edit Grid [PATCH]

:[](.edit-grid.apib)

#### Overwrite Grid [PUT]

:[](.overwrite-grid.apib)

#### Remove Grid [DELETE]

:[](.remove-grid.apib)
