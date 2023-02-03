import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import user from './modules/user'
import trader from './modules/trader'

// 将插件挂载到vue实例上
Vue.use(Vuex)

//创建store实列对象
const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    user,
    trader
  }
})


// 将store暴露出
export default store