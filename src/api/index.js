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
// 5. 获取商品详情数据
export const reqGoodDetailInfoData = (id) => ajax.get(`/item/${id}`)
// 6. 添加到购物车
export const reqAddOrUpdateCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 7. 发送请求获取购物车中的商品数据
export const reqShopCartListData = () => ajax.get('/cart/cartList')
// 8. 更新购物车中数据的选中状态
export const reqChangeShopCartInfoState = (skuID, isChecked) => ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)
// 当大括号中只有一行代码的时候，可以省略return和大括号
export const reqChangeAllCartState = (isChecked, skuIdList) =>
  ajax({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: 'post',
    data: skuIdList
  })


