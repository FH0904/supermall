//起别名
module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },


  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9494',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
        }
      }
    }
  }

}
