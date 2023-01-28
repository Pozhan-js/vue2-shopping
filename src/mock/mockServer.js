import Mock from 'mockjs'
//引入json文件
import bannerData from '@/mock/banner.json'
import floorData from '@/mock/floor.json'
import axios from 'axios'

// 创建mockjs实列服务器
Mock.mock('/mock/banner', 'get', { code: 200, Message: 'OK', data: bannerData })
Mock.mock('/mock/floor', 'get', { code: 200, Message: 'OK', data: floorData })

// 将文件引入main文件中 让项目已启动时 就启动mock服务器

// 测试一下请求
// axios.get('/mock/banner').then(
//   response => console.log(response.data),
//   error => console.log(error.message)
// )
// 当看到有打印json文件数据 表示 mock服务器已经启动
