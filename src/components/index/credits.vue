/*
*作者---杨彬
*
*/
<template>
 <div class="seckill" v-if='groupType4' style="padding-top:.2rem">
          <div class="time-warp">
            <div class="one">
              <img src="../../assets/tejia.png" >
              <span class="text">特价</span>
            </div>
            <div class="two">
              <router-link to="/today/0/ty" class="goMoreProduct"><span>更多特价好货</span>
                <img src="../../assets/goMore.png" class="com-div-middle-ab" style="width:100%;height:10px;"></router-link>
            </div>
          </div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(oitem,oindex) in groupType4" :key="oindex">
                <div class="active-banner" @click="goToday(oitem.id)">
                  <img :src="oitem.groupImg" >
                </div>
                <index-seckill :groupType4='oitem.detailVos' v-if="oitem.detailVos"></index-seckill>

              </div>
              </div>
            </div>
        </div>
</template>
<script type="text/javascript">
import indexSeckill from 'src/components/index/indexSeckillFour.vue';
  export default {
    props: ["sData"],
    components: {indexSeckill},
    data(){
      return {
        groupType4:'',
      }
    },
    methods: {
       goToday(oid){
          window.location.href=(`#/today/1/${oid}`)
       },
       getData(){
                   this.postAjax(this.sData.url.getProductGroupShopVo,{
                     status:'',
                     groupType:4,
                   },(res)=>{
                    // console.log(res)
                     if(res.data&&res.data.data&&res.data.data.length>=1){
                       this.groupType4 = res.data.data;
                       //console.log(res)
                       setTimeout(function () {
                         var swipe = new Swiper('.seckill>.swiper-container', {
                           autoplay:2500
                         });
                       },10)
                     }
                   })
               },
    },
    created(){
        this.getData();

    },
  }
</script>
<style scoped lang="less">
.seckill{
  background-color: #fff;
  padding: 0rem 0 0.3rem 0;

  font-size: 0;
  .active-banner{
    margin-bottom: 0.2rem;
    position: relative;
    width: 100%;
    &:before{
      line-height: 0;
      content: '';
      display: inline-block;
      //width:0.3rem ;
      border-color: white;
      border-style: solid;
      //border-bottom: 0.3rem;
      border-top: none;

      border-bottom-width:0.18rem;
      border-left: 0.15rem solid transparent;
      border-right: 0.15rem solid transparent;
      // height: 0.18rem;
      z-index: 6;
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
      //background-color: #ffffff;
    }
    >img{width: 100%;height: 2.8rem}
  }

}
</style>
