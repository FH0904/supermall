<template>
  <div class="Toast" v-show="isShow">
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      msg:{
        type:String,
        default:'默认文字'
      },
      isShow:{
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .Toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,.75);
    padding: 8px 10px;
    border-radius: 20px;
  }
</style>
