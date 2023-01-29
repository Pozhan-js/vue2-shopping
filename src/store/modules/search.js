import { reqSearchGoodsInfoData } from '@/api'

const state = {
  goodsInfo: {}  //商品信息对象
}

const actions = {
  async getSearchGoodsInfoData({ commit }, searchParams) {
    const goodsData = await reqSearchGoodsInfoData(searchParams)
    if (goodsData.code === 200) {
      commit('GET_SEARCH_GOODS_INFO_DATA', searchParams.data)
    } else {
      console.log(result.message)
    }
  }
}

const mutations = {
  GET_SEARCH_GOODS_INFO_DATA(state, ployed) {
    state.goodsInfo = ployed
  }
}

const getter = {}

export default {
  namespace: true, //开启命名空间
  state,
  actions,
  mutations,
  getter
}