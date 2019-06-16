<template>
  <el-container class="layout-default">
    <header class="header">
      <Header />
    </header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import Header from '~/components/public/Header'
import Footer from '~/components/public/Footer'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  font-size: 12px;
}
</style>
