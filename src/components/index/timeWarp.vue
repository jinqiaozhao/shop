/*
*作者---杨彬
*
*/
<template>
  <div class="timeWarp" v-if='seckillData'>
    <div class="time-warp" style="position:relative;">
      <img src="../../assets/index/timeWrap_banner.png" alt="" style="width: 100%;height: 50px;z-index:1;">
      <!--<div >-->
        <!--<span class="text">距离结束</span>-->
        <!--<span class="time-span" v-text='h1'>2</span>-->
        <!--<span class="time-span" v-text='h2'>2</span>-->
        <!--<span class="symbel">:</span>-->
        <!--<span class="time-span" v-text='m1'>0</span>-->
        <!--<span class="time-span" v-text='m2'>1</span>-->
        <!--<span class="symbel">:</span>-->
        <!--<span class="time-span" v-text='s1'>5</span>-->
        <!--<span class="time-span" v-text='s2'>9</span>-->
      <!--</div>-->
      <div class="one" style="position:absolute;left:1.7rem;z-index:2;font-size:0.2rem;top:12px;color:#747474;">
        <!--<img src="../../assets/clock.png">-->
        <!--秒杀时间-->
        <span class="text">距离结束</span>
        <span class="time-span" >{{h1.toString()+h2}}</span><span class="symbel">:</span><span class="time-span" >{{m1.toString()+m2}}</span><span class="symbel">:</span><span class="time-span" >{{s1.toString()+s2}}</span>
      </div>
      <router-link to="/seckillGoods" style="font-size: 0.2rem;position: absolute;right: 0.48rem;color: #fb4874;z-index: 2;background: #fff;top: 15px;" @click="">更多秒杀</router-link>
      <!--<div class="two">-->
        <!--<router-link to="/seckillGoods" class="goMoreProduct"><span>更多秒杀好货</span>-->
          <!--<img src="../../assets/goMore.png" class="com-div-middle-ab">-->
        <!--</router-link>-->
      <!--</div>-->
    </div>
    <div class="list-warp">
      <div class="list-flex">
        <div class="list-item" v-for="(oitem,oindex) in seckillData.detailVos" :key="oindex" v-if="oindex<4"  @click="openScan(oitem.productId)">
          <img @click="goSeckillGoods"
            :src="oitem.thumbnail" v-if='oitem.thumbnail'>
          <p class="nowP" v-text="'￥'+ oitem.price" v-if='parseInt(oitem.price)>=0'></p>
          <p class="oldP" v-if='oitem.oldPrice'>¥ <s v-text='oitem.oldPrice' ></s></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ["sData"],
    data(){
      return {
        s1: 0, s2: 9, m1: 0, m2: 1, h1: 1, h2: 1,//时间
        timer: '',
        seckillData:'',
        seckillTime:''
      }
    },
    methods: {
      openScan(oid){
        if(oid){
          window.location.href=(`#/goodsDetail/${oid}`);
        }
      },
      goSeckillGoods(){
        window.location.href=('#/SeckillGoods')
      },
      getData(){
        this.postAjax(this.sData.url.getProductGroupShopVo,{
          status:1,
          groupType:1,
          pageNum:1,
          pageSize:3,
        },(res)=>{
          if(res.code==200&&res.data.data[0]){
            this.seckillData = res.data.data[0];
            if(this.seckillData.detailVos.length){
                for (var i=0;i<=5-this.seckillData.detailVos.length;i++){
                    var obj={};
                    // obj.price='';
                  this.seckillData.detailVos.push(obj)
                }

            }

            var gmtEnd=new Date(this.seckillData.gmtEnd.replace(
              /\-/g,'/'));
            var thisTime=new Date(this.seckillData.currentDate.replace(
              /\-/g,'/'));
            var seckillTime=(gmtEnd.getTime()-thisTime.getTime())/1000;
            this.formatSeconds(seckillTime);
          }
          if(!this.seckillData.detailVos){
            this.formatSeconds(0);
            clearInterval(this.timer)
          }
        })
      },
      formatSeconds(value) {
        //倒计时
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = "" + parseInt(theTime);
        if (theTime1 >= 0) {
          result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 >= 0) {
          result = "" + parseInt(theTime2) + ":" + result;
        }
        var s = theTime + '';
        var m = theTime1 + '';
        var h = theTime2 + '';
        if (theTime < 10) {
          this.s1 = 0;
          this.s2 = theTime;
        } else {
          this.s1 = s.substr(0, 1);
          this.s2 = s.substr(1, 2);
        }
        if (theTime1 < 10) {
          this.m1 = 0;
          this.m2 = theTime1;
        } else {
          this.m1 = m.substr(0, 1);
          this.m2 = m.substr(1, 2);
        }
        if (theTime2 < 10) {
          this.h1 = 0;
          this.h2 = theTime2;
        } else {
          this.h1 = h.substr(0, 1);
          this.h2 = h.substr(1, 2);
        }
      }
    },
    created(){
        this.getData();
      var othis = this;
      othis.timer = setInterval(function () {
        othis.s2--;
        if (othis.s2 < 0) {
          othis.s1--;
          othis.s2 = 9;
          if (othis.s1 < 0) {
            othis.m2--;
            othis.s1 = 5;
            if (othis.m2 < 0) {
              othis.m1--;
              othis.m2 = 9;
              if (othis.m1 < 0) {
                othis.h2--;
                othis.m1 = 5;
                if (othis.h2 < 0) {
                  othis.h1--;
                  othis.h2 = 9;
                  if (othis.h1 < 0) {
                    othis.s1 = 0;
                    othis.s2 = 0;
                    othis.m1 = 0;
                    othis.m2 = 0;
                    othis.h1 = 0;
                    othis.h2 = 0;
                    clearInterval(othis.timer)
                  }
                }
              }
            }
          }
        }
      }, 1000)
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
</script>
<style scoped lang="less">
  .timeWarp {
    text-align: center;
    background-color: #fff;
   // padding: 0.3rem 0;
    .time-warp {
      display: flex;
      font-size: 0;
    //  margin-bottom: 0.3rem;
      > div {
        flex: 1;
        &.two {
          text-align: right;
          padding: 0.01rem 0.3rem 0.01rem 0;
        }
        &.one {
          text-align: left;
          height: 100%;
          font-size: 0;
          padding-left: 0.2rem;
          line-height: 0.38rem;
          > * {
            vertical-align: middle;
          }
          > img {
            height: 0.3rem;
          }
          > .text {
            font-family: PingFangSC-Regular;
            font-size: 0.2rem;
            color: #4E4E4E;
            letter-spacing: 0px;
            text-align: center;
            display: inline-block;
            margin: 0 0rem 0 0.1rem;
          }
          .time-span {
            display: inline-block;
            background: #434343;
            padding: 0 0.03rem;
            min-height: 0.38rem;
            _height: 0.38rem;
            min-width: 0.24rem;
            font-family: PingFangSC-Regular;
            font-size: 0.2rem;
            color: #ffffff;
            letter-spacing: 0px;
            line-height: 0.4rem;
            text-align: center;
            //margin-right: 0.04rem;
            &:last-of-type {
              margin-right: 0;
            }
          }
          > .symbel {
            font-family: PingFangSC-Regular;
            font-size: 0.3rem;
            display: inline-block;
            color: #a8a8a8;
            letter-spacing: 0px;
            text-align: center;
            width: 0.18rem;
            font-weight: bold;
          }
        }
        .goMoreProduct {
          background: #fb4874;
          border-radius: 1rem;
          _width: 1.6rem;
          min-width: 1.6rem;
          padding: 0 0.28rem 0 0.12rem;
          height: 0.36rem;
          line-height: 0.36rem;
          font-family: PingFangSC-Regular;
          font-size: 0.2rem;
          color: #ffffff;
          letter-spacing: 0px;
          position: relative;
          text-align: center;
          display: inline-block;
          span {
            vertical-align: middle;
          }
          img {
            position: absolute;
            right: 0.06rem;
            height: 0.21rem;

          }
        }
      }
    }
    .list-warp {
      width: 7.2rem;
      display: inline-block;
      margin: 0 auto;
      .list-flex {
        display: flex;
        width: 100%;
        .list-item {
          flex: 1;
          font-size: 0;
          padding: .05rem;
          > img {
            width: 100%;
            //height: 1.6rem;
          }
          > .nowP {
            font-family: PingFangSC-Medium;
            font-size: 0.3rem;
            color: #fb4874;
            letter-spacing: 0px;
            line-height: 100%;
            text-align: center;
            margin-top: 0.2rem;
            margin-bottom: 0.03rem;
          }
          > .oldP {
            font-family: PingFangSC-Regular;
            font-size: 0.28rem;
            color: #c2c2c2;
            letter-spacing: 0px;
            line-height: 0.3rem;
            text-align: center;
          }

        }
      }

    }

  }
</style>
