<template>
  <div class="Home">
    <home-header/>
    <tab-control :title="['流行','新款','精选']"
                 class="tabControl" @itemClick="tabClick"
                 ref="tabControl2" v-show="isTabShow"/>
    <scroll class="content"
            ref="scroll"
            @scroll="getScroll"
            :probe-type="3" @pullingUp="getPullingUP" :pull-up-load="true">
      <home-swiper :banner="banner" @imageLoadOver="imageLoadOver"/>
      <home-recommend :recommend="recommend"/>
      <home-pop/>
      <tab-control :title="['流行','新款','精选']"
                    @itemClick="tabClick" ref="tabControl1"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="BackClick" v-show="isShow"/>
  </div>
</template>

<script>
  //混入
  import {myMixin,BackTopMixin} from "../../common/mixin";

  import {getHomeMultidata,getHomeGoods} from "network/homerequest"

  import HomeHeader from "./childrenconps/HomeHeader";
  import HomeSwiper from "./childrenconps/HomeSwiper";
  import HomeRecommend from "./childrenconps/HomeRecommend";
  import HomePop from "./childrenconps/HomePop";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goodsList/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: "Home",
    components: {BackTop, Scroll, GoodsList, TabControl, HomePop, HomeRecommend, HomeSwiper, HomeHeader},
    data() {
      return {
        banner:[],
        recommend: [],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]}
        },
        currentIndex:'pop',
        tabOffsetTop : 0,
        isTabShow: false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentIndex].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      //请求单个商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mixins:[myMixin,BackTopMixin],
    // mounted(){
    //   //监听item中图片加载完成
    //   let refresh = debounce(this.$refs.scroll.refresh,50);
    //   this.refreshPage = ()=>{
    //     refresh()
    //   };
    //   this.$bus.$on('itemImageLoad',this.refreshPage);
    // },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('itemImageLoad',this.refreshPage)
    },
    methods:{

      tabClick(index){
        switch (index) {
          case 0: this.currentIndex = 'pop'
            break
          case 1: this.currentIndex = 'new'
            break
          case 2: this.currentIndex = 'sell'
            break
        }

        //让两个tabControl的index保持一致
        this.$refs.tabControl2.activeIndex = index;
        this.$refs.tabControl1.activeIndex = index;
      },                      //切换不同数据
      getScroll(value){
        this.getIsShow(value)
        this.isTabShow = (-value.y)> this.tabOffsetTop
      },                    //置顶的显示与隐藏
      getPullingUP(){
        this.getHomeGoods(this.currentIndex);
      },                      //下拉加载更多
      imageLoadOver(){
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      },                     //当轮播图片加载完后计算tabControl里顶部的距离

     /*
        网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  .tabControl{
    position: relative;
  }
  .content{
    position: fixed;
    overflow: hidden;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>
