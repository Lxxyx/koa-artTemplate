const template = require('art-template')
const fs = require('fs')
const path = require('path')

function render (filename, data) {
  return template(filename, data)
}

module.exports = function (dir, ext) {
  template.config('base', dir)
  template.config('extname', ext || '.html')
  return function (ctx, next) {
    if (ctx.render) return next()
    ctx.render = render
    next()
  }
}
