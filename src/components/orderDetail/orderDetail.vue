/*
*作者---杨彬
*
*/
<template>
  <div>
    <header class="detail-head">
      <span v-text="sData.myOrder.orderNumberCn+' '"></span>
      <span v-text="defaultData.sn"></span>
      <span class="order-type com-div-middle-ab"
            v-text="sData.myOrder.type[defaultData.status].name"></span>
    </header>
    <section>
      <div class="address-warp">
        <p class="name-tel-warp">
          <span class="name" v-text="defaultData.name"></span>
          <span class="tel" v-text="defaultData.receiverMobile"></span>
        </p>
        <div class="address-img-warp">
          <img class="com-div-middle-ab" src="../../assets/address/location.png">
          <p class="address" v-text="defaultData.address"></p>
        </div>
      </div>
      <div class="content-warp">
        <div class="content-item-warp" v-for='(ii,index) in goods' @click="gogoods(index)">
          <img :src="ii.thumbnail">
          <div class="content-item" :class="{imgAccountMore:defaultData.img.length>1}">
            <p class="title" v-text="ii.name"></p>
            <p class="detail" v-text="ii.digest"></p>
            <p class="detail" v-text="ii.specificationName" v-if="ii.specificationName"></p>
          </div>
          <p class="money"
             v-text="sData.myOrder.detail.rmb+ii.price"></p>
          <p class="number"
             v-text="sData.myOrder.detail.textOther[0]+ii.quantity"></p>
        </div>
      </div>
      <div class="order-time-warp">
        <div v-for="(fitem,ind) in sData.myOrder.detail.textTime"
             class="order-time-item" v-if="defaultData.status=='0'">
          <span class="navText" v-text="fitem"></span>
          <!--<span class="navValue">快递</span>-->
          <span class="navValue" v-text='fun(ind)'>中通/圆通快递</span>
        </div>
        <div v-for="(fitem,ind) in sData.myOrder.detail.textTime1"
             class="order-time-item" v-if="defaultData.status!='0'">
          <span class="navText" v-text="fitem"></span>
          <span class="navValue" v-text='fun1(ind)'>中通/圆通快递</span>
          <!--<span class="navValue">快递</span>-->
        </div>
      </div>
      <div class="cost-sum-warp">
        <div class="cost-sum-content">
          <p v-for="(gitem,gindex) in sData.myOrder.detail.textCost">
            <span class="cost-title" v-text="gitem"></span>
            <span class="cost-sum com-div-middle-ab" v-text="defaultData.number+sData.myOrder.detail.textOther[1]" v-if="gindex==0"></span>
            <span class="cost-number">
                   <span class="symbol" v-text="sData.myOrder.detail.costSymbol(gindex)"></span>
                   <span class="val" v-text='funMoney(gindex)'></span>
                </span>
          </p>
        </div>
        <div class="cost-sum-foot">
              <span class="navText"
                    v-text="defaultData.status==0?sData.myOrder.realPayCn[0]:sData.myOrder.realPayCn[1]"></span>
          <span class="navValue">
                <span class="symbol" v-text="sData.myOrder.detail.rmb"></span>
                <span class="val" v-text='defaultData.paidAmount'></span>
              </span>
        </div>
      </div>
    </section>
    <footer class="detail-foot">
      <div class="div-place"></div>
      <div class="item-operation" v-if="sData.myOrder.type[defaultData.status].url.length>0">
        <div class="surplus-time-warp com-div-middle-ab" v-if="defaultData.status==0">
          <p class="surplus-time-cn" v-text="sData.myOrder.detail.textOther[2]" v-if="leftTimeFlag"></p>
          <p class="surplus-time" v-text="leftTime" v-if="leftTimeFlag"></p>
        </div>
        <button type="button" v-text="sitem.text" @click=itemOperation(defaultData.id,sitem.val,defaultData)
                v-for="(sitem,sindex) in sData.myOrder.type[defaultData.status].url" v-show="!(sitem.val==1&&leftTimeFlag==false)"></button>
      </div>
    </footer>
  </div>
