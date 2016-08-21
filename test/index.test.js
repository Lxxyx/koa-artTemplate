import test from 'ava'
import Koa from 'koa'
import koaArt from './../index.js'
import supertest from 'supertest-as-promised'
import path from 'path'
import fs from 'fs'

test('koaArt is a function', t => {
  t.truthy(t)
  t.true(koaArt instanceof Function)
})

test('koaArt should install render function to koa and works well', async t => {
  const app = new Koa()
  app.use(koaArt('./../views/'))
  app.use(function *() {
    t.truthy(this.render)
    t.true(this.render instanceof Function)
    this.body = 'hello'
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.is(res.text, 'hello')
})

test('this.render function will work', async t => {
  const app = new Koa()
  app.use(koaArt('../views/'))
  app.use(function *(next) {
    this.body = this.render('index', {})
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.true(res.text.includes('<!DOCTYPE html>'))
})

test('this.render can render template with data', async t => {
  const app = new Koa()
  app.use(koaArt('../views/'))
  app.use(function *(next) {
    this.body = this.render('template', { test: true })
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.true(res.text.includes('<p>test is true</p>'))
})

test('this render will set header to correct type', async t => {
  const app = new Koa()
  app.use(koaArt('../views/'))
  app.use(function *(next) {
    this.body = this.render('template', { test: true })
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.is(res.headers['content-type'], 'text/html; charset=utf-8')
})

test('this render can use views innner directory', async t => {
  const app = new Koa()
  app.use(koaArt('../views/'))
  app.use(function *(next) {
    this.body = this.render('partial/header', { title: 'This is Header' })
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.true(res.text.includes('This is Header'))
})

test('this render can support partial', async t => {
  const app = new Koa()
  app.use(koaArt('../views/'))
  app.use(function *(next) {
    this.body = this.render('partial_test', { title: 'This is Header' })
  })
  const res = await supertest(app.listen()).get('/').expect(200)
  t.true(res.text.includes('<title>This is Header</title>'))
})
