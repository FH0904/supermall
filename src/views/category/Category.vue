<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="mid">商品分类</div></nav-bar>
    <div class="content">
      <scroll class="tab-menu">
        <tab-menu :categories="categories" @getMaitKey="getMaitKey"></tab-menu>
      </scroll>
      <scroll class="tab-content-category">
        <tab-content-category :subcategories="subcategories"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  import TabMenu from "./childrenCompon/TabMenu";


  import {getCategory,getSubcategory} from "../../network/category";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabContentCategory from "./childrenCompon/TabContentCategory";


  export default {
		name: "Category",
    components: {
      TabContentCategory,
      Scroll,
      TabMenu,
		  NavBar,
    },
    data() {
		  return {
        categories:[],
        subcategories: []
      }
    },
    created(){
		  this.getCategory()
    },
    methods:{
      getCategory(){
        getCategory().then((res)=>{
          console.log(res);
          this.categories = res.data.category.list
        })
      },
      getMaitKey(value){
        getSubcategory(value).then((res)=>{
          this.subcategories = res.data.list
        })
      }
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .tab-menu{
    height: calc(100% - 44px - 49px);
    width: 100px;
    overflow: hidden;
  }
  .tab-content-category{
    flex: 1;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  /*.content {*/
  /*  position: absolute;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/

  /*  display: flex;*/
  /*}*/

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
