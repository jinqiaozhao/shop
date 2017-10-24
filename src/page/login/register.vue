/*
*作者---杨彬
*
*/
<template>
    <div class="register">
    <div class="section">
        <div v-if="status==2">
            <label>
            <input type="password" v-model="password" :value="password" name="password">
            <span class="notice com-div-middle-ab" v-if="!password">新密码</span>
            </label>
        </div>
        <div v-if="status==2">
            <label>
        <input type="password" v-model="surePassword" :value="surePassword" name="surePassword">
        <span class="notice com-div-middle-ab" v-if="!surePassword">确认新密码</span>
            </label>
    </div>
        <div v-if="status!=2">
            <label>
            <input type="text" v-model="phone" :value="phone" name="phone">
            <span class="notice com-div-middle-ab" v-if="!phone">手机号</span>
            </label>
        </div>
        <div v-if="status!=2">
            <label>
            <input type="text" v-model="codeCheck" :value="codeCheck" name="codeCheck">
            <span class="notice com-div-middle-ab" v-if="!codeCheck">验证码</span>
            </label>
            <button class="com-div-middle-ab" @click="getAuthCode()" v-if="time==0">获取验证码</button>
            <button class="com-div-middle-ab" v-text="time+'s'"  v-if="time!=0"></button>

        </div>
        <div v-if="status==0">
            <label>
            <input type="password" v-model="inputpassword" :value="inputpassword" name="inputpassword">
            <span class="notice com-div-middle-ab"
                  style="letter-spacing:0.32rem;" v-if="!inputpassword">密码</span>
            </label>
        </div>
        <div class="foot">
            <button  style="letter-spacing:0.32rem;"
                     v-if='status==0' @click="nextStatus()">绑定</button>
            <button v-if='status==1' @click="nextStatus()">下一步</button>
            <button style="letter-spacing:0.32rem;"
                    v-if='status==2' @click="nextStatus()">确认</button>
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                status: '',
              password: '',
              inputpassword: '',
                codeCheck: '',
                phone: '',
                surePassword: '',
                time:0,
                selIt:'',
                perStageCode:'',
            }
        },
        methods: {
            nextStatus(){
                var othis=this;
                let willSendData = {};
                if (this.status == '0') {
                  //  willSendData['mobile'] = this.phone;
                  //willSendData['inputpassword'] = this.password;
                  willSendData['m' +
                  '' +
                  '' +
                  'obile'] = this.phone;
                    willSendData['authCode'] = this.codeCheck;
                    willSendData['password'] = this.inputpassword;
                  //  willSendData['openId'] = m$.sessionStores.get('openId')? m$.sessionStores.get('openId'):'';
                      m$.localStrages.set('open',willSendData);
                   /* this.postAjax(this.url.registInWx,willSendData,(res)=>{
                        if(res.code==200){
                            m$.template({
                                time:1200,
                                val:'注册成功',
                                fn(){
                                  m$.localStrages.set('yxdyb',res.data);
                                    othis.$router.push('/index')
                                }
                            });
                        }
                        else {
                            m$.template({
                                time:1200,
                                val:res.message
                            })
                        }
                    })*/
                  this.postAjax(this.url.wxBindAcount,willSendData,(res)=>{
                    if(res.code==200){
                    m$.template({
                      time:1200,
                      val:'绑定成功',
                      fn(){
                        m$.localStrages.set('yxdyb',res.data);
                        othis.$router.push('/index')
                      }
                    });
                  }
                else {
                    m$.template({
                      time:1200,
                      val:res.message
                    })
                  }
                })

                }
                else if (this.status == '1') {
                    willSendData['mobile'] = this.phone;
                    willSendData['authCode'] = this.codeCheck;
                    this.getAjax(this.url.checkCode,willSendData,(res)=>{
                        if (res.data == true) {
                            m$.localStrages.set('ybpc', {
                                m: this.phone,
                                c: this.codeCheck
                            });
                           location.hash='/register/2';
                        }

                        else {
                            m$.template({
                                time: 1200,
                                val: '验证码<br>错误'
                            })
                        }
                    })
                }
                else if (this.status == '2') {

                    var pwdReg=/^[A-Za-z0-9]{6,20}$/;
                    if(!pwdReg.test(this.password)){
                        m$.template({
                            time:1200,
                            val:'密码由:6-20位<br>字母数字组合',
                        });
                        return;
                    };
                    if(this.password!=this.surePassword||(!this.password)){
                        m$.template({
                            time:1200,
                            val:'两次密码<br>不一致',
                        });
                        return;
                    }

                    var ybpc=m$.localStrages.get('ybpc');
                    willSendData['mobile'] = ybpc.m;
                    // willSendData['authCode'] = ybpc.c;
                    willSendData['inputpassword'] = this.password;
                    this.postAjax(this.url.resetPassword2, willSendData,
                            (res)=> {
                                if (res.code == 200) {
                                    m$.template({
                                        time: 1200,
                                        val: '密码重置<br>成功',
                                        fn(){
                                            othis.$router.replace('/login/0')
                                        }
                                    })
                                }
                                else {
                                    m$.template({
                                        time:1200,
                                        val:res.message
                                    })
                                }
                    })
                }
                else {
                    this.$router.replace('/login/0')
                }


            },
            getAuthCode(){
                var thisReg=/^1[3|4|5|7|8][0-9]{9}$/;
                let  autoCodeUrl='';//验证码初始地址
                var othis=this;
                if(!this.phone||thisReg.test(this.phone)==false){
                        m$.template({
                            time:1200,
                            val:'请正确填写<br>手机号'
                        })
                }
                else {
                    if (this.status == 0) {
                        autoCodeUrl = this.url.registAuthCode;
                    }
                    else if (this.status == 1) {
                        autoCodeUrl = this.url.passwordAuthCode;
                    }
                    else {
                    }
                    this.postAjax(
                            autoCodeUrl, {mobile: this.phone},
                            (res)=> {
                                if (res.code == 200) {
                                    m$.template({
                                        time: 1200,
                                        val: '验证码<br>已发送',
                                        fn(){
                                            othis.time = 59;

                                            othis.selIt = window.setInterval(function () {
                                                othis.time--;
                                                if (othis.time == 0) {
                                                    window.clearInterval(othis.selIt);
                                                    othis.selIt='';
                                                }
                                            }, 1000)
                                        }
                                    })
                                }
                                else {
                                    m$.template({
                                        time: 1200,
                                        val: res.message
                                    })
                                }
                            })
                }
            }
        },
        watch:{
            '$route':function (val) {
                let othis=this;
                this.status = val.params.id;
                if(othis.selIt){
                    window.clearInterval(othis.selIt);
                }
            }
        },
        mounted(){
            m$.hiddenScroll('.register');
          setTimeout(function () {
            m$.hiddenScroll('.register');
          },10)
        },
        created(){
         // m$.hiddenScroll('.register');
           // m$.hiddenScroll(true);
            this.status = this.$route.params.id;
            if (this.status == 0) {
                m$.documentTitle("注册")
            }
            else if (this.status == 1) {
                document.title = '忘记密码';
                m$.documentTitle("忘记密码");
                m$.localStrages.remove(['ybpc']);
            }
            else {
                document.title = '重置密码';
                m$.documentTitle("重置密码");
                if(m$.localStrages.get('ybpc')!='ttyy'){
                    this.$router.replace('/login/0')
                }
            }
        },
        beforeDestroy(){
           // m$.hiddenScroll(false);
            let othis=this;
            if(othis.selIt){
                window.clearInterval(othis.selIt);
            }
        }
    }
