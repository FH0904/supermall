<template>
  <div class="BackTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .BackTop{
    position: fixed;
    right: 5px;
    bottom: 55px;
    z-index: 20;
  }
  img{
    width: 43px;
    height: 43px;
  }
</style>
