var path = require('path')

module.exports = {
  JS_SUFFIX: /\.js$/,
  REQUIRE_STMT: /^var\s+([^=\s]+)\s*=\s*require\(\'([^\']+)\'\);?/,
  INLINE_COMMENT: /^\s*\/\/.+$/,
  TOP_LEVEL_VAR: /(^var\s+.+)|(^function\s+)/,
  MODULE_EXPORT_STMT: /^module\.exports\s*=\s*/g,
  MODULE_EXPORT_EXTEND: /^module\.exports\./,
  ROOT: path.resolve(__dirname, '..'),
  SRC_DIR: path.resolve(__dirname, '..', 'src'),
  PKG_PATH: path.join(__dirname, '../package.json')
}
