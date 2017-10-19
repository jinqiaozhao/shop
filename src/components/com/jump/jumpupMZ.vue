<template>
	<div class="box" id="box" @click="closeJump($event)" v-if="coupon.length!='0'">
    <div class="box-sou"></div>
    <!-- <div class="beauty">
      <div class="beauty-top">
        <div class="beauty-man"><img src="http://ovn5haih3.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97_%E6%9D%A8%E5%B9%82.png"></div>
        <div class="beauty-true"><img src="http://ovn5haih3.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97_%E5%8F%89.png"></div>
      </div>
      <div class="beauty-img">
        <img src="http://ovn5haih3.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97_%E6%96%B9%E6%A1%86.png">
        <img src="http://ovn5haih3.bkt.clouddn.com/%E6%B4%BB%E5%8A%A8%E5%BC%B9%E7%AA%97_%E6%8C%89%E9%92%AE.png">
      </div>
    </div> -->
    <!-- 完美方法 -->
    <div class="MZimg"  @click="closeJump($event)">
      <div class="button_on" ></div>
      <img  src="http://ovn5haih3.bkt.clouddn.com/%E5%BC%B9%E7%AA%97%E5%88%87%E7%89%87.png">
    </div>
   <!-- <div class="festival" >
			<img src="http://ovn5haih3.bkt.clouddn.com/%E5%BC%B9%E7%AA%97%E5%BA%95.png" />
			<div class="festival-main">
				<div class="main" v-for='(d,index) in coupon' v-if='index<4'>
					<div class="condition" v-if="d.amount">
						￥<span v-text="d.amount">5</span>
						<span>满 <span v-text="d.useAmount"></span>元可用</span>
					</div>
					<div class="introduce">
						<p>{{d.couponName}}</p>
						<span v-if="d.useIntro">({{d.useIntro}})</span>
						<span>有效期:{{d.gmtStart}}-{{d.gmtEnd}}</span>
					</div>
					<div class="employ" @click="goCouponCenter()">立即使用</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script type="text/javascript">
    export default{
       props: ['allUrl'],
       data(){
       		return{
       			coupon:[],
		       	pageNume:1,
		       	pageSize:10,

       		}
       },
       methods:{
         testMove(){
//           var preHandler=function(e){e.preventDefault();},// 注意此处代码片段必须这样提出来已保证传入下边两个事件的处理程序一样才生效，分别写到事件处理程序中不生效。
//             document.addEventListener('touchmove', me.preHandler,false);//阻止默认滑动事件
//           document.removeEventListener('touchmove', me.preHandler, false);//浮层关闭时解除事件处理程序
         },
         closeJump(e){
           var jump=e.target;
           var jump2 = document.getElementById('box')
           console.log(jump,jump2)
           if(jump.className=='button_on'){
             //jump.style.display='none';
             jump2.className='box animated bounceOutDown '
             m$.sessionStores.set('goCouponCenter','go')
           }else{
             m$.sessionStores.set('goCouponCenter','go')
             this.$router.push('/couponCenter')
           }
         },
       	couponCenter(){

      		this.getAjax(this.url.couponCenter,{pageSize:this.pageSize,pageNume:this.pageNume},(res)=>{
      			if(res.code==200){
      			  for(var i=0;i<res.data.length;i++){
      			    if(res.data[i].businessTypeId!='5'){
                  this.coupon.push(res.data[i])
                }
              }
            this.coupon=this.coupon;
      			}
      		})
       	}
       },
       created(){
       		this.couponCenter()
       }
     }
</script>

<style lang="less" scoped>
  @import "../../goodsDetail/bounce";

  .MZimg{
    padding-top: .4rem;
    position: relative;
    .button_on{
      width: 1rem;
      height: 1rem;
      position: absolute;
      right: .15rem;
      top:    2.2rem;
    }
    img{
      margin-left: .3rem;
      width: 90%;
      height: 90%;
    }
  }

 /* .beauty{
    border:1px solid red;
    width: 6.4rem;
    height: 8rem;
    position: fixed;
    top:1.6rem;
    z-index: 10;
    .beauty-top{
      display: flex;
      .beauty-man{
        border:1px solid yellow;
        width: 50%;
        height: 40%;
        margin-left: .2rem;
        >img{
          max-height: 100%;
          max-width: 100%;
        }
      }
      .beauty-true{
        border:1px solid blue;
        width: 30%;
        height: 30%;
        text-align: right;
        margin:25% 0 0 19%;
        >img {
        max-width: 30%;
        max-height: 30%;
      }
      }
    }
    .beauty-img{
      border:1px solid blue;
      position: absolute;
      top:2.7rem;
      width: 7.2rem;
      >img{
        max-width: 100%;
        max-height: 100%;
        margin-left: .38rem;
      }
      >img:last-child{
        border: 1px solid firebrick;
      }
    }
  }*/

  .box-sou{
    width: 6.4rem;
    height: 1.8rem;
    position: fixed;
    top:1.2rem;
    z-index: 10;
  }
	.box{
		z-index: 50;
		position: fixed;
    top: 0;
    bottom:0;
		width: 100%;
		background-color: rgba(0,0,0,0.4);
		padding:1.26rem .45rem 2rem .5rem;
	}
</style>
