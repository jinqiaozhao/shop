/*
*作者---杨彬
*
*/
<template>
    <div class="index">
        <com-search class="indexSearch com-div-center-ab " @getSearchValue="gotoNextPage"></com-search>
        <div class="index-banner">
          <div class="swiper-container" v-if="bannerData">
            <div class="swiper-wrapper">
              <a :href="oitem.linkurl?oitem.linkurl:'/'" class="swiper-slide" v-for="(oitem,oindex) in bannerData" :key="oindex">
                <img :src="oitem.image">
              </a>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="comspace"></div>
        <index-nav :navData="statusData.nav"></index-nav>
        <div class="comspace"></div>
      <!--头条-->
      <head-line></head-line>
      <div class="comspace"></div>
      <index-list></index-list>
      <!--秒杀组-->
      <div class="comspace"></div>
      <time-warp :sData='sData'></time-warp>
      <div class="comspace"></div>
          <!-- 积分组 -->
        <!-- <credits :sData='sData'></credits> -->
        <!-- <div class="comspace"></div> -->



      <div class="comspace"></div>
      <pattern-a></pattern-a>
      <div class="banner-love">
        <img src="http://ovn5haih3.bkt.clouddn.com/cosmeticIndexBanner.jpg" @click="$router.push('/beauty')"/>
        <img src="../../assets/indexB/Boutique.png" />
      </div>
      <pattern-b></pattern-b>
      <div class="banner-love">
        <img src="http://ovn5haih3.bkt.clouddn.com/%E6%BD%AE%E5%93%81%E5%89%8D%E7%BA%BF.jpg" @click="$router.push('/newProducts')"/>
        <div class="gotoshop">
        	<img src="../../assets/indexB/Center.png" />
        	<div class="span-div" @click='gotoshop'><img src="http://ovn5haih3.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20170908111645.png" /><div class="span1">更多商品 ></div></div>
        </div>
      </div>
      <!--column栏目版块-->
        <!--<block></block>-->
      <!--recommend单品推荐-->
      <!--<recommend v-if="groupType3" >-->
      <!--</recommend>-->
      <div class="recommend">
      <!--<div class="top-wrap">-->
        <!--<img-->
          <!--src="http://orz6nce3e.bkt.clouddn.com/recommend.png"-->
          <!--alt="column"/>-->
        <!--<span>单品推荐</span>-->
        <!--<div class="more">-->
          <!--<a href='#/goodsItem/0'>-->
            <!--<span>全部商品</span>-->
          <!--</a>-->
          <!--<img-->
            <!--src="http://orz6nce3e.bkt.clouddn.com/go_more.png"-->
            <!--alt="more"/>-->
        <!--</div>-->
      <!--</div>-->
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
      </div>
		 <!--modal-->
        <com-footer class="com-fix-b" style="z-index:10;"></com-footer>

         <!--<div id="in_modal" v-show="show" >
        	<img src="../../assets/modal_index.png" class="animated swing">
        	<div @click="close" class="konw"></div>
        	<router-link to="/decoIndex" tag="div" class="rou_link_dec">
    		</router-link>
        </div>-->
      <jump-upMZ v-if="isJump"></jump-upMZ>
    </div>
