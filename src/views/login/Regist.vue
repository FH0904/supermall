<template>
  <div class="input">
    <nav-bar>
      <div slot="left"><img src="~assets/img/common/back.svg" alt="" slot="left" @click="backClick"></div>
      <div slot="mid">注册</div>
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
        v-model="password1"
        type="password"
        @blur="blurPwd"
        left-icon="closed-eye"
        placeholder="密码"
      />
      <van-field
        class="pwd"
        clearable
        v-model="password2"
        @blur="blurPwd1"
        type="password"
        left-icon="closed-eye"
        placeholder="确认密码"
      />
      <van-button round type="primary" class="btn" color="#e9e9e9" @click="toRegist">注册</van-button>
    </van-cell-group>

  </div>
</template>

<script>
  import { Field ,CellGroup,Button,Toast} from 'vant';
  import NavBar from "../../components/common/navbar/NavBar";

  export default {
    name: "LoginPage",
    components:{
      NavBar,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Toast.name]: Toast
    },
    data(){
      return {
        username:'',
        password1:'',
        password2:''
      }
    },
    methods:{
      backClick(){
        this.$router.back()
      },
      toRegist(){
        this.axios.post('/api/regist',{
          username:this.username,
          password:this.password1
        }).then((res)=>{
          if (res.data.code){
            this.$toast(res.data.msg)
          }else{
            this.$toast(res.data.msg)
            setTimeout(()=>{
              this.$router.push('/login')
            },2000)
          }
        })
        //
      },
      blurLogin(){
        if ( !/^[\w\u4e00-\u9fa5]{2,10}$/.test(this.username) ){
          this.$toast("用户名格式不正确！");
        }
      },
      blurPwd(){
        if(!/^[\da-z_,!@#\$%\^&*()+\[\]{}\-=\.<>?]{6,18}$/i.test(this.password1)){
          this.$toast("密码格式不正确");
        }
      },
      blurPwd1(){
        if (this.password1 !== this.password2){
          this.$toast("两次密码输入不一致！");
        }
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
    z-index: 30;
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
    position: absolute;
    margin-top: 40%;
    left:50%;
    transform: translate(-50%);
    z-index: 100;
  }
</style>
