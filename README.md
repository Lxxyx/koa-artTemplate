# koa-artTemplate
koa-artTemplate is a koa middware for artTemplate

## usage:

```javascript
var koa = require('koa')
var koaArt = require('koa-artTemplate')

var app = new koa()

app.use(koaArt('../views'))

app.use(function *(next) {
  this.body = this.render('index')
})
```

## Api
### koaArt(viewsPath,extname)

1. viewsPath
set views directory path, where to put the artTemplate

2. extname (default: html)
for template, if you have index.html, you just need to type this.render('index'), without the extname: '.html'

### this.render(templateName, data)

this will render a template in your viewsPath.

1. templateName
the template filename without extname
2. data
the data need to be render

### template usage:
[artTemplate syntax:simple](https://github.com/aui/artTemplate/wiki/syntax:simple)
