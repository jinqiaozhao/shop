/*
*作者---杨彬
*
*/
<template>
    <div class="box" style="">
        <div class="content">
          <div>为维系客户关系、答谢客户支持，宝宝余特别推出客户积分系统。</div>
        	<div>宝宝余积分可通过多渠道获取，只需动动手指，积分轻松入账。</div>
        	<div>获得积分后即可抵用现金</div>
        </div>
				<div >
					<div style="font-weight:bold;;color:#000;">	【积分获取方式】</div>
					<div>1. 注册送积分：新用户在宝宝余商城完成注册赠送100积分					</div>
					<div>2. 每日登录送积分：每日登录进入积分中心，签到领取积分			</div>
					<div>3. 消费送积分：用户每消费满100赠送10积分			</div>
					<div>4. 其他：参加特定活动赠送积分					</div>
				</div>
				<div >
					<div style="font-weight:bold;color:#000;">	【积分试用规则】</div>
					<div> 用于支付抵扣现金等（100积分=¥1）					</div>
					<div> 					</div>

				</div>
    </div>



</template>
<script type="text/javascript">
    export  default {
      props: ["sData"],
        data(){
            return{

            }
        },
        created(){
            m$.documentTitle("积分商城");
        },
      mounted(){

      },
      methods:{


      },
    watch: {
      '$route': function (val) {


      }
    },

    }</script>
<style scoped lang="less">
.box{
	background-color: #fff;
	width: 100%;
	min-height:667px;
	div.content{
			>div{color:#000;}
	}
	>div{
		padding:0.2rem;
		font-size:0.3rem;
		>div{
			font-size:0.2rem;
			padding-top: 0.2rem;
			color:#888888;
		}
	}
}
</style>
