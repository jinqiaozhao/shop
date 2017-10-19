<template>
  <div class="box">
    <div class="integral-top">
      <router-link to="/integralHelp" class="text">
        <p>积分说明</p>
        <img class="text-img" src="../../assets/integral/sm.png" />
      </router-link>
      <div class="integralnum">
        <div class="sy">剩余积分:</div>
        <div class="num"><span>{{pro}}</span><span>积分</span></div>
      </div>
    </div>
    <div class="goto">
      <div class="going" @click="goout">
        <img src="../../assets/integral/goshoping.png" />
        <div class="gotext" @click="$router.push('/goodsItem/0');">去购物</div>
      </div>
      <div class="styleing"></div>
      <div class="going">
        <img src="../../assets/integral/goconversion.png" />
        <div class="gotext" @click="availableFunction()">去提现</div></div>
      <div class="styleing" style="left: 66%;"></div>
      <div class="going">
        <img src="../../assets/integral/ReceiptBill.png" />
        <div class="gotext" @click="availableFunction()">收费明细</div>
      </div>
    </div>

    <!-- <div class="X">该功能暂未开放，敬请期待</div> -->

    <div class="gain">
      <div class="gain-top">
        <div class="top-img" ><img src="../../assets/integral/credits.png" /></div>
        <div class="top-p">
          <span>轻松赚取积分</span>
        </div>
      </div>
      <div class="frame" v-for="d in datas"  v-show="d.isCollect">
        <div class="mission">
          <div class="item">
            <span>{{d.initem}}</span>
          </div>
          <div class="samll">
            <span class="samll">{{d.insamll}}</span>
          </div>
        </div>
        <div class="number">
          </span>+{{d.inumber}}</span>
        </div>
        <div @click="trygat(d)" class="execute" > <!-- execute -->
          <span>{{d.inexecute}}</span>
        </div>
      </div>
      <!-- show -->
      <div class="frame" style="background-color:#FFF;" v-for="d in datas"  v-show="d.isshow">
        <div class="mission">
          <div class="item">
            <span>{{d.initem}}</span>
          </div>
          <div class="samll">
            <span class="samll">{{d.insamll}}</span>
          </div>
        </div>
        <div class="number">
          </span>+{{d.inumber}}</span>
        </div>
        <div style="background-color: #676767;box-shadow: 4px 4px 6px #676767;" class="execute" > <!-- execute -->
          <span>{{d.isinexe}}</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script type="text/javascript">
  export  default {
    props:['sData'],
    props:['Url'],
    data(){
      return{
        hide:'',
        pro:'',
        index:'0',
        sign:false,
        sign0:false,
        datas:[
          {d:"0",initem:"注册领取",insamll:"限制领一次",inumber:"100",inexecute:"领取",isinexe:'已领取',isCollect:true,isshow:false},
          {d:"1",initem:"签到登录",insamll:"每日限制领一次",inumber:"10",inexecute:"签到",isinexe:'已签到',isCollect:true,isshow:false},
          // {d:"2",initem:"分享商品",insamll:"每日上限100积分",inumber:"20",inexecute:"分享",isinexe:'已分享',isCollect:true,isshow:false},
          //   {d:"3",initem:"购物",insamll:"每日限制领一次",inumber:"5",inexecute:"购物",isinexe:'已完成',isCollect:true,isshow:false},
          //  {d:"4",initem:"评价",insamll:"每日限制领一次",inumber:"5",inexecute:"完成",isinexe:'已完成',isCollect:true,isshow:false}
        ],
      }
    },
    created(){
      this.initgetPoints();
      this.getSigninStatus(this.datas[1]);
      this.updateSigninStatus(this.datas[1])
      this.getRegisterPointsValue(this.datas[0])
      //this.datas[0].isCollect = false;this.datas[0].isshow = true;

    },
    update(){
      this.initgetPoints();
    },
    methods:{
      availableFunction(){
        m$.template({
          val: '功能未开启<br>敬请期待',
          time: 500,
        })
      },
      getRegisterPointsValue(d){
        this.getAjax(this.url.getRegisterPointsValue,{},(res)=>{
        if(res.code == 200 && res.data == 0){
          this.sign0 = true;
        }else{
          d.isCollect = false;d.isshow = true;
        }
      })
      },
      getUserRegisterPoints(d){
        this.postAjax(this.url.getUserRegisterPoints,{},(res)=>{
          if(res.code == 200){
          if(this.sign0 == true){
            this.sign0 = false;d.isCollect = false;d.isshow = true;
            this.initgetPoints()
          }
        }
      })
      },
      getSigninStatus(d){
        this.getAjax(this.url.getSigninStatus,{},(res)=>{
          if(res.code == 200){
          if(res.data == "true"){
            d.isCollect = false;
            d.isshow = true;
            this.sign = false;
          }else{
            d.isCollect = true;d.isshow = false;this.sign = true;
          }
        }
      })
      },
      updateSigninStatus(d){
        if(this.sign == true){
          this.getAjax(this.url.updateSigninStatus,{},(res)=>{
            if(res.code == 200){
            d.isCollect = false;d.isshow = true;
            this.initgetPoints()
          }
        })
        }
      },
      getSigninStatusjudge(d){
        this.getAjax(this.url.getSigninStatus,{},(res)=>{
          if(res.code=='200'){
          d.isCollect = false;d.isshow = true;
        }
      })
      },
      initgetPoints(){
        this.postAjax(this.url.getPoints,{},(res)=>{
          if(res.code == 200){
          this.pro = res.data;
        }
      })
      },
      trygat(d){
        if(d.d=='0'){console.log('注册领取')
          this.getUserRegisterPoints(d);
        }
        if(d.d=='1'){this.updateSigninStatus(d);}
      },
      goout(){
        /*this.$router.push('/apply');*/
        /*window.location.href = (`#/apply/${id}`);*/
      },

    }
  }
