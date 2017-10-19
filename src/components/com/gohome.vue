<template>
	<div class="go_content">
		<span class="car-number"  v-text="carNumber<=99?carNumber:'99+'"  v-show="!show" style="left: 0.35rem;position: absolute;z-index: 101;"></span>
		<div class="gohome" @click="toggleShow()">
			. . .
		</div>
		<ul class="go_wrap" v-show="show">
			<li><router-link to="/index">首页</router-link></li>
			<li>
				<router-link to="/productCar">购物车</router-link>
				<span class="car-number" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'" ></span>
			</li>
			<li><router-link to="/my">个人中心</router-link></li>
			<li><router-link to="/apply">试用中心</router-link></li>
		</ul>
	</div>
</template>
<style scoped lang="less">
.go_content{
	  position: fixed;
    z-index: 100;
    bottom: 2.7rem;
    right:0.25rem;
  .gohome{
    border-radius: 50%;
    background: rgba(0,0,0,0.65 );
    font-size: 0.3rem;
    color:#fff;
    font-weight: bold;
    z-index: 100;
    width:0.8rem;
    padding:0.1rem 0 0.2rem 0.15rem;
  }
  .go_wrap{
    position:absolute;
    list-style: none;
    position: absolute;
    font-size: 0.2rem;
    background: #F8F8F8;
    bottom:0.7rem;
    right:0.4rem;
    >li{
      min-width:1.4rem;
      padding:0.1rem 0.3rem 0.1rem 0.15rem;
      border-bottom: 1px solid #fff;
    }
  }
  .car-number{
    position:absolute;
    display: inline-block;
    border-radius: 0.15rem;
   text-align:center;
    line-height: 0.3rem;
    padding: 0px 0.1rem 0 0.1rem;
    font-size: 0.12rem;
    height: 0.3rem;
    min-width: 0.3rem;
    color: #fff;
    margin-left: 0.15rem;
    background-color: #fb4874;
  }
}


</style>

<script>
export default {
	props: ['sData'],
  data () {
    return {
			carNumber:'',
    	show:false,
		screenWidth:document.documentElement.clientWidth,
		screenHeight:document.documentElement.clientHeight,
    }
  },
	mounted(){
      this.getCarNumber();
      },
	methods: {
        toggleShow(){
					if(this.show==false){
						this.show=true;
          var isloged=m$.localStrages.get('yxdyb');
            if(isloged!=null){
              this.getCarNumber();
            }else{}
					}else{
						this.show=false;
					}
				},
				getCarNumber(){
					this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
						if(res.code=200){
							this.carNumber = res.data
						}
					});
	        // this.getAjax(this.url.isLogged,{},(res)=>{
	        //   if(res.code==200&&res.data==true){
	        //     this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
	        //       if(res.code=200){
	        //         this.carNumber = res.data
	        //       }
	        //     });
	        //   }
	        // })
	      },
			 }

}
</script>
