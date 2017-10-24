<template>
  <div>
    <div class="banner-img">
      <img src="../../../assets/indexB/banner-tejia.png" alt="" >
    </div>
    <div class="banner">
      <div  :class="i==0?'active':''"@click="searchPro(i,$event)" v-for="(v,i) in groupType2" v-if="i<3"></div>
    </div>
    <div style="  font-size:.4rem;position:absolute;top:3rem;left: .8rem" @click="searchPro(6)">日化</div>
    <div style="  font-size:.4rem;position:absolute;top:3rem;left: 3.2rem" @click="searchPro(5)">食品</div>
    <div style="  font-size:.4rem;position:absolute;top:3rem;;left: 5.8rem" @click="searchPro(1)">数码</div>
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
        if(i==0){
         this.productData=this.groupType2[6].detailVos
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
        }else if(i==1){
          this.productData=this.groupType2[5].detailVos
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
        }else{
          this.productData=this.groupType2[1].detailVos
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
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
       this.productData=val[6].detailVos;
     }
    }
  }
</script>
<style scoped lang="less">
@import "com";
</style>
