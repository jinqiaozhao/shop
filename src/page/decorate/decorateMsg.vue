/*
*作者---杨彬
*
*/
<template>
    <div>
        <section>
            <div class="header">
                <img src="../../assets/decorate/contactsIcon.png">
                <span>联系人</span>
            </div>
            <div class="content">
                <div class="item">
                    <span>姓<span style="visibility: hidden;">姓名</span>名</span>
                    <input type="text" placeholder="请输入(必填)" v-model='willSendData.realName' class="com-div-middle-ab">
                </div>
                <div class="item">
                    <span>手机号码</span>
                    <input type="text" placeholder="请输入(必填)" v-model='willSendData.mobile' class="com-div-middle-ab" :disabled="canInput">
                </div>
            </div>
        </section>
        <section>
            <div class="header">
                <img src="../../assets/decorate/addressIcon.png">
                <span>装修地址</span>
            </div>
            <div class="content">
                <div class="item" @click="openALertFn()">
                    <span>所在地区</span>
                    <input type="text" placeholder="请选择(必填)" :value="thisPCD" disabled class="com-div-middle-ab">
                    <img class="go-more com-div-middle-ab" src="../../assets/decorate/goMore.png">
                </div>
                <div class="item">
                    <span>详细地址</span>
                    <input type="text" placeholder="请输入(必填)" v-model='willSendData.dcAddress' class="com-div-middle-ab">
                </div>
            </div>
        </section>
        <div class="foot">
            <button type="button" @click="submitFn">提交</button>
        </div>
        <area-linkage @upAreaMsg='upAreaMsgFn'
                      :upAreaData='willSendData'
                      v-if="openAreaMark">

        </area-linkage>
    </div>
</template>
<script type="text/javascript">
    import areaLinkage from 'src/components/com/areaLinkage/areaLinkage.vue';
    export default {
        components: {areaLinkage},
        data(){
            return {
                openAreaMark: false,
                thisPCD: '',
              canInput:false,
                willSendData: {
                    "dcArea": "",
                    "provinceName": "",
                    "cityName": "",
                    "districtName": "",
                    "provinceCode": '',
                    "cityCode": '',
                    "districtCode": '',
                    "dcAddress": "",
                    "mobile": "",
                    "realName": "",
                    "coupon.id": "",
                }
            }
        },
        methods: {
            openALertFn(){
                this.openAreaMark = true;
            },
            upAreaMsgFn(oObj){
                this.openAreaMark = false;
                if(oObj==false){
                    return;
                }
                if (!oObj.province.id) {
                    return;
                };
                this.willSendData.provinceName = oObj.province.name;
                this.willSendData.provinceCode = oObj.province.id;
                this.willSendData.cityName = oObj.city.name;
                this.willSendData.cityCode = oObj.city.id;
                this.willSendData.districtName = oObj.district.name;
                this.willSendData.districtCode = oObj.district.id;
                this.buildPCDFn();
            },
            buildPCDFn(){
                let ostring = "";
                if (this.willSendData.provinceName) {
                    ostring += '/' + this.willSendData.provinceName
                }
                if (this.willSendData.cityName) {
                    ostring += '/' + this.willSendData.cityName
                }
                if (this.willSendData.districtName) {
                    ostring += '/' + this.willSendData.districtName
                }
                ostring = ostring.substring(1, ostring.length)
                this.thisPCD = ostring;
            },
            submitFn(){
                let othis=this;
              var addressExg=/^([A-Za-z0-9]|[\u4E00-\u9FA5])+$/;
                let sdata = {
                    'coupon.id': this.$route.params.id,
                    realName: this.willSendData.realName,
                    mobile: this.willSendData.mobile,
                    dcDistrict: this.willSendData.districtCode,
                    dcArea: ''+this.willSendData.provinceName+this.willSendData.cityName+this.willSendData.districtName,
                    dcAddress: this.willSendData.dcAddress
                }
                if (!sdata.mobile || !sdata.realName) {
                    m$.template({
                        val: '手机号和姓名<br>不能为空',
                        time: 1200
                    })
                    return;
                }
                ;
                if (!sdata.dcArea || !sdata.dcAddress) {
                    m$.template({
                        val: '地址信息<br>不能为空',
                        time: 1200
                    })
                    return;
                }
              if(addressExg.test(this.willSendData.dcAddress)==false){
                m$.template({
                  val:'地址详情不能<br>含有特殊字符',
                  time:500
                })
                return;
              }
                this.postAjax(this.url.decorateApple, sdata, (res)=> {
                    console.log(res)
                    if (res.code == 200) {
                        m$.template({
                            val: okImgDiv,
                            time: 1200,
                            fn(){
                              history.go(-1)
                            }
                        })
                    }
                    else {
                        m$.template({
                            val: res.message,
                            time: 1200,
                        })
                    }
                })
            }
        },
        created(){
          var othis=this;

              othis.getAjax(othis.url.my,{},(res)=>{
                if(res.code==200){
                  if(res.data.mobile){
                    othis.canInput=true;
                      othis.willSendData.mobile=res.data.mobile;
                  }

                }

          })
            document.title = '装修贷款申请';
            m$.documentTitle("装修贷款申请")
        }
    }
</script>
<style scoped lang="less">
    section {

        margin-bottom: 0.08rem;
        .header {
            font-size: 0;
            height: 0.88rem;
            line-height: 0.88rem;
            padding-left: 0.2rem;
            > * {
                display: inline-block;
                vertical-align: middle;
            }
            img {
                width: 0.4rem;
                height: 0.4rem;
            }
            span {
                margin-left: 0.1rem;
                font-family: PingFangSC-Regular;
                font-size: 0.3rem;
                color: #8a8a8a;
                letter-spacing: 0px;
                line-height: 100%;
                text-align: left;
            }
        }
        .content {
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
            padding-left: 0.2rem;
            background-color: white;
            > div {
                border-bottom: 1px solid #e3e3e3;
                height: 0.88rem;
                line-height: 0.88rem;
                font-size: 0;
                position: relative;
                &:last-of-type {
                    border-bottom: none;
                }
                > * {
                    display: inline-block;
                    vertical-align: middle;
                }
                > span {
                    min-width: 1.8rem;
                    _width: 1.8rem;
                    font-family: PingFangSC-Regular;
                    font-size: 0.3rem;
                    color: #212121;
                    letter-spacing: 0;
                    line-height: 0.3rem;
                    text-align: left;
                }
                > input {
                    background-color: transparent;
                    font-family: PingFangSC-Regular;
                    font-size: 0.3rem;
                    color: #212121;
                    letter-spacing: 0px;
                    line-height: 0.3rem;
                }
                > .go-more {
                    right: 0.3rem;
                    height: 0.35rem;
                }
            }
        }

    }

    .foot {
        font-size: 0;
        margin-top: 2.22rem;
        text-align: center;
        button {
            background: #fb4874;
            border-radius: 0.1rem;
            font-family: PingFangSC-Regular;
            height: 0.88rem;
            width: 6.8rem;
            font-size: 0.34rem;
            color: #ffffff;
            letter-spacing: 0px;
            line-height: 0.88;
            text-align: center;
        }

    }
</style>
