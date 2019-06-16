<template>
  <div class="" />
</template>

<script>
export default {
  layout: 'blank',
  // 使用中間件來直接呼叫登出 api, 確認登出完後直接導向回首頁
  middleware: async ctx => {
    let { status, data } = await ctx.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
