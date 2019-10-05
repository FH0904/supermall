<template>
  <div class="CartHeader">
    <nav-bar>
      <div slot="mid">购物车({{proLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartHeader",
    components: {NavBar},
    computed:{
      ...mapGetters(['proLength'])
    }
  }
</script>

<style scoped>
  .CartHeader{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
