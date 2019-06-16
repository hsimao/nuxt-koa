export default {
  dbs: 'mongodb://127.0.0.1:27017/nuxtkoa',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '**@qq.com'
    },
    get pass() {
      return '*****'
    },
    // 隨機亂數生成 4 位大寫的驗證碼
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    // 驗證碼過期時間, 1分鐘
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
