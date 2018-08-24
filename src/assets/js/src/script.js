
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
      host: 'https://api.e-com.plus',
      base_path: '/',
      version: 'v1',
      sandbox: {
        host: 'https://sandbox.e-com.plus',
        // default sandbox authorization headers
        auth_session: {
          my_id: '5a6757722b66f68dbed44526',
          access_token: 'eyJhbGciOi.eyJzdWIi.AFONFh7HgQ'
        }
      },
      auth: true,
      // no production authorization by default
      auth_session: null,
      resources: [],
      label: 'Store REST API'
    },
    search: {
      host: 'https://apx-search.e-com.plus',
      base_path: '/api/',
      version: 'v1',
      resources: [],
      label: 'Search'
    },
    graphs: {
      host: 'https://apx-graphs.e-com.plus',
      base_path: '/api/',
      version: 'v1',
      no_headers: true,
      resources: [],
      label: 'Recommendations'
    },
    main: {
      host: 'https://e-com.plus',
      base_path: '/api/',
      version: 'v1',
      no_headers: true,
      resources: [],
      label: 'Main platform'
    }
  }

  // general function to load HTML content
  window.loadContent = function () {
  }

  // general function to run an API request
  window.callApi = function (api, endpoint, method, callback, bodyObject) {
    var headers
    if (!api.no_headers) {
      // setup request headers
      headers = Headers()
      if (api.auth_session) {
        // set authorization headers
        headers['X-My-ID'] = api.auth_session.my_id
        headers['X-Access-Token'] = api.auth_session.access_token
      }
    } else {
      headers = {}
    }

    // AJAX options
    var options = {
      // API endpoint full URL
      url: api.host + api.base_path + api.version + endpoint,
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

  var getApiResources = function (Api, api) {
    var endpoint = '/'
    var method = 'GET'
    var callback = function (err, json) {
      if (!err) {
        // remove base path and json extension from returned resources urls
        var path = Api.base_path + Api.version + '/'
        var resources = json.resources.map(function (uri) {
          return uri.replace(new RegExp('^' + path + '(.*).json$'), '$1')
        })
        // update Apis object
        Api.resources = resources

        if (api === 'store') {
          // fill footer resources links
          var html = ''
          for (var i = 0; i < resources.length; i++) {
            var resource = resources[i]
            // skip subresources
            if (/^[a-z][^/]+$/.test(resource)) {
              // add footer API resource link
              // capitalize resource name
              var text = resource.charAt(0).toUpperCase() + resource.slice(1)
              var link = '/#/reference/' + api + '/' + resource
              html += '<li><a href="' + link + '">' + text + '</a></li>'
            }
          }
          $('#footer-resources').html(html).slideDown()
        }
      }
    }

    // send request
    callApi(Api, endpoint, method, callback)
  }

  /* fill footer links
  var html = ''
  for (var api in Apis) {
    if (Apis.hasOwnProperty(api)) {
      var Api = Apis[api]
      // add footer API link
      html += '<li><a href="/#/reference/' + api + '">' + Api.label + '</a></li>'
      getApiResources(Api, api)
    }
  }
  $('#footer-apis').html(html).slideDown()
  */
})
