export default {
  addCar(context,payload){
    return new Promise((res,rej)=>{
      //查找之前数组中有没有该商品  返回的就是查找到的商品
      let product = context.state.productList.find(item=>item.iid === payload.iid);
      //判断product
      if(product){
        context.commit('addNumber',product)
        res('当前数量加一')
      }else {
        context.commit('addProduct',payload)
        res('添加新商品')
      }
    })
  }
}
