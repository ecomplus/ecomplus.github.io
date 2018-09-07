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
    'api' => null,
    'description' => 'Template specifications for E-Com Plus ecommerce themes'
  ),
  'ecomplus-api-docs' => array(
    'api' => 'store',
    'description' => 'E-Com Plus Store RESTful API, full access to all store JSON data'
  ),
  'ecomplus-search-api-docs' => array(
    'api' => 'search',
    'description' => 'E-Com Plus fast and flexible search engine for products and terms'
  ),
  'ecomplus-graphs-api-docs' => array(
    'api' => 'graphs',
    'description' => 'E-Com Plus real-time engine for products recommendations systems'
  )
);
$docs_dir = __DIR__ . '/../../src/submodules/';
// parse markdown to HTML
// https://github.com/erusev/parsedown
$parsedown = new Parsedown();

foreach ($repos as $repo => $repo_obj) {
  // array of Markdown files from current repository
  $files = array();
  $repo_dir = $docs_dir . $repo;
  if (is_dir($repo_dir)) {
    if ($repo_obj['api']) {
      // rendering API reference introduction page
      $files = array(
        array(
          'path' => 'README.md',
          'markdown' => file_get_contents($repo_dir . '/src/README.md')
        )
      );
    } else {
      // try to set $files object from submodules .md files content
      $files = find_md_files($repo_dir);
    }
  }

  for ($i = 0; $i < count($files); $i++) {
    // echo $files[$i]['path'] . PHP_EOL;
    // partition content
    list($subtitle, $markdown) = explode(PHP_EOL, $files[$i]['markdown'], 2);
    // remove # from subtitle
    $subtitle = ltrim($subtitle, '# ');

    if ($repo_obj['api']) {
      // API reference intro documentation
      // one page only
      $url = $urls['reference'] . $repo_obj['api'] . '/';
      // full page title from Markdown
      $page_title = $subtitle;

      // no prerendered summary
      $summary = null;
      // remove Hercule includes
      $markdown = preg_replace('/([\t\n\s]+)?\:\[\]\(.*\)/', '', trim($markdown));
    } else {
      // remove '.md' extension
      $url = substr($files[$i]['path'], 0, -3);
      // README file is the dir index
      if (substr($url, -6) === 'README') {
        // remove 'README'
        $url = substr($url, 0, -6);
      }
      $url = $repo_obj['base_url'] . $url;
      // merge guide title with site name
      $page_title = $subtitle . ' · ' . $site_title;

      // remove some strings from original Markdown content
      $markdown = explode('{% raw %}', trim($markdown), 2);
      if (count($markdown) > 1) {
        $summary = $markdown[0];
      } else {
        $summary = null;
      }
      $markdown = str_replace('{% endraw %}', '', trim(end($markdown)));
    }

    // add page
    $pages[] = array(
      'url' => $url,
      // parse to HTML
      'summary' => $parsedown->text($summary),
      'content' => $parsedown->text($markdown),
      // page title
      'title' => $page_title,
      // h1 from markdown
      'subtitle' => $subtitle,
      'description' => $repo_obj['description'],
      // repository info
      'github_repo' => $repo,
      'repo_path' => $files[$i]['path'],
      'api_reference' => $repo_obj['api']
    );
  }
}
