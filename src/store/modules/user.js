import { reqUserLogin, reqUserLogout } from '@/api'

const state = {
  userInfo: {
    name: localStorage.getItem('userName'),
    token: localStorage.getItem('token')
  }
}

const actions = {
  // 发送请求获取token
  async userLogin({ commit }, user) {
    const UserInfoData = await reqUserLogin(user)
    console.log('登录', UserInfoData);
    if (UserInfoData.code === 200) {
      commit('SAVE_USER_INFO', UserInfoData.data)
      // 存到本地存储当中一份
      localStorage.setItem('userName', UserInfoData.data.name)
      localStorage.setItem('token', UserInfoData.data.token)
    } else {
      // this.$message.error(UserInfoData.message)
      console.log(UserInfoData.message);
    }
  },
  // 登出
  async userLogout({ commit }) {
    const outUserData = await reqUserLogout()
    if (outUserData.code === 200) {
      commit('DELETE_USER_INFO')
      // 清空本地存储
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
    } else {
      console.log(outUserData.message);
    }
  }
}

const mutations = {
  SAVE_USER_INFO(state, payload) {
    state.userInfo = payload // 是个对象
  },
  DELETE_USER_INFO(state) {
    state.userInfo.name = ''
    state.userInfo.token = ''
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}