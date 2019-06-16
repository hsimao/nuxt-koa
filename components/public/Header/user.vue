<template>
  <div class="m-user">
    <template v-if="user">
      <span class="username">{{user}}</span>您好
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登錄</nuxt-link>
      <nuxt-link to="/register" class="register">註冊</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      user: ''
    }
  },
  async mounted() {
    const {
      status,
      data: { user }
    } = await this.$axios.get('/users/getUser')

    if (status === 200) this.user = user
  }
}
</script>

<style lang="scss" scoped></style>
