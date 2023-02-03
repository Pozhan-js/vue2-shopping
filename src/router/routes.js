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
    component: () => import('@/view/Detail'), //详情页
    props: true // 添加了这一行代码，会将之前传入的params参数直接用props来接收
  },
  // 添加购物车成功页面
  {
    name: 'assCartSuccess',
    path: '/assCartSuccess',
    component: () => import('@/view/AddCartSuccess')
  },
  // 购物车页面
  {
    name: 'shopCart',
    path: '/shopCart',
    component: () => import('@/view/ShopCart')
  },
  {
    name: 'trade',
    path: '/trade',
    component: () => import('@/view/Trade')
  },
  {
    name: 'center',
    path: '/center',
    component: () => import('@/view/Center')
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/view/Pay')
  },
  {
    name: 'paySuccess',
    path: '/paySuccess',
    component: () => import('@/view/PaySuccess')
  },
  {
    path: '/',  // 设置默认的页面
    redirect: '/home'
  }
]

export default routes