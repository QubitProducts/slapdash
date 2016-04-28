#!/bin/bash

TMP=./scripts/.tmp
BIN=./node_modules/.bin
WEBPACK=$BIN/webpack
BROWSERIFY=$BIN/browserify
UGLIFY=$BIN/uglifyjs
ENTRYPOINT=./index.js

function filesize {
  cat $1 | wc -c
}

function browserify {
  $BROWSERIFY $ENTRYPOINT --screw-ie8 --outfile $TMP/browserify.js
}

function webpack {
  $WEBPACK --entry $ENTRYPOINT --output-filename $TMP/webpack.js > /dev/null
}

function slapdashbuild {
  node ./scripts/build.js > $TMP/slapdashbuild.js
}

function minify {
  for i in {browserify,webpack,slapdashbuild}; do
    $UGLIFY --compress warnings=false --mangle --output $TMP/$i.min.js $TMP/$i.js 2>&1 /dev/null
  done
}

function gzipped {
  for i in {browserify,webpack,slapdashbuild}; do
    gzip $i.min.js
  done
}

function getSizes {
  browserify
  webpack
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