</script>


<style  scoped lang="less">
  /*.X{
        font-family: "黑体";
        position: absolute;
        z-index: 9;
        left: 1.8rem;
        top: 5rem;
        font-size: .3rem;
        color:#FD4875;

    }
/*毛玻璃效果*/
  /*
   .gain{
          -moz-filter: blur(5px);
          -webkit-filter: blur(5px);
          -o-filter: blur(5px);
          -ms-filter: blur(5px);
          filter: blur(0px);

      }
  */
  /*.gatgoob{
        width: 5rem;
        height: 3rem;
        border: 1px solid red;
        background-color: #D94E6A;
        text-align: center;
        border-radius: .1rem;
        position: fixed;
        top: 4.5rem;
        left: 1.3rem;
        >span{
            margin: .7rem .1rem .9rem .1rem;
            font-size: .5rem;
            display: block;
        }
        .ok{
            z-index: 9;
            width: 1.6rem;
            height: .5rem;
            background-color: #FFF;
            margin: .1rem .1rem .1rem 1.7rem;
            font-size: .3rem;
            line-height: .5rem;
        }
    }
    */
  .gain-top{
    margin-top: .2rem;
    background-color: #FFF;
    height: .8rem;
    width:100%;
    .top-img{
      height: .8rem;
      img{
        float: left;
        width: .5rem;
        margin: .15rem .1rem;
      }
    }
    .top-p{
      margin: -.55rem 0 0 .8rem;
      font-size: .26rem;
      line-heigh:.6rem;
      font-weight:bold;
    }

  }

  .frame{
    margin-top: .02rem;
    background-color: #FFF;
    font-family:"黑体";
    .mission{
      float: left;
      padding: .25rem .2rem;
      width:55%;
      .item{
        font-size: .32rem;
        font-weight:500;
      }
      .samll{
        margin-top: .05rem;
        font-size: .23rem;
        color: #7B7B7B;
        line-height:.3rem
      }
    }
    .number{
      width: 22%;
      margin-top: .35rem;
      font-size: .3rem;
      color: #FD4875;
      float: left;
      font-weight:bold;
    }
    .execute{
      margin-top: .3rem;
      line-height:.55rem;
      text-align: center;
      border-radius: .07rem;
      float: left;
      color:#FFF;
      font-size: .32rem;
      height: .55rem;
      width: 1.4rem;
      background-color: #FD4875;
      box-shadow: 4px 4px 6px #FFB4CB;
    }

  }
  .frame:after{
    content:'';
    display: block;
    clear:both;
  }



  .integral-top{
    height: 3rem;
    color: #FFF;
    background-color: #FD4875;
    background-size: 8px 8px;

    .text{
      height: .5rem;
      width: 100%;
      float:right;
      img {
        float: right;
        height: .3rem;
        margin: .06rem -0.05rem;
      }
      p{
        border-bottom: 3px;
        float: right;
        font-size: .23rem;
        margin: .08rem;
      }
    }
    .integralnum{
      padding-top: .75rem;
      width: 100%;
      font-family:"黑体";
      .sy{
        margin-left: 2rem;
        font-size: .23rem;
      }
      .num{
        text-align: center;
        width: 100%;
        font-size: .95rem;
        margin-top: -.1rem;
        font-weight:500;
        >span:last-child{
          font-size: .5rem;
        }
      }
    }

  }


  .goto{
    font-family:"黑体";
    font-size: .3em;
    text-align:center;
    width: 100%;
    height: 1.7rem;
    background-color: #FFF;
    img {
      margin-top: .3rem;
      height: .6rem;
    }
    .gotext{
      margin-top: .15rem;
    }
    .going{
      width: 2.5rem;
      float: left;
      height: 1.7rem;
    }
    .styleing{
      position: absolute;
      top: 3.3rem;
      left: 33%;
      background-color: #ECECEC;
      width: .05rem;
      height: 1.2rem;
      z-index: 5;
    }

  }
</style>
