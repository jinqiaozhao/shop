/*
*作者---杨彬
*
*/
/*
*作者---杨彬
*
*/
<template>
    <div class="register">
        <div class="section">
          <div v-if="status==2">
            <label>
              <input type="password" v-model="oldPassword" :value="oldPassword" name="oldPassword">
              <span class="notice com-div-middle-ab" v-if="!oldPassword">原密码</span>
            </label>
          </div>
            <div v-if="status==2">
                <label>
                <input type="password" v-model="newPassword" :value="newPassword" name="newPassword">
                <span class="notice com-div-middle-ab" v-if="!newPassword">新密码</span>
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
            <div class="foot">
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
              oldPassword:'',
                newPassword: '',
                password: '',
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
                let willSendData = {}
                let othis=this;
                if (this.status == '1') {
                    willSendData['mobile'] = this.phone;
                    willSendData['authCode'] = this.codeCheck;
                    this.getAjax(this.url.checkCode, willSendData, (res)=> {
                        if (res.data == true) {
                            m$.localStrages.set('ybpc', {
                                m: this.phone,
                                c: this.codeCheck
                            })
                            this.$router.push('/passwordSet/2')
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
                    if(!this.oldPassword){
                        m$.template({
                            time:600,
                            val:'请输入<br>原密码',
                        })
                        return;
                    }  if(!pwdReg.test(this.newPassword)){
                        m$.template({
                            time:600,
                            val:'密码由:6-20位<br>字母数字组合',
                        })
                        return;
                    }
                    if(this.newPassword!=this.surePassword||(!this.newPassword)){
                        m$.template({
                            time:600,
                            val:'两次密码<br>不一致',
                        })
                        return;
                    }

                    var ybpc=m$.localStrages.get('ybpc')
                    // willSendData['mobile'] = ybpc.m;
                    // willSendData['authCode'] = ybpc.c;
                    willSendData['newPassword'] = this.newPassword;
                    willSendData['oldPassword'] = this.oldPassword;
                    this.postAjax(this.url.resetPassword, willSendData,
                            (res)=> {
                                console.log(res.data)
                                if (res.code == 200) {
                                    m$.template({
                                        time:1200,
                                        val: '密码重置<br>成功',
                                        fn(){
                                            othis.$router.replace('/my')
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
                    this.$router.push('/my')
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
                     if (this.status == 1) {
                        autoCodeUrl=this.url.passwordAuthCode;
                    }
                    else {}
                    this.postAjax(
                            autoCodeUrl, {mobile:this.phone},
                            (res)=> {
                                if(res.code==200){
                                    m$.template({
                                        time:1200,
                                        val:'验证码<br>已发送',
                                        fn(){
                                            othis.time=59;
                                            m$.localStrages.set('ybpc','ttyy')
                                            othis.selIt =window.setInterval(function () {
                                                othis.time--;
                                                if(othis.time==0){
                                                    window.clearInterval(othis.selIt);
                                                }
                                            },1000)
                                }
                                    })
                                }

                            })
                }
            }
        },
        watch:{
            '$route':function (val) {
                let othis=this;
                othis.newPassword= '',
                        othis.password='',
                        othis.codeCheck= '',
                        othis.phone='',
                        othis.surePassword='',
                        othis.time=0,
                this.status = val.params.id;
                if(othis.selIt){
                    window.clearInterval(othis.selIt);
                }
            }
        },
        mounted(){
            m$.hiddenScroll('.register');
        },
        created(){
            this.status=this.$route.params.id;

                  if(this.status == 1){
                      document.title='修改登录密码';
                      m$.documentTitle('修改登录密码')
                      m$.localStrages.remove(['ybpc'])
                  }
            if (this.status == 2) {
                document.title='确认密码';
                m$.documentTitle('确认密码')
                // if (!m$.localStrages.get('ybpc')) {
                //     m$.localStrages.remove(['ybpc'])
                //     this.$router.push('/login')
                // }

            }


        },
        beforeDestroy(){
            let othis=this;
            if(othis.selIt){
                window.clearInterval(othis.selIt);
            }
        }
    }
</script>
<style scoped lang="less">
    .register {
        background:#ffffff;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 0;

        .section {
            height: 100%;
            padding: 0 0.35rem;
            padding-top: 1rem ;
            >div{

                border-radius:0.15rem;
                height: 1rem;
                background:#e2e2e2;
                margin-bottom: 0.2rem;
                &:not(.foot){

                    position: relative;
                    font-size: 0;
                    >label {
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
                            color:#222222;
                            letter-spacing:0px;
                            width: 4rem;

                            text-align:left;
                        }
                        >.notice{
                            left:0.3rem ;
                            font-family:PingFangSC-Regular;
                            font-size:0.32rem;
                            color:#9e9e9e;
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
