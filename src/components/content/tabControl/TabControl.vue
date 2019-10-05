<template>
  <div class="TabControl">
    <div v-for="(item,index) in title" class="tabItem"
         :class="{active:index === activeIndex}" @click="isActive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      title:{
        type:Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        activeIndex : 0
      }
    },
    methods:{
      isActive(index){
        this.activeIndex = index
        this.$emit("itemClick",index)
      }
    }
  }
</script>

<style scoped>
  .TabControl{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 9;
  }
  .tabItem{
    flex: 1;
  }
  .tabItem span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
