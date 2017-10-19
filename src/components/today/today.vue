<template>
    <div>
      <div v-if='isBanner' class="banner">
        <img :src="isBanner">
      </div>
      <div v-if="notice" v-text="notice" class="notice"></div>
      <router-link class="car-Img" to="/productCar" tag="div" v-if="newChangeYangbinCode">
        <img src="../../assets/car3.png"/>
        <span class="car-number" :class="{'car-number-more':carNumber=>99}" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'"></span>
      </router-link>
        <div v-if="productData.length>=1" id="seckill-goods-details">
            <div class="product" v-for='item in productData' v-if="$route.params.type==0" @click="goBuy(item.id)">
                <div class="product-com product-img" @click="goBuy(item.id)">
                    <img :src="item.thumbnail">
                </div>
                <div class="product-com product-details">
                  <section>
                    <p class="product-details-name" @click="goBuy(item.id)">{{item.name}}</p>
                    <div class="product-details-info">{{item.digest}}</div>
                  </section>

                    <div class="product-details-price">
                        <span>￥ </span>
                        <span class="big-price">{{item.bargainPrice?item.bargainPrice:'?'}}</span>
                        <span class="del-price" >￥<s>{{item.oldPrice?item.oldPrice:"?"}}</s></span>
                    </div>
                    <div class="product-details-amount">
                        <div class="amount">
                            <span v-if='true'>{{item.sail ? '商品低至'+item.sail+'折':''}}</span>
                            <span v-if='!true' class="progress"><i><span>57%</span></i></span>
                        </div>
                        <div class="button">
                            <button v-if='0' class="fl-button" disabled>抢光了</button>
                            <button v-if='1' class="tr-button" @click="goBuy(item.id)">去购买</button>
                        </div>
                    </div>
                </div>
            </div>
          <div class="product" v-for='item in productData' v-if="$route.params.type==1" @click="goBuy(item.productId)">
            <div class="product-com product-img" @click="goBuy(item.productId)">
              <img :src="item.thumbnail">
            </div>
            <div class="product-com product-details">
              <section>
                <p class="product-details-name" @click="goBuy(item.productId)">{{item.productName}}</p>
                <div class="product-details-info">{{item.digest}}</div>
              </section>

              <div class="product-details-price">
                <span>￥ </span>
                <span class="big-price">{{typeof item.price=='number'?item.price:'?'}}</span>
                <span class="del-price" >￥<s>{{typeof item.oldPrice=='number'?item.oldPrice:"?"}}</s></span>
              </div>
              <div class="product-details-amount">
                <div class="amount">
                  <span v-if='true'>{{item.remark ? item.remark:''}}</span>
                  <span v-if='!true' class="progress"><i><span>57%</span></i></span>
                </div>
                <div class="button">
                  <button v-if='0' class="fl-button" disabled>抢光了</button>
                  <button v-if='1' class="tr-button" @click="goBuy(item.productId)">去购买</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        props: ['sData'],
       data(){
           return {
               productData:[
                   // {name:'鱼子酱',oldPrice:'19',amount:"2",thumbnail:'1',sail:'4'},
                   // {name:'慧儿面包',oldPrice:'29',amount:"2",thumbnail:'2',sail:'5'},
                   // {name:'彬彬饼干',oldPrice:'39',amount:"2",thumbnail:'2',sail:'5'},
                   // {name:'花花洗洁精',oldPrice:'9',amount:"2",thumbnail:'2',sail:'5'},
               ],
             isBanner:'',
             notice:'',
             carNumber:'',
             priceCount:'',
           }
       },
        methods:{
          getCarNumber(){
            this.getAjax(this.url.isLogged,{},(res)=>{
              if(res.code==200&&res.data==true){
                this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
                  if(res.code=200){
                    this.priceCount=res.data.priceCount;
                    this.carNumber = res.data.quantityCount;
                  }
                });
              }
            })
          },
            goBuy(id){
              m$.sessionStores.set('originListGoodsItem',{pageNum:'',productData:this.productData,pageScrollPosition:window.scrollY})
              window.location.href=(`#/goodsDetail/${id}`);
            },
            getData(){
                this.postAjax(this.sData.url.getProductVoByTypeUrl,{priceType:2,status:'1'},(res)=>{
                    // this.productData = res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        //groupType=2为 特价商品
                        if(res.data.data[i].groupType==2){
                           this.productData.push(res.data.data[i])
                        }
                    }
                  if(m$.sessionStores.get('originListGoodsItem')){
                    setTimeout(function () {
                      window.scrollTo(0,m$.sessionStores.get('originListGoodsItem').pageScrollPosition)
                    },50)
                  }
                  if(this.productData.length==0){
                    this.notice='暂无数据';
                  }
                })
            },
          postProductGroupDetailShopVoById(){
            this.postAjax(this.url.getProductGroupDetailShopVoById,{groupId:this.$route.params.id},(res)=>{
              if(res.data){
                if(res.data.groupImg){
                    this.isBanner=res.data.groupImg;
                }
                if(res.data.detailVos && res.data.detailVos.length>=1){
                  this.productData=res.data.detailVos;
                  if(m$.sessionStores.get('originListGoodsItem')){
                    setTimeout(function () {
                      window.scrollTo(0,m$.sessionStores.get('originListGoodsItem').pageScrollPosition)
                    },50)
                  }
                  if(this.productData.length==0){
                    this.notice='暂无数据';
                  }
                }
              }
            })
          }
        },
      beforeRouteEnter(to,from,next){
        var originListGoodsItem=m$.sessionStores.get('originListGoodsItem')
        if(from.name=="goodsDetail"){
          next()
        }
        else {
          m$.sessionStores.remove('originListGoodsItem');
          next()
        }
      },
        created () {
          this.getCarNumber();
          if(this.$route.params.type=='0'){
              //控制是否显示banner
                this.getData();
              this.isBanner='';
          }
          else if(this.$route.params.type=='1'){

           this.postProductGroupDetailShopVoById();
          }
          else {}
            m$.documentTitle("今日特价");
        }
    }
