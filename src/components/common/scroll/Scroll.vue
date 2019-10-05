<template>
  <div  class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default(){
          return 1
        }
      },
      pullUpLoad:{
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        scroll:null,
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {

      //创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      });
      this.scroll.on('scroll', pos => {
        this.$emit('scroll', pos)
      });
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      });
    }
  }
</script>

<style scoped>

</style>
