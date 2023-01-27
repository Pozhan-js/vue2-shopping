import axios from 'axios'
import 'nprogress/nprogress.css' // 引入对应的样式
import NProgress from 'nprogress'


// 创建axios实列
const mockAjax = axios.create({
  baseUrl: '/mock',
  timeout: 1000
})

// 3设置请求拦截器
mockAjax.interceptors.request.use(config => {
  NProgress.start(); //进度条开始显示
  return config
})

// 4. 设置响应拦截器
mockAjax.interceptors.response.use(
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

export default mockAjax
