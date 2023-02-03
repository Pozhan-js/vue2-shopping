<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            tag="div"
            mode="lazy"
            class="content"
            rules="phoneRequired|phoneNumber"
            v-slot="{ errors }"
          >
            <label>手机号:</label>
            <input
              type="text"
              v-model="user.phone"
              placeholder="请输入你的手机号"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            mode="lazy"
            class="content"
            rules="requiredCode|codeNum|digits:6"
            v-slot="{ errors }"
          >
            <label>验证码:</label>
            <input
              type="text"
              v-model="user.rePassword"
              placeholder="请输入验证码"
              ref="codeName"
            />
            <input
              class="btn"
              type="button"
              :disabled="disabled"
              value="发送验证码"
              style="width: 90px"
              cursor="pointer"
              @click="sendCodeNum"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            mode="lazy"
            class="content"
            rules="requiredPass|passNum"
            v-slot="{ errors }"
            name="passNum"
          >
            <label>登录密码:</label>
            <input
              type="text"
              v-model="user.password"
              placeholder="请输入你的登录密码"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            mode="lazy"
            class="content"
            rules="requiredPass|passNum|rePassNum:@passNum"
            v-slot="{ errors }"
          >
            <label>确认密码:</label>
            <input
              type="text"
              v-model="user.password"
              placeholder="请输入确认密码"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="controls"
            rules="agree"
            tag="div"
            mode="lazy"
            v-slot="{ errors }"
          >
            <input name="m1" v-model="user.isAgree" type="checkbox" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, digits } from "vee-validate/dist/rules";
import { phoneNum, codeNum, passwordNum } from "@/utils/reg";
import { reqGetVerifyCode, reqUserRegister } from "@/api";
extend("phoneRequired", {
  ...required,
  message: "手机号不能为空,请输入...",
});
extend("phoneNumber", {
  validate(value) {
    return phoneNum.test(value);
  },
  message: "手机号码格式不正确,请重新输入...",
});
// 是否是指定长度
extend("digits", {
  ...digits,
  message: "验证码格式不正确,请重新输入...",
});

// 验证码必填
extend("requiredCode", {
  ...required,
  message: "验证码不能为空,请输入...",
});

// 验证码必填
extend("codeNum", {
  validate(val) {
    return codeNum.test(val);
  },
  message: "验证码格式不正确,请重新输入...",
});

// 验证密码
extend("requiredPass", {
  ...required,
  message: "密码不能为空,请输入...",
});

// 密码
extend("passNum", {
  validate(val) {
    return passwordNum.test(val);
  },
  message: "密码格式不正确,请重新输入...",
});

// 验证确认密码
extend("rePassNum", {
  validate(val, { password }) {
    // console.log('pass',val,password)
    return val === password;
  },
  message: "两次输入密码不一样,请重新输入...",
  params: ["password"], //用来接收有name属性的v-model的值
});

// 是否同意协议之校验
extend("agree", {
  validate(val) {
    // console.log(val)
    return val;
  },
  message: "请勾选协议...",
});
export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        password: "",
        rePassword: "",
        code: "",
        isAgree: false, // 是否同意用户协议
      },
      timeId: "", // 计时器id
      disabled: false, // 什么时候该禁用按钮
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    async onSubmit() {
      console.log("函数zhixing");
      // 获取请求所须属性
      let { phone, code, password } = this.user;
      const registerData = await reqUserRegister({ phone, code, password });
      if (registerData.code === 200) {
        alert("注册成功,按确认跳转到登录页面");
        this.$router.push({
          name: "login",
          query: {
            phoneNum: phone,
            codeNum: code,
            passwordNum: password,
          },
        });
      } else {
        alert(result.message);
      }

      // alert("Form submitted!");
    },
    // 发送验证码
    async sendCodeNum(e) {
      let num = 5;
      this.disabled = true;
      // 如果没有输入电话号码结束该函数
      if (!this.user.phone) return;
      const codeNumData = await reqGetVerifyCode(this.user.phone);
      console.log("验证吗请求数据", codeNumData);
      if (codeNumData.code === 200) {
        this.user.code = codeNumData.data;
        this.timeId = setInterval(() => {
          num--;
          e.target.value = num + "秒后发送请求";
          if (num == 0) {
            clearInterval(this.timeId);
            e.target.value = "发送验证码";
            this.disabled = false;
          }
        }, 1000);
      } else {
        this.$message.error("发送验证码失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;
      text-align: left;
      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }
      .btn {
        position: absolute;
        top: -16px;
        left: 1010px;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>