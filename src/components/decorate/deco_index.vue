<template>

	<div id="pinge_container">
		<router-link v-bind:to="loginUrl" tag="div">
			<!--<div @touchstart="dragStart" @touchmove="dragMove" @touchend="dragEnd" >-->
			<!--<img src="../../assets/decorate/login.png" alt="" @touchstart="dragStart" @touchmove="dragMove" @touchend="dragEnd" id="block"/>-->
			<!--</div>-->
			<img src="../../assets/decorate/login.png" alt=""  id="block"/>
		</router-link>
			 <img src="../../assets/com_dec_imgs/duobaoyu.jpg" alt="" class="img-responsive"/>
		<div id="modal_view" v-show="show">
   				<img src="../../assets/decorate/modal.png" alt="" class="img-responsive"/>
			<div id="know" @click="close"></div>
   		</div>
   	</div>


</template>
<script>
export default {
  data () {
    return {
    	show:false,
    	loginUrl:"decorateCoupon",
		oW: null,
		oH: null,
		screenWidth:document.documentElement.clientWidth,
		screenHeight:document.documentElement.clientHeight,
		/*url000:require('../../assets/decorate/modal.png'),
		url00:require('../../assets/decorate/login.png'),
		durl0:require('../../assets/com_dec_imgs/duobaoyu.jpg')*/

    }
  },mounted(){
  	console.log(this.screenWidth);
  	console.log(this.screenHeight);
       /*if(sessionStorage.bbypagecount){
       	sessionStorage.bbypagecount=Number(sessionStorage.bbypagecount)+1;
       	this.show=false;
       var d=document.getElementById('pinge_container');
        	d.setAttribute('style','position: absolute;');
       }else{sessionStorage.bbypagecount=1;}*/
      },
	methods: {
        close(){
        this.show=false;
        var d=document.getElementById('pinge_container');
        	d.setAttribute('style','position: absolute;');
        }
			 }

}
</script>
<style scoped lang="less">
  @import "decDetail.less";
</style>
