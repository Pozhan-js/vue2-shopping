import { reqGoodDetailInfoData } from '@/api'

const state = {
  detailInfo: {}
}


const actions = {
  async getGoodDetailInfoData({ commit }, id) {
    const detailData = await reqGoodDetailInfoData(id)
    console.log('详情信息', detailData, id);
    if (detailData.code === 200) {
      commit('GET_GOOD_DETAIL_INFO_DATA', detailData.data)
    } else {
      console.log(detailData.message);
    }
  }
}

const mutations = {
  GET_GOOD_DETAIL_INFO_DATA(state, ployed) {
    state.detailInfo = ployed
  }
}

const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
