<template>
  <div id="box">
    <div class="sear">
      <com-search class="indexSearch com-div-center-ab" @getSearchValue='getSearchVal'></com-search>
      <!--<img src="../../assets/com/select.png" alt="" style="position: absolute;left: 0.15rem;height: 0.6rem;top: 0.2rem;" v-show="show" @click="change('1')"/>-->
      <!--<img src="../../assets/com/close.png" alt="" style="position: absolute;left: 0.15rem;height: 0.6rem;top: 0.2rem;" v-show="!show" @click="change('2')"/>-->
    </div>
    <!--商品分类导航-->
    <div id='goods-type-nav'>
      <router-link class="car-Img" to="/productCar" tag="div" v-if="newChangeYangbinCode">
        <img src="../../assets/car3.png"/>
        <span class="car-number" :class="{'car-number-more':carNumber=>99}" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'"></span>
      </router-link>
      <header class="headNav swiper-container" v-show="show">
        <div class="swiper-wrapper">
          <!--<img v-bind:src="url.url1" alt="" v-for="url in nav_img" v-if="oitem.name"/>-->
          <div class="allItem swiper-slide" v-for="(oitem,ind) in nav" :key='ind' @click="getSearchVal(searchnull)">
            <router-link class="navItem" tag="div"
                         :to="{path:oitem.url}" active-class="navIsSelect">
                <img src="../../assets/com/all_sel1.png" alt="" v-if="oitem.name=='全部商品'&& route!=0"/>
                <img src="../../assets/com/all_sel2.png" alt="" v-if="route==0 && oitem.name=='全部商品'"/>
                <img :src="oitem.icon1" alt="" v-if="oitem.id!=route" />
                <img :src="oitem.icon2" alt=""  v-if="oitem.id==route"/>
              {{oitem.name}}
            </router-link>
            <div @click="willGo(oitem.url)" class='navItem com-div-middle-ab itemC' ></div>
          </div>
        </div>
      </header>
    </div>
    <img src="http://orz6nce3e.bkt.clouddn.com/pro_all.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==0"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/digital.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==1"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/foods.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==2"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/life.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==3"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/chara.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==4"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/gift.jpg" alt="" style="width: 100%;position:relative;top:0.13rem;" v-if="route==29"/>
    <!--品牌-->
    <brand @getSearchValue='getSearchVal'></brand>

    <div style="font-size: 0.3rem;color:#D94E6A;padding: 0.15rem;" v-show="nopro">
      <i >对不起，没有找到该类商品。</i>
      <div style="margin-top: 0.15rem;font-weight: bolder" id="text_like">您可能会喜欢：</div>
    </div>
    <div id="seckill-goods-details">
      <div class="t-product" v-for='item in productData'>
        <div class="t-product-com t-product-img" @click="goBuy(item.id)">
          <div class="t-grouptype" >
            <span v-if="item.groupType==1">
              <span>秒杀</span>
            </span>
            <span v-if="item.groupType==2">
              <span>特价</span>
            </span>
            <span v-if="item.groupType==4">
              <span>积分</span>
            </span>
          </div>
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
            <span class="big-price">{{item.bargainPrice?item.bargainPrice:item.oldPrice}}</span>
            <span class="del-price" v-if='0'>￥<s>{{item.oldPrice}}</s></span>
          </div>
          <div class="t-product-details-price" v-if='item.promotionPrice'>
            <span>￥ </span>
            <span class="big-price">{{parseInt(item.bargainPrice?item.bargainPrice:item.promotionPrice)}}</span>
            <span style="font-size: 0.25rem">{{item.bargainPrice?
              item.bargainPrice.slice(item.bargainPrice.indexOf('.'),item.bargainPrice.indexOf('.')+3):
              item.promotionPrice.slice(item.promotionPrice.indexOf('.'),item.promotionPrice.indexOf('.')+3)}}</span>
            <span class="del-price" v-if='1'>￥<s>{{item.oldPrice}}</s></span>
          </div>
          <div class="product-details-amount ">
            <div class="button">
              <button v-if='0' class="fl-button" disabled>抢光了</button>
              <!--<button v-if='item.groupType=="4"' class="tr-button" @click="goBuy(item.id)">-->
              <button v-if='item.groupType=="4"' class="tr-button" @click="goBuy(item.id)">
                <img src="../../assets/car4.png"/>
              </button>
              <button v-if='item.groupType!="4"'  class="tr-button">
                <img src="../../assets/car4.png"  @click="goCar(item.id,item.promotionPrice,item.category)"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--提示下拉框-->
    <div id="info" v-show="binfo">
      下拉加载更多...
    </div>
    <div style="height: 0.5rem"></div>
    <com-footer class="com-fix-b" style="z-index:10;"></com-footer>

  </div>
