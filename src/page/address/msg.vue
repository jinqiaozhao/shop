/*
*作者---杨彬
*
*/
<template>
    <div>
        <section class="type">
            <div>
                <span>收货人</span>
                <input type="text" placeholder="请输入(必填)" v-model="willSendData.consignee">
            </div>
            <div>
                <span>联系电话</span>
                <input type="text" placeholder="请输入(必填)" v-model="willSendData.phone">
            </div>
            <div @click="openALertFn()">
                <span>所在地区</span>
                <input type="text" placeholder="请选择(必填)" :value="thisPCD" disabled>
                <img class="go-arrow com-div-middle-ab"
                     src="../../assets/my/goArrow.png">
            </div>
            <div>
                <span>详细地址</span>
                <input type="text" placeholder="请输入(必填)"  v-model="willSendData.detailAddress" @click="">
            </div>

        </section>
        <section class="type">
            <div>
                <span>设为默认</span>
                <label class="switch-button com-div-middle-ab" style="right:0.2rem;font-size:0;"><input
                        class="mui-switch mui-switch-animbg" v-model="willSendData.isDefault" value="1"
                        type="checkbox" :checked="willSendData.isDefault"></label>
            </div>
        </section>
        <div class="button">
            <button type="button" @click="submitFn()">保存</button>
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
        data(){
            return {
                openAreaMark: false,
                thisPCD:'',
                willSendData: {
                    "id": '',
                    "provinceName": "",
                    "cityName": "",
                    "districtName": "",
                    "provinceCode": '',
                    "cityCode": '',
                    "districtCode": '',
                    "detailAddress": "",
                    "phone": "",
                    "consignee": "",
                    "isDefault": "",
                }
            }
        },
        methods: {
          wxLocation(){
            var oGetUrlT = window.location.href.split("#")[0];
    this.getAjax(this.url.getSignedJsTicket, {url: oGetUrlT}, (res) => {
      if (res.code == 200) {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'onVoicePlayEnd',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'

        ]
      });

//       wx.openLocation({
//     latitude: 0, // 纬度，浮点数，范围为90 ~ -90
//     longitude: 0, // 经度，浮点数，范围为180 ~ -180。
//     name: '我的位置', // 位置名
//     address: '', // 地址详情说明
//     scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
//     infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
// });
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        imgUrl: shareImg,//分享图片
        link:window.location.href,
        success: function (res) {
          // 用户确认分享后执行的回调函数
          m$.localStrages.set('success','1')
        },
        cancel: function (res) {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.ready(function(){
        wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          imgUrl: shareImg,//分享图片
          success: function () {
            // 用户确认分享后执行的回调函数
            m$.localStrages.set('success','1')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到聊天
        wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          imgUrl: shareImg,//分享图片
          success: function () {
            // 用户确认分享后执行的回调函数
            m$.localStrages.set('success','1')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          imgUrl: shareImg,//分享图片
          success: function () {
            // 用户确认分享后执行的回调函数
            m$.localStrages.set('success','1')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
    })
          },
            openALertFn(){
                this.openAreaMark = true;
            },
            upAreaMsgFn(oObj){
                this.openAreaMark = false;
                console.log(oObj)
                if(oObj==false){
                    return;
                }
                if (!oObj.province.id) {
                    return;
                }
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
                var thisUrl=this.url.saveReceiver;
              var phoneExg=/^1(3|4|5|7|8)\d{9}$/;
              var addressExg=/^([A-Za-z0-9]|[\u4E00-\u9FA5]|[^%&',;=?$\x22]+)+$/;

                let sendData = {
                    consignee: this.willSendData.consignee,
                    phone: this.willSendData.phone,
                    provinceCode: this.willSendData.provinceCode,
                    cityCode: this.willSendData.cityCode,
                    districtCode: this.willSendData.districtCode,
                    detailAddress: this.willSendData.detailAddress,
                    isDefault: this.willSendData.isDefault ? '1' : "0"
                };
                if(this.$route.params.status != 'new'){
                    sendData['id']=this.$route.params.status;
                    thisUrl=this.url.updateReceiver;
                };

                if(!this.willSendData.consignee){
                  m$.template({
                    val:'请填写收件人',
                    time:500
                  })
                  return
                }
                if(!this.willSendData.detailAddress){
                  m$.template({
                    val:'请填写<br>详细地址',
                    time:500
                  })
                  return
                }
                if(!this.thisPCD){
                  m$.template({
                    val:'请选择<br>区域信息',
                    time:500
                  })
                  return
                }
              if(phoneExg.test(this.willSendData.phone)==false){
                m$.template({
                  val:'手机号<br>格式错误',
                  time:500
                })
                return
              }
              if(addressExg.test(this.willSendData.detailAddress)==false){
                m$.template({
                  val:'地址详情不能<br>含有特殊字符',
                  time:500
                })
                return;
              }
                this.postAjax(thisUrl,sendData,(res)=>{
                    if(res.code==200){
                        m$.template({
                            time:1200,
                            val:'操作<br>成功',
                            fn(){
                                othis.$router.go(-1)
                            }
                        })
                    }
                    else {
                        m$.template({
                            time:1200,
                            val:res.message,
                        })
                    }
                })

            }
        },
        components: {
            areaLinkage
        },
        created(){
        this.willSendData.phone= m$.localStrages.get("accountData")
            if (this.$route.params.status == 'new') {
                m$.documentTitle("添加地址")
                document.title = "添加地址";
            }
            else {
                m$.documentTitle("修改地址")
                document.title = '修改地址';
                this.getAjax(this.url.findReceiver, {isDefault: '', receiveId: this.$route.params.status}, (res)=> {
                    var valName = '';
                    console.log(res.data.length)
                    if (res.code == 200) {

                        if (res && res.data.length >= 1) {
                            console.log(0)
                            m$.template({
                                time: 10,
                                val: '',
                            })
                            this.willSendData = res.data[0];
                            this.buildPCDFn();
                        }
                        else {
                            console.log(1)
                            m$.template({
                                time: 1200,
                                val: '暂无数据',
                            })
                        }
                    }
                    else {
                        m$.template({
                            time: 1200,
                            val: res.message,
                        })
                    }


                });

            }
        }

    }
</script>
<style scoped lang="less">
    @import '../../components/com/less/switch.less';
.type{
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding-left: 0.2rem;
    background: #ffffff;
    font-size: 0;
    margin-bottom: 0.2rem;
    >div{
        position: relative;
        border-bottom: 1px solid #e3e3e3;
        font-size: 0;
        line-height: 0.98rem ;
        height: 0.98rem;
        &:last-of-type{
            border-bottom: none;
        }
            >*{
                display: inline-block;
                vertical-align: middle;
            }
            >span{
                font-family:PingFangSC-Regular;
                font-size:0.3rem;
                color:#212121;
                letter-spacing:0px;
                text-align:left;
                width: 1.8rem;
            }
            >input{
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              -webkit-transform: translateY(-50%);
              -o-transform: translateY(-50%);
              -moz-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
              transform: translateY(-50%);
              background-color: transparent;
                font-family:PingFangSC-Regular;
                font-size:0.3rem;
                color:#212121;
                letter-spacing:0px;
            }
        >.switch-button{
            font-size: 0;
            line-height: 0;


        }
    }
}
    .button{
        margin-top: 2.64rem;
        text-align: center;
        font-size: 0;
        button{
            background:#fb4874;
            -webkit-border-radius: 0.1rem;
            -moz-border-radius: 0.1rem;
            border-radius: 0.1rem;
            width:6.8rem;
            height:0.88rem;
            font-family:PingFangSC-Regular;
            font-size: 0.34rem;
            color:#ffffff;
            letter-spacing:0px;
          line-height: 0.88rem;
            text-align:center;
        }
    }
    .go-arrow{
        right: 0.35rem;
        height: 0.3rem;
    }
</style>
