<template>
	<div id="pinge_container">
    <router-link to="/decorateCoupon" tag="div">
    	<img src="../../assets/decorate/login.png" alt=""  id="block"/>
    </router-link>
		 <img src="../../assets/com_dec_imgs/xiujia_02.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/xiujia_03.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/xiujia_04.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/xiujia_05.jpg" alt="��ͼ" class="img-responsive"/>
		 <div id="modal_view" v-show="show">
   		<img src="../../assets/decorate/modal.png" alt="" class="img-responsive"/>
			<div id="know" @click="close"></div>
   </div>
   </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
    	show:false,
    	//show:true,
    	oW: null,
		oH: null,
    }
  },mounted(){
       if(sessionStorage.xjpagecount){
       	sessionStorage.xjpagecount=Number(sessionStorage.xjpagecount)+1;
       	this.show=false;
       var d=document.getElementById('pinge_container');
        	d.setAttribute('style','position: absolute;');
       }else{sessionStorage.xjpagecount=1;}
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
