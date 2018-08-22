
/*
|--------------------------------------------------------------------------
| Custom Javascript code
|--------------------------------------------------------------------------
*/

$(function () {
  /* set globals */

  // sample store ID
  window.storeId = 100
  var Headers = function () {
    return {
      // by default, authenticate store only
      // no authorization tokens
      'X-Store-ID': storeId
    }
  }

  // E-Com Plus APIs
  window.Apis = {
    store: {
      host: 'https://api.e-com.plus/',
      version: 'v1',
      sandbox: {
        host: 'https://sandbox.e-com.plus/',
        version: 'v1',
        auth: true,
        // default sandbox authorization headers
        auth_session: {
          my_id: '5a6757722b66f68dbed44526',
          access_token: 'eyJhbGciOi.eyJzdWIi.AFONFh7HgQ'
        }
      },
      auth: true,
      // no production authorization by default
      auth_session: null,
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
      no_headers: true,
      label: 'Main platform'
    }
  }

  // general function to load HTML content
  window.loadContent = function () {
  }

  // general function to run an API request
  window.callApi = function (api, endpoint, method, callback, bodyObject) {
    // setup request headers
    var headers = Headers()
    if (api.auth_session) {
      // set authorization headers
      headers['X-My-ID'] = api.auth_session.my_id
      headers['X-Access-Token'] = api.auth_session.access_token
    }
    var options = {
      // API endpoint full URL
      url: api.host + endpoint,
      headers: headers,
      method: method
    }
    if (bodyObject) {
      options.data = JSON.stringify(bodyObject)
    }

    // console.log(options)
    // run API request
    // always JSON
    options.dataType = 'json'
    if (options.data) {
      options.contentType = 'application/json; charset=UTF-8'
    }
    // call AJAX request
    var ajax = $.ajax(options)

    ajax.done(function (json) {
      // successful response
      if (typeof callback === 'function') {
        callback(null, json)
      } else {
        console.log(json)
      }
    })

    ajax.fail(function (jqXHR, textStatus, err) {
      var json = jqXHR.responseJSON
      // error response
      if (typeof callback === 'function') {
        callback(err, json)
      }
      if (jqXHR.status >= 500) {
        console.log('API request with internal error response:')
        console.log(jqXHR)
      }
    })
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
