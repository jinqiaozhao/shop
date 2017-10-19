/*
作者---杨彬
*/
<template>
  <div>
    <header>
      <div class="my-head-warp">
        <div class="my-skip"><img src="http://ovn5haih3.bkt.clouddn.com/%E6%B6%88%E6%81%AF.png"><img @click='imgto' src="http://ovn5haih3.bkt.clouddn.com/%E8%AE%BE%E7%BD%AE.png"></div>
        <div class="my-label">
          <label>
            <input  id="myHeadInput" name="wwf"  @click='imgto'><!-- type="file" @change="upDateImg()" accept="image/*" -->
            <img :src="myData.headIcon">
          </label>
          <div class="my-p"><p v-text="myData.userName?myData.userName:'-'"></p></div>
          <img class="box-sex" v-if='myDataAW.sex==2' src="http://ovn5haih3.bkt.clouddn.com/%E5%A5%B3%E5%AD%A9.png" />
          <img class="box-sex" v-if='myDataAW.sex==1' src="http://ovn5haih3.bkt.clouddn.com/%E6%80%A7%E5%88%AB%E7%94%B7%E5%9B%BE%E7%89%87.png"/>
        </div>
        <div class="my-member">
          <img src="http://ovn5haih3.bkt.clouddn.com/%E9%92%BB%E7%9F%B3.png" /><span>会员等级</span>
        </div>
      </div>
    </header>

    <section class="head-list">
      <router-link v-for="(oitem,oindex) in mySData.headList" :to="oitem.url" tag="div" :key='oindex'>
        <div><img :src='oitem.imgs' style="width: .6rem;"/></div>
        <!--  <p v-text="myData.couponCount?myData.couponCount:'0'" v-if="oindex==3"></p>
         <p v-text="myData.receiverCount?myData.receiverCount:'0'" v-if="oindex==4"></p>
         <p v-text="parseInt(canBuy?canBuy:oitem.val)" v-if='oindex==2'></p>
         <p v-text="collectNum?collectNum:0" v-if='oindex==1'></p>
         <p v-text="point?point:'0'" v-if='oindex==0'></p>-->
        <div v-text="oitem.name"></div>
      </router-link >
    </section>

    <div class="div-space"></div>
    <section class="order-stutus-nav">
      <img style="position: absolute;left: 1.3rem;top: .16rem;" src="http://ovn5haih3.bkt.clouddn.com/%E6%8B%AC%E5%8F%B7%20%281%29.png"/>
      <router-link class="status-item com-div-middle-ab" :class="['status'+mindex]"
                   v-for="(mitem,mindex) in mySData.navText"
                   :to="mitem.url" :key='mindex'>
        <span class="hasData com-div-center-ab" v-if="mindex==1&&myData.unPaidCount" v-text="myData.unPaidCount"></span>
        <span class="hasData com-div-center-ab" v-if="mindex==2&&myData.unReceiveCount" v-text="myData.unReceiveCount"></span>
        <div class="status-div">
          <img :src="mitem.src" class="status-img">
          <p v-text="mitem.name" class="status-name"></p>
        </div>
      </router-link>
    </section>
    <div style="margin-top: 1px;"></div>
    <section class="order-stutus-nav">
      <img style="position: absolute;left: 1.3rem;top: .16rem;" src="http://ovn5haih3.bkt.clouddn.com/%E6%8B%AC%E5%8F%B7%20%281%29.png"/>
      <router-link class="status-item com-div-middle-ab" :class="['status'+mindex]"
                   v-for="(mitem,mindex) in mySData.navfitment"
                   :to="mitem.url" :key='mindex'>
        <div class="status-div">
          <img :src="mitem.src" class="status-img">
          <p v-text="mitem.name" class="status-name"></p>
        </div>
      </router-link>
    </section>
    <div class="div-space"></div>
    <div class="order-imgs"><img src="http://ovn5haih3.bkt.clouddn.com/%E5%BA%95%E9%83%A8banner%E5%9B%BE.png"></div>
    <div style="width: 100%;height: .48rem;position: relative;" ><img style="height: .4rem;position: absolute;left: 32.8%;" src="http://ovn5haih3.bkt.clouddn.com/weinituijian.png" /></div>
    <!-- <div class="function-nav">
       <router-link v-for="(oitem,mindex) in mySData.contentOne"
                    class="function-nav-item" :to="oitem.url" :key='mindex'><span
               class="nav-item-title" v-text="oitem.name"></span>
         <img class="go-arrow com-div-middle-ab"
              src="../../assets/my/goArrow.png">
       </router-link>
     </div>
     <div class="div-space"></div>
    <!-- <div class="function-nav">
       <router-link v-for="(oitem,mindex) in mySData.contentTwo"
            class="function-nav-item" :to="oitem.url" :key='mindex'><span
       class="nav-item-title" v-text="oitem.name"></span>
         <img class="go-arrow com-div-middle-ab"
              src="../../assets/my/goArrow.png">
       </router-link>
     </div> -->
    <!-- <div class="foot">
      <button @click="logout()" type="button">退出登录</button>
      </div>-->


    <div id="seckill-goods-details">
      <div class="t-product" v-for='item in productData'>
        <div class="t-product-com t-product-img" @click="goBuy(item.id)">
          <img :src="item.thumbnail" >
        </div>
        <div class="t-product-com product-details">
          <section>
            <p class="t-product-details-name" @click="goBuy(item.id)">{{item.name}}</p>
            <!--<div class="product-details-info">{{item.digest}}</div>-->
            <!--<div class="t-newtext">-->
            <!--<span v-if='true'>{{item.total ? "库存量:"+item.total+"件":''}}</span>-->
            <!--<span v-if='!true' class="progress"><i><span>57%</span></i></span>-->
            <!--</div>-->
          </section>
          <div class="t-product-details-price" v-if='!item.promotionPrice'>
            <span>￥ </span>
            <span class="big-price">{{item.oldPrice}}</span>
            <span class="del-price" v-if='0'>￥<s>{{item.oldPrice}}</s></span>
          </div>
          <div class="t-product-details-price" v-if='item.promotionPrice'>
            <span>￥ </span>
            <span class="big-price">{{parseInt(item.bargainPrice?item.bargainPrice:item.promotionPrice)}}</span>
            <span style="font-size: 0.25rem">{{item.promotionPrice.slice(item.promotionPrice.indexOf('.'),item.promotionPrice.indexOf('.')+3)}}</span>
            <span class="del-price" v-if='1'>￥<s>{{item.oldPrice}}</s></span>
          </div>
          <div class="product-details-amount ">
            <div class="button">
              <button v-if='0' class="fl-button" disabled>抢光了</button>
              <!--<button v-if='1' class="tr-button" @click="goBuy(item.id)">去购买</button>-->
              <button v-if='1'  class="tr-button">
                <img src="../../assets/car4.png"  @click="goCar(item.id,item.promotionPrice)"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1rem;" class="div-space"></div>
    <com-footer class="com-fix-b"></com-footer>
  </div>
