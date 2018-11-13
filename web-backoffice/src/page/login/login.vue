<template>
  <div class="loginBg">
    <div class="loginPanel">
      <el-row :gutter="60">
        <el-col :xs="0" :sm="16">
          <img :src="$Dolphin.path.contextPath + '/static/login/v2/loginImg.png'" class="img-responsive" />
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form class="loginForm">
            <div class="loginTitle">
              <img :src="$Dolphin.path.contextPath + '/static/login/v2/loginLogo.png'" class="img-responsive" />
              <h3>欢迎登录后台管理系统</h3>
            </div>

            <el-input v-model="user.username" placeholder="用户名">
              <i slot="prefix" class="fa fa-user"></i>
            </el-input>
            <el-input v-model="user.password" placeholder="密码" type="password">
              <i slot="prefix" class="fa fa-lock"></i>
            </el-input>

            <el-button type="primary" class="loginButton" @click="login">登录</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div><!--/container-->
  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        message: 'hello',
        url: {
          getIdentifyingCode:'/login/getIdentifyingCode'
        },
        user: {
          username: '',
          password: '',
          phone: '',
          identifyingCode: '',
          type: 'username', //username | phone
        },
        identifyingImg:'',
        identifyingTime: 0,
      }
    },
    methods: {
      login(){
        this.$store.dispatch('login', this.user).then(data => {
          this.goNext();
        }, errorMsg => {
          alert(errorMsg);
        });
      },
      getIdentifyingCode(){
        if(this.identifyingTime === 0){
          this.$ajax({
            url:this.url.getIdentifyingCode,
            method: 'post',
            data:Object.assign({}, this.user, {type: 'login'}),
          }).then(img => {
            this.identifyingImg = img.data;
            this.identifyingTime = 60;
            let time = setInterval(() => {
              if(this.identifyingTime !== 0){
                this.identifyingTime--;
              }else{
                clearInterval(time);
              }
            }, 1000);
          }).catch(err => {
            debugger;
          });
        }
      },
      goNext() {
        if (this.$route.query['redirectUrl']) {
          this.$router.replace(this.$route.query['redirectUrl']);
        } else {
          this.$router.replace('/');
        }
      },
    },
    created(){
    }
  }
</script>

<style lang="scss">
  .loginBg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(154, 193, 237);

  .loginPanel {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 1100px;
    height: 540px;
    margin-left: -600px;
    margin-top: -300px;
    background: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0 0 25px 15px rgb(110, 172, 255);
    padding: 30px 50px;

  .loginForm{
    padding-top: 100px;
    text-align: center;

  .loginTitle{
  img{
    width: 110px;
  }
  h3{
    font-size: 24px;
  }
  }

  .el-input{
    margin-bottom: 30px;

  input{
    border: 0;
    background:rgb(237, 245, 248);
    color: rgb(153, 153, 153);
  }
  .el-input__prefix{
    font-size: 20px;
    line-height: 40px;
    left: 9px;
  }
  }

  .loginButton{
    display: block;
    width: 100%;
  }
  }
  }
  }




  @media (max-width: 500px) {
    .loginBg{
    .loginPanel {
      top: 50%;
      width: 300px;
      margin-left: -180px;
      padding:30px 30px;
    }
  }
  }
</style>

