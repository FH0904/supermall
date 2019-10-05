<template>
  <div class="input">
    <nav-bar>
      <div slot="left" ><img src="~assets/img/common/back.svg" alt="" slot="left" @click="backClick"></div>
      <div slot="mid">登录</div>
    </nav-bar>
    <van-cell-group class="login-item">
      <van-field
        clearable
        placeholder="用户名"
        left-icon="contact"
        class="login"
        @blur="blurLogin"
        v-model="username"></van-field>

      <van-field
        class="pwd"
        clearable
        v-model="password"
        type="password"
        @blur="blurPwd"
        left-icon="closed-eye"
        placeholder="密码"
      />
      <van-button icon="arrow" round type="primary" class="btn" color="#e9e9e9" @click="toLogin"/>
      <div class="regist">
        <span class="left">忘记密码</span>
        <span class="right" @click="toRegist" >用户注册</span>
      </div>
    </van-cell-group>

  </div>
</template>

<script>
  import { Field ,CellGroup,Button,Toast} from 'vant';
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: "LoginPage",
    components: {
      NavBar,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Toast.name]: Toast
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods:{
      backClick(){
        this.$router.back()
      },
      toRegist(){
        this.$router.push('/regist')
      },
      blurLogin(){
        if ( !/^[\w\u4e00-\u9fa5]{2,10}$/.test(this.username) ){
          this.$toast("用户名格式不正确！");
        }
      },
      blurPwd(){
        if(!/^[\da-z_,!@#\$%\^&*()+\[\]{}\-=\.<>?]{6,18}$/i.test(this.password)){
          this.$toast("密码格式不正确");
        }
      },
      toLogin(){
        this.axios.post('/api/login',{
          username:this.username,
          password:this.password
        }).then((res)=>{
          if (res.data.code){
            this.$toast(res.data.msg)
          }else {
            this.$toast(res.data.msg)
            setTimeout(()=>{
              this.$router.push('/home')
            },2000)
            this.$store.commit('saveName',this.username)
          }
        })
      }
    }
  }
</script>

<style scoped>
  img{
    margin:10px 10px 0 0;
  }
  .input{
    height: 100vh;
    position: relative;
  }
  .login-item{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    padding-top: 150px;
  }
  .login,.pwd{
    margin-left: 10%;
    width: 80%;
    height: 50px;
    border-radius: 25px;
    background-color: #e9e9e9;
  }
  .pwd{
    margin-top: 10px;
  }
  .btn{
    display: flex;
    margin-left: 45%;
    margin-top: 10%;
  }
  .regist{
    position: absolute;
    margin-top: 40%;
    left: 50%;
    transform: translate(-50%);
    font-size: 12px;
    font-weight: 800;
  }
  .regist span{
    padding: 0 12px;
  }
  .left{
    border-right: 1px solid #e9e9e9;
  }
</style>
