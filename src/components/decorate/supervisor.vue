<template>
	<div class="box"  @touchstart="touchs($event)">
		<div class="box-img">
			<!-- <img src="../../assets/decorate/supervisor/super_top.jpg" /> -->
			<img src="../../assets/decorate/bby_active_1.jpg" alt="banner图片" style="width:100%;"/>
      <div class="text_top">申请专业监理服务</div>
		</div>
    <order></order>
		<div class="box-img">
			<img src="../../assets/decorate/supervisor/supervisor_02.jpg" />
			<img src="../../assets/decorate/supervisor/supervisor_03.jpg" />
			<img src="../../assets/decorate/supervisor/supervisor_04.jpg" />
			<img src="../../assets/decorate/supervisor/supervisor_05.jpg" />
			<img src="../../assets/decorate/supervisor/supervisor_06.jpg" />
		</div>
    <img src="http://orz6nce3e.bkt.clouddn.com/top.png"  v-show="gotop" id="gotop" style=" position:fixed; font-size: 0.2rem;bottom:1rem;right: 0.3rem;" @click="totop"/>
	</div>
</template>

<script>
  import order from 'src/components/decorate/com/order.vue';
  export default{
    components: {order},
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
//        }, 10)
    document.body.scrollTop=0;
      this.gotop = false;
    }
  },
  watch: {

  }
  }
</script>

<style scoped lang="less">
  .box{background-color: #fff;
  .text_top{
    text-align: center;
    font-size: 0.5rem;
    font-weight: bolder;
    padding:0.5rem 0;
    color:#2A2A2A;
  }
  }
	.box-img{
		width: 100%;
		img {
			width: 100%;
		}
	}
</style>
