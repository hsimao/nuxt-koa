<template>
  <div class="page-index">
    <!-- section 1 -->
    <el-row>
      <el-col :span="5">
        <Menu />
      </el-col>
      <el-col :span="19"></el-col>
    </el-row>

    <!-- section 2 -->
    <el-row :span="24">
      <el-col>3</el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '~/components/index/menu'

export default {
  components: {
    Menu
  }
}
</script>

<style lang="scss">
@import '~/assets/css/index/index.scss';
</style>