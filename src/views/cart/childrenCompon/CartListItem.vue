<template>

    <van-swipe-cell>

      <van-cell :border="false" >
        <div id="shop-item">
        <div class="item-selector">
          <input type="checkbox" id="img" v-model="itemInfo.isSelector" @change="everyAll">
        </div>
        <div class="item-img">
          <img :src="itemInfo.imgURL" alt="商品图片">
        </div>
        <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
          <div class="info-bottom">
            <div class="item-price left">¥{{itemInfo.newPrice}}</div>
            <div class="item-count right">x{{itemInfo.count}}</div>
          </div>
        </div>
        </div>
      </van-cell>

      <template slot="right">
        <van-button square type="danger" text="删除" @click="dele"/>
      </template>
    </van-swipe-cell>








</template>

<script>
  import { SwipeCell,Cell,Button} from 'vant'
  export default {
    name: "CartListItem",
    components:{
      [SwipeCell.name]: SwipeCell,
      [Cell.name]: Cell,
      [Button.name]: Button,
    },
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      },
      itemIndex:Number
    },
    methods:{
      everyAll(){
        this.$store.state.all = this.$store.state.productList.every((item)=>{
          return item.isSelector
        })
      },
      dele(){
        this.$store.state.productList.splice(this.itemIndex,1)
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .active{
    background-color: #ff4400;
    border-radius: 50%;
  }
</style>
