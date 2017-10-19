<template>
    <div id="decorate-order">
            <cake-nav :navData="sData.decorateOrderNav" class='de-nav'></cake-nav>
            <div class="space"></div>
          <div class='order-item' v-for='(iii,indexs) in carOrder'>
            <div class='order-item-title'>
             <p class="title-left" v-text="'订单号:'+iii.orderNo"></p>
             <p class="title-right" v-text="'合同金额:￥'+iii.totalAmount"></p>
            </div>
            <div class='order-item-progress'>
              <div class="progress-box" id="progress-box">
                <div  :class="{progress:item.status==1,endProgress:item.status==2,endProgress1:item.status==3}" v-for='(item,ind) in iii.phases'> <span :class='{noneLine:ind==4}'>{{ind+1}}</span><p>{{item.name}}</p></div>
                <!--<div :class="{progress:0}"><span class="none-line">5</span><p></p></div>-->
              </div>
            </div>
            <div class="order-item-acceptance" v-if='iii.phases[iii.ss].status==1'>
              <div class="acceptance-text">当前验收进度</div>
              <button class="acceptance-button" :class="{'acceptance-active':0}" @click="upData(iii,0)">不同意</button>
              <button class="acceptance-button" :class="{'acceptance-active':1}" @click="upData(iii,1)">同意</button>
            </div>
            <div class='order-item-acceptance' v-if='iii.phases[iii.ss].status==2'>
              <span>进度验收为不同意，等待装修公司再次提交！</span>
            </div>
          </div>
    </div>
</template>
<script type="text/javascript">
    import cakeNav from "src/components/com/nav/nav.vue";
    export default{
    props:['sData'],
        data(){
            return{
                carOrder:[],
            }
        },
        components:{
            cakeNav
        },
        methods:{
            verifiDcrOrder(id,boo){
                //boo为是否通过的传值
                if(boo){
                    boo = true
                }else {
                    boo = false
                }
                this.postAjax(this.sData.url.verifiDcrOrderUrl,{id:id,isPass:boo,remark:''},(res)=>{
                    this.listDcrOrder(this.$route.params.id);
                })
            },
            listDcrOrder(status){
                this.carOrder.splice(0,this.carOrder.length);
                this.postAjax(this.sData.url.listDcrOrderUrl,{pageNum:'1',pageSize:'10',completeStatus:status},(res)=>{
                    for (var i=0;i<res.data.length; i++){
                        var obj={};
                        obj.orderNo    =res.data[i].orderNo;
                        obj.totalAmount=res.data[i].totalAmount;
                        obj.phases     =res.data[i].phases;
                        obj.ss=4;
                        var btn=true;
                        for(var ii=0; ii<res.data[i].phases.length;ii++){
                            obj.phases[ii].id=res.data[i].phases[ii].id;
                            obj.phases[ii].name=res.data[i].phases[ii].name;
                            obj.phases[ii].status=res.data[i].phases[ii].status;

                            // if(res.data[i].phases[4].status==1){
                            //     obj.ss = 4
                            // }
                            // if(res.data[i].phases[4].status==2){
                            //     obj.ss = 4
                            // }
                            // if(res.data[i].phases[4].status==3){
                            //     obj.ss = 4
                            // }
                            // if(res.data[i].phases[ii].status==0){
                            //     obj.ss = ii-1;
                            // }
                            // if(res.data[i].phases[0].status==1){
                            //     obj.ss = 0
                            // }
                            // if(res.data[i].phases[0].status==2){
                            //     obj.ss = 0
                            // }
                            if(res.data[i].phases[ii].status==0&&btn){
                                obj.ss = ii-1;
                                btn=false;
                                if(obj.ss==-1){
                                    obj.ss = 0
                                }
                            }
                        }
                        this.carOrder.push(obj)
                        // console.log(this.carOrder[i].ss)
                    }


                })
            },
            upData(a,boo){
                var id =a.phases[a.ss].id;
                if(boo){
                    this.verifiDcrOrder(id,1)
                }else {
                    this.verifiDcrOrder(id,0)
                }
            }
        },
        created(){
                m$.documentTitle("装修订单");
                this.listDcrOrder(this.$route.params.id);
        },
        watch:{
            '$route':function (val) {
                this.listDcrOrder(val.params.id)
            }
        }
    }
</script>

<style lang="less" scoped>
  #decorate-order{
      .de-nav{
          height: .88rem;
          background-color: #fff;
          padding: 0 .2rem;
      }
      .space{
          height: .22rem;
      }
    .order-item{
      background-color: #fff;
      font-size: .28rem;
        border-bottom: .01rem solid #ccc;
        margin-bottom: .1rem;
      .order-item-title{
        height: .8rem;
        line-height: .8rem;
      //  display: flex;
        position: relative;

        .title-left{
          height: .8rem;
          line-height: .8rem;
          float: left;
          text-align: left;
          padding-left:  0.25rem;
        }
        .title-right{
          min-width: 2.7rem;
          _width: 2.7rem;
          height: .8rem;
          float: right;
          text-align: left;
          line-height: .8rem;
          padding-right:  0.25rem;
        }
      }
      .order-item-progress{
        overflow: hidden;
      .progress-box{
        height: 1.6rem;
        display: flex;
        >div{
          flex:1;
          text-align: center;
          margin-top: .3rem;
          >span{
            font-size: .32rem;
            display: inline-block;
            width: .65rem;
            height: .65rem;
            line-height: .6rem;
            background-color: #c2c2c2;
            border-radius: 100rem;
            text-align: center;
            color: #fff;
            position: relative;
            z-index: 1;
            border: .05rem solid #fff;
          }
          >span:after{
            content: '';
            position: absolute;
            z-index: 0;
            left: .58rem;
            top:.3rem;
            height: 1px;
            border-bottom: .03rem dotted #c2c2c2;
            width: 1rem;
          }
          .noneLine:after{
            left: 22222.58rem;
          }
          >p{
            font-size: .26rem;
            margin-top: .15rem;
            color: #c2c2c2;
          }
        }
      }
        #progress-box{
          .progress{
            >span{
              background-color: #fb4874;
            }
            >p{
              color: #fb4874;
            }
            >span:after{
              border-bottom: .03rem dotted #fb4874;
            }
          }
            .endProgress{
                >span{
                    background-color: #FBC3E5;
                }
                >p{
                    color: #FBC3E5;
                }
                >span:after{
                    border-bottom: .03rem dotted #FBC3E5;
                }
            }
            .endProgress1{
                >span{
                    background-color: red;
                }
                >p{
                    color: red;
                }
                >span:after{
                    border-bottom: .03rem dotted red;
                }
            }
        }
      }
      .order-item-acceptance{
          >span{
              line-height: 1rem;
              height: 1rem;
          }
        height: 1rem;
        display: flex;
        padding-left: .25rem;
        font-size: .3rem;
        padding-top: .1rem;
        >div{
          height: .6rem;
          line-height: .6rem;
        }
        .acceptance-button{
          font-size: .3rem;
          height: .6rem;
          line-height: .6rem;
          border:1px solid #fb4874;
          background-color: #fff;
          flex: 140;
          width: 1.4rem;
          border-radius:10px;
          margin-right: .4rem;
          text-align: center;
          color: #fb4874;
        }
        .acceptance-text{
          color: #434343;
          flex: 400;
        width: 1.4rem;
        }
        .acceptance-active{
          background-color: #fb4874;
          color: #fff;
        }
      }
    }
  }
</style>
