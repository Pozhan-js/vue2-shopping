import { reqGetUserAddressList, reqTradeInfoData } from '@/api'

const state = {
  traderInfo: {},
  userAddressList: []
}

const actions = {
  async getUserAddressList({ commit }) {
    const addressData = await reqGetUserAddressList()
    console.log('地址信息', addressData);
    if (addressData.code === 200) {
      commit('GET_USER_ADDRESS_LIST', addressData.data)
    } else {
      console.log(addressData.message);
    }
  },
  // 2. 获取订单中的商品数据
  async getTradeInfoData({ commit }) {
    const result = await reqTradeInfoData()
    if (result.code === 200) {
      commit('SAVE_TRADE_INFO_DATA', result.data)
    } else {
      console.log(result.message);
    }
  }
}

const mutations = {
  GET_USER_ADDRESS_LIST(state, ployed) {
    state.userAddressList = ployed
  },
  // 2. 存储商品数据
  SAVE_TRADE_INFO_DATA(state, tradeInfo) {
    state.traderInfo = tradeInfo
  }
}

const getters = {
  //商平信息列表
  detailArrayList(state) {
    return state.traderInfo.detailArrayList || []
  },
  // 商品种类数
  totalNum(state) {
    return state.traderInfo.totalNum || []
  },
  // 商品总价
  totalAmount(state) {
    return state.traderInfo.totalAmount || []
  },
  // 发送请求所允许参数
  tradeNo(state) {
    return state.traderInfo.tradeNo || []
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}