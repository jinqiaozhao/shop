/*
*作者---杨彬
*
*/
<template>
    <div v-if='thisData'>

     <header>
         <div class="item-warp">
             <img src="../../assets/coupon/statusIcon.png">
             <span class="title">状<span style="visibility: hidden;">杨</span>态</span>
             <span class="text" v-if="thisData.status==0">可使用</span>
             <span class="text" v-if="thisData.status==1">已使用</span>
             <span class="text" v-if="thisData.status==2">已过期</span>
         </div>
         <div class="item-warp">
             <img src="../../assets/coupon/nameIcon.png">
             <span class="title">名<span style="visibility: hidden;">杨</span>称</span>
             <span class="text" v-text="thisData.typeName"></span>
         </div>
         <div class="item-warp">
             <img src="../../assets/coupon/timeIcon.png">
             <span class="title">有效期</span>
             <span class="text" v-text="thisData.gmtStart+'-'+thisData.gmtEnd"></span>
         </div>
         <div class="item-warp" v-if="thisData.useIntro">
             <img src="../../assets/coupon/explain.png">
             <span class="title">说<span style="visibility: hidden;">杨</span>明</span>
             <span class="text" v-text="thisData.useIntro"></span>
         </div>
       <div class="item-warp" v-if="thisData.amount">
         <img src="../../assets/coupon/amount.png">
         <span class="title">面<span style="visibility: hidden;">杨</span>额</span>
         <!--<span style="font-size:0.5rem;margin:0 0.1rem;color:#fb4874;font-weight: bold;">￥{{thisData.amount}}</span>-->
        <span class="text">￥{{thisData.amount}} <span style="color:#999999;">满{{thisData.useAmount}}使用</span></span>
       </div>
     </header>
        <section  v-if="thisData.businessTypeId=='5'">
            <p >商家扫码即可使用</p>
            <span id="qcodeSpan"></span>
        </section>
      <div class="text_content_wrap"  v-if="thisData.businessTypeId=='5'">
        扫一扫即享宝宝余惊喜大礼：
        <ul  style="font-size: 0.25rem;text-align:left;color:#000;">
          <li> 1、赠送价值1888宝宝余“惠”家装管家服务，一对一全程指导装修；</li>
          <li>  2、装修过程中5次上门验收，助您解决实际问题；</li>
          <li> 3、宝宝余“惠”家装客户享受最低价的基础上，赠送宝宝余商城价值1000元的商城消费积分；</li>
          <li> 4、赠送全屋空气检测和治理环保方案；</li>
          <li> 5、专享家装“免息”分期解决方案，最高可贷30万，先装修后还款。</li>
        </ul>
      </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return{
                thisData:''
            }
        },
        methods:{
            getDataFn(){
                var othis=this;
                this.getAjax(this.url.couponDetail,{id:this.$route.params.id},(res)=>{
                    this.thisData=res.data;
                            m$.template({
                                time:200,
                                val:'',
                                fn(){
                                    // new QRCode(m$.dom('#qcodeSpan')[0],othis.thisData.couponNo)
                                    new QRCode('qcodeSpan', {
                                        text: othis.thisData.couponNo,
                                        width: 3.65*m$.rem,
                                        height: 3.65*m$.rem,
                                        colorDark : '#000000',
                                        colorLight : '#ffffff',
                                        correctLevel : QRCode.CorrectLevel.H
                                    });
                                }
                            })


                        })
            }
        },
        created(){
            document.title="优惠券详情";
            this.getDataFn();
            m$.template({
                time:'',
                val:'',
            })
        }
    }
</script>
<style scoped lang="less">
  .text_content_wrap{
    text-align:center;
    background: #fff;
    border-top: 1px solid #000;
    font-size: 0.3rem;
    color:#CE2462;
    padding:0.2rem;
    ul>li{
      padding-top:0.15rem;
    }
  }
    header{
        padding:0.15rem 0.3rem;
        background-color: white;
        border-bottom:1px solid #e3e3e3;
        .item-warp{
            font-size: 0;
            height: 0.6rem;
            line-height: 0.6rem;
            >*{
                display: inline-block;
                vertical-align: middle;
            }
            img{
                width: 0.3rem;
                height: 0.3rem;
            }
            .title{
                width: 1.2rem;
                margin-left: 0.15rem;
                font-family:PingFangSC-Regular;
                font-size:0.3rem;
                color:#999999;
                text-align:left;
            }
            .text{
                font-family:PingFangSC-Regular;
                font-size:0.3rem;
                color:#212121;
                letter-spacing:0px;
            }
        }
    }
    section{
        background-color: white;
        text-align: center;
        font-size: 0;
        padding: 0.4rem 0;
        p{
            padding:0.2rem 0 0.2rem 0;
            font-family:PingFangSC-Regular;
            font-size:0.28rem;
            color:#999999;
            letter-spacing:0px;
        }
        span{
            display: inline-block;
            width: 3.65rem;
            height: 3.65rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
