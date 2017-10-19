<template>
  <div class="box">
    <div class="banner00">
      <img src="../../assets/integral/bannerint.jpg" style="width: 100%; height: 2.5rem; float: left;" />
    </div>
    <div class="timesite">
      <div  class="blocks" @click="alerts(0)">
        <span class="spans" v-bind:class="{ 'spanclass': isActive==1 }" >早十点场</span>
        <span class="spanlast" v-if="spana">即将开始</span>
        <span class="spanlast" v-if="spanb" style="color:red">进行中</span>
      </div>
      <div  class="blocks" @click="alerts(1)">
        <span class="spans" v-bind:class="{ 'spanclass': isActive==2 }" >晚八点场</span>
        <span class="spanlast" v-if="spanx">即将开始</span>
        <span class="spanlast" v-if="spany" style="color:red">进行中</span>
      </div>
      <div  class="blocks" @click="alerts(2)">
        <span class="spans" v-bind:class="{ 'spanclass': isActive==3 }" >明日预告</span>
        <span class="spanlast" v-bind:class="{redclass}">即将开始</span>
      </div>
    </div>
    <div class="wire" v-bind:class="classObject" ></div>
    <div class="lump">
      <div class="main" v-for="(d,index) in productup" @click="goBuyup(d.productId)" >
        <!-- <div class="l-goshare"><img src="../../assets/prot.png" /></div> -->
        <div class="l-article-img">
          <img :src='d.thumbnail'/>
        </div>

        <div class="sold_out" v-if="d.quantity==0">
          <div style="color:#FF433D;">已售完</div>
          <div style="color:#FFF;margin-top:0.1rem;">SOLD OUT</div>
        </div>

        <div class="l-article-text">
          <div class="name" style="width: 3.4rem;margin-bottom: 0.1rem;"><span>{{d.productName}}</span></div>
          <div class="person">剩余数量: {{d.quantity/d.totalQuantity*100}}%</div>
          <div class="t-progres" style="margin: .1rem 0 .1rem 0;">
            <div class="t-progres-bar" ></div>
          </div>
          <div class="price" style="margin: .01rem; 0 0.05rem 0;"><span>￥</span><span style="color: #FA154E;">{{d.price}}</span><span>￥{{d.oldPrice}}</span></div>
          <div class="num"><span>返还积分: </span><span>{{parseInt(d.price*100)}}</span></div>
          <div class="car4">
            <img src="../../assets/car4.png">
          </div>
        </div>
      </div>
    </div>
    <div class="rail">
      <img src="../../assets/rail.png"  style="margin: .1rem .1rem 0 .1rem;float: left;width: 0.6rem;"/>
      <span style="float: left;margin-top: .2rem;font-size: .26rem;">更多商品</span>
    </div>
    <div class="article">
      <span style="clear:both ;"></span>
      <div class="list" v-for="(d,index) in productOnebefore" @click="goBuy(d.productId)" >
        <div class="article-img" @click="goBuy(d.productId)">
          <img :src='d.thumbnail'/>
        </div>

        <div class="sold_out" style="left: 0.22rem;top: 0.7rem" v-if="d.quantity==0">
          <div style="color:#FF433D;">已售完</div>
          <div style="color:#FFF;margin-top:0.1rem;">SOLD OUT</div>
        </div>

        <div class="article-text">
          <div class="name"><span>{{d.productName}}</span></div>
          <!-- <div class="person">已分享：5人</div> -->
          <div class="person">剩余数量: {{d.quantity/d.totalQuantity*100}}%</div>
          <div class="progres">
            <div class="progres-bar"></div>
          </div>
          <div class="price"><span>￥</span><span style="color: #FA154E;">{{d.price}}</span><span>￥{{d.oldPrice}}</span></div>
          <div class="num"><span>返还积分: </span><span>{{parseInt(d.price*100)}}</span></div>
        </div>
        <!-- <div class="goshare"><img src="../../assets/prot-to.png" /></div> -->
        <div class="schedule">
          <div class="nowshop" style="background-color: #FC4875; box-shadow: 4px 4px 6px #FC4875;" ><span>立即购买</span></div>
        </div>
      </div>
    </div>
  </div>

