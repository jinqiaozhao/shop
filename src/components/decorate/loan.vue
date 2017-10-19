<template>
	<div class="box"  @touchstart="touchs($event)">
		<div class="box-img">
			<!-- <img src="../../assets/decorate/fanxin/fanxin01.jpg" /> -->
			<img src="../../assets/decorate/bby_active_1.jpg" alt="banner图片" style="width:100%;"/>
		</div>
		<div>

      <order ></order>

      <div class="space"></div>
		</div>
		<div class="box-img">
			<img src="../../assets/decorate/loan/loan_02.jpg" />
		</div>
		<div>
      <div class="space"></div>
      <loan></loan>
		</div>
		<div class="box-img">
			<img src="../../assets/decorate/loan/loan_04.jpg" />
			<img src="../../assets/decorate/loan/loan_06.jpg" />
		</div>

      <img src="http://orz6nce3e.bkt.clouddn.com/top.png"  v-show="gotop" id="gotop" style=" position:fixed; font-size: 0.2rem;bottom:1rem;right: 0.3rem;" @click="totop"/>
	</div>
</template>

<script>
  import loan from "src/components/decorate/com/loan.vue";
  import order from 'src/components/decorate/com/order.vue';
  export default{
    components: {order, loan},
    data()
  {
    return {
      gotop: false,
    }
  }
  ,
  methods: {
    touchs(e)
    {
      var top = document.body.scrollTop;
      if (top > 300) {
        this.gotop = true;
      } else {
        this.gotop = false;
      }
    }
  ,
    totop()
    {
      var top=this.gotop;
//      var init = setInterval(
//        function () {
//          document.body.scrollTop -= 10;
//          this.init=document.body.scrollTop
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
  .gotop{
    >img{

     }
  }
  .space{
    height:0.2rem;
    background-color: #F7F7F7;
  }
  .box{background-color: #fff;}
	.box-img{
		width:100%;
  margin-bottom:0.2em;
		img{
			width:100%;
		}
	}
</style>
