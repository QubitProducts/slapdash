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

function minify {
  $UGLIFY --compress warnings=false --mangle --output $TMP/browserify.min.js $TMP/browserify.js 2>&1 /dev/null
  $UGLIFY --compress warnings=false --mangle --output $TMP/webpack.min.js $TMP/webpack.js 2>&1 /dev/null
}

function gzipped {
  gzip webpack.min.js
  gzip browserify.min.js
}

function getSizes {
  browserify
  webpack
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
