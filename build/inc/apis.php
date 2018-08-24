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
