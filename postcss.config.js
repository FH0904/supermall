module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗宽度,对应设计稿的宽度
      viewportHeight: 667,//视窗高度,对应设计稿的高度
      unitPrecision: 5,   //指定"px"转换成的视窗单位值得小数位数
      viewportUnit: 'vw', //单位 建议 vw
      selectorBlackList: ['TabBar','TabBarItem'],//指定不需要转换的类
      minPixelValue: 1,  //小于或等于'1px'不转换
      mediaQuery: false,
      exclude:[/TabBar/]
    }
  }
}
