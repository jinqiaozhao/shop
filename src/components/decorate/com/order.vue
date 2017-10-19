/*
*作者---杨彬
*
*/
<template>
  <div class="order">
    <div style="border:1px solid #E3E3E3;">
      <retread @getcheckbox="" v-show="renovate"></retread>
      <section>
        <div class="content">
          <div class="item">
            <input type="text" placeholder="你的名字" v-model='willSendData.realName' class="com-div-middle-ab">
          </div>
          <div class="item">
            <!--<input type="text" placeholder="手机号码" v-model='willSendData.mobile' class="com-div-middle-ab" :disabled="canInput">-->
            <input type="text" placeholder="手机号码" v-model='willSendData.mobile' class="com-div-middle-ab">
          </div>
        </div>
      </section>
      <section>
        <div class="content" style="background-color: #f5f5f5">
          <div class="item" @click="openALertFn()">
            <input type="text" placeholder="请选择房屋所在城市" :value="thisPCD" disabled class="com-div-middle-ab">
            <!--<img class="go-more com-div-middle-ab" src="../../assets/decorate/goMore.png">-->
          </div>
          <!--<div class="item">-->
          <!--<span>详细地址</span>-->
          <!--<input type="text" placeholder="请输入(必填)" v-model='willSendData.dcAddress' class="com-div-middle-ab">-->
          <!--</div>-->
        </div>
      </section>
      <dcr-package v-if="supervisor"></dcr-package>
    </div>
    <div class="foot">
      <button type="button" @click="submitFn">立即预约</button>
      <div>预约免费上门服务，获取三套翻新方案</div>
      <div>选择最合适的翻新方案</div>
    </div>
    <area-linkage @upAreaMsg='upAreaMsgFn'
                  :upAreaData='willSendData'
                  v-if="openAreaMark">

    </area-linkage>
  </div>
</template>
<script type="text/javascript">
  import areaLinkage from 'src/components/com/areaLinkage/areaLinkage0.vue';
  import retread from 'src/components/decorate/com/retreat.vue';
  import dcrPackage from 'src/components/decorate/com/package.vue';
  export default {
    components: {areaLinkage,retread,dcrPackage},
    data(){
    return {
      supervisor:false,
      renovate:false,
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
//        "dcAddress": "",
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
     // var myDate = new Date();//获取系统当前时间
     // var times=myDate.toLocaleString( );
      //console.log(times);
      let othis=this;
      var addressExg=/^([A-Za-z0-9]|[\u4E00-\u9FA5])+$/;
      let sdata = {
        'coupon.id': this.$route.params.id,
        name: this.willSendData.realName,
        mobile: this.willSendData.mobile,
      //  gmt_create:times,
        //dcDistrict: this.willSendData.districtCode,
       // dcArea: ''+this.willSendData.provinceName+this.willSendData.cityName+this.willSendData.districtName,//地址
        address: this.thisPCD,
        category:m$.sessionStores.get("checkbox")?m$.sessionStores.get("checkbox"):'',//翻新项目内容
        //监理套餐信息
        dcr_package:m$.sessionStores.get("checkpackage")?m$.sessionStores.get("checkpackage"):''
      }
      if (!sdata.mobile || !sdata.name) {
        m$.template({
          val: '手机号和姓名<br>不能为空',
          time: 1200
        })
        return;
      }
      ;
//      if (!sdata.dcArea || !sdata.dcAddress) {
        if (!sdata.address) {
        m$.template({
          val: '地址信息<br>不能为空',
          time: 1200
        })
        return;
      }
//      if(addressExg.test(this.willSendData.dcAddress)==false){
//        m$.template({
//          val:'地址详情不能<br>含有特殊字符',
//          time:500
//        })
//        return;
//      }/register/djService
      this.postAjax(this.url.decorateUser, sdata, (res)=> {
        //console.log(res)
      if (res.code == 200) {
                m$.template({
          val: '预约成功<br>可等待客服与您联系<br>或直接在公众号咨询',
          time: 2200,
      })
//        m$.template({
//          val: okImgDiv,
//          time: 1200,
//          fn(){
//          history.go(-1)
//        }
        m$.sessionStores.remove("checkbox");
        m$.sessionStores.remove("package");    }
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
      var mobile=m$.localStrages.get("accountData");
       othis.willSendData.mobile=mobile;
    //获取用户登录手机号

  //   othis.getAjax(othis.url.my,{},(res)=>{
  //     if(res.code==200){
  //     if(res.data.mobile){
  //       othis.canInput=true;
  //       othis.willSendData.mobile=res.data.mobile;
  //
  //     }
  //   }
  // })
//  document.title = '装修贷款申请';
//  m$.documentTitle("装修贷款申请")
  //console.log(this.$route.name)

  if(this.$route.name=='renovate'){this.renovate=true}else{this.renovate=false;}
  if(this.$route.name=='supervisor'){this.supervisor=true}else{this.supervisor=false;}
  }
  }
</script>
<style scoped lang="less">
  .order{
    margin:0 0.2rem;
  }
  section {
  .content {
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
  > input {
      background-color: transparent;
      font-family: PingFangSC-Regular;
      font-size: 0.3rem;
      color: #4E4E4E;
      letter-spacing: 0px;
      line-height: 0.3rem;
    }
  }
  }
  }
  .foot {
    padding:0.4rem 0.1rem 0.1rem;
    font-size: 0;
    text-align: center;
  background:#fff;
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
div{
  font-size: 0.2rem;
  padding:0.05rem;
  color:#ACACAC;
  margin-top:0.1rem;
}
  }
</style>
