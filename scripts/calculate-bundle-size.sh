#!/bin/bash

TMP=./scripts/.tmp
BIN=./node_modules/.bin
UGLIFY=$BIN/uglifyjs
ENTRYPOINT=./index.js

function filesize {
  SIZE=$(cat $1 | wc -c)
  node -e "console.log(Math.round($SIZE*10/1024)/10)"
}

function slapdashbuild {
  node ./scripts/build.js > $TMP/slapdash.js
}

function minify {
  $UGLIFY --compress warnings=false --mangle toplevel --output $TMP/slapdash.min.js $TMP/slapdash.js 2>&1 /dev/null
}

function gzipped {
  gzip slapdash.min.js
}

function getSizes {
  slapdashbuild
  minify

  pushd $TMP > /dev/null

  for i in *.js; do
    echo "$i: $(filesize $i)"
  done

  gzipped

  for i in *.gz; do
    echo "$i: $(filesize $i)"
  done

  popd > /dev/null
}

mkdir -p $TMP
getSizes
rm -rf $TMP
