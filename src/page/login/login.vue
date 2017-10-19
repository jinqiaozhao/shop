/*
*作者---杨彬
*
*/
<template>
    <div class="login">
        <form class="section">
            <div class="logo">
                <img src="../../assets/login/logo.png">
            </div>
            <div class="item">
                <img src="../../assets/login/tel.png"  class="com-div-middle-ab">
                <input type="text" name="mobile" v-model="mobile" :value="mobile" required
                       pattern="^1[3|4|5|8|7][0-9]\d{8}$" class="com-div-middle-ab">
                <span class="com-div-middle-ab" v-if="!mobile">手机号</span>
            </div>
            <div class="item">
                <img src="../../assets/login/lock.png" class="com-div-middle-ab">
                <input type="password" name="password" v-model="password" :value="password" required v-if="!isSee" class="com-div-middle-ab">
                <input type="text" name="password" v-model="password" :value="password" required v-if="isSee" class="com-div-middle-ab">
                <span class="com-div-middle-ab" v-if="!password">密<span style="visibility: hidden;">杨</span>码</span>
                <label>
                    <input type="checkbox" v-model="isSee" value="true">
                    <img class="eyeSee" src="../../assets/login/eyeNotSee.png">
                    <img class="eyeNotSee" src="../../assets/login/eyeSee.png">
                </label>
            </div>
              <div class="reber">
     <label>
       <input type="checkbox" v-model="isReme" value="1" class="com-div-middle-ab">
       <img class="imgC com-div-middle-ab" src="../../assets/login/C.png"/>
       <img class="imgNotC com-div-middle-ab" src="../../assets/login/notC.png"/><span>记住帐号</span>
     </label>
              </div>
            <div class="button">
                <button type="submit" @click.prevent="goToSubmit(mobile,password)">
                    登 录
                </button>
            </div>
            <div class="fuction">
                <div class="one"><span @click="goRegister">注册</span></div>
                <router-link  class="two" tag="div" to="/register/1">忘记密码?</router-link>

            </div>
            <div class="otherWay">
                <p>使用第三方登录</p>
                <div class="line com-div-middle-ab"></div>
                <div class="line com-div-middle-ab"></div>
            </div>
            <div class="otherImg">
                <img src="../../assets/login/weixin.png" title="微信" @click="gotosrcConfirmation()">
                <!--<img src="../../assets/login/weibo.png" title="微博">-->
                <!--<img src="../../assets/login/qq.png" title="QQ">-->
            </div>
        </form>

    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                mobile:  m$.localStrages.get('accountData')?m$.localStrages.get('accountData'):'',
                password: "",
                isSee:false,
                isReme:1,
              registerUrl :''
            }
        },

        methods: {
            goRegister(){
              window.location.href=this.registerUrl
            },
//          gotosrcConfirmation(){
//            m$.sessionStores.remove('authWXRegistLogin');
//            window.location.href = (`#/index`)
//          },
          gotosrcConfirmation(){
          //  window.location.href="/mall-web-shop/wx/wxAutoLogin";
            this.getAjax(this.url.getWxUserAuthUrl,{url:window.location.href.split("#")[0]+'#'+this.$route.query.perUrl},(res)=>{
              if(res.code==200){
               // m$.localStrages.set('yxdyb',res.data);
                window.location.href=res.data;
                //this.$router.push('/index')
              }
              else {
                m$.template({
                  val:'微信自动<br>登录失败',
                  time:500
                });
                //this.$router.push('/confirmation');
              }
            })

          },
            goToSubmit(oname, opassword){
                if (oname == "" || opassword == "") {
                    m$.template({
                        time: 2000,
                        val: '手机号或密码<br>输入有误'
                    });
                    return;
                }
                else {
                    this.postAjax('/user/login',//登录请求
                            {mobile: oname, password: opassword},
                            (res) => {
                                if(res.code==200){
                                    m$.localStrages.set('yxdyb',res.data);
                                  if(this.isReme==1){
                                    m$.localStrages.set('accountData',oname);
                                  }
                                  else {
                                    m$.localStrages.remove('accountData');
                                  }

                                  if(oname=='13076071337'||oname=='15884562887'){
                                    m$.localStrages.set('canggg',true);
                                  }
                                  if(this.$route.params.id==1&&this.$route.query.perUrl){
                                    this.$router.replace(this.$route.query.perUrl)
                                  }
                                  else {
                                    this.$router.replace('/index')
                                  }
                                }
                                else {
                                    m$.template({
                                        time: 2000,
                                        val: res.message
                                    });
                                }
                            })
                }

            },
            getRegisterUrl(){
                this.getAjax(this.url.getRegistWxUserAuthUrl,{},(res)=>{
                    if(res.code==200){
                        this.registerUrl = res.data
                    }
                })
            }
        },

        created(){
            this.getRegisterUrl();
            m$.localStrages.remove('yxdyb');
            m$.localStrages.set('accountData',this.mobile);
            m$.documentTitle("登录");

        }
    }
</script>
<style scoped lang="less">
    .login {
        background: url("../../assets/login/mainBg.jpg") no-repeat 100% 100%;
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
          .reber{
            height: 1.45rem;
            position: relative;
            font-size: 0;
            label{
              position: absolute;
              top: 0.24rem;
              right: 0.48rem;
              height: 0.4rem;
              display: inline-block;
              //padding-left: 0.5rem;
              font-size: 0;
              line-height: 0.44rem;
              input{
                opacity: 0;
                left: 0;
                z-index: 3;
                width: 0.4rem;
                height: 0.4rem;
              }
              span{
                font-family:PingFangSC-Regular;
                font-size:0.28rem;
                color:#ffffff;
                letter-spacing:0px;
                text-align:center;
                margin-left: 0.48rem;
              }
              img{
                left: 0;
                width: 0.35rem;
                height: 0.35rem;
                margin-right: 0.1rem;
                z-index: 1;
              }
              .imgC{
                display: none;
              }
              .imgNotC{
                display: inline-block;
              }
              input:checked~.imgC{display: inline-block;}
              input:checked~.imgNotC{ display: none;}
            }

          }
            .button {

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
                margin-bottom: 1.03rem;
                > div {
                    flex: 1;
                    font-family: PingFangSC-Regular;
                    font-size: 0.28rem;
                    color: #ffffff;
                    line-height: 100%;
                    text-align: center;
                }
              > a {
                    display: block;
                &:active{
                  background: #000;
                }
                    flex: 1;
                    /*font-family: PingFangSC-Regular;*/
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
