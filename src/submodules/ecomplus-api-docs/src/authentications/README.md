## Group Authentications

`.authentications`

Use the **authentications** resource to create, read, update and delete
admin users in a merchant's store

Users created from this resource should authenticate with API by
[this way](#reference/authenticate-yourself)

### Authentication Object [/authentications/schema.json]

:[](.authentication-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Authentications [/authentications.json]

*/authentications.json*

> Authentication<br>_GET_, _POST_: **required**

Pagination, filtering and ordering are not available,
you should not use any URL parameters

List returns only `_id`, `username`, `email` and
`app` (in case of application auth) of each authentication

To create new authentication, request body must obey the specifications of
[this model](#reference/authentications/authentication-object)

#### List All Store Authentications [GET /authentications.json]

:[](.list-all-store-authentications.apib)

#### Create New Authentication [POST]

:[](.create-new-authentication.apib)

### Specific Authentication [/authentications/{_id}.json]

*/authentications/[_id].json*

> Authentication<br>_GET_, _PATCH_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/authentications/authentication-object),
without `pass_md5_hash` property

It's possible to use __me__ on resource ID (*/authentications/me.json*)
to work with your own authentication
(see [Yourself](#reference/authentications/yourself))

For editing, request body must obey the same specifications,
but in this case there are no required fields

#### Read Authentication [GET]

:[](.read-authentication.apib)

#### Edit Authentication [PATCH]

:[](.edit-authentication.apib)

#### Remove Authentication [DELETE]

:[](.remove-authentication.apib)

### Yourself [/authentications/me.json]

*/authentications/me.json*

> Authentication<br>_GET_, _PATCH_, _DELETE_: **required**

At this endpoint you will work
with the same authentication of _X-My-ID_ header

In read requests, response body will follow
[this model](#reference/authentications/authentication-object),
without `pass_md5_hash` property

For editing, request body must obey the same specifications,
but in this case there are no required fields

#### Read Your Own Authentication [GET]

:[](.read-your-own-authentication.apib)

#### Edit Your Authentication [PATCH]

:[](.edit-your-authentication.apib)

#### Remove Your Authentication [DELETE]

:[](.remove-your-authentication.apib)
