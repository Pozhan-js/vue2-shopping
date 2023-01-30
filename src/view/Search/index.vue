<template>
	<div class="outer">
		<!-- 三级分类导航 -->
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--面包屑导航-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<span href="#">全部结果</span>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
						<li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
						<li class="with-x" v-show="searchParams.trademark">{{trademarkName}}<i @click="removeTrademark">×</i></li>
						<!-- 通过filters来对 props的数据进行处理  item | 这个是管道符号   -->
						<li class="with-x" v-show="searchParams.props" v-for="item,index in searchParams.props" :key="index">
              {{ item | formatProp}}<i @click="removeAttrValue(index)">×</i>
            </li>
					</ul>
				</div>

				<!-- 搜索器 -->
				<SearchSelector @get-trademark="saveTrademark" @get-attr="saveAttrValue"/>

				<!--商品展示区-->
				<div class="details clearfix">
					<!-- 列表操作区 -->
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li class="active">
									<a href="#">综合</a>
								</li>
								<li>
									<a href="#">销量</a>
								</li>
								<li>
									<a href="#">新品</a>
								</li>
								<li>
									<a href="#">评价</a>
								</li>
								<li>
									<a href="#">价格⬆</a>
								</li>
								<li>
									<a href="#">价格⬇</a>
								</li>
							</ul>
						</div>
					</div>
					<!-- 商品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
								<div class="list-wrap">
									<div class="p-img">
										<a href="#" target="_blank"><img :src="goods.defaultImg" /></a>
									</div>
									<div class="price">
										<strong>
											<em>¥ </em>
											<i>{{goods.price}}</i>
										</strong>
									</div>
									<div class="attr">
										<a target="_blank" href="item.html" :title="goods.title">{{goods.title}}</a>
									</div>
									<div class="commit">
										<i class="command">已有<span>2000</span>人评价</i>
									</div>
									<div class="operate">
										<a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
										<a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				<!-- 分页器 -->
          <Pagination 
					:total="total" 
					:pageSize="searchParams.pageSize" 
					:continues="5" 
					:pageNum="searchParams.pageNum"
					@change-pageNum="getPageNum"
					></Pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SearchSelector from './SearchSelector'
	import {mapGetters} from 'vuex'
