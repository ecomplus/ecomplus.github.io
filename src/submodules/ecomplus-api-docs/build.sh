# !/bin/bash

function traverse() {
  for d in "$1"/*; do
    if [ -d "$d" ]; then
      # travel to subdirectory
      traverse "$d"
    fi
  done
  # run hercule
  # https://github.com/jamesramsay/hercule
  hercule $1/README.md -o $1/blueprint.apib
  drafter -f json $1/blueprint.apib > $1/refract.json
}

traverse "./src"
# blueprint to repo root for Apiary sync
cp ./src/blueprint.apib ./apiary.apib
sed -i '1s/^/FORMAT: 1A\nHOST: https:\/\/sandbox.e-com.plus\/v1\/\n\n/' ./apiary.apib
