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
                <input type="text" v-model="one.phone" :value="one.phone" name="one.phone">
                <span class="notice com-div-middle-ab" v-if="!one.phone">新手机号</span>
            </div>
            <div v-if="status==2">
                <input type="text" v-model="one.codeCheck" :value="one.codeCheck" name="one.codeCheck">
                <span class="notice com-div-middle-ab" v-if="!one.codeCheck">验证码</span>
                <button class="com-div-middle-ab" @click="getAuthCode(1)" v-if="one.time==0">获取验证码</button>
                <button class="com-div-middle-ab" v-text="one.time+'s'"  v-if="one.time!=0"></button>
            </div>
            <div v-if="status!=2">
                <input type="text" v-model="two.phone" :value="two.phone" name="two.phone" disabled>
                <span class="notice com-div-middle-ab" v-if="!two.phone">原手机号</span>
            </div>
            <div v-if="status!=2">
                <input type="text" v-model="two.codeCheck" :value="two.codeCheck" name="two.codeCheck">
                <span class="notice com-div-middle-ab" v-if="!two.codeCheck">验证码</span>
                <button class="com-div-middle-ab" @click="getAuthCode(2)" v-if="two.time==0">获取验证码</button>
                <button class="com-div-middle-ab" v-text="two.time+'s'"  v-if="two.time!=0"></button>
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
                one:{
                    phone:"",
                    codeCheck: '',
                    selIt:'',
                    time:0,
                },
                two:{
                    phone:"",
                    codeCheck: '',
                    selIt:'',
                    time:0,
                },
                status: '',
                perStageCode:'',
            }
        },
        methods: {
            nextStatus(){
                let willSendData = {};
                let othis=this;
                if (this.status == '1') {
                  if(!this.two.codeCheck){
                    m$.template({
                      time: 1200,
                      val: '请输入<br>验证码'
                    });
                    return
                  }
                    willSendData['mobile'] = this.two.phone;
                    willSendData['authCode'] = this.two.codeCheck;
                    this.getAjax(this.url.ckeckOp, willSendData, (res)=> {
                        if (res.data == true) {
                            m$.localStrages.set('ybpc', {
                                m: this.two.phone,
                                c: this.two.codeCheck
                            });
                            this.$router.replace('/newPhone/2')
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
                  if(!this.one.codeCheck){
                    m$.template({
                      time: 1200,
                      val: '请输入<br>验证码'
                    });
                    return
                  }
                    var ybpc=m$.localStrages.get('ybpc')
                    willSendData['newMobile'] = this.one.phone;
                    willSendData['authCode'] = this.one.codeCheck;
                    this.postAjax(this.url.ckeckNp, willSendData,
                            (res)=> {
                                console.log(res.data)
                                if (res.code == 200) {
                                    m$.template({
                                        time:1200,
                                        val: '手机号码<br>设置成功',
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
            getAuthCode(oindex){
                var thisReg=/^1[3|4|5|7|8][0-9]{9}$/;
                let  autoCodeUrl='';//验证码初始地址
                let  autoCodeData='';//验证码初始地址
                var othis=this;
                let statusObj=this.two;
                if(oindex==1){
                     statusObj=this.one;
                }

                if(!statusObj.phone||thisReg.test(statusObj.phone)==false){
                    m$.template({
                        time:1200,
                        val:'请正确填写<br>手机号'
                    })
                }
                else {
                    if (this.status == 1) {
                        autoCodeUrl=this.url.sendOpCode;
                        autoCodeData={}
                    }
                    else {
                        autoCodeUrl=this.url.sendNpCode;
                        autoCodeData={newMobile:statusObj.phone}
                    }
                    this.getAjax(
                            autoCodeUrl,autoCodeData,
                            (res)=> {
                                if(res.code==200){
                                    m$.template({
                                        time:1200,
                                        val:'验证码<br>已发送',
                                        fn(){
                                            statusObj.time=59;
                                            statusObj.selIt =window.setInterval(function () {
                                                statusObj.time--;
                                                if(statusObj.time==0){
                                                    window.clearInterval(statusObj.selIt);
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
                this.status = val.params.id;
                let statusObj=this.two={
                    phone:"",
                    codeCheck: '',
                    selIt:'',
                    time:0,
                };
                if(this.status==1){
                    statusObj=this.one= {
                        phone:"",
                                codeCheck: '',
                                selIt:'',
                                time:0,
                    };

                }

                if(statusObj.selIt){
                    window.clearInterval(statusObj.selIt);
                }
            }
        },
        mounted(){
            m$.hiddenScroll('.register');
        },
        created(){
            this.status=this.$route.params.id;
            let othis=this;
            console.log(this.status)
            if(this.status == 1){
                this.getAjax(this.url.getUserMobile,{},(res)=>{
                    if(res.code==200){
                        this.two.phone=res.data;
                        console.log(res.data)
                    }
                    else {
                        m$.template({
                            time:2000,
                            val:res.data,
                            fn(){
                                othis.$router.go(-1)
                            }
                        })
                    }
                })
                document.title='原手机验证';
                m$.documentTitle('原手机验证')
                m$.localStrages.remove(['ybpc'])
            }
            if (this.status == 2) {
                document.title='绑定新手机';
                m$.documentTitle('绑定新手机')
                if (!m$.localStrages.get('ybpc')) {
                    m$.localStrages.remove(['ybpc'])
                    this.$router.push('/login')
                }

            }


        },
        beforeDestroy(){
            let othis=this;
            let statusObj=this.two;
            if(this.status==1){
                statusObj=this.one;
            }

            if(statusObj.selIt){
                window.clearInterval(statusObj.selIt);
            }
        }
    }
</script>
<style scoped lang="less">
    .register {
        background:#ffffff;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 0;

        .section {
            height: 100%;
            /*min-height: 12.06rem;*/
            /*_height: 12.06rem;*/
            padding: 0 0.35rem;
            padding-top: 1rem ;
            >div{

                border-radius:0.15rem;
                height: 1rem;
                background:#e2e2e2;
                margin-bottom: 0.2rem;
                &:not(.foot){
                    padding-left: 0.3rem;
                    position: relative;
                    font-size: 0;
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
