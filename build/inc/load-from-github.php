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
                'content' => base64_decode(str_replace('\n', '', $content->content))
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
  'ecomplus-store-template' => $urls['themes']
);
foreach ($repos as $repo => $base_url) {
  // GET array of Markdown files from current repository
  $files = get_repo_docs($repo);
  for ($i = 0; $i < count($files); $i++) {
    var_dump($files[$i]['path']);
  }
}
