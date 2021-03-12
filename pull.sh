# !/bin/bash

git pull --recurse-submodules

mkdir -p docs/assets/plugin/refapp/dist
cp -r src/assets/plugin/refapp/dist/* docs/assets/plugin/refapp/dist/

mkdir -p docs/assets/plugin/restform/dist
cp -r src/assets/plugin/restform/dist/* docs/assets/plugin/restform/dist/

mkdir -p docs/assets/plugin/twbschema/dist
cp -r src/assets/plugin/twbschema/dist/* docs/assets/plugin/twbschema/dist/

mkdir -p docs/submodules/ecomplus-api-docs/src
cp -r src/submodules/ecomplus-api-docs/src/* docs/submodules/ecomplus-api-docs/src/

mkdir -p docs/submodules/ecomplus-graphs-api-docs/src
cp -r src/submodules/ecomplus-graphs-api-docs/src/* docs/submodules/ecomplus-graphs-api-docs/src/

mkdir -p docs/submodules/ecomplus-search-api-docs/src
cp -r src/submodules/ecomplus-search-api-docs/src/* docs/submodules/ecomplus-search-api-docs/src/

find docs/submodules/ -type f -not -name '*.json' -delete
