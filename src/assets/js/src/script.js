
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
  /* set globals */

  // E-Com Plus APIs
  window.Apis = {
    store: {
      host: 'https://api.e-com.plus/',
      version: 'v1',
      sandbox: {
        host: 'https://sandbox.e-com.plus/',
        version: 'v1'
      },
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

  // general function to load HTML content
  window.loadContent = function () {
  }

  // general function to run an API request
  window.callApi = function (host, endpoint, method, callback, bodyObject) {
    var options = {
      // API endpoint full URL
      url: host + endpoint,
      headers: {
        // authenticate store only
        // no authorization tokens
        'X-Store-ID': 100
      },
      method: method
    }
    console.log(options)
    // addRequest(options, bodyObject, callback)
  }

  /* start content rendering */

  // fill footer links
  var html = ''
  for (var api in Apis) {
    // get API resources
    if (Apis.hasOwnProperty(api)) {
      html += '<li><a href="/#/' + api + '">' + Apis[api].label + '</a></li>'
    }
  }
  $('#footer-apis').html(html).slideDown()
})
