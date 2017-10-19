
<template>
  <div class="box" @touchstart="touchs($event)">
  	<div class="drwing">
	    <!-- <img src="../../assets/decorate/leeksteward/leek_02.jpg" class="drwing-ing" /> -->
      <img src="../../assets/decorate/bby_active_1.jpg" alt="banner图片" style="width:100%;"/>
	  </div>
	  <div class="index">
	  		<img  class="index-banner" src="../../assets/decorate/sty.jpg"/>
      <order></order>
	  </div>
<!--翻新案例-->
	  <!--<div class="show">-->
	  	<!--<div class="intro">-->
	  		<!--<p class="u">真实翻新案例</p>-->
	  		<!--<p class="n">看旧房如何化腐朽为神奇</p>-->
	  	<!--</div>-->
		  <!--<div class="main" v-for="d in 6">-->
		  	<!--<div class="main-imgs">-->
		  		<!--<img src="../../assets/decorate/upup.jpg" class="main-img">-->
		  		<!--<div class="rgba">-->
		  			<!--<span>三年旧房  全无翻新</span>-->
		  		<!--</div>-->
		  	<!--</div>-->
		  	<!--<div class="text">-->
		  		<!--<div class="test-img">-->
		  			<!--<img src="../../assets/decorate/money.png" />-->
		  			<!--<span>翻新花费：52000元</span>-->
		  		<!--</div>-->
		  		<!--<div class="lang">-->
		  			<!--<p class="w">翻新前：风格单调、水电路不合理、老式陈旧</p>-->
		  			<!--<p class="m">翻新后：温馨舒适、功能区明显、实用性强</p>-->
		  		<!--</div>-->
		  	<!--</div>-->
		  <!--</div>-->
	  <!--</div>-->
    <img src="../../assets/decorate/fanxin/anli_01.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="../../assets/decorate/fanxin/anli_02.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="../../assets/decorate/fanxin/anli_03.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="../../assets/decorate/fanxin/anli_04.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="../../assets/decorate/fanxin/anli_05.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="../../assets/decorate/fanxin/anli_06.jpg" alt="" style="display:flex;width: 100%;padding:0;margin:0;"/>
    <img src="http://orz6nce3e.bkt.clouddn.com/top.png"  v-show="gotop" id="gotop" style=" position:fixed; font-size: 0.2rem;bottom:1rem;right: 0.3rem;" @click="totop"/>
  </div>
</template>

<script>
  import order from 'src/components/decorate/com/order.vue';
  export default{
    components:{order},
    data(){
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

	.index{
		width: 7.5rem;

		background-color: #FFF;
		.index-banner{
			width: 7.5rem;
		}
	}
	.intro{
		width: 7.5rem;
		height: .9rem;
		font-size: .3rem;
		text-align:center;
		.u{
			margin-top: .2rem;
			letter-spacing:1px;
		}
		.n{
			font-size: .23rem;
			color: #A1A1A1;
			margin-top: .08rem;
			letter-spacing:1px;
		}
	}
.main{
	width: 7.1rem;
	height: 4.75rem;
	background-color:#FFF;
	margin-left: .2rem;
	margin-bottom: .18rem;
	.main-imgs{
			width: 7.1rem;
			height: 5rem;
			font-size: .27rem;
			color: #FFF;
			letter-spacing:1px;
			height: 3.1rem;
		.main-img {
			width: 7.1rem;
		}
		.rgba{
				z-index: 2;
				width: 7.1rem;
				height: .4rem;
				background-color: rgba(140,140,140,.5);
				position:relative;
				top: -0.47rem;
			span {
			color: #FFF;
			font-family:"微软雅黑";
			z-index: 4;
			margin-left: .15rem;
			}
		}
	}

	.text{
		margin-left: .1rem;
		font-size: .29rem;
		.test-img {
			color:#F93E6D;
			img {
			position: relative;
			top:.06rem;
			width: .35rem;
			}
		}
		.lang{
			border-top:1px dashed #A1A1A1;
			font-family:"黑体";
			margin-top: .1rem;
			color: #585858;
			.w{
				margin-top: .1rem;
				margin-bottom: .08rem;
			}
		}
	}
}

	  .drwing{
  	width: 7.5rem;
  	height: 2.55rem;
	  	.drwing-ing{
	  	width: 7.5rem;
	    padding: 0;
	    margin: 0;
	    box-sizing: border-box;
	  }
  }
</style>
