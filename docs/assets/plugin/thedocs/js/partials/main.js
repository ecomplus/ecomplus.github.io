
/**
 * Load required plugins.
 */
window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js/dist/umd/popper');
require('bootstrap');
window.SmoothScroll = require('smoothscroll-for-websites');
window.PerfectScrollbar = require('perfect-scrollbar/dist/perfect-scrollbar.min.js');

require('clipboard');
require('prismjs');
/*
// It doesn't work with Prism v1.15.0
var loadLanguages = require('prismjs/components/index');
loadLanguages([
  'aspnet',
  'bash',
  'c',
  'coffeescript',
  'cpp',
  'csharp',
  'git',
  'go',
  'http',
  'java',
  'json',
  'jsx',
  'latex',
  'less',
  'markdown',
  'matlab',
  'objectivec',
  'perl',
  'php',
  'python',
  'ruby',
  'sass',
  'scss',
  'sql',
  'swift',
]);
*/
/*
require('prismjs/components/prism-markup.min.js');
require('prismjs/components/prism-css.min.js');
require('prismjs/components/prism-clike.min.js');
require('prismjs/components/prism-javascript.min.js');
*/

require('prismjs/components/prism-aspnet');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-c');
require('prismjs/components/prism-coffeescript');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-git');
require('prismjs/components/prism-go');
require('prismjs/components/prism-http');
require('prismjs/components/prism-java');
require('prismjs/components/prism-json');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-latex');
require('prismjs/components/prism-less');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-matlab');
require('prismjs/components/prism-objectivec');
require('prismjs/components/prism-perl');
require('prismjs/components/prism-php');
require('prismjs/components/prism-python');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-sass');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-swift');


require('prismjs/plugins/toolbar/prism-toolbar.min.js');
require('prismjs/plugins/line-highlight/prism-line-highlight.min.js');
require('prismjs/plugins/line-numbers/prism-line-numbers.min.js');
require('prismjs/plugins/show-language/prism-show-language.min.js');
require('prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js');
require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js');


/**
 * Create window.page and init the application.
 */

+function($, window){

  var page = {
    name:       'TheDocs',
    version:    '2.0.1',
    vendors:    [],

    // Cache popular elements
    body:       $('body'),
    navbar:     $('.navbar'),
    header:     $('.header'),
    footer:     $('.footer'),
  }

  page.defaults = {
    googleApiKey:       null,
    googleAnalyticsKey: null,
    reCaptchaSiteKey:   null,
    reCaptchaLanguage:  null,
    disableAOSonMobile: true,
    smoothScroll:       false,
  }

  /**
   * Call all the required initializers.
   */
  page.init = function() {

    // Vendors
    //
    page.initVendors();

    // Partials
    //
    page.initBind();
    page.initDrawer();
    page.initFileTree();
    page.initFont();
    page.initForm();
    page.initMailer();
    page.initModal();
    page.initNavbar();
    page.initOffcanvas();
    page.initPopup();
    page.initScroll();
    page.initSection();
    page.initSidebar();
    page.initVideo();

    $(document).on('click', '.switch', function() {
      var input = $(this).children('.switch-input').not(':disabled');
      input.prop('checked', ! input.prop('checked'));
    });


    // Anchor for headings
    //
    $('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function() {
      var heading = $(this);

      if (heading.hasClass('no-anchor')) {
        return;
      }

      heading.append('<a class="anchor" href="#'+ heading.attr('id') +'"></a>');
    });
  }


  /**
   * Initialize all of the loaded vendors.
   */
  page.initVendors = function() {
    page.vendors.forEach(function(vendor) {
      var fn = window.page[ "init"+ vendor ];
      if(typeof fn === 'function') {
        fn();
      }
    });
  }

  /**
   * Register loaded vendor to be initialized after DOM load.
   * It's case sensitive, since it calls "initVendorName" method.
   */
  page.registerVendor = function($name) {
    page.vendors.push($name);
  }

  window.page = page;
}(jQuery, window);


/**
 * Once the DOM is loaded, start the magic.
 */
$(function () {
  //page.init();
});


