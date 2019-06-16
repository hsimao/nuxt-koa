<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美團帳號？</em>
          <nuxt-link to="/login">
            <el-button type="primary" size="small">登入</el-button>
          </nuxt-link>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="暱稱"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="信箱"
          prop="email">
          <el-input v-model="ruleForm.email" />
          <!-- <el-button
            size="mini"
            round
            @click="sendMsg">發送驗證碼</el-button>
          <span class="status">{{ statusMsg }}</span> -->
        </el-form-item>
        <!-- <el-form-item
          label="驗證碼"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item> -->
        <el-form-item
          label="密碼"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item
          label="確認密碼"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下協議並註冊</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美團網用戶協議》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'page-register',
  layout: 'blank',
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '請輸入暱稱',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '請輸入信箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '請輸入密碼',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '請確認密碼',
            trigger: 'blur'
          },
          {
            // 自訂驗證方法, 判斷第二次輸入密碼是否與第一次相同
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('請再次輸入密碼'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('兩次密碼輸入不一致，請重新輸入'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 發送取得驗證碼
    sendMsg() {
      const _this = this
      console.log('sendMsg')
      let namePass
      let emailPass
      if (_this.timerid) {
        return false
      }
      _this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })
      _this.statusMsg = ''
      if (namePass) {
        return false
      }
      _this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })

      if (!namePass && !emailPass) {
        _this.$axios
          .post('/users/verify', {
            username: encodeURIComponent(_this.ruleForm.name),
            email: _this.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              _this.statusMsg = `驗證碼已發送, 剩餘${count--}秒`
              _this.timerid = setInterval(() => {
                _this.statusMsg = `驗證碼已發送, 剩餘${count--}秒`
                if (count === 0) {
                  clearInterval(_this.timerid)
                }
              }, 1000)
            } else {
              _this.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      console.log('register')
      const _this = this
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          _this.$axios
            .post('/users/signup', {
              username: encodeURIComponent(_this.ruleForm.name),
              // 密碼使用 CryptoJS 加密完後在發送
              password: CryptoJS.MD5(_this.ruleForm.pwd).toString(),
              email: _this.ruleForm.email,
              code: _this.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  _this.error = data.msg
                }
              } else {
                _this.error = `伺服器出錯, 錯誤碼: ${status}`
              }
              setTimeout(() => (_this.error = ''), 1500)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/register/index.scss';
</style>