import search from '@/store/modules/search'
	export default {
		name: 'Search',
		data(){
			return {
				searchParams:{
					category1Id:'',
					category2Id:'',
					category3Id:'',
					categoryName:'', //分类名
					keyword: '', //关键词
					props:[],  //跳转三级导航传递参数
					trademark: '', //品牌
					order: '1:asc', //升序还是降序   比如order:'1:asc'    order:'2:desc'  1是销量   2代表价格
					pageNum: 1,
					pageSize: 5,
				}
			}
		},
		components: {
			SearchSelector
		},
		watch:{
			$route:{
				immediate:true, //当页面打开时就开始监听
				handler(newValue){     //等于是将后面的对象的属性合并到this.searchParams对象中 重复属性会发生覆盖
					Object.assign(this.searchParams,{  
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
          categoryName: undefined,
          keyword: undefined,
        })
				// 获取通过变成导航传递过来的参数 注意路由参数都在 $route中 方法都在$router中
				// let {query,params} = this.$route
				let {query,params} = newValue
				// 合并对象属性
				Object.assign(this.searchParams,query,params)
				// 当获取到请求数据时 发送请求
				this.$store.dispatch("search/getSearchGoodsInfoData",this.searchParams)
				}
			}
		},
		computed:{
			...mapGetters('search',['goodsList','total']),
			trademarkName(){
				let {trademark} =this.searchParams
				return  trademark? trademark.split(':')[1]:''
			}
		},
		methods:{
			 // 0. 封装后的搜索
			search() {
				this.$store.dispatch('search/getSearchGoodsInfoData', this.searchParams)
			},
			// 删除分类名
			removeCategoryName(){
				let { params } = this.$route
				// console.log('路由数据',params);
				// 在进行跳转 因为页面是在检测$route对象的 一旦页面发生跳转或者刷新的话 会生成新的$route
				this.$router.push({
					name:'search',
					params
				})	
			},
			// 删除关键词
			removeKeyword(){
				// 获取query参数
				let {query} =this.$route
				// 进行页面跳转 修改url
				this.$router.push({
					name:'search',
					query
				})
			},
			//删除品牌
			removeTrademark(){
				// 将品牌设置为undefined
				this.searchParams.trademark = undefined
				this.search()
			},
			// 定义事件添加trademark 添加面包屑
			saveTrademark(trademark){
				this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
				// 调用search事件重新发送请求
				this.search()
			},
			// 添加销售属性面包屑
			saveAttrValue(attr){
				let {id,attrName,attrValue} = attr
				let prop = `${id}:${attrValue}:${attrName}`
				if(!this.searchParams.props.includes(prop)){
					this.searchParams.props.push(prop)

					//重新发送请求
					this.search()
				}
			},
			// 删除属性值面包屑
			removeAttrValue(index){
				this.searchParams.props.splice(index,1)
			},
			// 获取当前页 （分页器）
			getPageNum(num){
				this.searchParams.pageNum = num
				// 重新发送请求
				this.search()
			}
		},
		filters:{
			formatProp(val){
				// 将字符串以 冒号来进行切割
				const arr = val.split(':')
				return `${arr[2]}:${arr[1]}`
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		margin: 10px 0;

		.py-container {
			width: 1200px;
			margin: 0 auto;

			.bread {
				margin-bottom: 5px;
				overflow: hidden;

				.sui-breadcrumb {
					padding: 3px 15px;
					margin: 0;
					font-weight: 400;
					border-radius: 3px;
					float: left;

					li {
						display: inline-block;
						line-height: 18px;

						a {
							color: #666;
							text-decoration: none;

							&:hover {
								color: #4cb9fc;
							}
						}
					}
				}

				.sui-tag {
					margin-top: -5px;
					list-style: none;
					font-size: 0;
					line-height: 0;
					padding: 5px 0 0;
					margin-bottom: 18px;
					float: left;

					.with-x {
						font-size: 12px;
						margin: 0 5px 5px 0;
						display: inline-block;
						overflow: hidden;
						color: #000;
						background: #f7f7f7;
						padding: 0 7px;
						height: 20px;
						line-height: 20px;
						border: 1px solid #dedede;
						white-space: nowrap;
						transition: color 400ms;
						cursor: pointer;

						i {
							margin-left: 10px;
							cursor: pointer;
							font: 400 14px tahoma;
							display: inline-block;
							height: 100%;
							vertical-align: middle;
						}

						&:hover {
							color: #28a3ef;
						}
					}
				}
			}

			.details {
				margin-bottom: 5px;

				.sui-navbar {
					overflow: visible;
					margin-bottom: 0;

					.filter {
						min-height: 40px;
						padding-right: 20px;
						background: #fbfbfb;
						border: 1px solid #e2e2e2;
						padding-left: 0;
						border-radius: 0;
						box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

						.sui-nav {
							position: relative;
							left: 0;
							display: block;
							float: left;
							margin: 0 10px 0 0;

							li {
								float: left;
								line-height: 18px;

								a {
									display: block;
									cursor: pointer;
									padding: 11px 15px;
									color: #777;
									text-decoration: none;
								}

								&.active {
									a {
										background: #e1251b;
										color: #fff;
									}
								}
							}
						}
					}
				}

				.goods-list {
					margin: 20px 0;

					ul {
						display: flex;
						flex-wrap: wrap;

						li {
							height: 100%;
							width: 20%;
							margin-top: 10px;
							line-height: 28px;

							.list-wrap {
								.p-img {
									padding-left: 15px;
									width: 215px;
									height: 255px;

									a {
										color: #666;

										img {
											max-width: 100%;
											height: auto;
											vertical-align: middle;
										}
									}
								}

								.price {
									padding-left: 15px;
									font-size: 18px;
									color: #c81623;

									strong {
										font-weight: 700;

										i {
											margin-left: -5px;
										}
									}
								}

								.attr {
									padding-left: 15px;
									width: 85%;
									overflow: hidden;
									margin-bottom: 8px;
									min-height: 38px;
									cursor: pointer;
									line-height: 1.8;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;

									a {
										color: #333;
										text-decoration: none;
									}
								}

								.commit {
									padding-left: 15px;
									height: 22px;
									font-size: 13px;
									color: #a7a7a7;

									span {
										font-weight: 700;
										color: #646fb0;
									}
								}

								.operate {
									padding: 12px 15px;

									.sui-btn {
										display: inline-block;
										padding: 2px 14px;
										box-sizing: border-box;
										margin-bottom: 0;
										font-size: 12px;
										line-height: 18px;
										text-align: center;
										vertical-align: middle;
										cursor: pointer;
										border-radius: 0;
										background-color: transparent;
										margin-right: 15px;
									}

									.btn-bordered {
										min-width: 85px;
										background-color: transparent;
										border: 1px solid #8c8c8c;
										color: #8c8c8c;

										&:hover {
											border: 1px solid #666;
											color: #fff !important;
											background-color: #666;
											text-decoration: none;
										}
									}

									.btn-danger {
										border: 1px solid #e1251b;
										color: #e1251b;

										&:hover {
											border: 1px solid #e1251b;
											background-color: #e1251b;
											color: white !important;
											text-decoration: none;
										}
									}
								}
							}
						}
					}
				}

				.page {
					width: 733px;
					height: 66px;
					overflow: hidden;
					float: right;

					.sui-pagination {
						margin: 18px 0;

						ul {
							margin-left: 0;
							margin-bottom: 0;
							vertical-align: middle;
							width: 490px;
							float: left;

							li {
								line-height: 18px;
								display: inline-block;

								a {
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									border: 1px solid #e0e9ee;
									margin-left: -1px;
									font-size: 14px;
									padding: 9px 18px;
									color: #333;
								}

								&.active {
									a {
										background-color: #fff;
										color: #e1251b;
										border-color: #fff;
										cursor: default;
									}
								}

								&.prev {
									a {
										background-color: #fafafa;
									}
								}

								&.disabled {
									a {
										color: #999;
										cursor: default;
									}
								}

								&.dotted {
									span {
										margin-left: -1px;
										position: relative;
										float: left;
										line-height: 18px;
										text-decoration: none;
										background-color: #fff;
										font-size: 14px;
										border: 0;
										padding: 9px 18px;
										color: #333;
									}
								}

								&.next {
									a {
										background-color: #fafafa;
									}
								}
							}
						}

						div {
							color: #333;
							font-size: 14px;
							float: right;
							width: 241px;
						}
					}
				}
			}
		}
	}
</style>