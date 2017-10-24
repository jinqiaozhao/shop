/*
*作者---杨彬
*
*/
<template>
  <div>
      <cake-nav :navData="sData.myOrder.navText" ></cake-nav>
      <section class="order-content">
        <div class="this-splace"></div>
        <div class="order-item" v-for="(nitem,nindex) in listData">
          <p class="item-title-warp">
            <span class="orderNo-text" v-text="sData.myOrder.orderNumberCn"></span>
            <span class="orderNo-number" v-text="nitem.sn"></span>
            <span class="order-type com-div-middle-ab" v-text="sData.myOrder.type[nitem.status].name"></span>
        </p>
        <div class="item-content-warp" v-for="mitem in nitem.items" @click="goGoodsDetail(nitem)">
            <img :src='mitem.thumbnail'>
            <div class="cn-text-warp" >
              <p class="product-title" v-text="mitem.name"></p>
              <p class="product-detail" v-text=mitem.digest></p>
              <p style="font-size:0.15rem;color:#8D8D8D;"v-if="mitem.specificationName">已选：<span v-text=mitem.specificationName></span></p>
            </div>
        </div>
        <div class="item-price" id="cashback">
          <span class="money-cn">共{{nitem.quantity}}件商品&nbsp;&nbsp;{{nitem.status==0?sData.myOrder.realPayCn[1]:sData.myOrder.realPayCn[0]}}</span>
          <span class="money-warp">￥<span v-text="(nitem.paidAmount).toFixed(2)"></span></span>
          <span style="font-size:0.2rem;color:#FB4874;border:1px solid #FB4874;padding:0.1rem 0.25rem" v-if="nitem.isGroupFour=='4' && route=='6'" @click="cashback($event,nindex)">申请积分</span>
        </div>
        <div class="item-operation" v-if="sData.myOrder.type[nitem.status].url.length>0">
          <button type="button" v-text="sitem.text" @click=itemOperation(nitem.id,sitem.val,nitem,$event)
                  v-for="sitem in sData.myOrder.type[nitem.status].url"  v-show="!(sitem.val==1&&nitem.isTimeout==1)" id="button"></button>
        </div>
      </div>
    </section>
  </div>
</template>
<script type="text/javascript">
  import cakeNav from "src/components/com/nav/nav.vue";
  export  default {
    props: ["sData"],
    components: {cakeNav},
    data(){
      return {
        route:this.$route.params.id,
        isGroup:[],
        defaultData: [
          // {status:"0",id:"232321111222",money:"3600.00",title:'华为Mate9 4GB+32GB版',
          //   detail:'颜色:月光银',img:[1]},
          // {status:"1",id:"232321111222",money:"3600.00",title:'华为Mate9 4GB+32GB版',
          //   detail:'颜色:月光银',img:[1,2]},
          // {status:"2",id:"232321111222",money:"3600.00",title:'华为Mate9 4GB+32GB版',
          //   detail:'颜色:月光银',img:[1]},
          // {status:"3",id:"232321111222",money:"100",title:'华为Mate9 4GB+32GB版',
          //   detail:'颜色:月光银',img:[1,2]}
        ],
        listData: []
      }
    },
    methods: {
      cashback(e,i){
        var div=e.target;
        //div.innerHTML="积分申请";
        var sn=this.listData[i].sn;
          this.postAjax(this.sData.url.updateRecordProgress, {sn:sn}, (res) => {
            if(res.code==200){
              m$.template({
                val: '申请返现成功<br/>请耐心等待审核',
                time: 1000,
                fn(){
                }
              });
              var div=e.target;
              var cashback=document.getElementById('cashback')
              div.innerHTML="积分审核中";
            }
          })

      },
      itemOperation(orderId, operaionId, nitem,e){
     //console.log(nitem);
      //  console.log(operaionId)
    // return;
        if (operaionId == 1) {
          //window.location.href = (`#/orderDetail/${nitem.id}`);
          var arr = [];
          var obj = {};
          obj.orderId = orderId;
          obj.paidAmount = (nitem.totalAmount+nitem.freight -nitem.pointsValue/100).toFixed(2);
          obj.sn=nitem.sn;
          arr.push(obj);
          if(nitem.isTimeout==1){
            return;
          }
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
                fn: _this.getData(_this.$route.params.id)
              });
            }
          })
        }else if(operaionId == 2){
          console.log(operaionId)
            //确认收货
          this.postAjax(this.sData.url.confirmRecevied, {orderId: orderId}, (res) => {
            if (res.code = 200) {
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
          this.$router.push=(`#/orderEvaluate/${nitem.id}`)
        }else if(operaionId == 4){
          this.$router.push=(`#/logistics/${nitem.id}`)
        }else if(operaionId == 5){
          this.$router.push(`/information/${nitem.id}`)
        }else if(operaionId == 6){
          this.$router.push(`/goodsDetail/`)
        }
      },
      getData(status){
        if (status == -1) {
          status = ''
        } else if (status == 0) {
          status = 0
        } else if (status == 3) {
          status = 1
        } else if (status == 6) {
          status = 3
        }
        this.listData = [];
        this.postAjax(this.sData.url.orderUrl, {status: status}, (res) => {
            if(res.code==200){
              this.listData = res.data.data
            }
        })
      },
      goGoodsDetail(nitem){
        window.location.href = (`#/orderDetail/${nitem.id}`);
      }
    },
    created(){
      m$.documentTitle("订单列表");
      this.getData(this.$route.params.id)
      this.route=this.$route.params.id
    },
    updated(){
  //var sn=this.listData.sn;
//    this.postAjax(this.sData.url.getProgressBySn, {sn: sn}, (res) => {
  //      if(res.code==200){
  //        console.log(res)
    //    }
  //  })
    },
    watch: {
      '$route': function (val) {
        this.getData(val.params.id);

        this.route=this.$route.params.id
        var sn=this.listData.sn;
      }
    },
  }
</script>
<style scoped lang="less">
  @import "orderList";
</style>
