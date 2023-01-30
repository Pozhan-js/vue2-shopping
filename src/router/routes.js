// 将路由规则单独提取出来

const routes = [
  {
    name: 'home',
    path: '/home',  //对应的路由路径
    component: () => import('@/view/Home'), //对应显示的页面  import是路由懒加载 当跳转到该页面上时才回去加载组件
    meta: {
      isHiddenNav: true //通过路由元信息 判断是否显示floor部分的三级列表
    }
  }, {
    name: 'login',
    path: '/login',
    component: () => import('@/view/Login'),
  }, {
    name: 'register',
    path: '/register',
    component: () => import('@/view/Register'),
    meta: {
      isHiddenFooter: true
    }
  }, {
    name: 'search',
    path: '/search/:keyword?',  //这个是params传参方式，表示冒号后面的是参数而不是路径  ？表示0或者1
    // 因为参数可能有或者没有 当没有参数是 没有加？ 那么当跳转时前面的search也会被 忽略
    component: () => import('@/view/Search'),
  },
  {
    name: 'detail',
    path: '/detail/:id?',
    component: () => import('@/view/Detail') //详情页
  },
  {
    path: '/',  // 设置默认的页面
    redirect: '/home'
  }
]

export default routes