<template>
  <div class="DetailHeader">
    <nav-bar>
      <img src="~assets/img/common/back.svg" alt="" slot="left" @click="backClick">
      <div class="mid" slot="mid">
        <div v-for="(item,index) in title"  class="midItem"
             :class="{active:index === currentIndex}" @click="handleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailHeader",
    components: {NavBar},
    data() {
      return {
        title:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      handleClick(index){
        this.currentIndex = index
        this.$emit("detailHeaderClick",index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .DetailHeader{
    position: relative;
    z-index: 31;
    background-color: #fff;
  }
  img{
    margin-top: 14px;
  }
  .mid{
    display: flex;
    font-size: 14px;
  }
  .midItem{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
