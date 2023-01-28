import VueRouter from 'vue-router'
import vue from 'vue'
import routes from './routes'

// 使用路由插件
vue.use(VueRouter)

// console.log('vue路由的参数', VueRouter.prototype);  // 打印之后发现 在vueRouter上的原型对象上绑定的有push方法
// 和replace方法

// 开始重写push方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, okCallback, errCallback) {
  if (okCallback === undefined && errCallback === undefined) {
    // 说明没有传成功或者失败的回调函数
    // 此时开始调用之前存储的vueRouter中的push方法
    originPush.call(this, location).catch(() => { })  //location是传入push方法中的path 此方法会返回一个失败的promise
  } else {
    originPush.call(this, location, okCallback, errCallback)
  }
}

VueRouter.prototype.replace = function (location, okCallback, errCallback) {
  if (okCallback === undefined && errCallback === undefined) {
    originReplace.call(this, location).catch(() => { })
  } else {
    originReplace.call(this, location, okCallback, errCallback)
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

//导出router对象
export default router