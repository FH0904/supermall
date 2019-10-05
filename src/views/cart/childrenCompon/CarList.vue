<template>
  <div class="CarList">
    <cart-list-item v-for="(item,index) in proList" :item-info="item" :item-index="index"/>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'
  export default {
    name: "CarList",
    components: {CartListItem},
    data() {
      return {}
    },
    computed:{
      ...mapGetters(['proList'])
    }
  }
</script>

<style scoped>

</style>
