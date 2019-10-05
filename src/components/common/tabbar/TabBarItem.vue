<template>
  <div class="TabBarItem" @click="handleClick">
    <div v-if="!isAtive"><slot name="icon"></slot></div>
    <div v-else><slot name="icon-active"></slot></div>
    <div class="text" :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>
<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:"#ff5777"
      }
    },
    methods:{
      handleClick(){
        this.$router.push(this.path)
      }
    },
    computed:{
      isAtive(){
        return this.$route.path === this.path
      },
      activeStyle(){
        return this.isAtive ? {'color':this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
.TabBarItem{
  flex: 1;
}
img{
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
.text{
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>
