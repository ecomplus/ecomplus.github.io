## Group Application Hidden Data

`.applications.hidden_data`

Use the **hidden_data** subresource to read and update an
specific app private data, such as tokens and secret keys

### Application Hidden Data Object [/applications/schema/hidden_data.json]

This endpoint is **schema free**, it means that you can send any valid JSON object,
the only limitations are to store up to 3000 properties in the data object and obey
[MongoDB document limits](https://docs.mongodb.com/manual/reference/limits/#bson-documents)

#### JSON Schema [GET]

:[](.json-schema.apib)

### Hidden Data of an Application [/applications/{application}/hidden_data.json]

*/applications/[_id]/hidden_data.json*

> Authentication<br>_GET_, _PATCH_: **required**

#### Read Application Hidden Data [GET]

:[](.read-application-hidden-data.apib)

#### Edit Application Hidden Data [PATCH]

:[](.edit-application-hidden-data.apib)
