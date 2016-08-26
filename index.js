const template = require('art-template')

function render (filename, data) {
  return template(filename, data)
}

module.exports = function (dir, ext) {
  template.config('base', dir)
  template.config('extname', ext || '.html')
  return function * (next) {
    this.render = render
    yield next
  }
}
