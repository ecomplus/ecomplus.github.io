<?php
// composer
require __DIR__ . '/vendor/autoload.php';
// include scripts
require __DIR__ . '/inc/get-json.php';
require __DIR__ . '/inc/apis.php';

// Twig 2 for template rendering
// https://twig.symfony.com/doc/2.x/api.html
$templates_dir = __DIR__ . '/templates';
$loader = new Twig_Loader_Filesystem($templates_dir);
// setup twig object with no compilation cache
$twig = new Twig_Environment($loader, array('strict_variables' => true));

$site_title = 'E-Com Plus Developers';
// internal links (abstractions)
$base_path = '/docs/';
$urls = array(
  'themes' => $base_path . 'themes/',
  'apps' => $base_path . 'apps/',
  'releases' => $base_path . 'releases/',
  'open' => $base_path . 'open/',
  'reference' => $base_path . 'reference/',
  'console' => $base_path . 'api/'
);
// E-Com GitHub organization URL
$github_org = 'https://github.com/ecomclub/';

// list of site pages
$pages = array(
  array(
    'url' => '/',
    // title tag
    'title' => 'E-Com Plus for Developers',
    // h1
    'subtitle' => null,
    // rendered content
    'content' => null,
    // GitHub repository sync
    'github_repo' => null,
    // is API reference
    'api_reference' => null,
    // meta description
    'description' => 'E-Com Plus is a robust and flexible cloud commerce software, ' .
                     'totally based on REST APIs. ' .
                     'Get started with guides, API reference and playground on our Developers Hub.'
  ),

  // api console page
  array(
    'url' => $urls['console'],
    'title' => 'APIs Environment · ' . $site_title,
    'subtitle' => 'APIs Environment',
    'content' => null,
    'github_repo' => null,
    'api_reference' => null,
    'description' => 'E-Com Plus APIs endpoints, examples and console app'
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
  } else {
    // add HTML extension
    $file_path .= '.html';
  }

  // define array with variables for template
  $template_vars = array(
    'site_title' => $site_title,
    // pass GitHub org host
    'github_org' => $github_org,
    'page' => $page,
    'apis' => $apis,
    'urls' => $urls
  );
  $template_file = 'views' . $file_path . '.twig';
  if (!file_exists($templates_dir . '/' . $template_file)) {
    // generic template
    $template_file = 'content/general.html.twig';
  }
  $template = $twig->load($template_file);
  $html = $template->render($template_vars);

  // create or overwrite HTML file
  // check directory
  $paths = explode('/', $file_path);
  if (count($paths) > 2) {
    // create directory if not exists
    $dir = __DIR__ . '/..';
    // skip the first (empty) and the last (filename) paths
    for ($ii = 1; $ii < count($paths) - 1; $ii++) {
      $dir .= '/' . $paths[$ii];
      if (!is_dir($dir)) {
        // dir doesn't exist, make it
        mkdir($dir);
      }
    }
  }
  file_put_contents(__DIR__ . '/..' . $file_path, $html);
}
