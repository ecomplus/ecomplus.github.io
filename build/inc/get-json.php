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
    // for GitHub API
    'User-Agent: CLI'
  ));
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
