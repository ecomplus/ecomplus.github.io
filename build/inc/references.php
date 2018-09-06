<?php
// handle Developers pages from GitHub repos
$repos = array(
  'ecomplus-graphs-api-docs' => array(
    'api_reference' => 'graphs',
    'description' => 'E-Com Plus real-time engine for products recommendations systems'
  )
);

foreach ($repos as $repo => $page) {
  // API reference documentation
  // treat refract json file
  // API Blueprint > Refract JSON > PHP Twig
  $refract = @file_get_contents($submodules_dir . $repo . '/src/refract.json');
}
