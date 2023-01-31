<template>
  <div class="swiper-container skuImg-container" id="imgList-inZooM">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuInfo.skuImageList"
        :key="img.id"
      >
        <img
          :src="img.imgUrl"
          :class="{ active: current === index }"
          @click="handlerImgUrl(img.imgUrl, index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      current: 1,
    };
  },
  computed: {
    ...mapGetters("detail", ["skuInfo"]),
  },
  watch: {
    skuInfo: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          new Swiper(".skuImg-container", {
            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            // },
            // loop: true, // 循环模式选项
            // autoplay: true,
            slidesPerView: "auto", // 显示几张图片
            spaceBetween: 100, // 两张图片之间的间距
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  methods: {
    // 检测点击下面小图片的动作
    handlerImgUrl(url, index) {
      this.current = index;
      this.$bus.$emit("get-imageUrl", url);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>