</template>
<script type="text/javascript">
    import jumpUp from 'src/components/com/jump/jumpup.vue';
    import jumpUpMZ from 'src/components/com/jump/jumpUpMZ.vue';
    import comSearch from 'src/components/com/comSearch.vue';
    import indexNav from 'src/components/index/indexNav.vue';
    import headLine from 'src/components/index/headline.vue';
    import indexList from 'src/components/index/indexListCosmetic.vue';
    import indexSeckill from 'src/components/index/indexSeckill.vue';
    import block from 'src/components/index/block.vue';
    import recommend from 'src/components/index/recommend.vue';
    import timeWarp from 'src/components/index/timeWarp.vue';
    import {index} from 'src/assets/statusData.js';
    import comFooter from "src/components/com/comfooter.vue"
    import patternA from 'src/components/index/patternA.vue';
    import patternB from 'src/components/index/patternB.vue';
  //  import credits from 'src/components/index/credits.vue';//积分组 4
    export  default {
      props: ["sData"],
        data(){
            return{
              isJump:'true',
              statusData:index,
              groupType2:'',
              productData:[],
              bannerData:''
            }
        },
        components:{
            /*credits,*/comSearch,indexNav,indexList,indexSeckill,timeWarp,comFooter,headLine,block,recommend,patternA,patternB,jumpUp,jumpUpMZ,
        },
      beforeCreate(){
        if(m$.sessionStores.get('authWXRegistLogin')){
          var url=location.href;
          var openId;
          url.indexOf('?')>-1?openId= location.href.split('?')[1].split('=')[1]:openId='';
          m$.sessionStores.set('openId',openId)
        }else{
          this.postAjax(this.url.authWXRegistLogin,{url:window.location.href},(res)=>{
            if(res.code==200){
            //console.log(res.data)
            window.location.href=res.data
            m$.sessionStores.set('authWXRegistLogin','1')
          }
        })
        }

      },
        created(){
//          if(m$.sessionStores.get('authWXRegistLogin')){
//
//          }else{
//            this.authWXRegistLogin();
//          }
          m$.sessionStores.remove('indexSearch');
            m$.documentTitle("宝宝余商城");
            this.getData();
            this.getDataThree();
            if( m$.sessionStores.get('goCouponCenter')){this.isJump=false;}else{this.isJump=true;}
        },
      mounted(){
        //if(sessionStorage.pagecount){sessionStorage.pagecount=Number(sessionStorage.pagecount)+1; this.show=false;}else{sessionStorage.pagecount=1;}
        this.getIndexBanner();
      },
      methods:{
//        authWXRegistLogin(){
//          this.postAjax(this.url.authWXRegistLogin,{url:window.location.href},(res)=>{
//            if(res.code==200){
//            //console.log(res.data)
//            window.location.href=res.data
//            m$.sessionStores.set('authWXRegistLogin','1')
//          }
//        })
//        },
      	gotoshop(){window.location.href = (`#/goodsItem/0`);},
        goBuy(id){
          m$.sessionStores.set('originListGoodsItem',{pageNum:this.pageNum,productData:this.productData,pageScrollPosition:window.scrollY})
          window.location.href = (`#/goodsDetail/${id}`);
        },
        goCar (id,promotionPrice) {
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
    getCarNumber(){
      this.getAjax(this.url.isLogged,{},(res)=>{
        if(res.code==200&&res.data==true){
        this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
          if(res.code=200){
          this.carNumber = res.data.quantityCount;
        }
      });
    }
    })
    },
        getIndexBanner(){
          this.getAjax(this.url.getBannerShopVo,{bannerType:0},(res)=>{
           if(res.data&&res.data.length>=1){
             this.bannerData=res.data;
             setTimeout(function () {
               var swiper1 = new Swiper('.index-banner>.swiper-container', {
                 pagination: '.index-banner .swiper-pagination',
                 paginationClickable: true,
                autoplay:2500
               });
             },10)
           }
          })
        },
        gotoNextPage(val){
          m$.sessionStores.set('indexSearch',val.val);
          this.$router.push('/goodsItem/0');
        },
        getDataSkill(){
                    this.postAjax(this.sData.url.getProductGroupGetShopVo,{
                    },(res)=>{
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

        goToday(oid){
          window.location.href=(`#/today/1/${oid}`)
        },/*close(){
        	this.show=false;
        }*/
      },
    watch: {
      '$route': function (val) {
        this.pageNum = 1;
        // this.productData = [];
        // this.getData(val.params.id,0)
        int=window.clearInterval(int)

      }
    },

    }</script>
<style scoped lang="less">
    @import "index";
    .recommend:after{content: '';display: block;clear: both}
    .recommend{
    .top-wrap{
      background: #fff;
      width: 100%;
      height:0.75rem;
      //color:#fb4874;
      color:#2757BE;
    img{
      width: 0.55rem;
      margin:0.1rem  0.1rem;
      float: left
    }
    span{
      float: left;
      padding-top: 0.15rem;
      font-size: 0.3rem;
      }
    .more{
      float:right;
    //  border: 1px solid #fb4874;
      border: 1px solid #2757BE;
      border-radius: 3px;
      margin-top:0.18rem;
      margin-right:0.35rem;
    span{
      padding-top: 0;
      font-size: 0.2rem;
      font-weight: normal;
      padding-left: 0.1rem;
      padding-bottom: 0.03rem;
    }
    img{width: 0.2rem;margin:0.05rem;}
    }
    }
    }
    /*商品部分*/
    #seckill-goods-details {

    }
    #seckill-goods-details:after{
      content: '';
      display: block;
      clear: both;
    }
    .t-product:nth-child(even){margin-left: 0.05rem;}
    .t-product {
      position:relative;
      height: 5rem;
      border-radius: 0.1rem;
      padding: 0.1rem;
      font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
      float:left;
      width:49.5%;
      background-color: #FFF;
      font-size: 0.26rem;
      margin-top:.05rem;
    .t-product-com{
    p{
      padding-left:.16rem;
      text-overflow:ellipsis;
      overflow:hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    img {
      max-height: 100%;
      max-width: 100%;
    }
    .t-product-details-price{
      padding-left:.16rem;
      display: inline-block;
      color: #fb4874;
      font-size: .3rem;
      margin-top: .08rem;
    }
    .big-price {
      font-size: .33rem;
      letter-spacing: 0rem;
      line-height: .3rem;
      /*font-weight:bolder;*/
    }
    .del-price {
      font-size: .16rem;
      line-height: .1rem;
      color: #9a9a9a;
    }
    .t-newtext {
      margin-top:.02px;
      color: #5C5C5C;
      padding-left: 0.16rem;
    span{font-size: 0.16rem;}
    }
    .product-details-amount {
      position: absolute;
      width: 0.43rem;
      display:inline-block;
      right:0.1rem;
    img {
      max-height: 100%;
      max-width: 100%;
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .fl-button {
      background: #e0e0e0;
      color: #b1b1b1;
    }
    .tr-button {
      background: transparent;
      color: #fff;
    }
    }
    }
    }
    .time-warp {
      display: flex;
      font-size: 0;
      margin-bottom: 0.2rem;
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
            height: 0.5rem;
          }
          > .text {
            font-size: 0.3rem;
            //color: #fe4572;
            color: #2757BE;//蓝色
            letter-spacing: 0px;
            text-align: center;
            display: inline-block;
            margin: 0 0.18rem 0 0.1rem;

          }
          > .time-span {
            display: inline-block;
            background: #434343;
            padding: 0 0.03rem;
            min-height: 0.38rem;
            _height: 0.38rem;
            min-width: 0.24rem;
            font-size: 0.3rem;
            color: #ffffff;
            letter-spacing: 0px;
            line-height: 0.38rem;
            text-align: center;
            margin-right: 0.04rem;
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
            width: 0.12rem;
          }
        }
        .goMoreProduct {
           border: 1px solid #2F5EC1;
          //background: #fb4874;
          border-radius: 1rem;
          _width: 1.6rem;
          min-width: 1.6rem;
          padding: 0 0.15rem 0.1rem 0.12rem;
          height: 0.36rem;
          line-height: 0.3rem;
          font-family: PingFangSC-Regular;
          font-size: 0.2rem;
        //  color: #ffffff;
          color: #2757BE;
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
</style>
