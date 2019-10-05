<template>
  <div>
    <swiper class="DetailSwiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {Swiper,SwiperItem},
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .DetailSwiper{
    height: 300px;
  }
</style>
