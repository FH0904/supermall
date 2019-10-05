<template>
  <div class="TabMenu">
    <div class="menu-item" v-for="(item,index) in categories"
         @click="itemClick(index)"
         :class="{active:index === currentIndex}"
         :key="index" >
      {{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabMenu",
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('getMaitKey',this.categories[index].maitKey)
      },
    }
  }
</script>

<style scoped>
  .TabMenu{
    width: 100px;
    height: 100%;
    box-sizing: border-box;
    background-color: #f6f6f6;
  }
  .menu-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
