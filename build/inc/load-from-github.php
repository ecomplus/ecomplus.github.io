<?php
function github_api ($url, $full_url = false) {
  // timeout to prevent rate limit
  // https://developer.github.com/v3/#rate-limiting
  sleep(60);
  if ($full_url) {
    return get_json($url);
  } else {
    return get_json('https://api.github.com' . $url);
  }
}

function get_repo_docs ($repo, $repo_path = '') {
  // returns array of Markdown files
  $files = array();

  // GET content from GitHub API:
  // https://developer.github.com/v3/repos/contents/
  $github_api_path = '/repos/ecomclub/';
  $contents = github_api($github_api_path . $repo . '/contents' . $repo_path);
  if ($contents) {
    if (!is_array($contents)) {
      // problem with API response
      var_dump($contents);
      exit();
    }

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
            $content = github_api($contents[$i]->url, true);
            if ($content) {
              // decode file content
              $files[] = array(
                'path' => $content->path,
                'markdown' => base64_decode($content->content)
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
$docs_dir = __DIR__ . '/../../src/assets/json/els-developers/docs/';

foreach ($repos as $repo => $page) {
  // array of Markdown files from current repository
  $files = null;
  $repo_dir = $docs_dir . $repo;
  if (is_dir($repo_dir) && @$argv[1] !== 'update-' . $repo) {
    // try to set $files object from JSON files content
    $filenames = scandir($repo_dir);
    $files = [];
    for ($i = 0; $i < count($filenames); $i++) {
      if (substr($filenames[$i], -5) === '.json') {
        // parse JSON to associative array
        $files = json_decode(file_get_contents($repo_dir . '/' . $filenames[$i]), true);
      }
    }
  }
  if (!$files || count($files) === 0) {
    // request to GitHub API
    $files = get_repo_docs($repo);
  }

  for ($i = 0; $i < count($files); $i++) {
    // echo $files[$i]['path'] . PHP_EOL;
    $pages[] = array(
      'url' => $page['base_url'] . $files[$i]['path'],
      'markdown' => $files[$i]['markdown'],
      'title' => $page['title'],
      'subtitle' => $page['subtitle'],
      'description' => $page['description']
    );
  }
}
