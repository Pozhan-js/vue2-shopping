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
              @click="changeSkuNum('decrement', cart)"
              class="mins"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              @change="changeSkuNum('change', cart, $event)"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              @click="changeSkuNum('increment', cart)"
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
        <a href="javascript:;" @click="showDialogByDelSelected"
          >删除选中的商品</a
        >
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ goodsAllPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>

    <Dialog :visible.sync="visible">
      <template v-slot:header> 提示 </template>
      <template> <p>此操作将永久删除数据，是否继续？</p> </template>
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
  reqDelSelectedCartInfo,
  reqAddOrUpdateCart,
} from "@/api";
import Dialog from "@/components/Dialog";
import { skuNumReg } from "@/utils/reg";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
      num: 0,
      visible: false, // 默认值
      skuId: "", //存储商品的id
      isDelOne: false, //判断是否为删除一个
      skuIdList: [], // 存储批量删除被选中的商品时的skuId
      leftCartInfoList: [], // 剩余未删除的商品
      timeId: "", //延时器的id默认为
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
        (prev, current) =>
          prev + current.cartPrice * current.skuNum * current.isChecked,
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
    // 获取选中商品
    selectedCount() {
      return this.cartInfoList.reduce(
        (prev, current) => prev + current.isChecked,
        0
      );
    },
  },
  methods: {
    // 获取商品信息
    async getGoodsInfo() {
      const ShopCartData = await reqShopCartListData();
      console.log("shopCart", ShopCartData);
      if (ShopCartData.code === 200) {
        this.cartInfoList = ShopCartData.data[0].cartInfoList;
      } else {
        this.$message.error("获取购物车商品信息失败");
      }
    },
    // 增加商品数
    // deleteNum(num) {},
    async changeStatus(info) {
      let isChecked = 1 - info.isChecked;
      const statusData = await reqChangeShopCartInfoState(
        info.skuId,
        isChecked
      );
      if (statusData.code === 200) {
        // 但改变状态后刷新最新数据
        this.getGoodsInfo();
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
      this.isDelOne = true;
    },
    // 删除商品
    async deleteGoods() {
      if (this.isDelOne) {
        this.visible = false;
        // 发送请求获取删除后的数据
        const deleteGoodsData = await reqDelOnShopCartInfo(this.skuId);
        // 因为商品被删除调 所以商品数组要重新计算
        this.cartInfoList = this.cartInfoList.filter(
          (item) => item.skuId !== this.skuId
        );
        if (deleteGoodsData.code == 200) {
          this.getGoodsInfo();
          this.$message.success("已经成功删除商品");
        } else {
          this.$message.error("删除商品失败");
        }
        return;
      }
      // 删除批量商品
      const result = await reqDelSelectedCartInfo({ data: this.skuIdList });
      if (result.code === 200) {
        this.visible = false; // 关闭对话框
        this.cartInfoList = this.leftCartInfoList;
        this.$message.success("批量删除成功");
      } else {
        // console.log(result.message);
        this.$message.error("批量删除失败");
      }
    },
    // 删除多个商品
    showDialogByDelSelected() {
      this.visible = true; //让弹框显示
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          // 获取被选中商品的id
          this.skuIdList.push(item.skuId);
        } else {
          // 获取未被选中的商品
          this.leftCartInfoList.push(item);
        }
      });
      // 4.3 区分批量删除
      this.isDelOne = false;
    },
    // 修改商品数量
    changeSkuNum(type, cartInfo, $event) {
      let num = 0;
      let { skuId, skuNum } = cartInfo;
      let oldNum = skuNum;
      switch (type) {
        case "decrement":
          num--;
          skuNum--;
          if (skuNum < 1) {
            skuNum = 1;
            num = 1 - oldNum;
          }
          break;
        case "increment":
          num++;
          skuNum++;
          if (skuNum > 200) {
            skuNum = 200;
            num = 200 - oldNum;
          }
          break;
        case "change":
          // 先判断是否为0~999之间的数字
          if (skuNumReg.test(skuNum)) {
            // 现在请求传过去的是数据差值
            // if (skuNum < 0) {
            //   $event.target.value = 0;
            //   return;
            // }
            let newNum = $event.target.value;
            cartInfo.skuNum = newNum;
            if (newNum > 200) {
              skuNum = 200;
              num = 200 - oldNum;
              return;
            }
          } else {
            $event.target.value = oldNum;
          }

          break;
      }
      if (num == 0) return;
      // 当第二次触发函数时 应该先清理调上一次的计时器
      if (this.timeId) clearTimeout(this.timeId);
      // 让数字延时改变
      this.timeId = setTimeout(async () => {
        const cartInfoData = await reqAddOrUpdateCart(skuId, num);
        if (cartInfoData?.code === 200) {
          this.num = 0; //方便第二次修改时还是以0差值来计算
          this.$message.success("修改商品数量成功");
          // 获取最新数据
          this.getGoodsInfo();
        } else {
          this.$message.error("修改商品数量失败");
        }
      }, 500);
    },
  },
  mounted() {
    this.getGoodsInfo();
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