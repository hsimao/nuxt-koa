<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美團">
      </el-col>

      <el-col :span="15" class="center">
        <!-- 搜尋區塊 -->
        <div class="wrapper">
          <el-input v-model="searchKeyword"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            placeholder="搜尋商家或地點" />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>

          <!-- 熱門搜尋推薦: focus 焦點狀態但尚未輸入內容時顯示 -->
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>熱門搜尋</dt>
            <dd v-for="(item, index) in hotPlace"
              :key="index">
              <nuxt-link :to="item">{{item}}</nuxt-link>
            </dd>
          </dl>

          <!-- 搜尋關鍵字相關推薦: focus 焦點狀態下依據輸入內容顯示推薦 -->
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, index) in searchList"
              :key="index">
              <nuxt-link :to="item">{{item}}</nuxt-link>
            </dd>
          </dl>
        </div>

        <!-- 搜尋推薦 -->
        <p class="suggset">
          <a href="#">故宮博物院</a>
          <a href="#">故宮博物院</a>
          <a href="#">故宮博物院</a>
          <a href="#">故宮博物院</a>
          <a href="#">故宮博物院</a>
        </p>

        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美團外賣</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">貓眼電影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美團酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入駐</nuxt-link>
          </li>
        </ul>
      </el-col>

      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund">
              <p class="txt">隨時退</p>
            </i></li>
          <li><i class="single">
              <p class="txt">不滿意免單</p>
            </i></li>
          <li><i class="overdue">
              <p class="txt">過期退</p>
            </i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  data() {
    return {
      searchKeyword: '',
      isFocus: false,
      hotPlace: ['火鍋', '火鍋', '火鍋', '火鍋', '火鍋'],
      searchList: ['故宮', '故宮', '故宮', '故宮', '故宮']
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.searchKeyword
    },
    isSearchList() {
      return this.isFocus && this.searchKeyword
    }
  },
  methods: {
    handleFocus() {
      this.isFocus = true
    },
    handleBlur() {
      // 延遲 200 毫秒才關閉, 避免點擊連結事件還沒觸發就關閉
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    handleInput() {
      console.log('input')
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>
