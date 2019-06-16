<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="handleMouseLeave">
      <dt>全部分類</dt>
      <dd v-for="item in menu" :key="item.id"
        @mouseenter="handelMouseEnter(item.type)"><i
          :class="item.type" />{{ item.name }}<span
          class="arrow" /></dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="handleDetailMouseEnter"
      @mouseleave="handleDetailMouseLeave">
      <template v-for="item in currentDetail.child">
        <h4 :key="item.id">{{ item.title }}</h4>
        <span v-for="childItem in item.child"
          :key="childItem.id">{{childItem.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-menu',
  data() {
    return {
      timer: null,
      kind: '',
      menu: [
        {
          id: 0,
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: [
                { id: 0, name: '代金券' },
                { id: 1, name: '甜點飲品' },
                { id: 2, name: '火鍋' },
                { id: 3, name: '自助餐' },
                { id: 4, name: '速食' },
                { id: 5, name: '小吃快餐' }
              ]
            }
          ]
        },
        {
          id: 1,
          type: 'takeout',
          name: '外賣',
          child: [
            {
              title: '外賣',
              child: [{ id: 0, name: '美團外賣' }]
            }
          ]
        },
        {
          id: 2,
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: [
                { id: 0, name: '經濟型' },
                { id: 1, name: '舒適/三星' },
                { id: 2, name: '高檔/四星' },
                { id: 3, name: '豪華/五星' }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentDetail() {
      return this.menu.find(item => item.type === this.kind)
    }
  },
  methods: {
    handleMouseLeave() {
      // 延遲 150 毫秒, 留時間給 detail 層級滑鼠事件監聽來判斷是否要將此 timer 移除不作用
      this.timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    handelMouseEnter(type) {
      this.kind = type
    },
    handleDetailMouseEnter() {
      clearTimeout(this.timer)
      this.timer = null
    },
    handleDetailMouseLeave() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss"></style>