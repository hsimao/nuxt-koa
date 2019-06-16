<template>
  <el-container class="layout-defalut">
    <el-header height="40px">
      <Header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import Header from '~/components/public/Header'

export default {
  name: 'Layout',
  components: {
    Header
  }
}
</script>
