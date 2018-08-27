<?php
function get_json ($url) {
  // abstraction for cURL
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  // prevent execution timeout
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'User-Agent: cURL'
  ));
  if (substr($url, 8, 14) === 'api.github.com') {
    // https://api.github.com/...
    // basic authentication for GitHub API
    // https://developer.github.com/v3/#basic-authentication
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'leomp12');
  }
  $output = curl_exec($ch);

  // parse JSON
  $json = json_decode($output);
  if (json_last_error() === JSON_ERROR_NONE) {
    // returns decoded object
    return $json;
  } else {
    var_dump($output);
    return false;
  }
}
