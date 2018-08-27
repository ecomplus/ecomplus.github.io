<?php
function get_repo_docs ($repo, $repo_path = '') {
  // returns array of Markdown files
  $files = array();

  // GET content from GitHub API:
  // https://developer.github.com/v3/repos/contents/
  $github_api_path = 'https://api.github.com/repos/ecomclub/';
  $contents = get_json($github_api_path . $repo . '/contents' . $repo_path);
  if ($contents) {
    for ($i = 0; $i < count($contents); $i++) {
      switch ($contents[$i]->type) {
        case 'dir':
          // recursive
          $deep_files = get_repo_docs($repo, '/' . $contents[$i]->path);
          for ($ii = 0; $ii < count($deep_files); $ii++) {
            $files[] = $deep_files[$ii];
          }
          break;

        case 'file':
          // save only Markdown files
          if (substr($contents[$i]->name, -3) === '.md') {
            $content = get_json($contents[$i]->url);
            if ($content) {
              // decode file content
              $files[] = array(
                'path' => $content->path,
                'content' => base64_decode($content->content)
              );
            }
          }
          break;
      }
    }
  }

  return $files;
}

// handle Developers pages from GitHub repos
$repos = array(
  'ecomplus-store-template' => array(
    'base_url' => $urls['themes'],
    'title' => 'Store template · E-Com Plus Developers',
    'subtitle' => 'Store template',
    'description' => 'Template specifications for E-Com Plus ecommerce themes'
  )
);

foreach ($repos as $repo => $page) {
  // GET array of Markdown files from current repository
  $json_file = __DIR__ . '/../../src/assets/json/contents/' . $repo . '.json';
  $files = null;
  if (file_exists($json_file) && @$argv[1] !== 'update-contents') {
    // try to set $files object from JSON file content
    // parse JSON to associative array
    $files = json_decode(file_get_contents($json_file), true);
  }
  if (!$files) {
    $files = get_repo_docs($repo);
    // save to JSON file
    $json = json_encode($files, JSON_PRETTY_PRINT);
    file_put_contents($json_file, $json);
  }

  for ($i = 0; $i < count($files); $i++) {
    // echo $files[$i]['path'] . PHP_EOL;
    /*
    $pages[] = array(
      'url' => $page['base_url'] . $files[$i]['path'],
      'markdown_content' => $files[$i]['content'],
      'title' => $page['title'],
      'subtitle' => $page['subtitle'],
      'description' => $page['description']
    );
    */
  }
}
