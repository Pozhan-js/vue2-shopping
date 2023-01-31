<template>
  <div class="spec-preview">
    <img ref="img1" :src="skuInfo.skuDefaultImg" />
    <!-- 这个适用于鼠标移动的元素 和父元素一样高 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img ref="img2" :src="skuInfo.skuDefaultImg"  :style="{ left: -2 * left + 'px', top: -2 * top + 'px' }"/>
    </div>
    <!-- 这个是遮罩层 -->
    <div class="mask" ref="mask" :style="{left: left + 'px',top: top + 'px'}"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
//引入lodash库
import _ from 'lodash'
  export default {
    name: "Zoom",
    data(){
      return {
        top:0,
        left:0
      }
    },
    computed:{
      ...mapGetters('detail',['skuInfo'])
    },
    methods:{
      // 实现放大镜跟随鼠标移动
      move:_.throttle(function(event){
        let x = event.offsetX - this.$refs.mask.clientWidth/2
        if( x< 0) x = 0
        if(x > 200) x=200
        let y = event.offsetY - this.$refs.mask.clientHeight/2
        if(y< 0) y = 0
        if(y > 200) y=200

        this.top = y
        this.left = x
      },1000/60)    //表示 1秒 也就是1000毫秒 执行 60次 这个是人眼极限
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>