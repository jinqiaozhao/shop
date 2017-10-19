/*
*作者---杨彬
*
*/
<template>
  <div>
    <section>
      <div class="address-warp2" v-if="!address.address" @click="choiceAddr">
        <img src="../../assets/my/goArrow.png" class="go-arrow">
        <img src="../../assets/address/location.png"><span v-text="sData.sureOrder.notAddressText"></span>
      </div>
      <div class="address-warp" v-if="address.address" @click="choiceAddr">

        <img src="../../assets/my/goArrow.png" class="go-arrow com-div-middle-ab">
        <p class="name-tel-warp">
          <span class="name" v-text="address.name"></span>
          <span class="tel" v-text="address.tel"></span>
        </p>
        <div class="address-img-warp">
          <img class="com-div-middle-ab" src="../../assets/address/location.png">
          <p class="address" v-text="address.address"></p>
        </div>
      </div>
      <div class="content-warp">
        <div class="content-item-warp" v-for='iiii in sendProduct.items'>
          <img :src="iiii.thumbnail"
               v-for="ditem in defaultData.img">
          <div class="content-item" :class="{imgAccountMore:defaultData.img.length>1}">
            <p class="title" v-text="iiii.name"></p>
            <!--<p class="detail" v-text="iiii.digest"></p>-->
            <p class="detail" v-if="iiii.specification">已选：<span v-text="iiii.specification"></span></p>
          </div>
          <p class="money"
             v-text="sData.myOrder.detail.rmb+iiii.price"></p>
          <p class="number"
             v-text="sData.myOrder.detail.textOther[0]+iiii.quantity"></p>
        </div>
        <div class="cost-sum-warp">
          <div class="cost-sum-content">
            <p v-for="(gitem,gindex) in sData.myOrder.detail.textCost">
              <span class="cost-title" v-text="gitem"></span>
              <span class="cost-sum com-div-middle-ab"
                    v-text="sendProduct.quantity+sData.myOrder.detail.textOther[1]" v-if="gindex==0"></span>
              <span class="cost-number">
                   <span class="symbol" v-text="sData.myOrder.detail.costSymbol(gindex)"></span>
                   <span class="val" v-text='fun(gindex)' >100</span>
              <input type="text" value="fun(gindex)" v-model="total" style="display: none"/>
            </span>
            </p>
          </div>
        </div>
        <div class="coupon-remark-warp">
          <div class="com-position-re">
            <span v-text="sData.sureOrder.function[0]"></span>
            <input type="text" name="remark" class="remark com-div-middle-ab"
                   :placeholder="sData.sureOrder.function[1]" v-model="mark">
          </div>
          <!--<div>-->
          <!--<span v-text="sData.sureOrder.function[2]"></span>-->
          <!--<input type="text" name="remark" class="remark"-->
          <!--:placeholder="sData.sureOrder.function[3]" disabled>-->
          <!--<img src="../../assets/my/goArrow.png" class="go-arrow">-->
          <!--</div>-->
        </div>
      </div>

      <div class="coupon-remark-warp">
        <div class="com-position-re">
          <span v-text="sData.sureOrder.function[4]"></span>
          <span v-text="pointMax?pointMax:'0'" style="color:#FB4874;font-size0.2rem;"></span>
          <span style="color:#A9A9A9;font-size:0.3rem;">选择抵扣</span>
          <input  type="number" name="remark"
                  :placeholder="point?point:0" v-model="point" style="width:1.5rem;color:#fb4874;">
        </div>
        <div class="com-position-re">
          <button style="padding:7px 15px;background-color:#fb4874;color:#fff;border-radius: 5px;width:40%;text-align: center;" @click="maxpoint('half')">积分抵扣50%</button>
          <button style="padding:7px 15px;background-color:#fb4874;color:#fff;margin-left:1rem;border-radius: 5px;" @click="maxpoint('max')">积分抵扣最大值</button>
        </div>
        <div class="font-size:10px;" @click="selCoupon('0')"> <span style=""> 商城优惠 </span> <span style="float:right;">{{pickedText}} <span style="color:#ccc;"> ></span></span> </div>
      </div>
    </section>
    <!--优惠券-->
    <div class=" " style="background:rgba(0,0,0,0.2); position:fixed;top:0; bottom:0;width:100%;" v-if="selCoupons" @click="selCoupon('1')" id="couponWrap">
      <div  style="position:fixed;bottom:0;font-size:0.2rem;background: #fff;width: 100%;" >
        <div style="padding-bottom:1rem;">
          <div style="text-align: center;padding:0.3rem;">商城优惠</div>
          <label v-for="(v,i) in barginList" v-if="v.amount">
            <div style="margin:0 0.2rem;border-bottom:1px solid #ccc;padding:0.2rem 0;">
              省{{v.amount}}:商城优惠     <input type="radio" name="sex" v-bind:value="v.id"   style="width: 20px;height: 20px;float: right;cursor: pointer;background: #000;" v-model="picked" checked/>
            </div></label>
          <label >
            <div style="margin:0.2rem;border-bottom:1px solid #ccc; padding:0.2rem 0;">
              不使用优惠      <input type="radio" name="sex" value="0"   style="width: 20px;height: 20px;float: right;cursor: pointer;background: #000;" v-model="picked"/>
            </div> </label>
        </div>
        <div style="font-size:0.2rem;text-align:center;background:#fb4874;padding:0.25rem;color:#fff;" @click="selCoupon('1')">
          关闭
        </div>
      </div>
    </div>
    <div class="div-space"></div>
    <footer>
      <div class="footer-sum-warp">
        <span v-text="sData.sureOrder.footText[0]" class="pay-text"></span>
        <span class="price">
          <span v-text="sData.productCarSData.moneySymbol" class="symbol"></span>
          <span class="val" v-text='sendProduct.paidAmount.toFixed(2)'>100.00</span>
        </span>
      </div>
      <div class="footer-submit" v-text="sData.sureOrder.footText[1]" @click="createOrder"></div>
    </footer>
    <sure-order-alert :sData="sData" v-if='0'>
    </sure-order-alert>
  </div>
