
/*
|--------------------------------------------------------------------------
| Custom Javascript code
|--------------------------------------------------------------------------
|
| Now that you configured your website, you can write additional Javascript
| code inside the following function. You might want to add more plugins and
| initialize them in this file.
|
*/

$(function () {
  // console.log('E-Com Plus Devs :D')
  window.Apis = {
    store: {
      host: 'https://api.e-com.plus/',
      version: 'v1',
      label: 'Store REST API'
    },
    search: {
      host: 'https://apx-search.e-com.plus/api/',
      version: 'v1',
      label: 'Search'
    },
    graphs: {
      host: 'https://apx-graphs.e-com.plus/api/',
      version: 'v1',
      label: 'Recommendations'
    },
    main: {
      host: 'https://e-com.plus/api/',
      version: 'v1',
      label: 'Main platform'
    }
  }
})
