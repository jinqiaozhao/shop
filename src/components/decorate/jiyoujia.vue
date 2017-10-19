<template>
	<div id="pinge_container">
     <router-link to="/decorateCoupon" tag="div">
			<!--<img v-bind:src="url00" alt="��ͼ" @touchstart="dragStart" @touchmove="dragMove" @touchend="dragEnd" id="block"/>-->
			<img v-bind:src="url00" alt="��ͼ" id="block"/>
     </router-link>
		 <img v-bind:src="jurl0" alt="��ͼ" class="img-responsive"/>
		 <img v-bind:src="jurl1" alt="��ͼ" class="img-responsive"/>
		 <img v-bind:src="jurl2" alt="��ͼ" class="img-responsive"/>
		 <img v-bind:src="jurl3" alt="��ͼ" class="img-responsive"/>
		 <div id="modal_view" v-show="show">
   		<img v-bind:src="url000" alt="" class="img-responsive"/>
			<div id="know" @click="close"></div>
   </div>
   </div>

</template>
<script>
export default {
  data () {
    return {
    	show:false,
    	oW: null,
		oH: null,
		url000:require('../../assets/decorate/modal.png'),
		url00:require('../../assets/decorate/login.png'),
		jurl0:require('../../assets/com_dec_imgs/jiyoujia_02.jpg'),
		jurl1:require('../../assets/com_dec_imgs/jiyoujia_03.jpg'),
		jurl2:require('../../assets/com_dec_imgs/jiyoujia_04.jpg'),
		jurl3:require('../../assets/com_dec_imgs/jiyoujia_05.jpg'),
      imgUrl: ['/static/com_dec_imgs/pinge_02.jpg', '/static/com_dec_imgs/pinge_03.jpg', '/static/com_dec_imgs/pinge_04.jpg', '/static/com_dec_imgs/pinge_05.jpg']
    }
  },mounted(){
       if(sessionStorage.jyjpagecount){sessionStorage.jyjpagecount=Number(sessionStorage.jyjpagecount)+1;this.show=false;}else{sessionStorage.jyjpagecount=1;}
      },
	methods: {
				dragStart (e) {
          //console.log(e);
           var touches = e.touches[0];
           this.oW = touches.clientX - block.offsetLeft
           this.oH = touches.clientY - block.offsetTop
          //  document.addEventListener("touchmove",defaultEvent,false);
        },
        dragMove (e) {
          var touches = e.touches[0];
          var oLeft = touches.clientX - this.oW;
          var oTop = touches.clientY - this.oH;
          if (oLeft < 0) {
            oLeft = 0;
          } else if (oLeft > document.documentElement.clientWidth - block.offsetWidth) {
            oLeft = (document.documentElement.clientWidth - block.offsetWidth);
          }
          block.style.left = oLeft + "px";
          block.style.top = oTop + "px";
        },
        dragEnd (e) {
          //document.removeEventListener("touchmove",this.defaultEvent(e),false);
        	//e.preventDefault();
        },
        forbidMove (e) {
          this.defaultEvent(e)
        },
        //defaultEvent (e) {
         // e.preventDefault()
        //}
        close(){
        	//var d=document.getElementById('modal_view');
        	//d.setAttribute('style','display: none;');
        	//var d=document.getElementById('pinge_container');
        	//d.setAttribute('style','position: absolute;');
        	this.show=false;
        }

			 }
}
</script>
<style scoped lang="less">
  @import "decDetail.less";
</style>
