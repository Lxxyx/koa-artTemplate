const template = require('art-template')
const fs = require('fs')
const path = require('path')

function render (filename, data) {
  return template(filename, data)
}

module.exports = function (dir, ext) {
  if (!fs.statSync(dir).isDirectory()) {
    return console.error('koa art-template must put in directory with absolute path')
  }
  template.config('base', dir)
  template.config('extname', ext || '.html')
  return function *(next) {
    this.render = render
    yield next
  }
}
