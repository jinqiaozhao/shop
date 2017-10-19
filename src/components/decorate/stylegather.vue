<template>
	<div  @touchstart="touchs($event)">
		<!-- 地中海 -->
		<div class="styleimg" v-if="index==0">
			<img src="../../assets/style/Mediterranean/Mediterranean_02.jpg" />
			<img src="../../assets/style/Mediterranean/Mediterranean_03.jpg" />
			<img src="../../assets/style/Mediterranean/Mediterranean_05.jpg" />
			<img src="../../assets/style/Mediterranean/Mediterranean_05.jpg" />
			<img src="../../assets/style/Mediterranean/Mediterranean_06.jpg" />
		</div>
		<!-- 混搭现代 -->
		<div class="styleimg" v-if="index==1">
			<img src="../../assets/style/modern/modern_02.jpg" />
			<img src="../../assets/style/modern/modern_03.jpg" />
			<img src="../../assets/style/modern/modern_04.jpg" />
			<img src="../../assets/style/modern/modern_05.jpg" />
			<img src="../../assets/style/modern/modern_06.jpg" />
		</div>
		<!-- 简欧唯美 -->
		<div class="styleimg" v-if="index==2">
			<img src="../../assets/style/aestheticism/aestheticism_02.jpg" />
			<img src="../../assets/style/aestheticism/aestheticism_03.jpg" />
			<img src="../../assets/style/aestheticism/aestheticism_04.jpg" />
			<img src="../../assets/style/aestheticism/aestheticism_05.jpg" />
			<img src="../../assets/style/aestheticism/aestheticism_06.jpg" />
		</div>
		<!-- 简约欧式 -->
		<div class="styleimg" v-if="index==3">
			<img src="../../assets/style/BYPD/BYPD_02.jpg" />
			<img src="../../assets/style/BYPD/BYPD_03.jpg" />
			<img src="../../assets/style/BYPD/BYPD_04.jpg" />
			<img src="../../assets/style/BYPD/BYPD_05.jpg" />
		</div>
		<!-- 美式乡村 -->
		<div class="styleimg" v-if="index==4">
			<img src="../../assets/style/country/country_02.jpg">
			<img src="../../assets/style/country/country_03.jpg">
			<img src="../../assets/style/country/country_04.jpg">
			<img src="../../assets/style/country/country_05.jpg">
			<img src="../../assets/style/country/country_06.jpg">
		</div>
		<!-- 轻奢简欧风 -->
		<div class="styleimg" v-if="index==5">
			<img src="../../assets/style/light/light_02.jpg"/>
			<img src="../../assets/style/light/light_03.jpg"/>
			<img src="../../assets/style/light/light_04.jpg"/>
			<img src="../../assets/style/light/light_05.jpg"/>
			<img src="../../assets/style/light/light_06.jpg"/>
		</div>
    <img src="http://orz6nce3e.bkt.clouddn.com/top.png"  v-show="gotop" id="gotop" style=" position:fixed; font-size: 0.2rem;bottom:1rem;right: 0.3rem;opacity:1;" @click="totop"/>
	</div>
</template>

<script>
	export default{
		data(){
		return{
      gotop: false,
			index:''
		}},
		mounted(){
    		this.index=this.$route.params.id;
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
//          this.init=document.body.scrollTopl;
//          if (document.body.scrollTop == 0) {
//            clearInterval(init);
//          }
//        },10)
      document.body.scrollTop=0;
      this.gotop = false;
    }
  },

	}
</script>

<style lang="less" scoped>
	.styleimg{
		width: 100%;
		img {
			float: left;
			width: 100%;
		}
	}
</style>
