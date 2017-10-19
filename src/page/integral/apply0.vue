<template>
  <div class="point_wrap">
    <div class="banner"></div>
    <div class="timesite">
      <div id="in_wrap">
        <div class="blocks" @click="alerts('10')">
          <span class="spans" v-bind:class="{ 'spanclass': isActive==1 }" >早十点场</span>
          <span class="spanlast" v-text="status[0]"></span>
        </div>
        <div class="blocks"  @click="alerts('20')">
          <span class="spans" v-bind:class="{ 'spanclass': isActive==1 }" >晚八点场</span>
          <span class="spanlast" v-text="status[1]"></span>
        </div>
        <div class="blocks"  @click="alerts('0')">
          <span class="spans" v-bind:class="{ 'spanclass': isActive==1 }" >明日预告</span>
          <span class="spanlast" v-text="status[2]"></span>
        </div>
        <div class="active_bar"></div>
      </div>
      <div class="pro_wrap" v-if="">
        <div v-for="" class="t_product">
          <div class="sold_out">
            <div style="color:#FF433D;">已售完</div>
            <div style="color:#FFF;margin-top:0.1rem;">SOLD OUT</div>
          </div>
          <img src="" alt=""  class="t_img">
          <div class="t_content">
            <div class="t_title" v-text="">日本进口黑科技</div>
            <div class="t_amount" v-text="">
              <div style="width:widths;" id="progress"></div>
            </div>
            <div class="t_price" v-text="">
              <span>￥</span>
              <span v-text=""></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export  default {
    data(){
      return{
        ind:'',
        status:[],
        widths:'',
        isActive:'',
        productTest:[],
        productGroup:[
          {
          product:[],//早10点
        },
          {
            product:[],//晚8点

          },{
            product:[],
          }
          ],
        productGroupOther:[],
        productZreo:[],
        productZreoTime:'',
        productZreoDay:'',
        productOne:[],
        productOneTime:'',
        productOneDay:'',
      }
    },
    watch(){

    },
    created(){
      m$.documentTitle("积分商品")
    //  this.getIntegralresZero();
    //  this.getIntegralresOne();
      this.getCurTime();
    },
    updated(){

     // var wrap=document.getElementById('in_wrap')
    //  wrap.style.width=(this.productOne.length+this.productTwo.length+this.productZreo.length)*2.5+'rem';
     // console.log('a')
    },
    watch: {
    },
    props: ['sData'],
    methods:{
      alerts(key){
        var date = new Date();
        var month=date.getMonth();
        if(month<10){month='0'+(month+1);}else{month=month+1;}
        var day= date.getDate();
        if(day<10){day='0'+month;}else{day=day;}
        var hours= date.getHours();
        var newday=month+day;
        this.getIntegralresZero(newday,key);

      },
      getCurTime(){
        var date = new Date();
        var month=date.getMonth();
        if(month<10){month='0'+(month+1);}else{month=month+1;}
        var day= date.getDate();
        if(day<10){day='0'+month;}else{day=day;}
        var hours= date.getHours();
        var newday=month+day;
        //获取页面显示
        if(hours>10 && hours<22){
          this.status[0]='抢购中';
          this.status[1]='未开始';
          this.status[2]='即将开抢';
          this.ind=1;
        }else if(hours<10 && hours>0){
          this.status[0]='未开始';
          this.status[1]='未开始';
          this.status[2]='即将开抢';
          this.ind=0;
        }else{
          this.status[0]='抢购中';
          this.status[1]='抢购中';
          this.status[2]='即将开抢';
          this.ind=0;
        }
      // this.getIntegralresZero(newday,hours);
        //this.getIntegralresElse(newday,hours)
      },
      getIntegralresZero(curtime,hour){
        this.postAjax(this.url.getIntegralres,{
          groupType:4,pageNum:1,pagerSize:10
        },(res)=>{
          if(res.code==200){
          if(res.data.data.length>0){

              for(var i=0;i<res.data.data.length;i++){
                this.productZreoDay=(res.data.data[i].gmtStart.slice(5,7)+res.data.data[i].gmtStart.slice(8,10));
                this.productZreoTime=res.data.data[i].gmtStart.slice(11,13)
                console.log(res.data.data[i].gmtStart);
                if(this.productZreoDay==curtime && this.productZreoTime=='10'){

                  for(var j=0;j<res.data.data[i].detailVos.length;j++){
                    this.productGroup[0].product.push(res.data.data[i].detailVos[j])

                    this.productTest.push(res.data.data[i].detailVos[j])
                  }
                }
                if(this.productZreoDay==curtime && this.productZreoTime=='20'){

                  for(var j=0;j<res.data.data[i].detailVos.length;j++) {
                    this.productGroup[1].product.push(res.data.data[i].detailVos[j])

                    this.productTest.push(res.data.data[i].detailVos[j])
                  }
                };console.log(parseInt(this.productZreoDay))
                if(parseInt(this.productZreoDay)==parseInt(curtime)+1){

                  for(var j=0;j<res.data.data[i].detailVos.length;j++) {
                    this.productGroup[2].product.push(res.data.data[i].detailVos[j])
                    this.productTest.push(res.data.data[i].detailVos[j])
                  }
                }
              }
//              console.log(this.productGroup[0].product)
//            console.log(this.productGroup[1].product)
//            console.log(this.productGroup[2].product)
            console.log(this.productTest)
          }else{

          }
        }
        })
      },
      getIntegralresElse(curtime,hour){
        this.postAjax(this.url.getIntegralres,{
          status:1
        },(res)=>{
          if(res.code==200){
          if(res.data.data.length>0){
            for(var i=0;i<res.data.data.length;i++){
              this.productOneDay=(res.data.data[i].gmtStart.slice(5,7)+res.data.data[i].gmtStart.slice(8,10));
              if(this.productOneDay!=curtime ){
                for(var j=0;j<res.data.data[i].detailVos.length;j++) {
                this. productGroupOther.push(res.data.data[i].detailVos[j]);
                }
              }
            }
            console.log(this.productGroupOther)

          }else{

          }
        }
      })
      },
    }
  }
</script>
<style scoped lang="less">
  .point_wrap{
    background:#F7D8BF;
    .banner{
      width: 100%;
      height:2.5rem;
    }
    .timesite{
      width: 100%;
      #in_wrap{
        width: 100%;
        height: 1.6rem;
        .blocks:after{
          content:'';
          display: block;
          clear:both;
        }
        .blocks{
          font-size: .3rem;
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
      .pro_wrap{
        width: 100%;
        .t_product{
          position:relative;
          width:50%;
          box-sizing: border-box;
          border:1px solid #000;
          padding:0.1rem;
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
          .t_img{
            width: 100%;
            height:2.8rem;
            border:1px solid #000;
          }
          .t_content{
            .t_title{
              font-size: 0.3rem;
              padding:0.1rem 0;
            }
            .t_amount{
             color:#FB4874;
              text-align: center;
              border:1px solid #FB4874;
              border-radius: 5px;
              font-size: 0.1rem;
              padding:0.01rem;
              >div{
                border:1px solid transparent;
                height: 0.2rem;
                border-radius: 5px;
              }
            }
            .t_price{
              font-weight:bold;
              color:#FB4874;
              padding:0.1rem 0;
              font-size: 0.32rem;
            }
          }
        }
      }
    }
  }
</style>


