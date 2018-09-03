## Group Applications

`.applications`

Use the **applications** resource to create, read, update and delete apps in
a merchant's store, you can edit all application properties and also work with all
application subresources directly at this resource

### Application Object [/applications/schema.json]

:[](.application-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Applications [/applications.json{?limit,offset,sort,fields}]

*/applications.json?limit&offset&sort&fields\&[field]*

> Authentication<br>_GET_: **required**

Use [default URL parameters](#introduction/overview/url-params) (metadata)
for pagination and ordering, you can use any other parameter to query
by particular object properties

#### List All Store Applications [GET /applications.json]

:[](.list-all-store-applications.apib)

#### Pagination And Ordering [GET]

:[](.pagination-and-ordering.apib)

#### Find Applications [GET /applications.json{?app_id}]

:[](.find-applications.apib)

### New Application [/applications.json]

*/applications.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/applications/application-object)

#### Create New Application [POST]

:[](.create-new-application.apib)

### Specific Application [/applications/{_id}.json]

*/applications/[_id].json*

> Authentication<br>_GET_: **optional**<br>_PATCH_, _PUT_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/applications/application-object),
requests without authentication will receive application data without
`authentication`, `auth_scope` and `hidden_data` properties

For overwriting and editing, request body must obey the same specifications,
but especially for edit requests there are no required fields

#### Read Application [GET /applications/{application}.json]

:[](.read-application.apib)

#### With Authentication [GET]

:[](.with-authentication.apib)

#### Edit Application [PATCH]

:[](.edit-application.apib)

#### Overwrite Application [PUT]

:[](.overwrite-application.apib)

#### Remove Application [DELETE]

:[](.remove-application.apib)
