## Group Triggers

`.triggers`

Triggers are events that call the configured procedures,
running automatic tasks

They are created automaticly after each
modification operation (_POST_, _PUT_, _PATCH_ and _DELETE_) at this API

Use the **triggers** resource to read and delete triggers in
a merchant's store, you can also create fake triggers, mainly for tests purposes

### Trigger Object [/triggers/schema.json]

:[](.trigger-object.apib)

#### JSON Schema [GET]

:[](.json-schema.apib)

### All Triggers [/triggers.json{?method,resource}]

*/triggers.json?[field]*

> Authentication<br>_GET_: **required**

Pagination and ordering are not available, but you can use any other parameter,
such as `method` and `resource`, to query by particular object properties

Returns all properties excepting `body` and `response` of each trigger

#### List All Store Triggers [GET /triggers.json]

:[](.list-all-store-triggers.apib)

#### Find Triggers [GET]

:[](.find-triggers.apib)

### New Trigger [/triggers.json]

*/triggers.json*

> Authentication<br>_POST_: **required**

Request body must obey the specifications of
[this model](#reference/triggers/trigger-object)

All triggers created this way (not automatically) will be marked as fake,
having the property `fake` equals to _true_

#### Create New Trigger [POST]

:[](.create-new-trigger.apib)

### Specific Trigger [/triggers/{_id}.json]

*/triggers/[_id].json*

> Authentication<br>_GET_, _DELETE_: **required**

In read requests, response body will follow
[this model](#reference/triggers/trigger-object),
triggers created manually (forced) will be marked as fake,
having the property `fake` equals to _true_

#### Read Trigger [GET]

:[](.read-trigger.apib)

#### Remove Trigger [DELETE]

:[](.remove-trigger.apib)