</script>
<style scoped lang="less">
    .register {
        background: url("../../assets/login/mainBg.jpg") no-repeat 100%;
        background-size: 100% 100%;
        width: 100%;
        font-size: 0;
        position: absolute;
        top: 0;
        left: 0;
        .section {
            height: 100%;
            /*min-height: 12.06rem;*/
            /*_height: 12.06rem;*/
            background: rgba(0, 0, 0, 0.2);
            padding: 0 0.35rem;
            padding-top: 1rem ;
            >div{

                border-radius:0.15rem;
                height: 1rem;
                background: rgba(255, 255, 255, 0.4);
                margin-bottom: 0.2rem;
                &:not(.foot){

                    position: relative;
                    font-size: 0;
                    >label{
                        padding-left: 0.27rem;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        font-size: 0;
                        position: relative;
                        >input{
                            height: inherit;
                            background-color: transparent;
                            font-family:PingFangSC-Regular;
                            font-size:0.32rem;
                            color:#ffffff;
                            letter-spacing:0px;
                            width: 4rem;
                            z-index: 2;
                            text-align:left;
                        }
                        >.notice{
                            left:0.3rem ;
                            font-family:PingFangSC-Regular;
                            font-size:0.32rem;
                            color:#ffffff;
                            z-index: 0;
                            letter-spacing:0px;
                            line-height:100%;
                            text-align:center;
                        }
                    }

                    >button{
                        background-color: transparent;
                        right: 0;
                        height: 0.56rem;
                        width: 2rem;
                        border-left: 1px solid#ffffff;
                        font-family:PingFangSC-Regular;
                        font-size:0.32rem;
                        color:#d94e6a;
                        letter-spacing:0px;
                        line-height:0.56rem;
                        text-align:center;

                    }
                }
                &.foot{

                    background: rgba(251, 72, 116, 0.8);
                    font-size: 0;
                    margin-top:0.9rem;
                    button{
                        width: 100%;
                        background-color: transparent;
                        height: inherit;
                        font-family:PingFangSC-Regular;
                        font-size:0.38rem;
                        color:#ffffff;
                        letter-spacing: 0px;
                        text-align:center;
                    }

                }
            }
        }
    }
</style>
