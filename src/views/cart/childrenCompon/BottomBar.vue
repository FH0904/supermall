<template>
  <div class="bottom-menu">
    <input type="checkbox" class="select-all" v-model="$store.state.all" @change="changeAll">
    <span>全选</span>
    <span class="total-price">合计:{{sum | filterSum}}</span>
    <span class="buy-product">去计算({{calcLength}})</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "BottomBar",
    data() {
      return {
        all:false
      }
    },
    filters:{
      filterSum(value){
        return '￥' + value.toFixed(2) + '元'
      }
    },
    computed:{
      ...mapGetters(['proLength']),
      sum(){
          return this.$store.state.productList.filter(item=>item.isSelector).reduce((pre,next)=>{
            return pre + next.newPrice*next.count
          },0)
      },
      calcLength(){
        return this.$store.state.productList.filter(item=>item.isSelector).length
      }
    },
    methods:{
      //全选与反选
      changeAll(){
        this.$store.state.productList.forEach((item)=>{
          item.isSelector = this.$store.state.all
        })
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: relative;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 17px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
