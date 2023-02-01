<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p>
              <span>请</span>
              <a href="###">登录</a>
              <a href="###" class="register">免费注册</a>
            </p>
          </div>
          <div class="typeList">
            <a href="###">我的订单</a>
            <router-link href="javascript:;" to="/shopCart"
              >我的购物车</router-link
            >
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <img src="./images/logo.png" alt="" />
          </a>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              v-model="keyword"
              id="autocomplete"
              class="input-error input-xxlarge"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              @click="btnSearch"
              type="button"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    btnSearch() {
      // this.$router.push('/search')
      let { query } = this.$route;
      //当页面跳转时传递keyWord参数
      this.$router.push({
        name: "search", //通过命名参数进行跳转
        query: {
          //这里可能会疑惑为什么 会有query参数 因为在search页面也有搜索框 我也有可能在search页面点击搜索框
          ...query,
          keyword: this.keyword || undefined,
        },
      });
    },
  },
  mounted() {
    // 当页面跳转时 将搜索框数据清除
    this.$bus.$on("remove-searchKeyword", () => {
      this.keyword = "";
    });
  },
  beforeDestroy() {
    // 当组件卸载时 清除事件 释放缓存
    this.$bus.$off("remove-searchKeyword");
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>