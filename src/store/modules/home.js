import { reqCategoryListData, reqBannerListData, reqGetFloorsListData } from '@/api'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

// 异步方法
const actions = {
  // 1. 获取三级分数数据
  async getCategoryListData(context) {
    const categoryListData = await reqCategoryListData()
    if (categoryListData.code === 200) {
      // console.log(categoryListData.data);
      context.commit('SAVE_CATEGORY_LIST_DATA', categoryListData)
    } else {
      console.log(categoryListData.message);
    }
  }
  ,
  // 2.获取banner数据的方法
  async getBannerListData(context) {
    const bannerData = await reqBannerListData()
    // console.log('banner按数据', bannerData);
    if (bannerData.code === 200) {
      context.commit('SAVE_BANNER_LIST_DATA', bannerData.data)
    } else {
      console.log('banner数据请求失败');
    }
  },
  // 获取floor楼层数据
  async getFloorsListData({ commit }) {
    const floorData = await reqGetFloorsListData()
    console.log('floor数据', floorData);
    if (floorData.code === 200) {
      commit('SAVE_FLOOR_LIST_DATA', floorData.data)
    } else {
      console.log('floor数据请求失败');
    }
  }

}


// 同步方法
const mutations = {
  SAVE_CATEGORY_LIST_DATA(state, ployed) {
    state.categoryList = ployed.data
  },

  // 应为mock数据根被就没有闯过浏览器来进行请求,在其内部就被拦截了,响应回来的数据没有被包裹data
  SAVE_BANNER_LIST_DATA(state, ployed) {
    state.bannerList = ployed
  },

  SAVE_FLOOR_LIST_DATA(state, ployed) {
    state.floorList = ployed
  }
}

const getters = {}


export default {
  namespaced: true, //开启命名空间
  state,
  actions,
  mutations,
  getters
}