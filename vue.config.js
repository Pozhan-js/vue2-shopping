const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true
  lintOnSave: false,  //关闭语法提示
  devServer: {
    // 这种proxy:options的方式适合配置多台代理服务器
    proxy: {
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  }
})
