import VueRouter from 'vue-router'
import vue from 'vue'


import Home from '../view/Home'
import Login from '../view/Login'
import Register from '../view/Register'
import Search from '../view/Search'

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

const routes = new VueRouter({
  routes: [
    {
      path: '/home',  //对应的路由路径
      component: Home  //对应显示的页面
    }, {
      path: '/login',
      component: Login,
      meta: {
        isHiddenFooter: true //通过路由元信息 判断是否显示底部
      }
    }, {
      path: '/register',
      component: Register,
      meta: {
        isHiddenFooter: true
      }
    }, {
      path: '/search',
      component: Search
    },
    {
      path: '/',  // 设置默认的页面
      redirect: '/home'
    }
  ]
})

//导出router对象
export default routes