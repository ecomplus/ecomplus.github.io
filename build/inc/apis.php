<?php
// API list JSON file
$json_file = __DIR__ . '/../../docs/assets/json/apis.json';
$apis = null;
if (file_exists($json_file) && @$argv[1] !== 'update-apis') {
  // try to set $apis object from JSON file content
  // parse JSON to associative array
  $apis = json_decode(file_get_contents($json_file), true);
}

if (!$apis) {
  // declare list of E-Com Plus REST APIs
  $apis = array(
    'store' => array(
      'host' => 'https://api.e-com.plus',
      'base_path' => '/',
      'version' => 'v1',
      'sandbox' => array(
        'host' => 'https://sandbox.e-com.plus',
        // default sandbox authorization headers
        'auth_session' => array(
          'my_id' => '5a6757722b66f68dbed44526',
          'access_token' => 'eyJhbGciOi.eyJzdWIi.AFONFh7HgQ'
        )
      ),
      'auth' => true,
      // no production authorization by default
      'auth_session' => null,
      'resources' => array(),
      'label' => 'Store REST API',
      'github_repo' => 'ecomplus-api-docs'
    ),
    'search' => array(
      'host' => 'https://apx-search.e-com.plus',
      'base_path' => '/api/',
      'version' => 'v1',
      'resources' => array(),
      'label' => 'Search',
      'github_repo' => 'ecomplus-search-api-docs'
    ),
    'graphs' => array(
      'host' => 'https://apx-graphs.e-com.plus',
      'base_path' => '/api/',
      'version' => 'v1',
      'no_headers' => true,
      'resources' => array(),
      'label' => 'Recommendations',
      'github_repo' => 'ecomplus-graphs-api-docs'
    ),
    'bigdata' => array(
      'host' => 'https://apx-bigdata.e-com.plus',
      'base_path' => '/api/',
      'version' => 'v1',
      'no_headers' => true,
      'resources' => array(),
      'label' => 'Big data'
    ),
    'main' => array(
      'host' => 'https://e-com.plus',
      'base_path' => '/api/',
      'version' => 'v1',
      'no_headers' => true,
      'resources' => array(),
      'label' => 'Main platform'
    )
  );

  // GET APIs resources
  foreach ($apis as $key => $api) {
    // set API index URI
    $uri_path = $api['base_path'] . $api['version'] . '/';
    $json = get_json($api['host'] . $uri_path);
    if ($json) {
      // remove base path and json extension from returned resources URLs
      for ($i = 0; $i < count($json->resources); $i++) {
        $resource = $json->resources[$i];
        if (substr($resource, 0, strlen($uri_path)) === $uri_path) {
          // remove base path
          $resource = substr($resource, strlen($uri_path));
        }
        if (substr($resource, -5) === '.json') {
          // remove '.json' extension
          $resource = substr($resource, 0, strlen($resource) - 5);
        }
        // remove ID between resource levels
        // push to original apis object
        array_push($apis[$key]['resources'], str_replace('/_id', '', $resource));
      }
    }
  }
  // fix for Graphs API
  // no endpoint for products without subresource
  array_push($apis['graphs']['resources'], 'products');

  // var_dump($apis);
  // render JSON with Apis object
  $json = json_encode($apis, JSON_PRETTY_PRINT);
  file_put_contents($json_file, $json);
}