</template>
<script type="text/javascript">
  export  default {
    props:['sData'],
    data(){
      return{
        defaultData:
          { sendTime:"2017-1-11 10:00~11:00",
            orderTime:"2017-01-11 10:00",
            remark:"请尽快配送",
            number:5,
            status:"1",id:"232321111222",
            leftTime:'00:30:59',
            money:"100",title:'华为Mate9 4GB+32GB版',
            detail:'月光银',
            img:[1], freight:20,point:100,coupon:20,
            address:'四川省成都市双流县华阳镇街道龙灯山路一段名著司南1栋1单元011',tel:'18202830089',name:'张虹'
          },
        productId:'',
        goods:[],
        sendType:'',
        sendSn:'',
        payType:'',
        mark:'',
        gtTime:'',
        timer:'',
        leftTime:'',
        leftTimeFlag:false,
        fun1:function (aindex) {
          return (aindex==0 ? this.sendType :
              (aindex==1 ? this.sendSn :
                (aindex==2?this.payType:(aindex==3?this.mark:(aindex==4?this.gtTime:""))))
          )
        },
        funMoney:function (aindex) {
          return (aindex==0 ? this.defaultData.totalAmount:
              (aindex==1 ? this.defaultData.freight :
                  (aindex==2 ? this.defaultData.pointsValue/100 :
//                      (aindex==3?this.defaultData.couponAmount:"")
                      (aindex==3?-(this.defaultData.paidAmount-this.defaultData.totalAmount-this.defaultData.freight-this.defaultData.pointsValue/100):"")
                  )
              )
          )
        },
        fun:function (aindex) {
          return (aindex==0 ? this.sendType :
              (aindex==1 ? this.mark :
                (aindex==2?this.gtTime:""))
          )
        },
      }
    },
    methods:{
      gogoods(index){
        window.location.href = (`#/goodsDetail/${this.productId[index].productId}`)
      },
      itemOperation(orderId, operaionId, nitem){
        if (operaionId == 1) {
          if(this.leftTimeFlag==false){
            return
          }
          var arr = [];
          var obj = {};
          obj.orderId = orderId;
          obj.paidAmount = nitem.paidAmount;
          arr.push(obj);
          m$.localStrages.set('payInfo', arr);
          this.getAjax(this.url.getWxPayCodeUrl,{},(res)=>{
            window.location.href = res.data;
        })
        } else if (operaionId == 0) {
          this.postAjax(this.url.cancelOrder, {id: orderId}, (res) => {
            if (res.code == 200) {
            let _this = this;
            m$.template({
              val: '取消成功',
              time: 1000,
              fn:function(){
                _this.$router.go(-1)
              }
            });
          }
        else {
            m$.template({
              val: res.message,
              time: 1000,
            });
          }
        })
        }else if(operaionId == 2){
          //确认收货
          this.postAjax(this.sData.url.confirmRecevied, {orderId: orderId}, (res) => {
            if (res.code == 200) {
            m$.template({
              val: '操作成功',
              time: 1000,
              fn(){
                window.location.href=('#/orderList/6')
              }
            });
          }
        })
        }else if(operaionId == 3){
          //window.location.href = ();
        }
      },
      formatSeconds(value){
        // alert(value)
        var theTime = parseInt(value);// 秒
        var result=""
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime >= 60) {
          // alert(theTime)
          theTime1 = parseInt(theTime / 60);
          theTime = theTime%60;
          if (theTime1 >= 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }

        result += theTime;
        if (theTime1 >= 0) {
          result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 >= 0) {
          result = "" + parseInt(theTime2) + ":" + result;
        }
        this.leftTime = result
      }
    },
    created(){
      m$.documentTitle("订单详情");
      this.postAjax(this.sData.url.orderDetailsUrl,{orderId:this.$route.params.id},(res)=>{
        console.log(res.data)
      this.productId 						=   res.data.items;//商品ID
      this.defaultData.address            =   res.data.address//地址
      this.defaultData.id                 =   res.data.id//订单号
      this.defaultData.sn                 =   res.data.sn//订单号
      this.defaultData.name               =   res.data.receiverName//姓名
      this.defaultData.receiverMobile     =   res.data.receiverMobile//电话
      this.defaultData.status             =   res.data.status//订单状态
      this.defaultData.totalAmount         =   res.data.totalAmount//实付款
      this.defaultData.paidAmount         =   res.data.paidAmount//实付款
      this.defaultData.number             =   res.data.quantity//实际数量
      this.defaultData.freight            =   res.data.freight//运费
      this.defaultData.pointsValue            =   res.data.pointsValue//
      this.defaultData.couponAmount       =   (res.data.couponAmount===null)?'0':res.data.couponAmount//优惠
      this.goods                          =   res.data.items//商品图片等信息
      this.sendType                       =   res.data.shippingMethod?res.data.shippingMethod:"暂无";//配送方式
      // this.sendType                       =   '快递';//配送方式
      this.sendSn                         =   res.data.shippingSn?res.data.shippingSn:'暂无';//运单号
      this.payType                        =   res.data.payMethod;//支付方式
      this.mark                           =   res.data.remark;//运单备注
      this.gtTime                         =   res.data.gmtCreate;//下单时间
      if(res.data.currentDate&&res.data.gmtCreate){
        var currentDate = new Date(res.data.currentDate.replace(
          /\-/g,'/'));
        var gmtStart = new Date(res.data.gmtCreate.replace(
          /\-/g,'/'));
        var time = (gmtStart.getTime()+1800000 - currentDate.getTime()) / 1000;
        if(time<0){
          return;
        }
        //获得 秒杀结束时间
        var _this = this;

        _this.timer = setInterval(function () {
          _this.leftTimeFlag=true;
          time--;
          if(time==0){
            _this.leftTimeFlag=false;
            clearInterval(_this.timer);
            _this.leftTime='00:00:00'
          }
          _this.formatSeconds(time);
        }, 1000)
      }

    })

    }
  }
</script>
<style scoped lang="less">
  @import "orderDetail";
  .menu{
    border: 1px red solid;
    background-color: #FFF;
    position: fixed;
    height: 40px;width: 100%;
    bottom: 0;
  }
  .menu-one{
    font-size: .3rem;
    border: 1px red solid;
    text-align: center;
    border-radius: 10px;
    width: 1.5rem;
    display: inline-block;
  }
</style>
