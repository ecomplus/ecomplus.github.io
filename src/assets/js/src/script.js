
/*
|--------------------------------------------------------------------------
| Custom Javascript code
|--------------------------------------------------------------------------
*/

$(function () {
  /* auxiliars */

  var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

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

  // declare auxiliars
  var i, apiConsole
  if (typeof $.fn.refapp === 'function') {
    apiConsole = true
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
  var handleScroll = function () {
    $('.sidebar-sticky').each(function () {
      var ps
      try {
        ps = new window.PerfectScrollbar($(this)[0], {
          wheelPropagation: true,
          wheelSpeed: 0.5
        })
      } catch (e) {
        console.error(e, ps)
      }
    })
  }

  // create anchor links within article content
  var $article = $('#article')
  if ($article.length) {
    var $sidebar = $('#sidebar')
    handleScroll()

    // check if summary is rendered
    var emptySidebar, $sidebarNav, $deepSidebarNav, $summary, currentHeader
    if ($sidebar.length) {
      emptySidebar = !$sidebar.children('ol,ul').length
      if (emptySidebar) {
        $sidebarNav = $('<ol />', { 'class': 'hidden' })
      }
      // control sidebar lists tree
      $deepSidebarNav = $sidebarNav
    }

    $article.find('h1,h2,h3,h4,h5').each(function () {
      var text = $(this).text()
      // render ID from header text
      var anchor = text.toLowerCase().replace(/\s/g, '-')
      // fix anchor ID and add link
      var link = {
        href: '#' + anchor,
        click: handleAnchor,
        text: text
      }
      $(this).attr('id', anchor).html($('<a />', Object.assign({ 'class': 'anchor-link' }, link)))

      if (emptySidebar) {
        // control sidebar tree by heading tags
        // get header number (H1 -> 1)
        var header = parseInt($(this).prop('tagName').charAt(1), 10)
        if (currentHeader !== header) {
          if (currentHeader !== undefined) {
            // not first anchor
            if (currentHeader < header) {
              // new deeper anchors list
              var $list = $('<ul />')
              $deepSidebarNav.find('li:last').append($list)
              $deepSidebarNav = $list
            } else {
              // scale up
              do {
                $deepSidebarNav = $deepSidebarNav.parent().parent()
              } while ($deepSidebarNav.data('header') !== header)
            }
          }
          currentHeader = header
          // mark on element
          $deepSidebarNav.data('header', currentHeader)
        }

        // add link to sidebar menu
        $deepSidebarNav.append($('<li />', { html: $('<a />', link) }))
      }
    })

    if ($sidebar.length) {
      if (emptySidebar) {
        // sidebar menu rendered
        $sidebar.append($sidebarNav)
        $sidebarNav.slideDown()
      }
      // handle summary links
      $summary = $sidebar.find('a')
      $summary.click(handleAnchor)

      // buttons to next and prev articles
      var moveTo, $pageLink
      var moves = []

      if (!window.apiReference) {
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
          // move to li on ul
          var $liSelf = $self.parent()

          // next and previous page link element
          var movePages = [ 'prev', 'next' ]
          for (i = 0; i < 2; i++) {
            moveTo = movePages[i]
            $pageLink = $liSelf[moveTo]().children()
            if ($pageLink.length) {
              // add to moves array
              moves.push({
                to: moveTo,
                text: $pageLink.text(),
                href: $pageLink.attr('href')
              })
            }
          }
        }
      } else {
        // link to console
        moves.push({
          to: 'next',
          text: 'Endpoints and examples',
          href: consoleLink
        })
      }

      if (moves.length) {
        // create nav element to next and previous buttons
        var $articleNav = $('<div />', {
          'class': 'row align-items-center mt-6 gap-y'
        })

        for (i = 0; i < moves.length; i++) {
          moveTo = moves[i].to
          // add button to nav
          // new row column
          $articleNav.append($('<div />', {
            'class': 'col-sm-6 ml-auto move-page-col-' + moveTo,
            html: $('<a />', {
              'class': 'card p-5 shadow-1 b-1 hover-shadow-7 move-page move-page-' + moveTo,
              html: '<i></i><small>' + moveTo + '</small>' + moves[i].text,
              href: moves[i].href
            })
          }))
        }

        // add nav to article element
        $article.append($articleNav)
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
            href: githubRepo.host + githubRepo.name + '/issues/new',
            target: '_blank',
            html: '<i class="fa fa-exclamation-circle mr-1"></i> Open an issue'
          })
        ]
      }))
    }
  }

  // E-Com Plus APIs
  $.getJSON('/src/assets/json/apis.json', function (json) {
    // success
    window.Apis = json
    var i, resources

    if (window.apiReference) {
      if ($sidebar.length) {
        // render resource menu
        var $resources = $('<ol />', { 'class': 'hidden' })
        var $resourcesTree = []
        resources = Apis[apiReference].resources
        // list resources for menu
        var resourcesMenu = []
        var resource

        for (i = 0; i < resources.length; i++) {
          resource = resources[i]
          // escape auth and third party resources
          if (/^[a-z]/.test(resource)) {
            resourcesMenu.push(resource)
          }
        }
        // order resources list
        resourcesMenu.sort(function (a, b) {
          if (a < b) return -1
          if (a > b) return 1
          return 0
        })
        // console.log(resourcesMenu)

        for (i = 0; i < resourcesMenu.length; i++) {
          resource = resourcesMenu[i]
          var paths = resource.split('/')
          var resourceName = paths[paths.length - 1].replace(/_/g, ' ')
          // new li element
          var $li = $('<li />', {
            html: $('<a />', {
              href: consoleLink + resource,
              // capitalize resource name
              text: capitalize(resourceName)
            })
          })

          // add to tree to control resource levels
          $resourcesTree[paths.length] = $li
          if (paths.length === 1) {
            // main resource
            $resources.append($li)
          } else {
            // subresource or third level
            var $resourceLevel = $resourcesTree[paths.length - 1]
            var $ul = $resourceLevel.children('ul')
            if (!$ul.length) {
              // new list
              $ul = $('<ul />')
              $resourceLevel.append($ul)
            }
            $ul.append($li)
          }
        }

        // add resources to sidebar
        setTimeout(function () {
          $sidebar.append([
            '<h2>Resources</h2>',
            $resources
          ])
          $resources.slideDown()
        }, 300)
      }
    } else if (apiConsole) {
      // treat current URL hash
      var invalidHash = function () {
        // redirect to Store API by default
        window.location = './#/store/'
        window.location.reload()
      }
      var hash = location.hash
      if (!hash) {
        invalidHash()
      }

      // API name from hash
      var api = hash.replace(/[#/]/g, '')
      var Api = Apis[api]
      if (Api && Api.github_repo) {
        // valid API name
        // unset hash
        location.hash = '#'

        // list API docs JSON Refracts
        var basePath = '/src/submodules/' + Api.github_repo + '/src'
        var refracts = []
        if (api === 'store') {
          // add authentication reference
          refracts.push({
            src: basePath + '/authenticate-yourself/refract.json',
            title: 'Authenticate Yourself'
          }, {
            src: basePath + '/authenticate-app/refract.json',
            title: 'Authenticate App'
          })
        }
        resources = Api.resources
        for (i = 0; i < resources.length; i++) {
          resource = resources[i]
          // main resources only
          if (/^[a-z]+$/.test(resource)) {
            refracts.push({
              src: basePath + '/' + resource + '/refract.json',
              // capitalize resource name
              title: capitalize(resource)
            })
          }
        }

        // start Refapp
        var $refapp = $('#reference')
        var refappOpt = {
          asideClasses: 'sidebar sidebar-sticky rendered-summary',
          articleClasses: 'rendered-content',
          apiTitle: Api.label,
          actionCallback: function (req, res) {
            $('#console').restform({})
          }
        }
        if (window.showdown) {
          // parse Markdown to HTML
          var converter = new window.showdown.Converter()
          refappOpt.mdParser = function (md) { return converter.makeHtml(md) }
        }
        $refapp.refapp(refracts, refappOpt)

        // fixes for sidebar
        $refapp.find('.sidebar-sticky')
          .width($refapp.find('.ref-sidebar').width())
          .children('h5').each(function () {
            $(this).replaceWith($('<h2>' + $(this).html() + '</h2>'))
          })
        // fix sidebar scroll
        handleScroll()
      } else {
        // invalid API on URL hash
        invalidHash()
      }
    }
  }).fail(function (jqxhr, textStatus, err) {
    alert('Cannot GET Apis object :/')
    console.error(err)
  })
})
