<template>
  <div class="Detail">
    <detail-header @detailHeaderClick="detailHeaderClick" ref="header"/>
    <scroll class="DetailScroll" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @DetailImgLoad="DetailImgLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-commend-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="detailImage" ref="recommend"/>
    </scroll>
    <detail-button-bar @addToCar="addToCar"/>
    <back-top @click.native="BackClick" v-show="isShow"/>
    <toast :msg="msg" :is-show="toastShow"></toast>
  </div>
</template>

<script>
  //混入
  import {myMixin,BackTopMixin} from "../../common/mixin";
  import {debounce} from "../../common/tools";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import DetailHeader from "./childrenComps/DetailHeader";
  import DetailSwiper from "./childrenComps/DetailSwiper";
  import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
  import DetailShopInfo from "./childrenComps/DetailShopInfo";
  import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailParamInfo from "./childrenComps/DetailParamInfo";
  import DetailCommendInfo from "./childrenComps/DetailCommendInfo";
  import GoodsList from "../../components/content/goodsList/GoodsList";
  import DetailButtonBar from "./childrenComps/DetailButtonBar";
  import BackTop from "../../components/content/backTop/BackTop";

  import {mapActions} from 'vuex'
  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "Detail",
    components: {
      Toast,
      BackTop,
      DetailButtonBar,
      GoodsList,
      DetailCommendInfo,
      DetailParamInfo, Scroll, DetailGoodsInfo, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailHeader},
    data() {
      return {
        detailId:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        detailImage:[],
        detailHeaderTopY:[],
        getDetailTopY:null,
        currentIndex : 0,
        msg:'',
        toastShow:false,
      }
    },
    created() {
      // 1.获取iid
      this.detailId = this.$route.params.iid
      this.getDetail()
      this.getRecommend()
      this.getDetailTopY = debounce(()=>{
        //获取detailHeader4个标题的offsetTop
        this.detailHeaderTopY = [] ;
        this.detailHeaderTopY.push(0);
        this.detailHeaderTopY.push(this.$refs.param.$el.offsetTop);
        this.detailHeaderTopY.push(this.$refs.comment.$el.offsetTop);
        this.detailHeaderTopY.push(this.$refs.recommend.$el.offsetTop);
      },1000);
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
    destroyed(){
      this.$bus.$off('itemImageLoad',this.refreshPage)
    },
    methods:{
      //请求详情数据
      getDetail(){
        // 2.请求数据
        getDetail(this.detailId).then((res)=>{
          // 2.1.获取结果
          let data = res.result

          // 2.2.获取顶部图片信息
          this.topImages = data .itemInfo.topImages

          // 2.3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //2.4.获取店铺信息
          this.shop = new Shop(data.shopInfo)

          // 2.5.获取商品信息
          this.detailInfo = data.detailInfo

          //2.6获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //2.7获取评论信息
          if (data.rate.list){
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      //3请求推荐数据
      getRecommend(){
        getRecommend().then((res)=>{
          this.detailImage = res.data.list
        })
      },

      //监听详情图片加载完成  刷新
      DetailImgLoad(){
        this.refresh();

        this.getDetailTopY()
      },

      //获取header的index值
      detailHeaderClick(index){
        this.$refs.scroll.scrollTo(0,-this.detailHeaderTopY[index],200)
      },

      //获取scroll的滚动距离
      scroll(pos){
        //1.实时获取滚动的距离
        const posY = -pos.y

        //2.posY和主题中的值进行对比[0, 3264, 4109, 4399]
        //posY 在 0 到 3264之间,index = 0
        //posY 在 3264 到 4109之间,index = 1
        //posY 在 4109 到 4399之间,index = 2

        //posY 在 大于4399,index = 3
        let length = this.detailHeaderTopY.length
        for(let i = 0; i<length; i++){
          //1.分两个区间进行判断
          if (this.currentIndex !== i &&((i<length-1 && posY>this.detailHeaderTopY[i]&&posY<this.detailHeaderTopY[i+1] )||(i ===length-1 && posY>this.detailHeaderTopY[i]))){
              this.currentIndex = i
              this.$refs.header.currentIndex = this.currentIndex
          }
          //2往detailHeaderTopY数组里面多push一个math的最大值,并且for循环length-1
        }


        //BackTop  混入
        this.getIsShow(pos);
      },

      //添加到购物车
      addToCar(){
        //1.创建一个空对象
        const obj = {}

        //2收集 对象信息
        obj.iid = this.detailId
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.newPrice = this.goods.nowPrice


        //3将商品添加到购物车里
        //this.$store.commit('addCar',obj)
        // this.$store.dispatch('addCar',obj).then((res)=>{
        //   console.log(res);
        // })
        //action里面可以返回promise对象, 以及可以将action里面的方法混入到methods里面

        this.addCar(obj).then((res)=>{
          this.msg = res
          this.toastShow = true

          setTimeout(()=>{
            this.toastShow = false
            this.msg = ''
          },2000)
        })
      },
      ...mapActions(['addCar'])
    }
  }
</script>

<style scoped>
  .Detail{
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 30;
  }
  .DetailScroll{
    background-color: #fff;
    /*height: calc(100% - 44px - 49px);*/
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
    bottom: 49px;
  }
</style>
