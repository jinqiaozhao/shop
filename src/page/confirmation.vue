/*
*作者---杨彬
*
*/
<template>
  <div class="login">
    <form class="section">
      <div class="logo">
        <img src="../assets/login/logo.png">
      </div>
      <div class="item">
        <img src="../assets/login/tel.png"  class="com-div-middle-ab">
        <input type="text" name="mobile" v-model="mobile" :value="mobile" required
               pattern="^1[3|4|5|8|7][0-9]\d{8}$" class="com-div-middle-ab">
        <span class="com-div-middle-ab" v-if="!mobile">手机号</span>
      </div>
      <div class="item">
        <img src="../assets/login/lock.png" class="com-div-middle-ab">
        <input type="password" name="password" v-model="password" :value="password" required v-if="!isSee" class="com-div-middle-ab">
        <input type="text" name="password" v-model="password" :value="password" required v-if="isSee" class="com-div-middle-ab">
        <span class="com-div-middle-ab" v-if="!password">密<span style="visibility: hidden;">杨</span>码</span>
        <label>
          <input type="checkbox" v-model="isSee" value="true">
          <img class="eyeSee" src="../assets/login/eyeNotSee.png">
          <img class="eyeNotSee" src="../assets/login/eyeSee.png">
        </label>
      </div>
      <div class="button">
        <button type="submit" @click.prevent="goToSubmit(mobile,password)">
          绑定微信账号
        </button>
      </div>
      <div class="fuction">
        <!--<router-link class="one" tag="div" to="/register/0">注册</router-link>-->
        <div class="one"><span @click="goRegister">注册</span></div>
        <router-link  class="two" tag="div" to="/register/1">忘记密码?</router-link>

      </div>
      <!--<div class="otherWay">-->
        <!--<p>使用第三方登陆</p>-->
        <!--<div class="line com-div-middle-ab"></div>-->
        <!--<div class="line com-div-middle-ab"></div>-->
      <!--</div>-->
      <!--<div class="otherImg">-->
        <!--<img src="../assets/login/weixin.png" title="微信">-->
        <!--<img src="../assets/login/weibo.png" title="微博">-->
        <!--<img src="../assets/login/qq.png" title="QQ">-->
      <!--</div>-->
    </form>

  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return {
        mobile: '',
        password: "",
        isSee:false,
        registerUrl:''
      }
    },
    methods: {
      goRegister(){
        window.location.href=this.registerUrl
      },
      getRegisterUrl(){
        this.getAjax(this.url.getRegistWxUserAuthUrl,{},(res)=>{
          if(res.code==200){
            this.registerUrl = res.data
          }
        })
      },
      goToSubmit(oname, opassword){
        if (oname == "" || opassword == "") {
          m$.template({
            time: 500,
            val: '手机号或密码<br>输入有误'
          });
          return;
        }
        else {
          if (!this.$route.query||!this.$route.query.openid) {
            m$.template({
              time: 500,
              val: '没有微信ID'
            });
            return;
          }
          this.postAjax(this.url.bindWxAccount,//登录请求
            {mobile: oname, password: opassword,openid:this.$route.query.openid},
            (res) => {
              if(res.code==200){
                m$.localStrages.set('yxdyb',res.data);
                this.$router.push('/index')
              }
              else {
                m$.template({
                  time: 2000,
                  val: res.message
                });
              }
            })
        }

      }
    },
    created(){
        this.getRegisterUrl();
      m$.localStrages.remove();
      m$.documentTitle("绑定微信");

    }
  }
</script>
<style scoped lang="less">
  .login {
    background: url("../assets/login/mainBg.jpg") no-repeat 100% 100%;
    background-size: 100%;
    min-height: 12.06rem;
    _height: 12.06rem;

    .section {
      min-height: 12.06rem;
      _height: 12.06rem;
      background: rgba(0, 0, 0, 0.2);
      padding: 0 0.35rem;
      .logo {
        text-align: center;
        font-size: 0;
        padding: 0.62rem 0;
        margin-bottom: 0.34rem;
        img {
          width: 1.82rem;
          height: 1.82rem;
        }
      }
      .item {
        height: 0.9rem;
        // line-height: 0.9rem;
        border-bottom: 1px solid #ffffff;
        margin-bottom: 0.15rem;
        font-size: 0;
        padding-left: 0.03rem;
        position: relative;
        > * {
          vertical-align: middle;
          display: inline-block;
        }
        > img {
          width: 0.4rem;
          height: 0.5rem;
        }
        > input {
          display: inline-block;
          // position: relative;
          z-index: 2;
          margin-left: 0.72rem;
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #e9e9e9;
          letter-spacing: .0255rem;
          text-align: left;
          background-color: transparent;

        }
        > span {
          z-index: 1;
          left: 0.9rem;
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #e9e9e9;
          letter-spacing: .0255rem;
          text-align: left;
        }
        > label {
          position: absolute;
          bottom: 0.16rem;
          right: 0.2rem;
          height: 0.28rem;
          width: 0.5rem;
          > * {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          input {
            z-index: 3;
            opacity: 0;
            &:checked ~ .eyeSee {
              display: none;
            }
            &:checked ~ .eyeNotSee {
              display: inline-block;
            }
          }
          .eyeSee {
            display: inline-block;
          }
          .eyeNotSee {
            display: none;
          }
        }
      }
      .button {
        margin-top: 0.63rem;
        font-size: 0;
        button {
          opacity: 0.8;
          background: #fb4874;
          border-radius: 0.15rem;
          width: 6.8rem;
          font-family: PingFangSC-Regular;
          font-size: 0.38rem;
          color: #ffffff;
          height: 1rem;
          text-align: center;

        }
      }
      .fuction {
        display: flex;
        margin-top: 0.3rem;
        margin-bottom: 1.9rem;
        > div {
          flex: 1;
          font-family: PingFangSC-Regular;
          font-size: 0.28rem;
          color: #ffffff;
          line-height: 100%;
          text-align: center;
        }
        .one {
          text-align: left;
          padding-left: 0.29rem;
          letter-spacing: 0.28rem;
        }
        .two {
          text-align: right;
          padding-right: 0.29rem;
        }
      }
      .otherWay {
        font-family: PingFangSC-Light;
        font-size: 0.28rem;
        color: #ffffff;
        line-height: 100%;
        text-align: center;
        position: relative;
        margin-bottom: 0.75rem;
        > div {
          height: 0;
          width: 2.20rem;
          border-bottom: 1px solid #ffffff;
        }
        .line:first-of-type {
          left: 0;
        }
        .line:last-of-type {
          right: 0;
        }
      }
      .otherImg {
        text-align: center;
        font-size: 0;
        > img {
          margin-left: 0.96rem;
          height: 0.6rem;
          &:first-of-type {
            margin-left: 0;
          }
        }
      }
    }

  }
</style>
