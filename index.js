const template = require('art-template')

function render (filename, data) {
  return template(filename, data)
}

module.exports = function (dir, ext = '.html') {
  template.config('base', dir)
  template.config('extname', ext)
  return function artTemplate (ctx, next) {
    ctx.render = render
    return next()
  }
}
