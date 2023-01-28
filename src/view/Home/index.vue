<template>
  <div>
    <!-- 三级分类导航 -->
    <TypeNav></TypeNav>
    <!-- 中间轮播图+右侧区域 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐  -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <Like></Like>
    <!-- 楼层 -->
     <!-- 楼层 遍历响应回来的数据 并将数据传递给floor-->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" :xname="'floor-swiper'+floor.id"></Floor>
    <!-- 品牌 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
// import TypeNav from '@/components/TypeNav' 全局注册组件 因为再多个页面中都用到啦该组件
import Recommend from './Recommend'
import Rank from './Rank'
import Floor from './Floor'
import Like from './Like'
import Brand from './Brand'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Floor,
    Like,
    Brand
  },
  computed:{
    ...mapState('home',['floorList'])
  },
  mounted(){
    this.$store.dispatch('home/getFloorsListData')
  }
}

</script>

<style>

</style>