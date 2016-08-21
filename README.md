[![Build Status](https://travis-ci.org/Lxxyx/koa-artTemplate.svg?branch=master)](https://travis-ci.org/Lxxyx/koa-artTemplate)
[![codecov](https://codecov.io/gh/Lxxyx/koa-artTemplate/branch/master/graph/badge.svg)](https://codecov.io/gh/Lxxyx/koa-artTemplate)
# koa-artTemplate
koa-artTemplate is a koa middleware for artTemplate

## install

Koa1: 

```javascript
npm i koa-artTemplate --save
```

Koa2: 

```javascript
npm i koa-artTemplate@next --save
```

## usage:

### Koa1

```javascript
var koa = require('koa')
var koaArt = require('koa-artTemplate')

var app = new koa()

app.use(koaArt('../views'))

app.use(function *(next) {
  this.body = this.render('index')
})
```

### Koa2

```javascript
import Koa from 'koa'
import koaArt from 'koa-artTemplate'
import path from 'path'

const app = new koa()

app.use(koaArt(path.resolve(__dirname, 'views/')))

app.use((ctx, next) => {
  ctx.body = ctx.render('index')
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

### why artTemplate
因为不喜欢ejs的风格，而喜欢handlebars的mustache风格。
但handlebars的比较功能非常弱，只能自己注册helper，但是在koa中一个一个去注册就太麻烦了。
于是遇上了artTemplate。但专门支持koa的artTemplate只有一个。所以就自己写了。

### 收获
主程序很简单，就十几行，但这是自己写的第一个koa中间件，符合自己风格的。
也是第一个采用TDD方式书写的插件，先写测试再写代码，确实能避免很多边角情况的发生～
