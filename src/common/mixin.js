import {debounce} from "./tools";

export let myMixin  = {
  data(){
    return{
      refreshPage:null,
      refresh:null
    }
  },
  mounted(){
    //监听item中图片加载完成
    this.refresh = debounce(this.$refs.scroll.refresh,50);
    this.refreshPage = ()=>{
      this.refresh()
    };
    this.$bus.$on('itemImageLoad',this.refreshPage);
  },
};

export let BackTopMixin = {
  data() {
    return {
      isShow:false,
    };
  },
  methods:{
    BackClick(){
      //对组件进行打标记,从而获取到改组件里的一些属性和方法
      this.$refs.scroll.scrollTo(0,0,500)
    },                          //置顶
    getIsShow(value){
      this.isShow = (-value.y) > 1000
    },
  }
}
