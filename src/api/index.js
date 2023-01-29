// 此文件是用来统一发送请求的，以便于将来统一维护或是管理 比如更改接口
// 1. ajax
import ajax from './ajax'
import mockAjax from './mockAjax'
// 2. 发送请求 获取三级分类列表的数据
// export function reqCategoryListData(){
//   return ajax.get('/api/product/getBaseCategoryList')
// }
// 或
export const reqCategoryListData = () => ajax.get('/product/getBaseCategoryList')

// 获取banner数据
// 发送请求 获取mock数据
export const reqBannerListData = () => mockAjax.get('/banner')
// 3. 获取楼层数据
export const reqGetFloorsListData = () => mockAjax.get('/floor')
// 4. 获取搜索数据   这个不是List 因为不是数组 是一个对象
export const reqSearchGoodsInfoData = (searchParams) => ajax.post('/list', searchParams)
