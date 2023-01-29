import { reqSearchGoodsInfoData } from '@/api'

const state = {
  goodsInfo: {}  //商品信息对象
}

const actions = {
  async getSearchGoodsInfoData({ commit }, searchParams) {
    const goodsData = await reqSearchGoodsInfoData(searchParams)
    // console.log('商品信息', goodsData);
    if (goodsData.code === 200) {
      commit('GET_SEARCH_GOODS_INFO_DATA', goodsData.data)
    } else {
      console.log(goodsData.message)
    }
  }
}

const mutations = {
  GET_SEARCH_GOODS_INFO_DATA(state, ployed) {
    state.goodsInfo = ployed
  }
}

const getters = {
  // 属性列表
  attrList(state) {
    return state.goodsInfo.attrsList
  },
  goodsList(state) {
    return state.goodsInfo.goodsList
  },
  trademarkList(state) {
    return state.goodsInfo.trademarkList
  }
}

export default {
  namespaced: true, //开启命名空间
  state,
  actions,
  mutations,
  getters
}