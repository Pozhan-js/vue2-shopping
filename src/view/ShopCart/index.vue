<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="!!cart.isChecked"
              @change="changeStatus(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice / cart.skuNum }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              @click="deleteNum(cart.skuNum)"
              class="mins"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              @click="addNum(cart.skuNum)"
              class="plus"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              @click="showDialog(cart.skuId)"
              class="sindelet"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="changeAllStatus" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ goodsLength }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ goodsAllPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>

    <Dialog :visible.sync="visible">
      <template v-slot:header> 提示 </template>
      <template> 此操作将永久删除数据，是否继续？ </template>
      <template #footer>
        <div class="btn-footer">
          <button class="btn" @click="visible = false">取消</button>
          <button class="btn primary" @click="deleteGoods">确认</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import {
  reqShopCartListData,
  reqChangeShopCartInfoState,
  reqChangeAllCartState,
  reqDelOnShopCartInfo,
} from "@/api";
import Dialog from "@/components/Dialog";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
      num: 0,
      visible: false, // 默认值
      skuId: "", //存储商品的id
      visible: false, //决定
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          // 当对话框弹出时 要求滚动条不能滚动
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "auto";
        }
      },
    },
  },
  components: {
    Dialog,
  },
  computed: {
    // 商品数
    goodsLength() {
      return this.cartInfoList.reduce(
        // prev 初始值（数组下标为0的值）current（下一个值）
        (prev, current) => prev + current.isChecked,
        0
      );
    },
    // 商品总价
    goodsAllPrice() {
      return this.cartInfoList.reduce(
        (prev, current) => prev + current.cartPrice,
        0
      );
    },
    // 全选全不选按钮
    changeAllStatus: {
      get() {
        return this.cartInfoList.every((item) => item.isChecked == 1);
      },
      async set(val) {
        // console.log("val", val);
        let isChecked = val ? 1 : 0;
        let goodsIdList = [];
        // 收取所有商品的id
        this.cartInfoList.forEach((item) => {
          item.isChecked = isChecked;

          // 将id存储在数组中
          goodsIdList.push(item.skuId);
        });
        // 发送请求改变所有商品
        const allGoods = await reqChangeAllCartState(isChecked, goodsIdList);
        if (allGoods.code === 200) {
          this.$message.success(
            isChecked === 1 ? "已选中所有商品" : "已取消所有商品"
          );
        } else {
          this.$message.error("全选按钮状态改变失败");
        }
      },
    },
  },
  methods: {
    // 增加商品数
    // deleteNum(num) {},
    async changeStatus(info) {
      let isChecked = 1 - info.isChecked;
      const statusData = await reqChangeShopCartInfoState(
        info.skuId,
        isChecked
      );
      if (statusData.code === 200) {
        this.$message({
          message: "商品状态更新成功...",
          type: "success",
        });
        // Message.success('更新成功...')
        // 让页面中的状态发生改变一下即可
        info.isChecked = isChecked;
      } else {
        this.$message({
          message: "商品状态更新失败...",
          type: "error",
        });
      }
    },
    // 显示对话框 并且设置好skuId
    showDialog(id) {
      this.skuId = id;
      this.visible = true;
    },
    // 删除商品
    async deleteGoods() {
      this.visible = false;
      // 发送请求获取删除后的数据
      const deleteGoodsData = await reqDelOnShopCartInfo(this.skuId);
      // 因为商品被删除调 所以商品数组要重新计算
      this.cartInfoList = this.cartInfoList.filter(
        (item) => item.skuId !== this.skuId
      );
      if (deleteGoodsData.code == 200) {
        this.$message.success("已经成功删除商品");
      } else {
        this.$message.error("删除商品失败");
      }
    },
  },
  async mounted() {
    const ShopCartData = await reqShopCartListData();
    console.log("shopCart", ShopCartData);
    if (ShopCartData.code === 200) {
      this.cartInfoList = ShopCartData.data[0].cartInfoList;
    } else {
      this.$message.error("获取购物车商品信息失败");
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
.btn-footer {
  position: absolute;
  right: 16px;
  bottom: 20px;
  .btn {
    width: 70px;
    height: 36px;
    margin-right: 12px;
    cursor: pointer;
    border: none;
    font-size: 14px;
    border-radius: 8%;
    &.btn-cancle {
      border: 1px solid #ccc;
      &:hover {
        background-color: #ecf5ff;
        color: #47a2ff;
      }
    }
    &.btn-primary {
      background-color: #409eff;
      color: #fff;
      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}
</style>