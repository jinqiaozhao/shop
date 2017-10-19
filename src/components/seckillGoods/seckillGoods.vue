<template>
  <div id="box">
    <router-link class="car-Img" to="/productCar" tag="div" v-if="newChangeYangbinCode">
      <img src="../../assets/car3.png"/>
      <span class="car-number" :class="{'car-number-more':carNumber=>99}" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'"></span>
    </router-link>
    <div class="fix">
      <div class="seckill-product-timeline">
        <div class="timeline " :class='{bg:(thisDate>=item.gmtStart&&thisDate<item.gmtEndF)}' v-for='(item,ind) in navTimeLine'>
          <p v-text='item.gmtStart+":00"'>08:00</p>
          <p v-if='thisDate>=item.gmtStart&&thisDate<item.gmtEndF'>已开场</p>
          <p v-if='thisDate<item.gmtStart'>未开场</p>
          <p v-if='thisDate>=item.gmtEndF'>已结束</p>
        </div>
      </div>
      <div id="seckill-product-countdown">
        <div class="countdown left">疯狂限时秒杀中</div>
        <div class="countdown right" v-if='time'>
          <span>距离秒杀结束</span>
          <span>{{time}}</span>
        </div>
      </div>
    </div>
    <div id="seckill-product-details">

      <div class="seckill-space"></div>

      <div class="product" v-for='item in seckillData.detailVos' @click="goGoodsDetail(item)">
        <div class="product-com product-img">
          <img
            :src="item.thumbnail">
        </div>
        <div class="product-com product-details">
          <section>
            <p class="product-details-name">{{item.productName}}</p>
            <div class="product-details-info">{{item.digest}}</div>
          </section>

          <div class="product-details-price">
            <span>￥ </span>
            <span class="big-price">{{item.price}}</span>
            <span class="del-price">￥<s>{{item.oldPrice}}</s></span>
          </div>
          <div class="product-details-amount">
            <div class="amount">
              <span v-if='item.gmtFinishTime' v-text="item.gmtFinishTime+'抢光'+item.totalQuantity+'件商品'"></span>
              <span v-if='(item.quantity/item.totalQuantity)>0' class="progress " :class='{"progress-full":(item.quantity/item.totalQuantity)==1}'><i :style="{width : (item.quantity/item.totalQuantity)*100+'%'}"><span>{{((item.quantity/item.totalQuantity)*100).toFixed(0)+'%'}}</span></i></span>
            </div>
            <div class="button">
              <button v-if='(item.quantity/item.totalQuantity)==0' class="fl-button" @click="goGoodsDetail(item)">抢光了</button>
              <button v-if='(item.quantity/item.totalQuantity)>0' class="tr-button" @click="goGoodsDetail(item)">去秒杀</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="less" scoped>
  .car-Img {
    position: fixed;
    bottom: 1rem;
    right: 0.3rem;
    height: 0.6rem;
    width: 0.6rem;
    z-index: 3;
    cursor: pointer;
    > img {
      width: 100%;
      height: 100%;
    }
    .car-number {
      background-color: #fb4874;
      display: inline-block;
      border-radius: 0.15rem;
      vertical-align: bottom;
      line-height: 0.3rem;
      padding: 0 0.05rem;
      font-size: .12rem;
      height: 0.3rem;
      min-width: 0.30rem;
      _width: 0.3rem;
      color: #ffffff;
      position: absolute;
      left: 0.26rem;
      top: -0.05rem;
      margin-left: 0.05rem;
    }
    .car-number-more {
      padding: 0 0.08rem;
    }
  }
  #box {
    .fix {
      position: fixed;
      top: 0;
      z-index: 233;
    }
    .seckill-space {
      height: 1.56rem;
    }
  }

  .seckill-product-timeline {
    font-family: PingFangSC-Regular;
    background: #474747;
    height: .9rem;
    box-sizing: border-box;
    display: flex;
    .timeline {
      height: .9rem;
      font-size: .28rem;
      color: #e7e7e7;
      line-height: .28rem;
      text-align: center;
      flex: 150;
      > p {
        margin-top: .1rem;

      }
    }
    .bg {
      background-color: #fb4874;
      font-size: .3rem;
    }
  }

  #seckill-product-countdown {
    margin-bottom: .2rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    display: flex;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    width: 7.50rem;
    height: .66rem;
    .countdown {
      flex: 1;
      color: #fb4874;
      letter-spacing: .02rem;
      line-height: .3rem;
    }
    .left {
      font-size: .3rem;
      padding-top: .18rem;
      border-left: .1rem solid #fb4874;
      padding-left: .1rem;
    }
    .right {
      font-size: .24rem;
      text-align: right;
      padding-right: .2rem;
      padding-top: .21rem;
      color: #787878;
    }
  }

  #seckill-product-img {
    width: 100%;
    height: 3rem;

    img {
      font-size: 0;
      width: 100%;
      height: 100%;
    }
  }

  #seckill-product-details {
    .product {
      font-family: PingFangSC-Regular;
      width: 7.5rem;
      margin-top: .1rem;
      background: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
      height: 2.80rem;
      display: flex;
      padding: .1rem;
      .product-com {
        >section{
          p{
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
        }
      }
      .product-img {
        flex: 260;
        width: 2.6rem;
        height: 2.6rem;
        img{
          max-height: 2.6rem;
          max-width: 2.6rem;
        }
      }
      .product-details {
        flex: 490;
        padding-left: .2rem;
        section{
          height:1.16rem ;
        }
        .product-details-name {
          margin-top: .18rem;
          font-size: .3rem;
          color: #474747;
          letter-spacing: 1.73px;
          line-height: .3rem;
          min-height: .3rem;
          _height: .3rem;
        }
        .product-details-info {
          margin-top: .1rem;
          max-height: .64rem;
          font-size: .26rem;
          color: #868686;
          letter-spacing: .01rem;
          line-height: .32rem;
        }
        .product-details-price {
          height: .48rem;
          min-height: .48rem;
          font-size: .24rem;
          // margin-top: .21rem;
          span {
            color: #fb4874;
          }
          .big-price {
            font-size: .48rem;
            letter-spacing: .02rem;
            line-height: .48rem;
          }
          .del-price {
            color: #9a9a9a;
          }
        }
        .product-details-amount {
          height: .54rem;
          display:flex;
          margin-top: .1rem;
          .amount {
            flex: 320;
            font-size: .24rem;
            // line-height: .54rem;
            color: #b0aeae;
            position: relative;
            >span{
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              -webkit-transform: translateY(-50%);
              -o-transform: translateY(-50%);
              -moz-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
              transform: translateY(-50%);
            }
            letter-spacing: .02rem;
            .progress {
              background: #ececec;
              display: inline-block;
              width: 2.2rem;
              height: .2rem;
              //position: relative;
              border-radius: .1rem;
              > i {
                display: inline-block;
                height: .2rem;
                background: #fb4874;
                z-index: 3;
                position: absolute;
                border-top-left-radius: .1rem;
                border-bottom-left-radius: .1rem;
                > span {
                  height: .2rem;
                  line-height: .2rem;
                  font-size: .24rem;
                  position: absolute;
                  right: -.75rem;
                  top: 0.03rem;
                }
              }

            }
            .progress-full{
              >i{
                border-radius: .1rem;
              }
            }
          }
          .button {

            flex: 150;
            font-size: 0;
            //line-height: .54rem;
            > button {
              font-size: .24rem;
              width: 1.4rem;
              height: .54rem;
              margin-right: .1rem;
              border-radius: .06rem;
            }
            .fl-button {
              background: #e0e0e0;
              color: #b1b1b1;
            }
            .tr-button {
              background: #fb4874;
              color: #fff;
            }
          }

        }
      }
    }
  }
