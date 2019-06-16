<template>
  <div class="page-login">
    <div class="login-header">
      <a
        href="/"
        class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美團網">
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"><i />{{ error }}</h4>
        <p><span>帳號登入</span></p>
        <el-input
          v-model="username"
          prefix-icon="profile" />
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password" />
        <div class="foot">
          <el-checkbox v-model="checked">7天內自動登入</el-checkbox>
          <b>忘記密碼？</b>
        </div>
        <el-button
          class="btn-login"
          type="success"
          size="mini"
          @click="login">登入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data: () => {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  layout: 'blank',
  methods: {
    login: function() {
      let self = this
      self.$axios
        .post('/users/signin', {
          username: window.encodeURIComponent(self.username),
          password: CryptoJS.MD5(self.password).toString()
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = '/'
            } else {
              self.error = data.msg
            }
          } else {
            self.error = `伺服器出錯`
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/login/index.scss';
</style>
