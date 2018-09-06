
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
  $.getJSON('/src/assets/json/apis.json', function (json) {
    // success
    window.Apis = json
  }).fail(function (jqxhr, textStatus, err) {
    alert('Cannot GET Apis object :/')
    console.error(err)
  })

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

  var handleAnchor = function () {
    // treat anchor links
    var link = $(this).attr('href')
    if (link.charAt(0) === '#') {
      // changing hash only
      // update browser history
      if (typeof (history.pushState) !== 'undefined') {
        // current page title
        var title = document.title.replace(/(.*~\s)?(.*)/, '$2')
        // try to find element with ID equals to link hash
        var $head = $(link)
        if ($head.length) {
          title = $head.text() + ' ~ ' + title
        }
        // current URL with hash
        var url = location.origin + location.pathname + $(this).attr('href')

        // update page title
        document.title = title
        // push to history
        var obj = {
          Title: title,
          Url: url
        }
        history.pushState(obj, title, url)
      }
    }
  }

  // handle sidebar scroll
  var $sidebar = $('#sidebar')
  if ($sidebar.length) {
    var ps
    try {
      ps = new window.PerfectScrollbar($sidebar[0], {
        wheelPropagation: true,
        wheelSpeed: 0.5
      })
    } catch (e) {
      console.error(e, ps)
    }

    // handle summary links
    var $summary = $sidebar.find('a')
    $summary.click(handleAnchor)
  }

  // create anchor links within article content
  var $article = $('#article')
  if ($article.length) {
    $article.find('h1,h2,h3,h4,h5').each(function () {
      var text = $(this).text()
      // render ID from header text
      var anchor = text.toLowerCase().replace(/\s/g, '-')
      // fix anchor ID and add link
      $(this).attr('id', anchor).html($('<a />', {
        'class': 'anchor-link',
        href: '#' + anchor,
        click: handleAnchor,
        text: text
      }))
    })

    if ($sidebar.length) {
      // find current page link on summary
      var $self = $summary.filter(function () {
        var href = $(this).attr('href')
        if (href === './') {
          return true
        }
        // test the end of current URL and link
        var regex = new RegExp('[./]+/' + location.pathname.replace(/.*\/([^/]+\/?)/, '$1'))
        return regex.test(href)
      })

      if ($self.length) {
        // create nav element to next and previous buttons
        var $articleNav = $('<div />', {
          'class': 'row align-items-center mt-6 gap-y'
        })
        // move to li on ul
        var $liSelf = $self.parent()

        // next and previous page link element
        var movePages = [ 'prev', 'next' ]
        for (var i = 0; i < 2; i++) {
          var moveTo = movePages[i]
          var $pageLink = $liSelf[moveTo]().children()
          if ($pageLink.length) {
            // add button to nav
            // new row column
            $articleNav.append($('<div />', {
              'class': 'col-sm-6 ml-auto move-page-col-' + moveTo,
              html: $('<a />', {
                'class': 'card p-5 shadow-1 b-1 hover-shadow-7 move-page move-page-' + moveTo,
                html: '<i></i><small>' + moveTo + '</small>' + $pageLink.text(),
                href: $pageLink.attr('href')
              })
            }))
          }
        }

        // add nav to article element
        $article.append($articleNav)
        $articleNav.slideDown()
      }
    }

    if (window.githubRepo) {
      // add link to repository issues
      $article.append($('<div />', {
        'class': 'section-header',
        html: [
          '<hr><h4>Do you have a question?</h4><small>Let us help</small><br>',
          $('<a />', {
            'class': 'btn btn-info btn-lg btn-round',
            href: 'https://github.com/ecomclub/' + githubRepo.name + '/issues/new',
            target: '_blank',
            html: '<i class="fa fa-exclamation-circle mr-1"></i> Open an issue'
          })
        ]
      }))
    }
  }
})
