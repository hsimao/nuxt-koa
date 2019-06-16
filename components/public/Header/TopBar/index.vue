<template>
  <el-row
    :gutter="0"
    class="m-header">
    <el-col :span="5">
      <Geo />
    </el-col>
    <el-col :span="5">
      <User />
    </el-col>
    <el-col :span="14">
      <Navbar />
    </el-col>
  </el-row>
</template>

<script>
import Geo from '../Geo'
import User from '../User'
import Navbar from '../Nav'

export default {
  name: 'topbar',
  components: {
    Geo,
    User,
    Navbar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/layout.scss';
@import '@/assets/css/public/header/index.scss';
</style>
