const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    // 代理跨域
    proxy:{
      '/api':{   //请求路径中带有'/api' 代理服务器工作
        target:"http://gmall-h5-api.atguigu.cn ",
        // pathRewrite:{'^/api/':''}
      }
    }
  },
})

