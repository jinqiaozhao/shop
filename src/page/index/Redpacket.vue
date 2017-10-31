<template>
	<div class="box">
		<div class="turntable">
			<div class="up" >
				<img src="../../assets/turntable/turntable_bj.jpg" />
			</div>
			<div class="middle" id="middles">
				<img src="../../assets/turntable/turntable_jp.png" />
			</div>
			<div v-show="!belowshow" class="below"><img src="../../assets/turntable/turntable_zz.png" /></div>
			<div class="below" @click="getdynamic" id="middlesCS" v-show="belowshow">
				<img src="../../assets/turntable/turntable_zz.png" />
			</div>
		</div>
	</div>
</template>

<script>
  export default {
	   data(){
		    return {
		      num:'',
          questionnaireId:'',
		      openId:'',
		    	RouterNum:'',
		    	probability:'',
		    	belowshow:'true',
		    }
	   },
    props:['sData'],
   methods:{
		dynamic(time,fortune){
			var this_ = this;
		//	var fortune=fortune;
			var cnt = 100;
			var total = 0;
			var ratio = [];
			var offset = 6;
			var amount = 18 - (0.225*offset);
		    ratio[1] = [0.2, 0.4, 0.6, 0.8, 1, 1, 1.2, 1.4, 1.6, 1.8];
		    ratio[2] = [1.8, 1.6, 1.4, 1.2, 1, 1, 0.8, 0.6, 0.4, 0.2];
			for(var i=0;i<time;i++){
				window.setTimeout(function(){
					var deg = amount*(ratio[String(cnt).substr(0,1)][String(cnt).substr(1,1)])
					this_.setDegree(total+deg)
					total += deg;
					cnt++;
				},i*50)
			}
			  setTimeout(function(){
          if(fortune==0){
          this_.addPointsById();}
          if(fortune==1){
            this_.sendRedenvelope();
          }
        },time*50)

			//rotate.style.transform = 'rotate('+this.RouterNum+1+'deg)'
		},
		addPointsById(){
        	this.getAjax(this.sData.url.addPointsById,{figure:10},(res)=>{
        		if(res.code==200){
        			console.log('恭喜获得10积分')
              this.num--;
              if(this.num==0){
                this.belowshow = false;
              }else{this.belowshow = true;}
        		}
        	})
		},
		setDegree(index){
			var middles = document.getElementById('middles');
			middles.style.transform='rotate('+index+'deg)';
		},
		sendRedenvelope(){
        	this.postAjax(this.sData.url.sendRedenvelope,{
        			questionnaireId:this.questionnaireId,
        			openId:this.openId,
        			redEnvelopeTempletId:1,
        	},(res)=>{
        		if(res.code==200){
        			console.log('恭喜获得一元红包')
              this.num--;
              if(this.num==0){
                this.belowshow = false;
              }else{this.belowshow = true;}
        		}
        	})
		},
		getdynamic(){
			if( Math.ceil( Math.random() * 10 ) - 1 <= 1 ){
				//随机积分
        this.dynamic(150,1);
        console.log('红包')
        this.belowshow = false;
			}else{
				//一元红包
        this.dynamic(200,0);
        console.log('积分')
        this.belowshow = false;
			}
		}
   },
    watch:{
	     'num':function(val){
	       //传输后台新的抽奖次数
         console.log(val)
         if(val<1){console.log('抽奖次数已用完')}
       }
    },
   created(){
   	//	console.log( Math.ceil( Math.random() * 10 ) - 1)
     this.openId=m$.sessionStores.get('openId')?m$.sessionStores.get('openId'):'';
   		this.questionnaireId=m$.sessionStores.get('authWXRegistLogin')?m$.sessionStores.get('authWXRegistLogin'):'1';
   		this.num=m$.sessionStores.get('lottoNum')?m$.sessionStores.get('lottoNum'):'3';//获取用户抽奖次数最好试用请求获取数据
   }
  }
</script>

<style scoped lang="less">
.up,.middle,.below{
	position: absolute;
}
.up{

	img{
		width: 7.5rem;
	}
}
.middle{
	top: .68rem;
	left: 1.36rem;
	animation-duration: .75s;
	animation-name: flipOutYY;
	width: 5.2rem;
	height: 5.2rem;
	transform: rotate(0deg);
	-moz-transform: rotate(100deg);
	-moz-transform: rotate(100deg);
	border: 1px solid #0082E6;
	img{
		width: 100%;
	}
}
.below{
	border: 1px solid #FFF;
	top: 2.35rem;
	left: 3.25rem;
	img{
		width:1.2rem;
	}
}
.turntable{
	position: relative;
	width: 7.5rem;
	height: 15rem;
	background: #E98782;
}

</style>
