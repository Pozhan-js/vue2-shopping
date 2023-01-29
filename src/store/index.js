import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import search from './modules/search'

// 将插件挂载到vue实例上
Vue.use(Vuex)

const state = {}

const actions = {}

const mutations = {}

const getters = {}


//创建store实列对象
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    home,
    search
  }
})


// 将store暴露出
export default store