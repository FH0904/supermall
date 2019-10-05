<template>
  <div class="GoodsListItem" @click="toDetail">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price | price}}</span>
      <span class="collection">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    filters:{
      price(item){
        return '￥'+item + '元'
      }
    },
    props:{
      item:{
        type:Object,
        data() {
          return {};
        }
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },
      toDetail(){
        this.$router.push('/detail/'+this.item.iid)
      }
    },
    computed:{
      showImage(){
        return this.item.image || this.item.show.img
      }
    }
  }
</script>

<style scoped>
  .GoodsListItem{
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .GoodsListItem img{
    width: 100%;
  }
  .goods-info{
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collection {
    position: relative;
  }
  .goods-info .collection::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
