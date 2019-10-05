<template>
  <div class="HomeHeader">
    <nav-bar>
      <div slot="mid">购物街</div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "HomeHeader",
    components: {NavBar},

  }
</script>

<style scoped>
.HomeHeader{

  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
