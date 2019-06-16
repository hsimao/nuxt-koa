<template>
  <div class="page-index">
    <!-- section 1 -->
    <el-row>
      <el-col :span="5">
        <Menu />
      </el-col>
      <el-col :span="19">
        <Life />
      </el-col>
    </el-row>

    <!-- section 2 -->
    <el-row :span="24">
      <el-col>
        <Artistic />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Menu from '~/components/index/menu'
import Life from '~/components/index/life.vue'
import Artistic from '~/components/index/artistic.vue'

export default {
  name: 'page-index',
  components: {
    Menu,
    Life,
    Artistic
  }
}
</script>

<style lang="scss">
@import '~/assets/css/index/index.scss';
</style>