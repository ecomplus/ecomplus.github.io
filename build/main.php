<?php
// composer
require __DIR__ . '/vendor/autoload.php';
// include scripts
require __DIR__ . '/inc/get-json.php';
require __DIR__ . '/inc/apis.php';

// Twig 2 for template rendering
// https://twig.symfony.com/doc/2.x/api.html
$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
// setup twig object with no compilation cache
$twig = new Twig_Environment($loader, array('strict_variables' => true));

// internal links (abstractions)
$urls = array(
  'themes' => '/themes/',
  'apps' => '/apps/',
  'reference' => '/reference/',
  'releases' => '/releases',
  'open' => '/open'
);

// list of site pages
$pages = array(
  array(
    'url' => '/',
    // title tag
    'title' => 'E-Com Plus for Developers',
    // h1
    'subtitle' => null,
    // meta description
    'description' => 'E-Com Plus is a robust and flexible cloud commerce software, ' .
                     'totally based on REST APIs. ' .
                     'Get started with guides, API reference and playground on our Developers Hub.'
  )
);

// handle more pages from GitHub repos
include __DIR__ . '/inc/load-from-github.php';

// render each page
for ($i = 0; $i < count($pages); $i++) {
  $page = $pages[$i];
  // base file path
  $file_path = $page['url'];
  if (substr($file_path, -1) === '/') {
    // homepage
    $file_path .= 'index.html';
  }

  // define array with variables for template
  $template_vars = array(
    'page' => $page,
    'apis' => $apis,
    'urls' => $urls
  );
  $template = $twig->load('views' . $file_path . '.twig');
  $html = $template->render($template_vars);

  // create or overwrite HTML file
  // check directory
  $paths = explode('/', $file_path);
  if (count($paths) > 2) {
    // create directory if not exists
    $dir = __DIR__ . '/../';
    // skip the first (empty) and the last (filename) paths
    for ($ii = 1; $ii < count($paths) - 1; $ii++) {
      $dir .= $paths[$ii];
      if (!is_dir($dir)) {
        // dir doesn't exist, make it
        mkdir($dir);
      }
    }
  }
  file_put_contents(__DIR__ . '/..' . $file_path, $html);
}
