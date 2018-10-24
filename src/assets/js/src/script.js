
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

  var parseJson = function (json) {
    var obj
    try {
      obj = JSON.parse(json)
    } catch (e) {
      obj = {}
      console.error(e, json)
    }
    return obj
  }

  // declare auxiliars
  var i, apiConsole
  if (typeof $.fn.refapp === 'function') {
    apiConsole = true
  }

  // handle sidebar scroll and anchors spy
  var handleSidebar = function () {
    var $sidebar = $('.sidebar-sticky')
    $sidebar.each(function () {
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

    var spyAnchors = function () {
      if (location.hash !== '') {
        var $links = $sidebar.find('a:not(.list-group-item)')
        // reset
        $links.removeClass('active')
        // mark new active anchor
        $links.filter(function () {
          return $(this).attr('href') === location.hash
        }).addClass('active')
      }
    }
    $(window).on('hashchange', spyAnchors)
    // for initial hash
    spyAnchors()
  }

  // mark sidebar anchors and update hash based on scroll
  var scrollOffsets
  var scrollSpy = function () {
    if ($sidebar) {
      var $links = $sidebar.find('a:visible').filter(function () {
        return $(this).attr('href').charAt(0) === '#'
      })

      if (scrollOffsets === undefined) {
        // first function call
        var updateHash, waitLink

        // setup scroll event listener
        $(window).scroll(function () {
          if (waitLink) {
            // link clicked
            // ignore scrolling
            return
          }

          // check marked positions
          var top = $(this).scrollTop()
          for (var i = scrollOffsets.length - 1; i >= 0; i--) {
            var offset = scrollOffsets[i]
            if (top >= offset.top - 30) {
              // matched
              var hash = offset.hash
              if (location.hash !== hash) {
                if (updateHash) {
                  clearTimeout(updateHash)
                }

                // timeout to prevent multiple hash changes at "same time"
                updateHash = setTimeout(function () {
                  if (history.pushState) {
                    // update hash without scrolling
                    history.pushState(null, null, hash)
                  }

                  // update active anchor link
                  $links.removeClass('active').filter(function () {
                    return $(this).attr('href') === hash
                  }).addClass('active')
                }, 150)
              }
              break
            }
          }
        })

        // disable scroll spy when link is clicked
        // prevent errors with anchor links
        $('a').click(function () {
          waitLink = true
          setTimeout(function () {
            waitLink = false
          }, 700)
        })
      }
      // reset offsets array
      scrollOffsets = []

      // treat each anchor link
      $links.each(function () {
        var href = $(this).attr('href')
        // search head by ID
        var $head = $(href.replace(/([^#\w-])/g, '\\$1'))
        if ($head.length) {
          // add to offsets array
          scrollOffsets.push({
            top: $head.offset().top,
            hash: href
          })
        }
      })
    }
  }

  // create anchor links within article content
  var $article = $('#article')
  var $sidebar
  if ($article.length) {
    $sidebar = $('#sidebar')
    handleSidebar()

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

      // handle scroll spy
      scrollSpy()
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
      var api = hash.replace(/^#\/([\w]+)\/.*$/, '$1')
      var Api = Apis[api]
      if (Api && Api.github_repo) {
        // valid API name
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

        // save resource schema locally
        var Schemas
        // show resource attributes after console rendering
        var showAttributes = false

        var refractCallback = function (refract) {
          // reset resource schema to clear memory
          Schemas = {}
          // restart scroll spy
          scrollSpy()

          if (api === 'store') {
            // get JSON schema from refract object
            try {
              var schema = refract
                // use arbitrary known path
                .content[0].content[0].content[1].content[1]
                .content[0].content[1].content[0].content
              if (typeof schema === 'string') {
                schema = parseJson(schema)
                if (schema.hasOwnProperty('$schema')) {
                  // found
                  // get resource name from hash
                  var paths = window.location.hash.split('/')
                  if (paths.length >= 3) {
                    Schemas['/' + paths[2] + '/schema.json'] = schema
                  }
                }
              }
            } catch (e) {
              // ignore error
            }

            // search object model DOM element
            var $model = $refapp.find('h2,h3,h4,h5').filter(function () {
              var id = $(this).attr('id')
              if (id) {
                return id.substr(id.length - 7, 7) === '-object'
              } else {
                return false
              }
            })

            if ($model.length) {
              // add button linking resource data structure
              var $btn = $('<button>', {
                'class': 'btn btn-primary btn-round mb-3',
                html: '<i class="fa fa-database mr-1"></i> Data structure',
                // slide effect
                style: 'display: none',
                // handle click to show object model
                click: function () {
                  showAttributes = true
                  $(this).next().find('a').click()
                }
              })
              // append to documentation body
              $model.after($btn)
              $btn.slideDown()
            }
          }
        }

        // API console element
        var $console = $('#console')
        // mount API host string
        var endpointPath = Api.base_path + Api.version
        // button to switch sandbox and production hosts
        var isSandbox
        if (Api.sandbox) {
          isSandbox = true
        }
        var $switchHost

        // get host for production or sandbox
        var apiHost = function () {
          if (isSandbox) {
            return Api.sandbox.host + endpointPath
          } else {
            return Api.host + endpointPath
          }
        }

        // work with authentication session
        var Auth = function (setSession, storeId, session, setSandbox) {
          if (!setSession && isSandbox) {
            if (Api.sandbox.auth_session) {
              // return sandbox credentials from Api object
              // default Store ID for tests
              return Object.assign({ store_id: 100 }, Api.sandbox.auth_session)
            }
          }

          if (window.localStorage) {
            /* global localStorage */
            // base storage field label
            var label = 'auth.'
            if (setSandbox || (!setSession && isSandbox)) {
              label += 'sandbox.'
            }
            var sessionFields = [ 'my_id', 'access_token' ]
            var i, field

            if (!setSession) {
              // get only
              session = {
                // global Store ID
                store_id: localStorage.getItem(label + 'store_id')
              }
              // authentication fields
              for (i = 0; i < sessionFields.length; i++) {
                field = sessionFields[i]
                session[field] = localStorage.getItem(label + api + '.' + field)
              }

              // returns session object
              return session
            } else {
              // update auth session
              if (storeId) {
                // set Store ID for all APIs
                localStorage.setItem(label + 'store_id', storeId)
              }
              if (session) {
                // overwrite authentication API specific fields
                for (i = 0; i < sessionFields.length; i++) {
                  field = sessionFields[i]
                  localStorage.setItem(label + api + '.' + field, (session[field] || ''))
                }
              }

              return
            }
          }

          // no local storage browser support
          // return empty object
          return {}
        }

        if (!Auth().store_id) {
          // new session
          // default Store ID for tests
          Auth(true, 100)
          // same for sandbox
          Auth(true, 100, null, true)

          if (Api.auth) {
            // current api has authentication
            // empty authentication as default for production
            Auth(true, null, {})
            // same for sandbox
            Auth(true, null, {}, true)
          }
        }

        // get or set request headers for production and sandbox
        var apiHeaders = function (headers) {
          if (headers) {
            var session = Auth()
            if (headers.hasOwnProperty('X-Access-Token')) {
              // private resource
              // overwrite authentication headers
              headers['X-My-ID'] = session.my_id
              headers['X-Access-Token'] = session.access_token
            }
            if (headers.hasOwnProperty('X-Store-ID')) {
              // overwrite default Store ID
              headers['X-Store-ID'] = session.store_id
            }

            return headers
          } else {
            // return empty object
            return {}
          }
        }

        // keep current request and response objects locally
        var res, req
        var handleConsole = function (Req, Res) {
          // console.log(req, res)
          req = Req
          res = Res

          // mount Restform options object
          var opt = {
            title: req.title,
            host: apiHost(),
            endpoint: req.href,
            method: req.method,
            reqHeaders: apiHeaders(req.headers),

            // callback function for headeers changed events
            chageHeadersCallback: function (headers) {
              if (typeof headers === 'object' && headers !== null) {
                var storeId = headers['X-Store-ID']
                if (storeId) {
                  // save new headers
                  // save new auth session
                  var session = {
                    my_id: headers['X-My-ID'],
                    access_token: headers['X-Access-Token']
                  }
                  Auth(true, storeId, session, isSandbox)
                }
              }
            }
          }

          // request info
          if (req.hasOwnProperty('params')) {
            opt.params = req.params
          } else {
            // no params
            opt.params = []
          }
          if (req.hasOwnProperty('body')) {
            opt.reqBody = parseJson(req.body)
          }

          // sample response
          if (res.hasOwnProperty('status')) {
            opt.statusCode = res.status
          }
          if (res.hasOwnProperty('body')) {
            opt.resBody = parseJson(res.body)
          }

          var setup = function () {
            // setup Restform
            $console.restform(opt)
            if (!$switchHost && Api.sandbox) {
              var switchHost = function () {
                // link clicked to change API host
                if ($(this).hasClass('active')) {
                  // nothing to do
                  return false
                }

                // mark active
                $switchHost.find('.active').removeClass('active')
                $(this).addClass('active')
                // change current host on console
                isSandbox = !isSandbox
                // reset console
                $console.restform({
                  host: apiHost(),
                  reqHeaders: apiHeaders(req.headers)
                })
              }

              // render links to sandbox and production
              var $Link = function (text, isActive) {
                var options = {
                  href: 'javascript:;',
                  text: text,
                  click: switchHost
                }
                if (isActive) {
                  // mark active
                  options.class = 'active'
                }
                return $('<a>', options)
              }
              var $linkSandbox = $Link('Sandbox', isSandbox)
              var $linkProduction = $Link('Production', !isSandbox)
              $switchHost = $('<span>', { html: [ $linkSandbox, $linkProduction ] })
              // insert before endpoint
              $console.find('.restform-endpoint').before($switchHost)
            }

            if (showAttributes) {
              setTimeout(function () {
                // show resource attributes
                var $attrs = $console.find('.restform-attrs')
                if ($attrs.length) {
                  var scroll = function () {
                    // fix page scroll
                    // move to attributes list
                    $console.children().animate({
                      scrollTop: $console.find('.restform-attrs').position().top - 20
                    }, 400)
                    // reset attributes list scroll
                    $attrs.animate({ scrollTop: 0 }, 200)
                  }

                  // click on tab link
                  var $link = $console.find('.restform-tabs:first').children('a:last')
                  if ($link.length && !$link.attr('disabled') && !$link.hasClass('active')) {
                    $link.click()
                    // wait for tab changing
                    setTimeout(function () {
                      scroll()
                    }, 420)
                  } else {
                    scroll()
                  }
                }
              }, 420)
              // unset
              showAttributes = false
            }
          }

          // set schema asynchronously
          if (req.schema) {
            opt.schema = parseJson(req.schema)
          } else if (api === 'store') {
            // resource schema
            var schemaEndpoint = req.href
              // replace URL params with 'schema' except last if multiple
              .replace(/{[^}]+}\//g, 'schema/')
              // last ID param or query string
              .replace(/\/?{[^}]+}/g, '')
            if (schemaEndpoint.indexOf('schema') === -1) {
              schemaEndpoint = schemaEndpoint.replace('.json', '/schema.json')
            }
            // console.log(schemaEndpoint, Schemas)

            // try from stored schemas
            if (Schemas[schemaEndpoint]) {
              opt.schema = Schemas[schemaEndpoint]
            } else {
              // GET JSON Schema from API
              var $ajax = $.ajax({
                dataType: 'json',
                headers: {
                  'X-Store-ID': 100
                },
                url: Api.host + endpointPath + schemaEndpoint
              })
              $ajax.done(function (json) {
                opt.schema = json
              })
              $ajax.fail(function (jqxhr, textStatus, err) {
                console.error(err, jqxhr)
              })
              $ajax.always(function () {
                setup()
              })
              return
            }
          }
          setup()
        }

        // start Refapp
        var $refapp = $('#reference')
        var refappOpt = {
          asideClasses: 'sidebar sidebar-sticky rendered-summary',
          articleClasses: 'rendered-content',
          baseHash: '/store/',
          apiTitle: Api.label,
          refractCallback: refractCallback,
          actionCallback: handleConsole
        }
        if (window.showdown) {
          // parse Markdown to HTML
          var converter = new window.showdown.Converter()
          refappOpt.mdParser = function (md) { return converter.makeHtml(md) }
        }

        // update DOM
        $refapp.refapp(refracts, refappOpt)
        $sidebar = $refapp.find('.ref-sidebar')
        $article = $refapp.find('.ref-body')

        // fixes for sidebar
        $refapp.find('.sidebar')
          .width($sidebar.width())
          .children('h5').each(function () {
            $(this).replaceWith($('<h2>' + $(this).html() + '</h2>'))
          })
        // fix sidebar scroll
        handleSidebar()
      } else {
        // invalid API on URL hash
        invalidHash()
      }
    }
  }).fail(function (jqxhr, textStatus, err) {
    alert('Cannot GET Apis object :/')
    console.error(err)
  })

  // fix Apiary links
  $('a').each(function () {
    var href = $(this).attr('href')
    if (href) {
      var paths = href.split('/')
      if (paths.length >= 3) {
        var toApiConsole
        var host = paths[2]

        // check Apiary docs hosts
        toApiConsole = host.replace(/^ecom([^.]+)\.docs\.apiary\.io$/, '$1')
        if (toApiConsole !== host) {
          // update link href
          href = Urls.console + '#/' + toApiConsole
          // keep original URL
          for (var i = 3; i < paths.length; i++) {
            var path = paths[i].replace('#reference', '')
            if (path !== '') {
              href += '/' + path
            }
          }
          $(this).attr({
            href: href,
            target: '_blank'
          })
        }
      }
    }
  })
})
