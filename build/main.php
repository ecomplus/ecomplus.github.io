<?php
require_once __DIR__ . '/vendor/autoload.php';

// Twig 2 for template rendering
// https://twig.symfony.com/doc/2.x/api.html
$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates');
// setup twig object with no compilation cache
$twig = new Twig_Environment($loader);

// define array with variables for template
$template_vars = array(
  'page' => array(
    'url' => '/',
    // title tag
    'title' => 'E-Com Plus for Developers',
    // meta description
    'description' => 'E-Com Plus is a robust and flexible cloud commerce software, ' .
                     'totally based on REST APIs. ' .
                     'Get started with guides, API reference and playground on our Developers Hub.'
  )
);
$template = $twig->load('views/index.html.twig');
$html = $template->render($template_vars);

// create or overwrite HTML file
file_put_contents(__DIR__ . '/../index.html', $html);
