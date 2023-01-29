// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   // transpileDependencies: true
//   lintOnSave: false,  //关闭语法提示
//   devServer: {
//     // 这种proxy:options的方式适合配置多台代理服务器
//     proxy: {
//       '/api': {
//         target: 'http://sph-h5-api.atguigu.cn',
//         // changeOrigin: true,
//         // pathRewrite: {
//         //   '/api': '/api'
//         // },
//         timeout: 5000
//       }
//     }
//   }
// })

module.exports = {
  lintOnSave: false, // 关闭语法检查\
  devServer: {
    proxy: {
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn',
        // target: 'http://gmall-h5-api.atguigu.cn',
        timeout: 5000
      },
    },

  }
}

