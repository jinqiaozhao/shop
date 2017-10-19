<template>
  <div>
    <div class="banner-img">
      <img src="../../../assets/indexB/banner-tejia.png" alt="" >
    </div>
    <div class="banner">
      <div  class="active"@click="searchPro(i,$event)" v-for="(v,i) in groupType2" v-if="i>2 && i<7">{{v.name}}</div>
      <!--<div @click="searchPro(1,$event)">好玩的</div>-->
      <!--<div @click="searchPro(2,$event)">好用的</div>-->
    </div>
    <div class="t-pro-wrap">
      <div class="t-pro" v-for="(v,i) in productData">
        <!--<div class="collect-img">-->
        <!--<img src="../../assets/index_nextpage/collect00.png" alt="" v-if="isCollect==0 " @click="collect(v.id)">-->
        <!--<img src="../../assets/index_nextpage/colloec01.png" alt="" v-if="isCollect==1"  @click="collect(v.id)">-->
        <!--</div>-->
        <div class="t-pro-content">
          <div class="t-pro-img">
            <img :src="v.thumbnail" alt="" @click="$router.push('/goodsDetail/'+v.productId)">
          </div>
          <div class="t-pro-det" @click="$router.push('/goodsDetail/'+v.productId)">
            <div class="t-name" v-text="v.productName">无线蓝牙耳机</div>
            <div class="t-digst" v-text="v.digest">本款耳机采用。。</div>
            <div class="t-price">
              <span>促销价￥</span><span v-text="v.price.toFixed(2)">668</span>
            </div>
          </div>
        </div>
        <div class="gobuy">
          <img src="../../../assets/index_nextpage/gobuy.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>
<script  type="text/javascript">
  export default {
    props: ['sData'],
    data(){
      return{
        pageNum:'1',
        productData:[],
        isCollect:'0',
        groupType2:[],
      }
    },
    methods:{
      searchPro(i,e){
        var div=e.target;
        console.log(this.groupType2)
        if(i==3){
          this.productData=this.groupType2[i].detailVos
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.nextElementSibling.className='';
        }else if(i==4){
          this.productData=this.groupType2[i].detailVos
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.previousElementSibling.className='';
        }else if(i==5){
          this.productData=this.groupType2[i].detailVos
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
        }else{
          this.productData=this.groupType2[i].detailVos
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.previousElementSibling.className='';
        }
        div.className='active';
      },
      getDataTwo(){
        this.postAjax(this.sData.url.getProductGroupShopVo,{
          status:'',
          groupType:2,
        },(res)=>{
          if(res.data&&res.data.data&&res.data.data.length>=1){
          this.groupType2 = res.data.data;
          console.log(this.groupType2)
          setTimeout(function () {
            var swipe = new Swiper('.seckill>.swiper-container', {
              autoplay:2500
            });
          },10)
        }
      })
      },
    },
    created()
    {
      this.getDataTwo()
    },
    watch:{
      'groupType2':function (val) {
        this.productData=val[3].detailVos;
      }
    }
  }
</script>
<style scoped lang="less">
  .banner-img{
    height:150px;
    img{
      width:100%;
    }
  }
  .banner{
    display:flex;
    background: #FFFFFF;
    >div{
      text-align: center;
      font-size:0.35rem;
      flex:1;
      padding:0.2rem 0;
      margin:0 0.3rem;
      line-height: 0.35rem;
    }
    >div.active{
      // background: -moz-linear-gradient(left, #ace, #f96);
      background: -webkit-linear-gradient(left, #FD3433, #FDBC84);
      //background: -o-linear-gradient(left, #ace, #f96);
      position:relative;
      color: #FFF;
    }
    >div.active:after{
      position:absolute;
      bottom:0;
      right:0.55rem;
      content:'';
      border-top:5px solid transparent;
      border-left:5px solid transparent;
      border-bottom:5px solid #fff;
      border-right:5px solid transparent;

    }
  }
  .t-pro-wrap{

    >div.t-pro{
      position:relative;
      min-height: 100px;
      background: #fff;
      margin:0.15rem 0.15rem;
      >div.collect-img{
        >img{
          position:absolute;
          width:0.4rem;
          right:0.5rem;
          top:0;
        }
      }
      >div.t-pro-content{
        padding:0.1rem;
        display: flex;
        >div.t-pro-img{
          width:25%;

          >img{
            width:100%;
          }
        }
        >div.t-pro-det{
          width:75%;

          padding:0.1rem 0.2rem;
          >div.t-name{
            font-weight: bold;
            font-size:0.35rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:1;
          }
          .t-digst{
            font-size:0.25rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:3;
          }
          .t-price{
            color:#fb4874;
            >span:first-child{
              font-size:0.25rem;
            }
            >span:last-child{
              font-size:0.35rem;
            }
          }
        }
      }
      >div.gobuy{

        >img{
          position:absolute;
          right:0.3rem;
          bottom:0.1rem;
          height:0.4rem;
        }

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
    bottom:0;
    font-size: 0.3rem;
    color:#FB4874;
    border-top: 2px solid #F5F5F5;
  }
</style>
