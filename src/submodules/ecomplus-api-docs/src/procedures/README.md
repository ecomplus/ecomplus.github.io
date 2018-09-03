## Group Procedures

`.procedures`

Procedures provides automation to the commerce operation,
working with triggers to run tasks automatically

Use the **procedures** resource to create, read, update and delete
automatic tasks in a merchant's store

### Procedure Object [/procedures/schema.json]

:[](.procedure-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Procedures [/procedures.json{?tag}]

*/procedures.json?[field]*

> Authentication<br>_GET_: **required**

Pagination and ordering are not available, but you can use any other parameter,
such as `tag` or `triggers.resource`
(with [dot notation](https://docs.mongodb.com/manual/core/document/#dot-notation)),
to query by particular object properties

Returns only `title` and `short_description` of each procedure

#### List All Store Procedures [GET /procedures.json]

:[](.list-all-store-procedures.apib)

#### Find Procedures [GET]

:[](.find-procedures.apib)

### New Procedure [/procedures.json]

*/procedures.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/procedures/procedure-object)

In some properties you can use variables as value:
- `(tr.*)` to get values from trigger object
  - eg.: `(tr.body.name)`

#### Create New Procedure [POST]

:[](.create-new-procedure.apib)

### Specific Procedure [/procedures/{_id}.json]

*/procedures/[_id].json*

> Authentication<br>_GET_, _PATCH_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/procedures/procedure-object)

For editing, request body must obey the same specifications,
but in this case there are no required fields

#### Read Procedure [GET]

:[](.read-procedure.apib)

#### Edit Procedure [PATCH]

:[](.edit-procedure.apib)

#### Remove Procedure [DELETE]

:[](.remove-procedure.apib)
