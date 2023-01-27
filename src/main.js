import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'



Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)

// 启动mock服务器
import '@/mock/mockServer'

new Vue({
  render: h => h(App), //render函数渲染app页面
  router,   //将router对象绑定在vue实力上
  store
}).$mount('#app')