</style>
<script type="text/javascript">

  export default{
    props: ["sData"],
    data(){
      return {
        ww: '10%',
        active: 1,
        navData: [
          {time: '08:00', text: '已开场', active: false},
          {time: '12:00', text: '已开场', active: false},
          {time: '18:00', text: '已开场', active: true},
          {time: '22:00', text: '已开场', active: false},
          {time: '00:00', text: '已开场', active: false},
        ],

        navTimeLine:[],
        seckillData: [],
        time: '',
        timer: '',
        progress:'',
        carNumber:'',
        thisDate:(new Date()).getHours()
      }
    },
    components: {},
    methods: {
      getCarNumber(){
        this.getAjax(this.url.isLogged,{},(res)=>{
          if(res.code==200&&res.data==true){
          this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
            if(res.code=200){
            this.carNumber = res.data
          }
        });
        }
      })
      },
      getData(){
        this.seckillData=[];
        this.postAjax(this.sData.url.getProductGroupShopVo, {
          status: 1,
          groupType: 1,
        }, (res) => {
          if (res.code == 200&&res.data.data[0]) {
          // console.log(res)
          this.seckillData = res.data.data[0];
          if(m$.sessionStores.get('originListGoodsItem')){
            setTimeout(function () {
              window.scrollTo(0,m$.sessionStores.get('originListGoodsItem').pageScrollPosition)
            },50)
          }
          // console.log(this.seckillData.currentDate)
          var currentDate = new Date(this.seckillData.currentDate.replace(
            /\-/g,'/'));
          var gmtEnd = new Date(this.seckillData.gmtEnd.replace(
            /\-/g,'/'));
          var gmtStart = new Date(this.seckillData.gmtStart.replace(
            /\-/g,'/'));
          var time = (gmtEnd.getTime() - currentDate.getTime()) / 1000;
          var detailVos=this.seckillData.detailVos;
          for(var i=0, len=detailVos.length;i<len;i++){
            //获得 秒杀结束时间
            var gmtFinishTime='';
            var gmtFinish="";
            if(detailVos[i].gmtFinish){
              gmtFinish=new Date(detailVos[i].gmtFinish.replace(
                /\-/g,'/'));
              var t=(gmtFinish.getTime()-gmtStart.getTime())/1000;
              var theTime = parseInt(t);// 秒
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
              var result = "" + parseInt(theTime)+"秒";
              if (theTime1 >= 0) {
                result = "" + parseInt(theTime1) + "分" + result;
              }
              if (theTime2 >= 0) {
                result = "" + parseInt(theTime2) + "时" + result;
              }
              gmtFinishTime = result
            }
            detailVos[i].gmtFinishTime=gmtFinishTime
            console.log(detailVos[i])
          }

          var _this = this;
          _this.timer = setInterval(function () {
            time--;
            if(time==0){
              clearInterval(_this.timer);
              _this.time='00:00:00'
            }
            _this.formatSeconds(time);
          }, 1000)
          // console.log(this.seckillData)
        }
      })
      },
      getNavTime(){
        this.getAjax(this.sData.url.getGroupBannerDate,{},(res)=>{
          for(var i=0;i<res.data.length;i++){
          (res.data)[i]['gmtEndF']=res.data[i].gmtEnd;
          if(res.data[i].gmtEnd=='00'){
            (res.data)[i]['gmtEndF']='24';
          }

        }
        this.navTimeLine = res.data
      })
      },
      goGoodsDetail(item){
        m$.localStrages.set('item',item);
        m$.sessionStores.set('originListGoodsItem',{pageNum:'',productData:this.productData,pageScrollPosition:window.scrollY})
        window.location.href = (`#/goodsDetail/${item.productId}`)
      },
      formatSeconds(value){
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
        this.time = result
      }
    },
    created(){
      this.getCarNumber();
      this.getData();
      this.getNavTime()
    },
    beforeRouteEnter(to,from,next){
      var originListGoodsItem=m$.sessionStores.get('originListGoodsItem')
      if(from.name=="goodsDetail"){
        next()
      }
      else {
        m$.sessionStores.remove('originListGoodsItem');
        next()
      }
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
</script>