</template>
<script type="text/javascript">
  import sureOrderAlert from 'src/components/com/sureOrderAlert/sureOrderAlert.vue';
  export default {
    data(){
      return {
        barginList:[],//优惠券
        pickedText:'',
        couponAmount:'',
        picked:'',//优惠券
        selCoupons:false,
        isfreight:'',//测试运费
        total:'',
        pointMax:'',//用户总积分
        point:'',//积分
        totalA:'',
        total:'',
        defaultData: {
          sendTime: "2017-1-11 10:00~11:00",
          orderTime: "2017-01-11 10:00",
          remark: "请尽快配送",
          number: m$.sessionStores.get("products").productAmount,
          status: "3", id: "232321111222",
          leftTime: '00:30:59',
          money: m$.sessionStores.get("products").oldPrice,
          name: m$.sessionStores.get("products").name,
          digest: m$.sessionStores.get("products").digest,
          img: [2], freight: 20, point: 100, coupon: 20,
          address: '阿里巴巴西部基地', tel: '18202830089',
        },
        address: {
          provinceName:'',
          address: '',
          tel: '',
          name: '',
        },
        sendProduct: {
          items: [],
          quantity: 0,
          freight: 0,
          totalAmount: 0,
          paidAmount: 0,
          specificationId:'',
          specification:'',
          pointsValue:'',
          isGroupFour:'0',
          couponId:'',
        },
        items: [],
        allprice: '',
        mark:m$.sessionStores.get('ybpdmk')?m$.sessionStores.get('ybpdmk'):"",
        fun: function (aindex) {
          return (aindex == 0 ? this.sendProduct.totalAmount.toFixed(2) :
              (aindex == 1 ? this.sendProduct.freight.toFixed(2) :
                (aindex == 2 ? (this.point/100).toFixed(2) :
                  (aindex == 3 ? this.couponAmount : "")))
          )
        },
      }
    },
    components: {
      sureOrderAlert
    },
    props: ["sData"],
    mounted(){
      //var link= document.getElementById('link-page');
      //console.log(this.height_b);
      // link.style.height=this.height_b+'px';
      //console.log('浙江_m')
    },
    methods: {
      selCoupon(val){
        var couponWrap=document.getElementById('couponWrap');
        if(val=='0'){
          this.selCoupons=true;
          if(couponWrap){
            couponWrap.className='animated bounceInUp'
          }

        }else if(this.picked!=''  && couponWrap){
          couponWrap.className='animated bounceOutDown'
        }

      },
      maxpoint(isMax){
        if(isMax=='max'){
          this.point=this.pointMax;
        }
        if(isMax=='half'){
          var points=this.sendProduct.totalAmount*100/2
          this.point=points.toFixed(0);
        }
      },
      createOrder () {
        m$.template({
          val:'',
        });
        var obj = {};
        obj.receiverId = this.address.id//收件地址id
        obj.remark = this.mark//备注
        if(!obj.receiverId){
          m$.template({
            val:'请先填写<br>地址信息',
            time:700
          })
          return;
        }
        for (var i in this.sendProduct) {
          if (i != 'items') {
            obj[i] = this.sendProduct[i]
          }
        }
        for (var i = 0; i < this.sendProduct.items.length; i++) {
          for (var skey in this.sendProduct.items[i]) {
            obj['items[' + i + '].' + skey] = this.sendProduct.items[i][skey];
            if (skey == 'thumbnail') {
              obj['items[' + i + '].' + skey] = this.sendProduct.items[i][skey].split(',')[1];
            }
          }
        }
//         console.log(obj);
//         return;
        this.postAjax(this.sData.url.createOrderUrl, obj, (res) => {
          if (res.code == 200) {
          //0元秒杀，不调用微信支付
          // if(res.data[0].paidAmount==0){
          //   m$.template({
          //     val:'0元<br>秒杀成功',
          //     time:800,
          //     fn(){
          //       window.location.href=(`#/orderList/3`);
          //     }
          //   });
          // }
          //  else {
          m$.localStrages.set('payInfo', res.data);
          console.log(res.data)
          this.getAjax(this.url.getWxPayCodeUrl,{},(res)=>{
            window.location.href = res.data;
        })
          //  }
          var _this=this;
          // m$.template({
          //   val:'',
          //   time:1000,
          //   fn(){
          //     _this.$router.push('/goPay');
          //   }
          // });

        } else {
          m$.template({
            val: res.message,
            time: 1000
          })
        }
      })
      },
      getAddress (boos, ids) {
        var id = (ids >= 0 ? ids : '');
        var boo = (ids < 0 ? boos : '');
        this.getAjax(this.sData.url.findReceiverUrl, {isDefault: boo, receiveId: id}, (res) => {
          if (res && res.data.length) {
          this.address.address = res.data[0].provinceName + res.data[0].cityName + res.data[0].districtName + res.data[0].detailAddress + '';//地址
          this.address.tel = res.data[0].phone;//电话
          this.address.name = res.data[0].consignee;//人
          this.address.id = res.data[0].id;//地址id
          this.provinceName=res.data[0].provinceName;
          this.sendProduct.freight=res.data[0].freight;
          console.log(this.sendProduct.freight)
          //运费判断;本单是否有试用商品，如果有，免运费
          if(this.sendProduct.isGroupFour==4 || this.isFreight=='1' || this.sendProduct.isGroupFour=='1'||this.sendProduct.isGroupFour=='2'){
            this.sendProduct.freight=0.00;
          }else{
            this.sendProduct.freight=res.data[0].freight;
          }
          this.sendProduct.paidAmount=this.sendProduct.totalAmount+this.sendProduct.freight-this.point/100-this.couponAmount;
        }
      });
        // mounted()
      },
      choiceAddr(){
        m$.sessionStores.set('ybpdmk',this.mark);
        window.location.href = (`#/addressManage/1`);
      }
    },
    mounted(){
      m$.documentTitle("提交订单");
      if(this.provinceName==undefined){
        var i=0;
        var waiter=setInterval(
          function(){
            i=i+10;
            //console.log(i);
            if(i>=300){clearInterval(waiter)}
          },10)
      }
      this.getAddress(1, this.$route.params.id);
      //判断来自商品详情页 还是  购物车
      var _this = this;
      if (m$.sessionStores.get("products").length) {
        var goods = m$.sessionStores.get("products");
        var oflog = -1;
        for (var ii = 0; ii < goods.length; ii++) {
          m$.imgRead(goods[ii].productImg, {quality: 1}, function (e) {
            oflog++;
            var iii = {};
            iii.specificationId = goods[oflog].specificationId?goods[oflog].specificationId:0;//详情分类id
            iii.specification = goods[oflog].specificationName;
            iii.quantity = parseFloat(goods[oflog].quantity);
            iii.name = goods[oflog].productName;
            iii.digest = goods[oflog].digest;
            iii.price = parseFloat(goods[oflog].price);
            iii.cartId = goods[oflog].id;
            iii.groupType = goods[oflog].groupType;
            iii.businessId = goods[oflog].businessId;
            _this.sendProduct.quantity += goods[oflog].quantity;
            // console.log(iii.quantity +"=="+ iii.price)
            _this.sendProduct.totalAmount += goods[oflog].quantity * goods[oflog].price;
            _this.total=_this.sendProduct.totalAmount
            iii.thumbnail = e;
            _this.sendProduct.items.push(iii);
            // ii++;
            _this.sendProduct.pointsValue =_this.point?_this.point:0;
            // _this.sendProduct.paidAmount = _this.sendProduct.totalAmount + _this.sendProduct.freight ;
            iii.productId = goods[oflog].productId;
            iii.isFreight=goods[oflog].isFreight;
            console.log(iii.isFreight)
            if(iii.isFreight=='1'){_this.isFreight=iii.isFreight;}
            //订单中是否含有积分商品
            if(iii.groupType=='4' || iii.groupType=='1' || iii.groupType=='2' ){
              _this.sendProduct.isGroupFour=iii.groupType;
              _this.sendProduct.freight=0.00;
              _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100-_this.couponAmount;
            }else{
                if(_this.sendProduct.isGroupFour=='1' || _this.sendProduct.isGroupFour=='4'||_this.sendProduct.isGroupFour=='2' || _this.isFreight=='1'){
                  _this.sendProduct.freight=0.00;
                  _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight+_this.sendProduct.freight-_this.point/100-_this.couponAmount;
                }else{
                  //运费判断
                  //if(_this.sendProduct.totalAmount>0){
                  _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100-_this.couponAmount//重新计算总价
//                  } else{_this.sendProduct.freight=0.00; _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100}
                }
            }

          });
        }
      } else {
        var iii = {};
        iii.specification =(m$.sessionStores.get("products").specificationName);
        iii.specificationId = (m$.sessionStores.get("products").specificationId)?(m$.sessionStores.get("products").specificationId):0;
        iii.quantity = parseFloat(m$.sessionStores.get("products").productAmount);
        iii.price = parseFloat(m$.sessionStores.get("products").endPrice);
        iii.name = m$.sessionStores.get("products").name;
        iii.digest = m$.sessionStores.get("products").digest;
        iii.productId = m$.sessionStores.get("products").id;//商品项商品id
        iii.groupType = m$.sessionStores.get("products").groupType;//商品类别
        iii.businessId = m$.sessionStores.get("products").businessId;//商家id
        iii.isFreight = m$.sessionStores.get("products").isFreight;//商家id
        iii.cartId = '';//购物车id
        _this.sendProduct.totalAmount = iii.quantity * iii.price;//zong
        // console.log(iii.quantity +"=="+ iii.price)
        _this.sendProduct.quantity = iii.quantity;
        _this.sendProduct.pointsValue =_this.point?_this.point:0;
          //订单中是否含有积分商品或秒杀商品
          if(iii.groupType=='4' || iii.groupType=='1'|| iii.groupType=='2' ||  iii.isFreight=='1'){
            _this.sendProduct.isGroupFour=iii.groupType;
            _this.sendProduct.freight=0.00;
            _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100-_this.couponAmount;
            this.isFreight=iii.isFreight;
          }else{
//            if(_this.sendProduct.totalAmount>0){
            _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100-_this.couponAmount//重新计算总价
//            } else{_this.sendProduct.freight=0.00; _this.sendProduct.paidAmount=_this.sendProduct.totalAmount+_this.sendProduct.freight-_this.point/100}
          }

        m$.imgRead(m$.sessionStores.get("products").thumbnail, {quality: 1}, function (e) {
          iii.thumbnail = e;
          _this.sendProduct.items.push(iii);
        });
        // console.log(_this.sendProduct.totalAmount+"1")
      }
      this.getAjax(this.url.listUserOrderCoupon,{},(res)=>{
        for(var i=0;i<res.data.length;i++){
        if(res.data[i].useAmount<=this.sendProduct.totalAmount){
          if(res.data[i].typeName==null){
            this.barginList.push(res.data[i])
          }
        }
      }
      this.barginList=this.barginList;
        this.picked='0';
        this.couponAmount='0'
      this.sendProduct.couponId= this.picked

    })
    }
    , created(){
      m$.documentTitle("提交订单");
      this.postAjax(this.url.getPoints,{},(res)=>{
        this.pointMax=res.data;
    })
      this.sendProduct.isGroupFour='0'

    },
    watch:{
      picked(val){
        this.sendProduct.couponId=val;
        var couponWrap=document.getElementById('couponWrap');
        if(couponWrap){ couponWrap.className='animated bounceOutDown'}
        if(val=="0"){
          this.pickedText="不使用优惠"
          this.couponAmount='0';
          this.sendProduct.paidAmount=this.sendProduct.totalAmount+this.sendProduct.freight-this.point/100
        }else{
          for(var j=0;j<this.barginList.length;j++){
            if(this.barginList[j].id==val){
              this.pickedText="省"+this.barginList[j].amount+":商城优惠";
              this.couponAmount=this.barginList[j].amount;
              this.sendProduct.paidAmount=this.sendProduct.totalAmount+this.sendProduct.freight-this.point/100-this.barginList[j].amount;

            }
          }

        }

      },
      point(val){
        //  console.log(this.sendProduct.isGroupFour)
        if(this.sendProduct.isGroupFour!='0' ){
          this.point=0;
          m$.template({
            val:'订单中含不能抵扣商品',
            time:500,
            fn(){

            }
          });
        }else{
          if(val>=this.pointMax){
            if(val>this.sendProduct.totalAmount*100)
            {
              this.point=(this.sendProduct.totalAmount*100*0.8).toFixed(0)
              m$.template({
                val: '积分最大抵扣80%',
                time: 500,
              })
            }else{
              this.point=this.pointMax;
            }
          }else if(val<0){
            this.point=0;
          }
          else{
            if(val>=this.sendProduct.totalAmount*100){
              this.point=(this.sendProduct.totalAmount*100*0.8).toFixed(0);
              m$.template({
                val: '积分最大抵扣80%',
                time: 500,
              })
            }else{ this.point=val;}
          }
          this.sendProduct.pointsValue=val;
          this.sendProduct.paidAmount=this.sendProduct.totalAmount+this.sendProduct.freight-this.point/100;
        }
      },
      freight_(curVal,oldVal){
        //console.log(curVal,oldVal);
      }}
  }
</script>
<style scoped lang="less">
  @import "sureOrder";
  @import "../goodsDetail/bounce";
</style>
