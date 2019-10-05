export default  {
  //mutations的唯一目的就是修改state中的状态
  //mutations的设计原则就是每个函数方法只负责一件事,有利于vue的插件方便调试
  addNumber(state,product){
    product.count += 1
  },
  addProduct(state,payload){
    payload.isSelector = false
    payload.count = 1
    state.productList.push(payload)
  },
  saveName(state,payload){
    state.userName = payload
    state.isName = false
  }
}