</template>
<script type="text/javascript">
  import comFooter from "src/components/com/comfooter.vue"
  import {my} from 'src/assets/statusData.js'
  export default{
    props: ["sData"],
    data(){
      return{
        showNew:'',
        collectNum:'',
        canBuy:'',//可购买次数
        qualiProgress:'',//分享次数
        point:'',//积分
        myData:"",
        mySData:my,
        productData:[],
        myDataAW:'',
      }
    },
    components:{comFooter},
    methods:{
      goBuy(id){
        m$.sessionStores.set('originListGoodsItem',{pageNum:this.pageNum,productData:this.productData,pageScrollPosition:window.scrollY})
        window.location.href = (`#/goodsDetail/${id}`);
        // console.log(window.location.host)
        // var newPath=window.location.href.split("#")[0]
        // window.open(newPath+`#/goodsDetail/${id}`);
      },
      getUserInformation(){
        this.getAjax(this.url.getUserInformation,{},(res)=>{
          if(res.code==200){
          this.myDataAW = res.data;
          console.log(this.myDataAW)
        }
      })
      },
      imgto(){
        window.location.href = (`#/setpage`);
      },
      goCar(id,promotionPrice) {
        //productId 商品ID  quantity 数量默认为1
        var _this = this;
        this.postAjax(this.sData.url.saveCartUrl, {
          productId: id,
          quantity: 1,
          price: promotionPrice
        }, (res) => {
          if (res.message == 'ok') {
          this.getCarNumber();
          m$.template({
            val: '加入购物车<br>成功',
            time: 2000,
          })
        }
      })
      },
      getData(){
        this.postAjax(this.sData.url.getProductGroupShopVo,{
          status:'',
          groupType:2,
        },(res)=>{
          if(res.data&&res.data.data&&res.data.data.length>=1){
          this.groupType2 = res.data.data;
          setTimeout(function () {
            var swipe = new Swiper('.seckill>.swiper-container', {
              autoplay:2500
            });
          },10)
        }
      })
      },
      getDataThree(){
        this.postAjax(this.sData.url.getProductVoByTypeUrl, {
          businessTypeId: '',
          keywords:'' ,
          pageNum: 1,
          pageSize: '10',
          //priceType:3,
          groupType:3,
          status: '1',
          //isFilter:1
        }, (res) => {
          if (res.code == 200) {
          if( res.data.data.length==0){
            //  if(this.$route.params.id==29){this.nopro=true;document.getElementById('text_like').className='close'; return;}
            //  document.getElementById('text_like').className='';
            this.nopro=true;
            m$.sessionStores.set('noPro','0');
          }else{
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
            }
            this.productData = this.unique5(this.productData);
            if (this.productData.length>0&&this.productData.length%10==0) {
              var othis = this;
              this.pageNum++;
              m$.scroll(function () {
                othis.getData(othis.$route.params.id,0);
              })
            }
            else {
              m$.scroll(function () {

              })
            }}
        } else {
          m$.template({
            val: res.message,
            time: 1000
          })
        }

      })
      },
      unique5(array){
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (array[i].id === array[j].id) j = ++i;
          r.push(array[i]);
        }
        return r;
      },
      countCollections(){
        this.getAjax(this.url.countCollections,{},(res)=>{
          this.collectNum=res.data;
      })
      },
      //获取有效分享次数
      getUserShareTimes(){
        this.postAjax(this.url.getUserShareTimes,{shareType:1},(res)=>{
          this.qualiProgress=res.data;
        this.canBuy=res.data/10>=1?res.data/10:0;
      })
      },

      upDateImg(){

        let othis=this;
        if(!m$.dom('#myHeadInput')[0].value){
          return;
        }
        m$.template({
          val:'',
        })
        myImage(m$.dom('#myHeadInput')[0],{width:300,quality:1},(data)=>{
          othis.postAjax(othis.url.updateHeadIcon,{
          headImage:data.split(',')[1]

        },(res)=>{
          if(res.code==200){
          othis.getAjax(othis.url.my,{},(res)=>{
            if(res.code==200){
            othis.myData=res.data;
          }
        else{
            m$.template({
              val:res.message,
              time:1200,
            })
          }
        })
          // othis.myData.headIcon=data;
          m$.template({
            val:'头像上传<br>成功',
            time:1000
          })
        }
      else {
          m$.template({
            val:res.message,
            time:1000
          })
        }
      })
      })
      },
      logout(){
        this.postAjax(this.url.logout,{},(res)=>{
          var othis=this;
        if(res.code==200&&res.message=='ok'){
          m$.template({
            val:'操作<br>成功',
            time:1200,
            fn:function(){
              m$.localStrages.remove('yxdyb')
              othis.$router.push('/login/0')
            }
          })
        }
      })
      }
    },
    created(){

      //获取积分
      this.getAjax(this.url.my,{},(res)=>{
        if(res.code==200){
        this.myData=res.data;
        this.postAjax(this.url.getPoints,{},(res)=>{
          this.point=res.data;
      })
        this.getUserInformation();
        this.getDataThree();
        //获取收藏次数
        this.countCollections();
        this.getAjax(this.url.getPromptStatus,{},(res)=>{
          if(res.data=='0'){
          this.showNew=false;
        }
        if(res.data=='1'){
          this.showNew=true;
        }
      })
        //获取试用次数
        this.getUserShareTimes();
      }
    else{
        m$.template({
          val:res.message,
          time:1200,
        })
      }
    })
      document.title=this.mySData.title;
      m$.documentTitle(this.mySData.title)
    }
  }
</script>
<style scoped lang="less">
  @import "my";
</style>