</script>
<style lang="less" scoped>
    //@import "${fileName}";
    .car-Img {
      position: fixed;
      bottom: 1rem;
      right: 0.3rem;
      height: 0.6rem;
      width: 0.6rem;
      z-index: 3;
      cursor: pointer;
      > img {
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
        top: 0.2rem;
        margin-left: 0.05rem;
      }
      .car-number-more {
        padding: 0 0.08rem;
      }
    }
    .banner{
      height: 3rem;
      margin-bottom: .1rem;
      img{
        font-size: 0;
        width: 100%;
        height: 100%;
        left:0;
      }
    }
    .notice{
      text-align: center;
      padding-top: 2rem;
      color: #d2d2d2;
      font-size: 0.36rem;
    }
    #seckill-goods-details{
        margin-top: 0;
        .product{
            font-family:PingFangSC-Regular;
            width:7.5rem;
            margin-bottom: .1rem;
            background:#ffffff;
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.10);
            height:2.80rem;
            display: -webkit-flex;
            padding: .1rem;
            .product-com{

            }
            .product-img{
                flex: 260;
                width: 2.6rem;
                height: 2.6rem;
                img{
                  max-height: 2.6rem;
                 width: 2.6rem;
                }
            }
            .product-details{
                flex: 490;
                padding-left: .2rem;
              section{
                height:1.16rem ;
              }
              .product-details-name {
                text-overflow:ellipsis;
                overflow:hidden;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                margin-top: .18rem;
                font-size: .3rem;
                color: #474747;
                letter-spacing: 1.73px;
                /*line-height: .3rem;*/
                min-height: 0.25rem;
                _height: 0.25rem;
              }
              .product-details-info {
                margin-top: .1rem;
                max-height: .64rem;
                font-size: .26rem;
                color: #868686;
                letter-spacing: .01rem;
                line-height: .32rem;
              }
              .product-details-price {
                display:inline-block;
                height: .48rem;
                min-height: .48rem;
                font-size: .24rem;
                // margin-top: .21rem;
                    span{
                        color:#fb4874;
                    }
                    .big-price{
                        font-size: .48rem;
                        letter-spacing:.02rem;
                        line-height:.48rem;
                    }
                    .del-price{
                        color:#9a9a9a;
                    }
                }
                .product-details-amount{
                    float:right;
                    margin-top: .55rem;
                    .amount{
                        flex: 320;
                        font-size: .24rem;
                        line-height: .54rem;
                        color: #b0aeae;
                        letter-spacing:.02rem;
                        .progress{
                            background: #ececec;
                            display: inline-block;
                            width: 2.4rem;
                            height: .2rem;
                            position: relative;
                            border-radius: .1rem;
                            >i{
                                display: inline-block;
                                width: 40%;
                                height: .2rem;
                                background:#fb4874;
                                z-index: 3;
                                position: absolute;
                                border-top-left-radius: .1rem;
                                border-bottom-left-radius: .1rem;
                                >span{
                                    height: .2rem;
                                    line-height: .2rem;
                                    font-size: .24rem;
                                    position: absolute;
                                    right: -.75rem;
                                    top:0.03rem;
                                }
                            }

                        }
                    }
                    .button{
                        font-size: .24rem;
                        flex: 150;
                        line-height: .54rem;
                        >button{
                            width: 1.4rem;
                            height: .54rem;
                            margin-right: .1rem;
                            border-radius:.06rem;
                        }
                        .fl-button{
                            background:#e0e0e0;
                            color:#b1b1b1;
                        }
                        .tr-button{
                            background:#fb4874;
                            color:#fff;
                        }
                    }

                }
            }
        }
    }
</style>