</template>
<script type="text/javascript">
  import comSearch from 'src/components/com/comSearch.vue';
  import brand from 'src/components/com/brand.vue';
  import comFooter from "src/components/com/comfooter.vue"
  export default{
    props: ['sData'],
    components: {comSearch,brand,comFooter},
    data(){
    return {
      binfo:true,
      nopro:false,
      searchnull:{type:'1',val:''},
      productData: [],
      nav: [],
      pageNum: 1,
      ofg:0,
      carNumber:'',
      route:'',
      brand:[],
      searchVal:'',
      show:true
    }
  },
  methods: {
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
    willGo(ourl){
      this.$router.replace(ourl)
    },
    getData(businessTypeId, type){
      //如果已经有商品加载完成。删除这个元素。
      var btn=document.getElementById('buttom_info');
      if(btn){
        var box=document.getElementById('box');
        box.removeChild(btn);};
//      m$.template({
//        val: '',
//        time: 100
//      });
      // this.ofg++;
      if (type) {
        // type为搜索按钮，
        this.productData = [];
        this.pageNum = 1;
      }
      m$.scroll(function () {

      });
      this.postAjax(this.sData.url.getProductVoByTypeUrl, {
        businessTypeId: businessTypeId > 0 ? businessTypeId : '',
        keywords: this.searchVal,
        pageNum: this.pageNum,
        pageSize: '10',
        priceType:4,
        status: '1',
    //  isFilter:1
      }, (res) => {
        if (res.code == 200) {
      /*加载完成给出提示*/
//      var pro=document.getElementsByClassName('t-product')
//      console.log(pro.length)
      if(res.data.total<=res.data.pageNum*res.data.pageSize){
        var btn=document.getElementById('buttom_info');
        if(res.data.total>0 && res.data.total<=res.data.pageSize && btn){
            this.binfo=false;
         }else{
          this.binfo=false;
          var box=document.getElementById('box');
          var btn = document.createElement('div');
          btn.id="buttom_info";
         btn.style.fontSize='0.3rem';
         btn.style.fontWeight='bold';
          btn.style.padding='0.1rem';
          btn.style.textAlign='center';
          btn.style.background='#fff';
        btn.style.color='#FB4874';
        btn.style.opacity='0.8';
        btn.style.borderRadius='5px';
        btn.innerHTML='所有商品加载完成'
        box.appendChild(btn);}
      }
      else{
        this.binfo=true;
        var btn=document.getElementById('buttom_info');
        if(btn){
          var box=document.getElementById('box');
          box.removeChild(btn);
        }
      }
      /*加载完成给出提示end*/
        if( res.data.data.length==0 &&this.pageNum==1){
          if(this.$route.params.id==29){this.nopro=true;}
          this.nopro=true;
          m$.sessionStores.set('noPro','0');
          this.getDataThree();
        }else{
        for (var i = 0; i < res.data.data.length; i++) {
          this.productData.push(res.data.data[i]);
        }
        this.productData = this.unique5(this.productData);
        if (this.productData.length>0&&this.productData.length%10==0 &&this.productData.length!=res.data.total) {
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
  goBuy(id){
    m$.sessionStores.set('originListGoodsItem',{pageNum:this.pageNum,productData:this.productData,pageScrollPosition:window.scrollY})
    window.location.href = (`#/goodsDetail/${id}`);
    // console.log(window.location.host)
    // var newPath=window.location.href.split("#")[0]
    // window.open(newPath+`#/goodsDetail/${id}`);
  },
  goCar (id,promotionPrice,category) {
    if(category!=0){
        window.location.href = (`#/goodsDetail/${id}`);
        return;
    }else{}
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
  getSearchVal(val){
    if(val.type==0){
      this.$router.push('/goodsItem/0');
    }
    if( m$.sessionStores.get('noPro')=='0'){this.nopro=false; m$.sessionStores.remove('noPro')}
    this.searchVal = val.val;
    this.getData(this.$route.params.id, val.type)
  },

  getCarNumber(){
    this.getAjax(this.url.isLogged,{},(res)=>{
      if(res.code==200&&res.data==true){
      this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
        if(res.code=200){
        this.carNumber = res.data.quantityCount
      }
    });
  }
  })
  },
  },
  beforeRouteEnter(to,from,next){
    var originListGoodsItem=m$.sessionStores.get('originListGoodsItem')
    // console.log(originListGoodsItem);
    // console.log(from)
    if(from.name=="goodsDetail"){
      next(vm => {
        vm.pageNum=originListGoodsItem.pageNum;
      vm.productData=originListGoodsItem.productData;
    })
  }
  else {
    m$.sessionStores.remove('originListGoodsItem');
    next()
  }
  },
  beforeDestory(){
    m$.sessionStores.remove('indexSearch');
    m$.scroll(function () {

    })
  },
  mounted(){
    if(m$.sessionStores.get('originListGoodsItem')){
      setTimeout(function () {
        window.scrollTo(0,m$.sessionStores.get('originListGoodsItem').pageScrollPosition)
      },10)
    }
  },
  created(){
    m$.documentTitle("商品列表");
    this.getCarNumber();
    this.searchVal = m$.sessionStores.get('indexSearch') ? m$.sessionStores.get('indexSearch') : '';
  //  this.getAjax(this.sData.url.getAllBusinessTypeUrl, {isFilter:1}, (res) => {
   this.getAjax(this.sData.url.getAllBusinessTypeUrl, {}, (res) => {
      //配置导航栏
     console.log(res.data)
      for (var i = 0; i <res.data.length ; i++) {
      var ii = {};
      ii.name = res.data[i].name//导航名字
      ii.url = `/goodsItem/${res.data[i].id}`;//导航地址
      ii.id = res.data[i].id;
      ii.icon1=res.data[i].icon1;
      ii.icon2=res.data[i].icon2;
      this.nav.push(ii)
    }
    var ii = {};
    ii.name = '全部商品'//导航名字
    ii.url = `/goodsItem/0`;//导航地址
    ii.id = '';
    this.nav.unshift(ii);
    setTimeout(function () {
      var swipe2 = new Swiper('#goods-type-nav .swiper-container', {
        // autoplay: 2500,
        slidesPerView: 5,
        spaceBetween: 0,
      });
    }, 100)
  });
  //获取商品列表
  var othis=this;
  if(m$.sessionStores.get('originListGoodsItem')){
    if(othis.productData.length%10==0){
      othis.pageNum++;
      m$.scroll(function () {
        othis.getData(othis.$route.params.id,0);
      })
    }
  }
  else {
    othis.getData(othis.$route.params.id,0);
  }

  },
  watch: {
    '$route': function (val) {
      this.pageNum = 1;
      this.productData = [];
      this.nopro=false;
     // this.getData(val.params.id,0)
      this.route=val.params.id;
    }
  },

  }
</script>
<style lang="less" scoped>
.t-grouptype{
  >span{
    width: 0;
    height: 0;
    transform: rotate(135deg);
    border-top: 0.8rem solid #FB4874;
    border-left: 0.8rem solid transparent;
    border-right: 0.8rem solid transparent;
    position: absolute;
    color: #fff;
    border-radius: 2px;
    left: -0.5rem;
    top: -0.15rem;
    >span{
      position:absolute;
      transform: rotate(-135deg);
      top:-0.7rem;
      left:-0.35rem;
      width: 0.6rem;
      z-index: 10;
      font-size: 0.25rem;
    }
  }
}
  #info{
    font-weight: bolder;
    padding:0.1rem;
    background-color:#fff;
    opacity:0.8;
    width:100%;
    text-align: center;
    position:fixed;
    bottom:0;
    font-size: 0.3rem;
    color:#FB4874;
  }
  .close{
    display:none;
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
  .car-Img {
    position: fixed;
    bottom: 1rem;
    right: 0.3rem;
    height: 0.7rem;
    width: 0.7rem;
    z-index: 3;
    cursor: pointer;
    opacity:0.5;
  > img {
      position: absolute;
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
  }
  .headNav{
    font-size: 0;
  transition: height 1s;
  >div{
     text-align: center;
     background-color: #fff;

  .allItem{
    position: relative;
    padding:0.2rem 0;
    font-size: 0;
    img{width: 0.4rem;display:block;margin:0 auto 0.07rem;}
  }
  .itemC{
    z-index:3;

  }
  .navIsSelect~.itemC{
    border-bottom:none;
  }
  .navItem{
    padding:0.1rem 0;
    height: 0.99rem;
    width: 100%;
    font-family:PingFangSC-Regular;
    font-size:0.22rem;
    color:#5b5b5b;
    letter-spacing:0px;
    text-align:center;
  }
  .navIsSelect{
    border-bottom: 1px #fb4874 solid;
    color: #4c4c4c;
  }
  }
  }
  #box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  .sear {
    background: #f5f5f5;
    width: 7.50rem;
    height: 1rem;
  .indexSearch {
    position: absolute;
    top: 0.2rem;
  }
  }
  }

  #seckill-goods-details {
    margin-top: 0;
  }

  #goods-type-nav {
  //padding: 0 0.2rem;
    background-color: #fff;

  }
</style>
