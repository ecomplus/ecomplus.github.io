<?php
function find_md_files ($repo_dir, $path = '') {
  // scan directories and find Markdown files
  $dir = $repo_dir;
  if ($path !== '') {
    $dir .= '/' . $path;
    // add dir level to path before adding filename
    $path .= '/';
  }
  $filenames = scandir($dir);
  $files = [];

  for ($i = 0; $i < count($filenames); $i++) {
    $filename = $filenames[$i];
    if ($filename[0] !== '.') {
      // check if it is a directory
      $full_path = $dir . '/' . $filename;
      if (is_dir($full_path)) {
        // recursion
        $deep_files = find_md_files($repo_dir, $path . $filename);
        for ($ii = 0; $ii < count($deep_files); $ii++) {
          $files[] = $deep_files[$ii];
        }
      } else if (is_file($full_path) && substr($filename, -3) === '.md') {
        // valid Markdown file
        // add to list
        $files[] = array(
          'path' => $path . $filename,
          'markdown' => file_get_contents($full_path)
        );
      }
    }
  }

  return $files;
}

// handle Developers pages from GitHub repos
$repos = array(
  'ecomplus-store-template' => array(
    'base_url' => $urls['themes'],
    'description' => 'Template specifications for E-Com Plus ecommerce themes'
  )
);
$docs_dir = __DIR__ . '/../../src/submodules/';
// parse markdown to HTML
// https://github.com/erusev/parsedown
$parsedown = new Parsedown();

foreach ($repos as $repo => $page) {
  // array of Markdown files from current repository
  $files = null;
  $repo_dir = $docs_dir . $repo;
  if (is_dir($repo_dir)) {
    // try to set $files object from submodules .md files content
    $files = find_md_files($repo_dir);
  }

  for ($i = 0; $i < count($files); $i++) {
    // echo $files[$i]['path'] . PHP_EOL;
    // remove '.md' extension
    $url = substr($files[$i]['path'], 0, -3);
    // README file is the dir index
    if (substr($url, -6) === 'README') {
      // remove 'README'
      $url = substr($url, 0, -6);
    }

    // partition content
    list($subtitle, $markdown) = explode(PHP_EOL, $files[$i]['markdown'], 2);
    // remove # from subtitle
    $subtitle = ltrim($subtitle, '# ');
    // remove some strings from original Markdown content
    $markdown = explode('{% raw %}', trim($markdown), 2);
    if (count($markdown) > 1) {
      $summary = $parsedown->text($markdown[0]);
    } else {
      $summary = null;
    }
    $markdown = str_replace('{% endraw %}', '', trim(end($markdown)));
    // parse to HTML
    $content = $parsedown->text($markdown);

    // add page
    $pages[] = array(
      'url' => $page['base_url'] . $url,
      'summary' => $summary,
      'content' => $content,
      // page title
      'title' => $subtitle . ' · E-Com Plus Developers',
      // h1 from markdown
      'subtitle' => $subtitle,
      'description' => $page['description'],
      // repository info
      'github_repo' => $repo,
      'repo_path' => $files[$i]['path']
    );
  }
}
