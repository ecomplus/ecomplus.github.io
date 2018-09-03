## Group Stores

`.stores`

Use the **stores** resource to read and update the
shop main informations and IDs of saved documents

### Store Object [/stores/schema.json]

:[](.store-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### Specific Store [/stores/{_id}.json]

*/stores/[_id].json*

> Authentication<br>_GET_: **none**

Response body will follow
[this model](#reference/stores/store-object), but only with public data,
returning `_id`, `store_id`, `name`, `description`, `segment_id`,
`contact_email`, `referral_id`, `partner_id`, `logo` and `languages` properties

#### Read Store [GET]

:[](.read-store.apib)

### Your Store [/stores/me.json]

*/stores/me.json*

> Authentication<br>_GET_, _PATCH_: **required**

In read requests, response body will follow
[this model](#reference/stores/store-object)

For editing, request body must obey the same specifications,
but in this case there are no required fields

#### Read Your Store [GET]

:[](.read-your-store.apib)

#### Edit Your Store [PATCH]

:[](.edit-your-store.apib)
