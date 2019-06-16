import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

import User from '../dbs/models/users'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

// 註冊路由邏輯
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body

  // 從 redis 內取得驗證碼來檢查
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '驗證碼過期, 請重新嘗試'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '驗證碼錯誤，請重新輸入'
      }
    }

    // 沒有輸入驗證碼
  } else {
    ctx.body = {
      code: -1,
      msg: '請輸入驗證碼'
    }
  }

  // 驗證用戶名稱是否已經被使用
  let user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用戶名已被註冊'
    }
    return
  }

  // 驗證碼正確，用戶名未被註冊，將資料儲存到 DB
  let newUser = await User.create({
    username,
    password,
    email
  })

  // DB 創建用戶成功就登入
  if (newUser) {
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '註冊成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }

    // 用戶資料儲存 DB 失敗
  } else {
    ctx.body = {
      code: -1,
      msg: '註冊失敗'
    }
  }
})

// 登入路由邏輯
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    // 發生錯誤
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      // 沒有錯誤, 且有取得 user 資料
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登入成功',
          user
        }
        return ctx.login(user)
      } else {
        // 沒有正常取得 user 資料
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 請求發送驗證碼 email 路由邏輯
router.post('verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

  // 限制用戶1分鐘內只能發送一次
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '驗證請求過於頻繁, 1分鐘內僅能重新發送一次'
    }
    return false
  }

  // 發送 email 功能
  // 發送的 mail serve 設置
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  // 相關訊息接收封裝
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  // 發送給 user 的訊息
  let mailOptions = {
    from: `"驗證信箱" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '『Mars 美團』註冊碼',
    html: `您在『Mars 美團』註冊，您的邀請碼是 ${ko.code}`
  }

  // 發送 mail
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      // 發送成功，將資料使用 redis 儲存
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '驗證碼已寄出，可能會有延遲，有效期限1分鐘'
  }
})

// 登出路由邏輯
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    // 登出失敗
    ctx.body = {
      code: -1
    }
  }
})

// 取得用戶資料路由邏輯
router.get('/getUser', async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
