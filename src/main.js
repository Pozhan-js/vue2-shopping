import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import Dialog from '@/components/Dialog'
import 'swiper/css/swiper.min.css'
import load from '@/assets/loading.gif'
import VueLazyLoad from 'vue-lazyload'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import { Button, Row, Message, Col } from 'element-ui';
// 注册组件
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Message.name, Message)

// 将组建挂载到vue实列上方便访问
Vue.prototype.$message = Message
Vue.prototype.$button = Button


Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Dialog.name, Dialog)
Vue.component(Pagination.name, Pagination)


//实现路由懒加载
Vue.use(VueLazyLoad, {
  loading: load
})

// 启动mock服务器
import '@/mock/mockServer'

new Vue({
  // 实现全局事件总线
  beforeCreate() {
    // 这里基于vue原型链中 VueComponent.prototype.--proto-- = Vue.prototype 这一重要关系保证每个组件都能访问vue原型对象
    Vue.prototype.$bus = this  //这里的this其实就是vue实例对象 这是一个全新的实列对象
  },
  render: h => h(App), //render函数渲染app页面
  router,   //将router对象绑定在vue实力上
  store
}).$mount('#app')