</template>


<script type="text/javascript">
  export  default {
    data(){
      return{
        hour:'',
        distancetimes:{hour:'00',minute:'00',second:'00'},
        e_index:0,
        redclass:'false',
        Starttime:'',
        times:'',
        isActive:'1',
        progres:'',
        goBuyups:false,//未开始不能购买的状态值
        productup:[],
        productZero:[],//未开始
        productOne:[],//正在进行中
        productOnetoday:[],//今天正在活动中
        productOnebefore:[],//今天之前还在活动中
        //productTwo:[],//已结束
        producttomorrow:[],//明天未开始
        producttNewomorrow:[],
        productnot:[],//今天未开始
        productmornnot:[],//未开始早十
        productlatenot:[],//未开始晚八
        productmorn:[],//早十
        productlate:[],//晚八
        groupType:'',
        spana:true,spanb:false,spanx:true,spany:false,
        classObject:{'classa':false,'classb':false,'classc':false},
        tomorrow:(new Date(new Date().getTime()+86400000)).toJSON().substring('0','10'),
        todays:(new Date().getTime()),
      }
    },
    created(){
      m$.documentTitle("积分商品")
      this.getIntegralresZero()
      this.getIntegralresOne()
      //this.getIntegralresTwo()
      this.alerts(0)
    },
    mounted(){
      this.getstate();
    },
    updated(){
      this.getstate();this.getstate();
      if(this.productup.length!='0'){
        var bar=document.getElementsByClassName('t-progres-bar')
        for(var i = 0;i<this.productup.length;i++){
          if(bar){
            bar[i].style.width=(this.productup[i].quantity/this.productup[i].totalQuantity*100)+'%';
          }else{}
        }
      }
      if(this.productOnebefore.length!='0'){
        var bar=document.getElementsByClassName('progres-bar')
        for(var i = 0;i<this.productOnebefore.length;i++){
          if(bar){
            bar[i].style.width=(this.productOnebefore[i].quantity/this.productOnebefore[i].totalQuantity*100)+'%';
          }else{}
        }
      }
    },
    watch: {
    },
    props: ['sData'],
    methods:{
      sek(){this.seks = false},
      getstate(){
        if(this.productmornnot!=''){this.spana =true;this.spanb =false;
        }else if(this.productmorn!=''){this.spanb =true;this.spana =false;
        }
        if(this.productlatenot!=''){this.spanx =true;this.spany =false;
        }else if(this.productlate!=''){this.spany =true;this.spanx =false;
        }
      },
      getIntegralresZero(){
        this.postAjax(this.url.getIntegralres,{
          status:0
        },(res)=>{
          if(res.code==200){
          if(res.data.data.length>1){
            for(var i=0;i<res.data.data.length;i++){
              this.productZero.push(res.data.data[i])
            }
          }else{
            this.productZero=res.data.data;
          }
          for(var i=0;i<this.productZero.length;i++){
            if(this.productZero[i].gmtStart.substring('0','10')==this.tomorrow){/*明天未开始的商品*/
              this.producttomorrow.push(this.productZero[i])
            }
            if(this.productZero[i].gmtStart.substring('0','10')==this.productZero[i].currentDate.substring('0','10')){/*今天未开始*/
              this.productnot.push(this.productZero[i])
            }
            /*this.productGroup[0].productZreo=this.productZreo*/
          }
          for(var i=0;i<this.producttomorrow.length;i++){
            for(var j=0;j<this.producttomorrow[i].detailVos.length;j++){
              this.producttNewomorrow.push(this.producttomorrow[i].detailVos[j]);
            }
          }
          for(var i=0;i<this.productnot.length;i++){
            if(this.productnot[i].gmtStart==this.productnot[i].currentDate.substring('0','10')+" 10:00:00"){//今天早十点未开始
              for(var j=0;j<this.producttomorrow[i].detailVos.length;j++){
                this.productmornnot.push(this.productnot[i].detailVos[j])
              }
            }else if(this.productnot[i].gmtStart==this.productnot[i].currentDate.substring('0','10')+" 20:00:00"){//今天晚八点未开始
              for(var j=0;j<this.productnot[i].detailVos.length;j++){
                this.productlatenot.push(this.productnot[i].detailVos[j])
              }
            }
          }
        }
      })
      },
      getIntegralresOne(){
        this.postAjax(this.url.getIntegralres,{
          status:1
        },(res)=>{
          if(res.code==200){
          if(res.data.data.length>1){
            for(var i=0;i<res.data.data.length;i++){
              this.productOne.push(res.data.data[i])
            }
          }else{
            this.productOne=res.data.data;
          }
          for(var i=0;i<this.productOne.length;i++){
            if(this.productOne[i].gmtStart.substring('0','10')==this.productOne[i].currentDate.substring('0','10')){/*今天的商品*/
              this.productOnetoday.push(this.productOne[i])
            }else{
              for(var j=0;j<this.productOne[i].detailVos.length;j++){/*今天以前还在活动中的全部商品*/
                this.productOnebefore.push(this.productOne[i].detailVos[j])
              }
            }
          }
          for(var i=0;i<this.productOnetoday.length;i++){
            if(this.productOnetoday[i].gmtStart==this.productOnetoday[i].currentDate.substring('0','10')+" 10:00:00"){//当天早十点
              for(var j=0;j<this.productOnetoday[i].detailVos.length;j++){
                this.productmorn.push(this.productOnetoday[i].detailVos[j])
              }
            }else if(this.productOnetoday[i].gmtStart==this.productOnetoday[i].currentDate.substring('0','10')+" 20:00:00"){//当天晚八点
              for(var j=0;j<this.productOnetoday[i].detailVos.length;j++){
                this.productlate.push(this.productOnetoday[i].detailVos[j])
              }
            }
          }
        }else{

        }
      })
      },
      getdistancetimes(times){

      },
      /* countdowm(){
       //distancetimes:{hour:'00',minute:'00',second:'00'},
      this.distancetimes = setInterval(function(){
         var nowTime = new Date();
         var escTime = new Date().setHours('10','00','00','00');
         var Times = 36000000-(nowTime - escTime);
         console.log(Times)
         this.hour=Math.floor((Times/3600000)%24);
         console.log(this.hour)
           var hour=Math.floor((Times/3600000)%24);
           var min=Math.floor((Times/60000)%60);
           var sec=Math.floor((Times/1000)%60);
           hour = hour < 10 ? "0" + hour : hour;
           min = min < 10 ? "0" + min : min;
           sec = sec < 10 ? "0" + sec : sec;
           console.log(hour,min,sec,escTime)
           var format = '';
          },1000);
         },*/
      goBuyup(id){
        if(this.goBuyups ==true){//未开始 不能跳转
          m$.template({
            val: '活动未开始',
            time: 500,
          })
        }else{
          m$.sessionStores.set('Applyindex',{indexid:this.e_index,pageScrollPosition:window.scrollY})
          window.location.href = (`#/goodsDetail/${id}`);
        }
      },
      goBuy(id){
        m$.sessionStores.set('Applyindex',{indexid:this.e_index,pageScrollPosition:window.scrollY})
        window.location.href = (`#/goodsDetail/${id}`);
      },
      alerts(e,index){
        this.classObject.classa=false;this.classObject.classb=false;this.classObject.classc=false;
        if(e=='0'){		 /*早十点*/
          this.isActive='1';this.classObject.classa=true;
          if(this.productmornnot!=''){
            this.productup = this.productmornnot//未开始
            this.goBuyups = true;
          }else{
            this.productup = this.productmorn//已开始
            this.goBuyups = false;
          }
        }else if(e=='1'){/*晚八点*/
          this.isActive='2';this.classObject.classb=true;
          if(this.productlatenot!=''){
            this.productup = this.productlatenot//未开始
            this.goBuyups = true;
          }else{
            this.productup = this.productlate//已开始
            this.goBuyups = false;
          }
        }else if(e=='2'){/*明日预告*/
          this.isActive='3';this.classObject.classc=true;
          this.productup = this.producttNewomorrow
          this.goBuyups = true;
        }
      }
    }
  }
