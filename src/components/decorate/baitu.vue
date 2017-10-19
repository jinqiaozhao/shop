<template>
	<div id="pinge_container">
		 <router-link to="/decorateCoupon" tag="div">
                <img src="../../assets/decorate/login.png" alt="��ͼ" id="block"/>
            </router-link>
		<router-link to="/decorateCoupon" tag="div">
		</router-link>
		 <img src="../../assets/com_dec_imgs/baitu_02.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/baitu_03.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/baitu_04.jpg" alt="��ͼ" class="img-responsive"/>
		 <img src="../../assets/com_dec_imgs/baitu_05.jpg" alt="��ͼ" class="img-responsive"/>
		 <div id="modal_view" v-show="show">
   			<img rc="../../assets/decorate/modal.png" alt="" class="img-responsive"/>
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
		/*url000:require('../../assets/decorate/modal.png'),
		url00:require('../../assets/decorate/login.png'),
		burl0:require('../../assets/com_dec_imgs/baitu_02.jpg'),
		burl1:require('../../assets/com_dec_imgs/baitu_03.jpg'),
		burl2:require('../../assets/com_dec_imgs/baitu_04.jpg'),
		burl3:require('../../assets/com_dec_imgs/baitu_05.jpg')*/
    }
  },mounted(){
       if(sessionStorage.btpagecount){
       	sessionStorage.btpagecount=Number(sessionStorage.btpagecount)+1;
       	this.show=false;
       var d=document.getElementById('pinge_container');
        	d.setAttribute('style','position: absolute;');
       }else{sessionStorage.btpagecount=1;}
      },
	methods: {
				/*dragStart (e) {
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
         // document.removeEventListener("touchmove",this.defaultEvent(e),false);
        	//e.preventDefault();
        },
        forbidMove (e) {
          this.defaultEvent(e)
        },
       // defaultEvent (e) {
         // e.preventDefault()
        //}*/
			close(){
        	this.show=false;
        	 var d=document.getElementById('pinge_container');
        	d.setAttribute('style','position: absolute;');
        }
			 }

}
</script>
<style scoped lang="less">
  @import "../../components/decorate/decDetail.less";
</style>

