import Koa from 'koa'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'

import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

// session 配置
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)

app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)
app.use(json())

// 連結資料庫
mongoose.connect(
  dbConfig.dbs,
  { useNewUrlParser: true }
)

app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 路由配置
  app.use(users.routes()).use(users.allowedMethods())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
