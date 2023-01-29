<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handleMouseLeave">
        <h2 class="all" @mouseenter="isShowNav= true">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <div class="item" v-for="level_one in categoryList.slice(0, -2)" :key="level_one.categoryId">
              <h3>
                <a href="" data-level='1' :data-id='level_one.categoryId' :data-name='level_one.categoryName'>{{ level_one.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="level_two in level_one.categoryChild" :key="level_two.categoryId">
                    <dt>
                      <a href="" data-level='2' :data-id='level_two.categoryId' :data-name='level_two.categoryName'>{{ level_two.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="level_three in level_two.categoryChild" :key="level_three.categoryId">
                        <a href="" data-level='3' :data-id='level_three.categoryId' :data-name='level_three.categoryName'>{{ level_three.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      isShowNav: true, //是否显示三级导航
    }
  },
  methods:{
    //当点击三级列表时 发生跳转将search页面需要的参数传过去
    btnSearch(e){
      let {level,id,name} = e.target.dataset

      if(!level) return //当没有等级时说明点击的不是三级列表中的链接
      // this.$router.push('/search') //通过编程式导航跳转到search页面
      this.$router.push({
        name: 'search',
        query:{
          categoryName:name,
          ['category'+level+'Id']:id
        }
      })
    },
    handleMouseLeave(){
    if(!this.$route.meta.isHiddenNav){
      this.isShowNav= false
    }
 }
  },
  computed: {
    // 获取上去安吉
    ...mapState('home', ['categoryList'])
  },
  mounted() {
    // 发送请求 获取对应的数据
    // 我们可以通过dispatch 派发vuex的数据
    this.$store.dispatch('home/getCategoryListData') //相当于在页面挂在时 调用vuex中的getCategoryListData方法
    if(this.$route.meta.isHiddenNav){
      this.isShowNav = true
    }else{
      this.isShowNav = false
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      border-top: 2px solid #e1251b;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>