<template>
  <div class="dialog">
    <div class="dialog-wrap">
      <div class="dialog-header">
        <slot name="header" />
        <button class="dialog-header-close">X</button>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  methods: {
    btnClose() {},
  },
};
</script>

<style lang="less" scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .dialog-wrap {
    width: 460px;
    height: 230px;
    padding: 12px;
    box-sizing: border-box; // 内减模式
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .dialog-header {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      .dialog-header-close {
        cursor: pointer;
      }
    }
    .dialog-body {
      font-size: 20px;
      // text-align: center;
      // line-height: 120px;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>