// 1. 引入axios模块 
import axios from 'axios'
import { getUserTempId } from '@/utils/getUserTempId'
import 'nprogress/nprogress.css' // 引入对应的样式
import NProgress from 'nprogress'
import store from '@/store'
// 2. 创建axios实例对象 以后整个项目都用这个实例发送请求
const ajax = axios.create({
  // target: 'http://sph-h5-api.atguigu.cn',
  baseURL: '/api',
  // target: 'http://gmall-h5-api.atguigu.cn',
  timeout: 5000, // 设置超时时间
})
// 3. 设置请求拦截器
ajax.interceptors.request.use(config => {
  NProgress.start(); //进度条开始显示

  // 在请求拦截器当中添加如下代码：
  const token = store.state.user.userInfo.token

  if (token) {
    config.headers.token = token
  }
  // 在请求之前 添加请求头 添加uuid
  config.headers.userTempId = getUserTempId()
  return config
})

// 4. 设置响应拦截器
ajax.interceptors.response.use(
  response => {
    NProgress.done(); //进度条结束
    return response.data
  },
  error => {
    // 如果发送请求出错了,会在这里统一提示错误信息
    // return error.message 如果只写这个是错误的，因为错误信息是字符串的话是非Promise值,也会认为是成功
    // 返回失败的Promise实例  目的是走程序员自己设置的错误信息
    return Promise.reject(new Error(error.message))
  }
)

// 5. 导出对象
export default ajax