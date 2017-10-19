<template>
<div class="box">
	<div class="personage" v-for='(i,ind) in personage':key='ind' v-if='ind==0'>
		<div class="personage-fake">
			<span>{{i}}</span>
			<div class="personage-int-t">
				<img class="showimg-t":src="myData.headIcon"   v-if="ind == 0"/>
				<input  id="myHeadInput" name="wwf" type="file" @change="upDateImg()" accept="image/*" >
				<img class="sea-t" src="../../assets/sea.png">
			</div>
		</div>
	</div>
	<div class="personage" v-for='(i,ind) in personage':key='ind' v-if='ind!=0' @click='onpersonage(ind)'>
		<div class="personage-property">
			<span>{{i}}</span>
			<div class="personage-int">
				<img class="showimg"  v-if="ind == 0" src="../../assets/clock.png"/>
				<span v-if="ind != 0 && ind == 1">{{myData.mobile}}</span>
				<span v-if="ind != 0 && ind == 2">{{myData.userName}}</span>
				<span v-if="ind != 0 && ind == 3">{{myDataAW.sexName}}</span>
				<span v-if="ind != 0 && ind == 4">{{myDataAW.birthday}}</span>
			</div>
			<img class="sea" src="../../assets/sea.png" v-if="ind != 1">
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return{
      	personage:['头像','用户名','昵称','性别','出生日期'],
      	myData:'',
      	myDataAW:'',
      }
    },
    created(){
    	this.upDatamy()
    	this.getUserInformation()
    },
    methods:{
    	getUserInformation(){
    		this.getAjax(this.url.getUserInformation,{},(res)=>{
    			if(res.code==200){
    				this.myDataAW = res.data;
    			}
    		})
    	},
    	onpersonage(ind){
    		if(ind!=1){
    			window.location.href = (`#/setpersonal/${ind}`)
    		}
    	},
    	upDatamy(){
    	  this.getAjax(this.url.my,{},(res)=>{
           if(res.code==200){
             this.myData=res.data;
           }else{
             m$.template({
               val:res.message,
               time:1200,
             })
           }
         })
    	},
    	upDateImg(){
        let othis=this;
        if(!m$.dom('#myHeadInput')[0].value){
          return;
        }
        m$.template({
          val:'',
        })
       myImage(m$.dom('#myHeadInput')[0],{width:300,quality:1},(data)=>{
     othis.postAjax(othis.url.updateHeadIcon,{
        headImage:data.split(',')[1]
        },(res)=>{
        	console.log(data.split(',')[1]);
       if(res.code==200){
         othis.getAjax(othis.url.my,{},(res)=>{
           if(res.code==200){
             othis.myData=res.data;
			console.log(res.data);
           }
           else{
             m$.template({
               val:res.message,
               time:1200,
             })
           }
         })
        // othis.myData.headIcon=data;
         m$.template({
           val:'头像上传<br>成功',
           time:1000
         })
       }
       else {
         m$.template({
           val:res.message,
           time:1000
         })
       }
     })
        })
      },
    }
   }
</script>

<style scoped lang="less">

.input-datas{
	position: absolute;
	top:4rem;
	height: .8rem;
	width: 100%;
	-web-kit-appearance:none;
  	-moz-appearance: none;
}
.box{
	height: 13.3rem;
	width: 7.5rem;
	background-color:#F3F2F7;
}
.personage-fake{
	position: relative;
	padding-left: 0.1rem;
	width: 100%;
	min-height: 1.3rem;
	background-color: #FFF;
	margin-top:1px;
	font-size: .3rem;
	>span{
		line-height: 1.3rem;
	}
	.showimg-t{
		border-radius:100%;
		position: absolute;
		right: .35rem;
		top: .15rem;
		width: 1rem;
		height: 1rem;
	}
	.sea-t{
		position: absolute;
		right: .1rem;
		top: .6rem;
	}
	.personage-int-t{
		color: #B8B8B8;
		float: right;
		>.sea-t{
			height: .25rem;
		}
		>input{
    	border-radius: 100%;
    	z-index: 5;
    	height: 1.2rem;
    	opacity: 0;
		}
	}
	.personage-int-t:after{
		content:'';
		display:block;
		clear:both;
	}
}
	.personage{
		.personage-property{
			position: relative;
			padding-left: 0.1rem;
			width: 100%;
			line-height: 0.8rem;
			min-height: 0.8rem;
			background-color: #FFF;
			margin-top:1px;
			font-size: .3rem;
		}
		.showimg{
			width: 1rem;
			height: 1rem;
		}
		.personage-int{
			position: absolute;
			top: 0;
			right: .32rem;
			color: #B8B8B8;
			z-index: 5;
		}
		.sea{
			padding-right: .1rem;
			height: .25rem;
			float: right;
			position: absolute;
			right: 0;
			top: .29rem;
		}
		.personage-int:after{
			content:'';
			display:block;
			clear:both;
		}
	}
</style>