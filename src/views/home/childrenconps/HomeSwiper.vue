<template>
  <div class="HomeSwiper">
    <swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    props:{
      banner:Array
    },
    components:{
      Swiper,
      SwiperItem
    },
    data(){
      return{
        isLoad:true
      }
    },
    methods:{
      imageLoad(){
        if (this.isLoad){
          this.$emit('imageLoadOver');
          this.isLoad = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
