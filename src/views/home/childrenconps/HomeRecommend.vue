<template>
  <div class="HomeRecommend">
    <div class="item" v-for=" item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .HomeRecommend{
    display: flex;
    font-size: 14px;
    margin-top: 10px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }
  .item{
    flex:1;
    text-align: center;
  }
  img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
