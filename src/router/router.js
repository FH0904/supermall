import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Home =()=>import('views/home/Home')
const Category =()=>import('views/category/Category')
const Cart =()=>import('views/cart/Cart')
const Profile =()=>import('views/profile/Profile')
const Detail = () =>import('views/detail/Detail')
const Login = ()=>import('views/login/Login')
const Regist = ()=>import('views/login/Regist')

Vue.use(Router)

export default new Router({
  routes: [
    {path:'',redirect:'/home'},
    {path:'/home',component:Home},
    {path: '/category',component:Category},
    {path:'/cart',component:Cart},
    {path:'/profile',component:Profile,},
    {path:'/detail/:iid',component:Detail},
    {path:'/login',component:Login},
    {path:'/regist',component:Regist}
  ],
  mode:'history'
})
