/*
*作者---杨彬
*
*/
<template>
  <div style="">
    <header>
      <div class="my-head-warp">
        <div class="my-skip"><img src="http://ovn5haih3.bkt.clouddn.com/%E6%B6%88%E6%81%AF.png"><img @click='imgto' src="http://ovn5haih3.bkt.clouddn.com/%E8%AE%BE%E7%BD%AE.png"></div>
        <div class="my-label">
          <label>
            <input  id="myHeadInput" name="wwf"  @click='imgto'><!-- type="file" @change="upDateImg()" accept="image/*" -->
            <img :src="myData.headIcon">
          </label>
          <div class="my-p"><p v-text="myData.userName?myData.userName:'-'"></p></div>
          <img class="box-sex" v-if='myDataAW.sex==2' src="http://ovn5haih3.bkt.clouddn.com/%E5%A5%B3%E5%AD%A9.png" />
          <img class="box-sex" v-if='myDataAW.sex==1' src="http://ovn5haih3.bkt.clouddn.com/%E6%80%A7%E5%88%AB%E7%94%B7%E5%9B%BE%E7%89%87.png"/>
        </div>
        <div class="my-member">
          <img src="http://ovn5haih3.bkt.clouddn.com/%E9%92%BB%E7%9F%B3.png" /><span>会员等级</span>
        </div>
      </div>
    </header>

    <div class="div-space"></div>
    <div class="div-space"></div>
    <div style="font-size: 0.4rem;background: #fff;padding:0.2rem 0.1rem;color:#323137;">
      我的分享已被：<span v-text="qualiProgress" style="color:#F0436E;font-weight: bold;"></span> 位好友查看
    </div>
    <div style="font-size: 0.35rem;background: #fff;padding:0.2rem 0.1rem;color:#323137;">
      还需要<span v-text="left?left:10" style="color:#F0436E;font-weight: bold;"></span> 位好友帮忙可获取<span v-text="parseInt(canBuy)+1" style="color:#F0436E;font-weight: bold;"></span>次机会
    </div>
    <div  class="inter_wrap">
      如何获得试用机会
      <ul style="font-size: 0.3rem;padding:0.2rem 0">
        <li>1.将试用商品分享给好友或朋友圈</li>
        <li>2.此链接已有10位好友点击</li>
        <li>3.就可以获得试用资格</li>
      </ul>
    </div>

    <com-footer class="com-fix-b"></com-footer>
  </div>
</template>
<script type="text/javascript">
  import comFooter from "src/components/com/comfooter.vue"
  import {my} from 'src/assets/statusData.js'
  export default{
    data(){
      return{
        canBuy:'',//可购买次数
        qualiProgress:'',//分享次数
        point:'',//积分
        myData:"",
        mySData:my,
        left:'',
        myDataAW:'',
      }
    },
    components:{comFooter},
    methods:{
      imgto(){
        window.location.href = (`#/setpage`);
      },
      //获取有效分享次数
      getUserShareTimes(){
        this.postAjax(this.url.getUserShareTimes,{shareType:1},(res)=>{
        this.qualiProgress=res.data;
        var val =res.data;
        if(val%10==0){
          this.canBuy=val/10;
        }else{
          var vals=(val/10).toString();
          this.canBuy=vals.slice(0,vals.indexOf("."));
          var test=vals.slice(vals.indexOf(".")+1)
          this.left=10-test;
        }
        //this.canBuy=parseInt(res.data/10>1?res.data/10:0);
      })
      },
      upDateImg(){
        let othis=this;
        if(!m$.dom('#myHeadInput')[0].value){
          return;
        }
        m$.template({
          val:'',
        })
        myImage(m$.dom('#myHeadInput')[0],{width:300,quality:1},(data)=>{
          othis.postAjax(othis.url.updateHeadIcon,{
          headImage:data.split(',')[1]

        },(res)=>{
          if(res.code==200){
          othis.getAjax(othis.url.my,{},(res)=>{
            if(res.code==200){
            othis.myData=res.data;

          }
        else{
            m$.template({
              val:res.message,
              time:1200,
            })
          }
        })
          // othis.myData.headIcon=data;
          m$.template({
            val:'头像上传<br>成功',
            time:1000
          })
        }
      else {
          m$.template({
            val:res.message,
            time:1000
          })
        }
      })
      })
      },
      logout(){
        this.postAjax(this.url.logout,{},(res)=>{
          var othis=this;
        if(res.code==200&&res.message=='ok'){
          m$.template({
            val:'操作<br>成功',
            time:1200,
            fn:function () {
              m$.localStrages.remove('yxdyb')
              othis.$router.push('/login/0')
            }
          })
        }
      })
      }
    },
    // components:{cakeFoot},
    created(){
      m$.documentTitle("我的试用");
      //获取试用次数
      this.getUserShareTimes();
      //获取积分
      this.getAjax(this.url.my,{},(res)=>{
        if(res.code==200){
        this.myData=res.data;
        this.postAjax(this.url.getPoints,{},(res)=>{
          this.point=res.data;
      })
      }
    else{
        m$.template({
          val:res.message,
          time:1200,
        })
      }
    })
      document.title=this.mySData.title;
      m$.documentTitle(this.mySData.title)
      // this.getData(this.sData.userId);
    }
  }
</script>
<style scoped lang="less">
  @import "my";
  .inter_wrap{
    font-size: 0.35rem;
    padding:0.3rem 0.15rem;
    color:#828282;
    >ul{
      li{
        padding:0.1rem 0;
      }
    }

  }
</style>
