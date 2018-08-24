<?php
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
    'label' => 'Store REST API'
  ),
  'search' => array(
    'host' => 'https://apx-search.e-com.plus',
    'base_path' => '/api/',
    'version' => 'v1',
    'resources' => array(),
    'label' => 'Search'
  ),
  'graphs' => array(
    'host' => 'https://apx-graphs.e-com.plus',
    'base_path' => '/api/',
    'version' => 'v1',
    'no_headers' => true,
    'resources' => array(),
    'label' => 'Recommendations'
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
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $api['host'] . $uri_path);
  // prevent execution timeout
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'X-Store-ID: 100'
  ));
  $output = curl_exec($ch);

  // parse JSON
  $json = json_decode($output);
  if (json_last_error() === JSON_ERROR_NONE) {
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
      // push to original apis object
      array_push($apis[$key]['resources'], $resource);
    }
  }
}

// var_dump($apis);
