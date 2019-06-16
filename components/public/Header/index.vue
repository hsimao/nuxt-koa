<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <TopBar />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <SearchBar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from './topBar'
import SearchBar from './searchBar'

export default {
  name: 'Header',
  components: {
    TopBar,
    SearchBar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/header/index.scss';
</style>