</script>


<style scoped lang="less">

  /*弹框*/
  .time{
    .times{
      font-size: .6rem;
      background-color: #EF3561;
      color: #FFF;
      border-radius: 6px;
      border: 1px solid red;
      width: 1rem;
      height: .8rem;
      display: inline-block;
      line-height: .8rem;
    }
  }
  .sek{
    position: fixed;
    top: 0;
    width: 7.5rem;
    height: 15rem;
    overflow:hidden;
    .sek-box{
      //box-shadow: 4px 4px 6px #FC4875;
      font-size: .35rem;
      text-align: center;
      margin: 50% auto;
      background: rgba(0,0,0,0.5);
      width: 5.5rem;
      height: 1.5rem;
      border-radius: 6px;
      span{
        //color: #E8063C;
        color:#FFF;
        line-height: 1.5rem;
      }
    }
  }


  /****/





  .sold_out{
    text-align: center;
    top: 1rem;
    left: 0.8rem;
    position: absolute;
    margin: 0 auto;
    width: 2rem;
    font-size: 0.3rem;
    border: 1px solid #000;
    border-radius: 1rem;
    padding: 0.1rem;
    background: rgba(0,0,0,0.3);
  }

  .spans{
    color: #000000;
    font-weight: 900;
    font-size:.32rem;
  }
  .spanclass{
    color: red;
  }
  .redclass{
    color:red;
  }

  /* top整合 */
  .wire{
    width: 1.3rem;
    height: .05rem;
    background-color: #E7607C;
    border-radius: 6px;
    position: absolute;
    top:4rem;
    left: 0.58rem;
    -webkit-transition: 0.3s linear;
  }
  .classa{
    left: 0.58rem;
    color: red;
  }
  .classb{
    left: 3.1rem;
    color: red;
  }
  .classc{
    left:5.6rem;
  }

  .timesite{
    width: 100%;
    font-size: .3rem;
    height: 1.4rem;
    position: relative;
    margin-bottom:.3rem;
    .blocks{
      margin-right: .01rem;
      width: 2.49rem;
      height: 1.6rem;
      float: left;
      background-color: #FFF;
      text-align: center;
      padding:.4rem .4rem 0 .4rem;

      >span{
        display: block;
      }
      .spanlast{
        margin-top: .12rem;
        display: block;
        /*display:inline-block;*/
        font-size: .25rem;
        color:#D3D3D3;
      }
    }
  }

  /*共用*/
  .box{
    font-family: "黑体";
  }
  .person{
    color:#FB3867;
    font-size: .23rem;
  }
  .price {
    font-family: FZYaoti;
    margin: .05rem 0 0.05rem 0;
    font-size: .28rem;
    color: #FD4875;
    letter-spacing: 1px;
    >span:last-child{
      text-decoration:line-through;
      margin-left: 0.1rem;
      font-size: .15rem;
      color: #898989;
    }
  }
  .num {
    max-width:100%;
    letter-spacing: 1px;
    float: left;
    font-size: .25rem;
    margin-top: .1rem;
    >span:last-child{
      color:#FC4875;
    }
  }
  .name {
    color: #000000;
    margin:0 0 0.2rem 0;
    width: 4.2rem;
    height: .35rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    min-height: .25rem;
    font-size: .28rem;
  }
  /* -------- */


  /*进度条*/
  .progres {
    border-radius: 6px;
    margin:.14rem 0 .1rem 0;
    width: 2.6rem;
    padding: 1px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    /*-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
        */
  }
  .progres-bar {
    border-radius: 6px;
    background: -webkit-linear-gradient(left, #FE946D , #FA2456);
    position: relative;
    height: 4px;
    -webkit-transition: 0.4s linear;
    -moz-transition: 0.4s linear;
    -o-transition: 0.4s linear;
    transition: 0.4s linear;
    -webkit-transition-property: width, background-color;
    -moz-transition-property: width, background-color;
    -o-transition-property: width, background-color;
    transition-property: width, background-color;
    /*-webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);*/

  }

  .t-progres {
    border-radius: 6px;
    margin:.14rem 0 .1rem 0;
    width: 2.6rem;
    padding: 1px;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    /*-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
        */
  }
  .t-progres-bar {
    border-radius: 6px;
    background: -webkit-linear-gradient(left, #FE946D , #FA2456);
    position: relative;
    height: 4px;
    -webkit-transition: 0.4s linear;
    -moz-transition: 0.4s linear;
    -o-transition: 0.4s linear;
    transition: 0.4s linear;
    -webkit-transition-property: width, background-color;
    -moz-transition-property: width, background-color;
    -o-transition-property: width, background-color;
    transition-property: width, background-color;
    /*-webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);*/

  }
  /* ---------- */

  /* 四个展示页 */
  .lump:after{
    content:'';
    display: block;
    clear:both;
  }
  .lump{
    clear: both;
    display: block;
    /*overflow:hidden;*/
    .main{
      position:relative;
      float: left;
      margin: 0 .02rem 0 .02rem;
      background-color: #FFF;
      margin-bottom: 0.1rem;
      .car4{
        float: right;
        width: 0.5rem;
        height: 0.5rem;
        img{
          -moz-transform:scaleX(-1);
          -webkit-transform:scaleX(-1);
          -o-transform:scaleX(-1);
          transform:scaleX(-1);
          margin-bottom: 0.5rem;
          width: 0.4rem;
        }
      }
      .l-article-img {
        height: 3.7rem;
        width: 3.7rem;
        border-radius: 5px;
        img {
          width: 3.7rem;
        }
      }
      .l-goshare{
        margin:0.15rem 2.95rem;
        position: absolute;
        float:right;
        width: .5rem;
        height: .5rem;
        background-color: rgba(0,0,0,.4);
        >img {
          margin-left: 0.02em;
          position: absolute;
          z-index: 10;
          height: .5rem;
        }
      }
      .l-article-text {
        min-width: 100%;
        padding: 0 0 .01rem .15rem;
        float: left;
        color: #474747;
        letter-spacing: .8px;
      }
    }
  }

  /* --------- */

  /* 展示列表 */
  .article{
    .list:after{
      content:'';
      display: block;
      clear:both;
    }
    .list {
      position:relative;
      margin-bottom: 0.02rem;
      width: 7.5rem;
      background-color: #FFF;
      .article-img {
        float: left;
        background: #fff;
        margin: 0.1rem .1rem 0 .05rem;
        height: 2.4rem;
        width: 2.4rem;
        border-radius: 6px;
        img {
          width: 2.4rem;
          border-radius: 7px;

        }
      }
      .article-text {
        margin: .28rem 0 .1rem .15rem;
        float: left;
        color: #474747;
        letter-spacing: .8px;
      }
      .goshare{
        float:left;
        margin: .12rem 0 .1rem .2rem;
        width: .55rem;
        height: .55rem;
        img{
          margin-bottom:0.5rem ;
        }
      }
    }

  }

  .schedule{
    width: 100%;
    margin-top:-.2rem;
    height: .32rem;
    float:left;
    .nowshoptwo{
      color: red;
    }
    .nowshop {
      font-family: STXihei;
      position: relative;
      top: -.38rem;
      left: 5.9rem;
      text-align: center;
      color: #FFF;
      font-size: .3rem;
      width: 1.4rem;
      height: .5rem;
      background-color: #FC4875;
      border-radius: 5px;
      box-shadow: 4px 4px 6px #FFB5CB;
      >span{
        margin-top:0.9rem ;
      }
    }
  }

  /* -------------- */
  .rail{
    margin-top: .1rem;
    height: .76rem;
    width: 100%;
    background-color: #FFF;
    font-size: .35rem;
    overflow: hidden;
  }
  .banner00:after{
    content:'';
    display: block;
    clear:both;
  }


</style>


