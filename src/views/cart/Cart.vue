<template>
  <div class="Cart">
      <cart-header></cart-header>
      <scroll class="content" ref="content">
        <car-list v-if="proLength"></car-list>
        <div v-else-if="!$store.state.isName" class="elseif">您的购物是空的~</div>
        <div v-else class="else" @click="toLogin">您还未登录,请登录~</div>
      </scroll>
      <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import CartHeader from "./childrenCompon/CartHeader";
  import CarList from "./childrenCompon/CarList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BottomBar from "./childrenCompon/BottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {BottomBar, Scroll, CarList, CartHeader},
    data() {
      return {}
    },
    activated() {
      this.$refs.content.refresh()
    },
    computed:{
      ...mapGetters(['proLength'])
    },
    methods:{
      toLogin(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .Cart{
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .else{
    position:relative;
    top: 160px;
    left: 0;
    right: 0;
    margin: auto;
    width: 100px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #777777;
  }
  .elseif{
    position:absolute;
    top: 160px;
    left: 50%;
    transform: translate(-50%);
    font-size: 24px;
    font-weight: 800;
  }
</style>
