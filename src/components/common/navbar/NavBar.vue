<template>
  <div class="NavBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="mid"><slot name="mid"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .NavBar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
  .left ,
  .right{
    width:60px;
  }
  .mid{
    flex: 1;
  }
</style>
