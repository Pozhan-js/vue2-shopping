import VueRouter from 'vue-router'
import vue from 'vue'
import routes from './routes'
import store from '@/store'

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


// 创建白名单
const whiteList = [
  "home",
  "login",
  "register",
  "search",
  "detail",
  "addcartsuccess",
  "shopcart",
];


const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
      // return { top: 0, left: 0 }
    }
  }
})

// 定义路由全局导航守卫
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.name) || store.state.user.userInfo.token) {
    // 表示 当跳转的 页面的name在白名单中 而且要有token才放行
    next()
    return
  }

  next({
    name: 'login',  //跳转到login页面
    query: {
      redirect: to.path, //跳转时携带的参数
    },
  })
})

//导出router对象
export default router