<template>
  <div class="box"  @touchstart="touchs($event)">
    <div class="banner">
      <!-- <img class="banner-img" src="../../assets/decorate/leeksteward/leek_02.jpg" /> -->
      <img src="../../assets/decorate/bby_active_1.jpg" alt="banner图片" style="width:100%;"/>
    </div>
    <div>
      <order></order>
    </div>
    <div class="self">
      <img src="../../assets/decorate/selfdomimg/selfdom_04.jpg" />
      <img src="../../assets/decorate/selfdomimg/selfdom_05.jpg" />
      <img src="../../assets/decorate/selfdomimg/selfdom_06.jpg" />
      <img src="../../assets/decorate/selfdomimg/selfdom_07.jpg" />
    </div>
    <img src="http://orz6nce3e.bkt.clouddn.com/top.png"  v-show="gotop" id="gotop" style=" position:fixed; font-size: 0.2rem;bottom:1rem;right: 0.3rem;" @click="totop"/>
  </div>
</template>

<script>
  import order from 'src/components/decorate/com/order_bank.vue';
  export default{
    components:{order},
    data()
    {
      return {
        gotop: false,
      }
    },
    methods: {
      touchs(e)
      {
        var top = document.body.scrollTop;
        if (top > 300) {
          this.gotop = true;
        } else {
          this.gotop = false;
        }
      },
      totop()
      {
        var top=this.gotop;
//      var init = setInterval(
//        function () {
//          document.body.scrollTop -= 10;
//          this.init=document.body.scrollTop
//          console.log('a')
//          if (document.body.scrollTop == 0) {
//            clearInterval(init);
//          }
//        },10)
        document.body.scrollTop=0;
        this.gotop = false;
      }
    },
    watch: {

    }
  }
</script>

<style scoped lang="less">
  .box{
    background: #fff;
  }
  .banner{
    width: 7.5rem;
    .banner-img {
      width: 7.5rem;
    }
  }

  .self{
    img {
      float: left;
      width: 7.5rem;
    }
  }
</style>
