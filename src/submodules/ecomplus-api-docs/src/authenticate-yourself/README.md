## Group Authenticate Yourself

This authentication method is provided to admin users,
for application authentication you must implement
[Authenticate App](#reference/authenticate-app)

### Step 1: Login [/_login.json]

This step is not required, if you have your own ID and API key skip to the
[next step](#reference/authenticate-yourself/step-2-authenticate)

#### View User ID And API Key [POST]

:[](.view-user-id-and-api-key.apib)

#### With Username Instead Of Email [POST /_login.json?username]

If you don't know the store ID, you can login with username and password only,
passing any positive integer on `X-Store-ID` header

:[](.with-username-instead-of-email.apib)

### Step 2: Authenticate [/_authenticate.json]

Use `_id` and `api_key` returned from [login](#reference/authenticate-yourself/step-1-login)

Will return token and ID to be used on further
([authenticated](#introduction/overview/authentication)) requests,
the returned token is valid for one day, as defined by *expires* ISO 8601 date and time,
then you will need to generate another token

#### Generate Access Token [POST]

:[](.generate-access-token.apib)
