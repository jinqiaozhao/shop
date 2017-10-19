<template>
	<div class="box" id="box" @click="closeJump($event)" v-if="coupon.length!='0'">
    <div class="box-sou"></div>
		<div class="festival" >
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
		</div>
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
           if(jump.className=='box'|| jump.className=='box-sou'){
             //jump.style.display='none';
             jump2.className='box animated bounceOutDown '
             m$.sessionStores.set('goCouponCenter','go')
           }
         },
         goCouponCenter(){
           m$.sessionStores.set('goCouponCenter','go')
           this.$router.push('/couponCenter')
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
		.festival{
			position: relative;
			img{
				width: 6.4rem;
			}
		}
		.festival-main{
			position: absolute;top:2.4rem;
			.main{
				margin:0 0 .2rem .17rem;
				width: 6rem;height: 1.28rem;
				background-image:url('http://ovn5haih3.bkt.clouddn.com/%E7%99%BD%E6%A1%86%E5%BA%95.png') ;
				background-size:6rem 1.28rem;
				background-repeat:no-repeat;
				display: flex;
				font-size:.3rem;
				.condition{
					padding-top: .15rem;
					font-size:.2rem;
					flex: 2;
					color: #FF2633;
					text-align: center;
					>span{
						font-size: .5rem;
						font-weight: 900;
						display: inline-block;
					}
					>span:last-child{
						font-size: .2rem;
						font-weight:100;
						color: #929191;
					}
				}
				.introduce{
					flex: 5;
					margin-top: .15rem;
					text-align: center;
					font-size: .2rem;
					>p{
						font-size: .28rem;
						margin-top: .03rem;
					}
					>span{
						margin-top: .02rem;
						display: block;
						color: #FF3E4A;
					}
					>span:last-child{
						color: #484848;
					}
				}
				.employ{
					margin: .4rem 2px 0 0;
					line-height: .38rem;
					text-align: center;
					color: #FFF;
					border-radius: 10px;
					font-size: .2rem;
					background-color: #FF3E4A;
					width: 1rem;
					height: .4rem;
					border: 1px solid red;
				}
			}
		}
	}
</style>
