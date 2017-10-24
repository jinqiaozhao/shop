<template>
  <div id="box">
    <!-- 到首页或者到分类页面 等getRegistWxUserAuthUrl-->
    <!--<go-home :sData='sData'  v-if="newChangeYangbinCode"></go-home>-->
    <div class="go_content" v-show="bby_show">
      <span class="car-number"  v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'"  v-show="!show" style="left: 0.35rem;position: absolute;z-index: 101;"></span>
      <div class="gohome" @click="toggleShow()">
        <img src="../../assets/com/bby_logo_s.png" alt="" class="bounce animated">
      </div>
      <ul class="go_wrap" v-show="show">
        <li><router-link to="/index">首页</router-link></li>
        <li>
          <router-link to="/productCar">购物车</router-link>
          <span class="car-number" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'" ></span>
        </li>
        <li><router-link to="/my">个人中心</router-link></li>
        <li><router-link to="/">试用中心</router-link></li>
      </ul>
    </div>

    <div id="banner-img">
      <!-- 购物车图标 -->
      <!-- <router-link class="car-Img" to="/productCar" tag="div" v-if="newChangeYangbinCode">
        <img src="../../assets/car3.png"/>
        <span class="car-number" :class="{'car-number-more':carNumber=>99}" v-if="carNumber" v-text="carNumber<=99?carNumber:'99+'"></span>
      </router-link> -->
<!--图片展示-->
      <div class="swiper-container" style="height:4.5rem;">
        <div class="swiper-wrapper" v-if="productData.images">
          <img src="http://ovn5haih3.bkt.clouddn.com/FreeFre.png" alt="" style="width:1rem;height:1rem;position:absolute;top:0.3rem;right:1.6rem;z-index: 10;" v-if="productData.isFreight=='1' || productData.groupType=='4'">
          <img :src="itemImg" class="swiper-slide" v-for='itemImg in productData.images'/>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div id="seckill-product-info">
      <p class="info-name">{{ productData.name}}

      </p>
      <div class="info-text">{{productData.digest}}</div>
      <!--type=0 为普通商品 ，type=1 为秒杀商品， type=2 为特价商品 -->
      <div class="info-price" v-if="type=='1'">
        <span>￥</span><span class="big-price"
                            v-text='productData.bargainPrice?productData.bargainPrice:"0"'></span><span
        class="del-price">￥<s>{{productData.oldPrice}}</s></span>
        <span class="progresss" v-if="productData.quantity" :class='{"progresss-full":prossWidth==1}'><i
          :style="{width:prossWidth*100+'%'}"><span v-text="(prossWidth*100).toFixed(0)+'%'"></span></i></span>
        <!--<span class="inventory" v-if="1">{{ productData.total ? "库存"+productData.total+"件":'' }}</span>-->
        <span class="inventory" v-if="productData.quantity==0">已抢光</span>
      </div>
      <div class="info-price" v-if="type=='2'">
        <span>￥</span><span class="big-price">{{productData.bargainPrice}}</span><span class="del-price">￥<s>{{productData.oldPrice}}</s></span>
        <span class="progresss" v-if="0"><i><span>23%</span></i></span>
        <span class="inventory" v-if="1">{{ productData.quantity ? "库存"+productData.quantity+"件":'' }}</span>
      </div>
      <div class="info-price" v-if="type=='4'">
        <span>￥</span><span class="big-price">{{productData.bargainPrice}}</span><span class="del-price">￥<s>{{productData.oldPrice}}</s></span>
        <span class="progresss" v-if="0"><i><span>23%</span></i></span>
        <!-- <span class="inventory" v-if="1">{{ productData.quantity ? "库存"+productData.quantity+"件":'' }}</span> -->
        <span class="inventory" v-if="1">
          <span style="color:#5C5C5C;">预计返还积分</span>
          {{(productData.bargainPrice*100).toFixed(0)}}
        </span>
      </div>
      <div class="info-price" v-if="type=='0' || type=='3'">
        <!--<span v-if=" productData.promotionPrice !='null'">￥<span-->
        <!--class="big-price">{{productData.promotionPrice}}</span><span class="del-price">￥<s>{{productData.oldPrice}}</s></span></span>-->
        <!--<span v-if="productData.promotionPrice !='null'">￥<span-->
          <!--class="big-price">{{productData.promotionPrice.indexOf('.')==-1?productData.promotionPrice+'.00':productData.promotionPrice}}</span><span>{{ productData.total ? "库存"+productData.total+"件":'' }}</span></span>-->
        <span v-if="productData.promotionPrice !='null'">￥<span
          class="big-price">{{parseFloat(productData.promotionPrice).toFixed(2)}}</span><span>{{ productData.total ? "库存"+productData.total+"件":'' }}</span></span>
        <span v-if="productData.promotionPrice =='null'">￥<span class="big-price">{{productData.oldPrice}}</span><span>{{ productData.total ? "库存"+productData.total+"件":'' }}</span></span>
        <div class='price-amount-button'>
          <span @click="amountChange(0)">-</span>
          <span class="type_number">
              <input type="tel" v-model='productData.productAmount' :value="productData.productAmount" maxlength="4"
                     max="4" @blur="thisAccountGet(productData.productAmount)">
          </span>
          <span @click="amountChange(1)">+</span>
        </div>
      </div>

      <div class="info-bottom">
        <div class="info-bottom-sales">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAvCAYAAACYECivAAAAAXNSR0IArs4c6QAABJdJREFUaAXtmU1oVFcUx53JJ9QEhQ5ONJUSdCl20Y0goVl0YTBYFKY2gUASdevCjSAIhYALN0VKFyUfkEkJHbc2glCEUncuCtVFF22p1WBEdJFoEieZ6e/cvHPy3nxk3syYzFv0wZt73/0453fP/b9733sT2/MejtnZ2e61tbVUPp/vjcVixzGZ4IxzvuB8RNkvzc3Nt4eHh//muq4jVk/v6enpo7lc7gagZ7DTXMFWjvqfmpqaro2MjPxeoW3Z6pqBJycnr2B1HNj2stZLV2Tj8fg40ONEXgZR1VET8NTU1DdE9rLfE87/4TpD+oDzr42NjTxgHzOgE5wp6o4UtJ8eHR29UC101cATExNf4/i6OhdQgK6OjY39SD6v5YUpgzxDu5ucR7WO9rfoFxi41pVLqwJGBsdx+BBjTq84vN/e3n5uaGjodTkH/vJMJrN3aWlpDhunpdwbYC/Qv/rbbZeXO7ma41sa6831W1dX16mwsOIklUotd3R0fAGoAwRcAvad1IU9QgOn0+kjODjpGc7i9Hx/f/9aWEfaDuiNlpaWIfq/kTJsHmPmPtX6Smlo4Gw2+6Uaw9kdpvEPva42ZT1+Qp+M9sOe2daycmloYCLRq0bIz2i+1pQVxGyw4pjtSvaqAT6kxtra2h5pvta0wMbBsHZCA2PQjK6vrz8N66Bcu8HBwZdIYcWrTzJroVj0ji9n18qZQnfD4STHLrVqFXVkeL74hA0mNEMdrv7vGjoCgZ2Op6/PmKI0vbtDW9jZhvJw9HNnZ+dp1u934iogdGAvUhYVWOX7fHl5+YRcyFEo+I82i93vVzy7/um73tUswbuKw7Oe06Q6DwCzAhxmeXF1TMM9puGVNtztlO36MSwOmI2lGFjWQRrpWvu2EJa6U7T5XsAZ2CW25rv1DKKSPXw9V/v4M2DTMM+rUtgijWjwrzbW1IMVfXcruNbVklayhxwNGPvFwECafjH2pBaI99kHBgMmXwyMTg6rQ3a1ogiLDKh/KqeX1+Y1pSHsGTAODNhuOokwI3HOSYuAPc3aLNRE6etUyV4ikXi+uLjoesBmwKZhavwwRcA+X7uSHRgYeAvokucsQRAda0lgJNFwDXugThbANs3NzcnHmcBOZxqmvOERFjhATccrKytOFiUjzJISCWCYDVh17IB5/W6l8oCMiuM171zuBXHzsnG/QBowFFsRXl1dPUT43ZMbjaKiX4mUAev27CLMK0/k9Cu0fg0HJEGdLWk0iop+95TanvWmM+BSu5yMthGHP8LktzSMPgyYisho2A8ckAQXpmEaRUYSPT09L2DTL6JbEQbSItza2hoZ4L6+vnWk+FLkCOO++fn5toCGZTR8Pn3WCL1u49OWtoWFhWR8ZmbmAxrvlw6iGX073cbArlYJkzpkQUhKhE2/5CMjB4Vk1g2YsmScz6imXyojBwxkEJgCAyYfaWDk4SRhwEQ4MmswwXMHui2KcKQ17L/pGEEwwhREXhLyEmqSYIv+kA8cof8gcXO2wz/I1C254oZ8UoD9H//uMAU7jFCdeb6x+TsckHX4B8j1072/MlJ5jzH9H9NYt35IHRI5AAAAAElFTkSuQmCC">
          <span>销量 {{productData.saleCount?productData.saleCount:'0'}}</span>
        </div>
        <div class="info-bottom-courier-type">
          <img
            src="data:image/png;base64,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">

          <span>快递</span>
        </div>
        <div class="info-bottom-courier-fees">
          <img
            src="data:image/png;base64,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">

          <span>快递费0元</span>
        </div>
        <div class="info-bottom-time"><img
          src="data:image/png;base64,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">

          <span>72小时内发货</span>
        </div>
      </div>

    </div>
    <div class='space'></div>
    <div id="product-notices">
      <!--<p style="color:#fb4874;font-size: 0.28rem;margin-bottom: 0.2rem;"> 全场满58包邮，拼单更划算！！</p>-->

        <div class="enters" @click='jumpa()' v-if='entershave'>
      		<div class="enters-up">
      			<div>产品详细</div>
      		</div>
      	</div>
      	<div class="specification" v-if='jump'></div>
      	<div class="main" v-bind:class="mains">
      		<div class="main-up">产品参数</div>
      		<div class="main-box">
      			<dl class="main-int" v-for='i in mainvalue'>
      				<dt>{{i.key}} </dt><dd>{{i.value}}</dd>
      			</dl>
      		</div>
      		<div class="main-ok" @click="imok">完 成</div>
      	</div>

      <div class="notices-title">
        <div :class="{'title-active':isInstructions}" @click="InstructionsFun(1)">商品信息</div>
        <div :class="{'title-active':!isInstructions}" @click="InstructionsFun(0)">商品留言</div>
      </div>
      <div class="product-instructions" v-if="!isInstructions">
        <leave-word :sData='sData'></leave-word>
      </div>
      <div class="bus-type"  v-if="isInstructions">
        本商品由
          <span v-text="productData.businessName"></span>
        提供发货服务
      </div>
      <div class="um" v-html='productData.intro' v-if="isInstructions" id='pUm'>

      </div>
      <!--//处理ios8以下的fixed定位时当小键盘弹出不兼容问题：-->
      <!--<div style='height:30px position:fiexd'></div>-->
    </div>
    <div id='buy-button-3' v-if="(type == '1')&&isInstructions" class="po-bottom">
      <div class='time' :class='{"button-active":0}' v-if="seckillTimeVal"><span>倒计时</span><span
        v-text="seckillTimeVal"></span></div>
      <!--<button class='car' :class='{"button-active":1}' @click="goCar()">加入购物车</button>-->
      <button class='buy' :class='{"button-active":0}' @click='goBuy()'>立即购买</button>
    </div>
    <!--选择弹框-->
    <div class="select_mode_wrap" v-show="select_show">
        <div class="select_wrap" style="">
          <img src="../../assets/address/maskClose.png" alt="" style="z-index:10;position: absolute;width: 0.4rem;right: 0.2rem;" @click="close_s"/>
          <div class="select_top">
            <div class="thumbnail">
              <img :src='productData.thumbnail' alt=""/>
            </div>
            <div class="pro_info" style="position:absolute;right: 0.4rem;top:0.9rem;left:3.5rem">
              <div class="" v-if="type=='0'" style="color:#FB4874">
               <span v-if="productData.promotionPrice !='null'">￥
                 <span class="">{{productData.promotionPrice}}</span>
                </span>
                <span v-if="productData.promotionPrice =='null'">￥
                  <span class="big-price">{{productData.oldPrice}}</span>
                </span>
              </div>
              <div class="total">
                <span>{{ productData.total ? "库存"+productData.total+"件":'' }}</span>
              </div>
              <div>
               <span v-if="isActive==''">请选择 <span v-text="category"></span></span>
                <span v-if="type_s!=''&& isActive!=''">已选:" <span v-text="type_s">口味</span>"</span>
              </div>
            </div>
          </div>
          <div class="select_content">
              <div v-text="category">口味</div>
              <div>
                <span v-for="(type,index) in types" :key="index" @click="posttypes(index,type)"
                      v-bind:class="{ 'active_s': isActive==index+1 }" v-text="type.name">

                </span>
                <input v-text="type.id" style="display:none" v-model="type_sid"/>
              </div>
          </div>
          <div class="select_num">
            <span>购买数量</span>
            <span style="color:#ccc;font-size:0.1rem;" v-if="type=='1'">(限量供应<span v-text="productData.total"></span>件)</span>
            <div>
              <span @click="amountChange(0)">-</span>
          <span class="type_number">
              <input type="tel" v-model='productData.productAmount' :value="productData.productAmount" maxlength="4"
                     max="4" @blur="thisAccountGet(productData.productAmount)">
          </span>
              <span @click="amountChange(1)">+</span>
            </div>
          </div>
        </div>
    </div>
    <!--0:一般 1 秒杀 2 特价 3 推荐 4 积分-->
    <!--<div id='buy-button-2' v-if="(type != '1')&&isInstructions" class="po-bottom">-->
      <!--&lt;!&ndash;<div :class='{"button-active":0}' @click="goCar()" v-if="type != '2'">加入购物车</div>&ndash;&gt;-->
      <!--<div class="collect">-->
        <!--收藏-->
      <!--</div>-->
      <!--<div :class='{"button-active":0}' @click="goCar()">加入购物车</div>-->
      <!--<div :class='{"button-active":1}' @click='goBuy()'>立即购买</div>-->
    <!--</div>-->
    <div id='buy-button-2' v-if="(type == '0' ||type == '2' || type == '3')&&isInstructions" class="po-bottom">
      <!--<div :class='{"button-active":0}' @click="goCar()" v-if="type != '2'">加入购物车</div>-->
      <div class="bottom_banner" @click="$router.push('/index')">
        <img class="one" src="../../assets/home.png" style="position: absolute;left:21px;width:20px;top:3px;">
        <p class="text" style="font-size:0.1rem;line-height:58px;">首页</p>
      </div>
      <div class="bottom_banner" @click="goSer()">
        <img class="one" src="../../assets/servers.png" style="position: absolute;left:21px;width:20px;top:3px;">
        <p class="text" style="font-size:0.1rem;line-height:58px;">客服</p>
      </div>

      <div class="bottom_banner" @click="collect(productData)">
      	<img src="../../assets/collect03.png" alt="" style="position: absolute;left:22px;width:20px; top:3px;">
      	<div style="font-size:0.1rem;line-height:58px;">收藏</div>
        <img src="../../assets/collect03.png" alt="" style="position: absolute;left:22px;width:20px; top:3px;" v-if="isCollect=='1'">
        <img src="../../assets/collect02.png" alt="" style="position: absolute;left:22px;width:20px;top:3px;" v-if="isCollect=='0' ">
        <div style="font-size:0.1rem;line-height:58px;" v-if="isCollect=='1 '">收藏</div>
        <div style="font-size:0.1rem;line-height:58px;" v-if="isCollect=='0'">已收藏</div>
      </div>
      <div :class='{"button-active":0}' @click="goCar()">
         加入购物车
      </div>
      <div :class='{"button-active":1}' @click='goBuy()'>立即购买</div>

    </div>
    <div id='buy-button-2' v-if="(type == '4')&&isInstructions" class="po-bottom">
      <div :class='{"button-active":0}' @click="goCar() " v-if="qualiProgress >= '10'">加入购物车</div>
      <div :class='{"button-active":1}' @click='goBuy()' v-if="qualiProgress >= '10'">立即购买</div>
      <div :class='{"button-active":0}' @click='getUserid()' v-if="qualiProgress < '10'" id="buy-but">我想试用</div>
      <!--<div class="process" style="" v-if="qualiProgress >1 && qualiProgress!=''" @click='shareMore()'>-->
        <!--申请进度{{qualiProgress*10+'%'}}-->
      <!--</div>-->
      <!--<div style="position: fixed;bottom:0;right:0.2rem;z-index:202;">-->
        <!--<img src="http://orz6nce3e.bkt.clouddn.com/show.png" alt="查看进度" style="width: 0.6rem">-->
        <!--<div style="font-size: 0.2rem;" >试用次数</div>-->
      <!--</div>-->
    </div>
    <div v-show="show_intro" style="position:fixed;top:0;bottom:0;background:rgba(0,0,0,0.4);width:100%;z-index:200;text-align: center" v-if="type == '4'">
      <img src="../../assets/arrow.png" alt="" style="width:2rem;position:absolute;top:0;right:0;">
      <img src="../../assets/text_point.png" alt="" style=" width: 7rem;left:0.2rem;margin-top:45%;">
      <img src="../../assets/ikonw.png" alt="" style="width:4rem;margin-top:1rem;" @click="close_konw">
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "bounce";

  .gomain{top: 30%;}
  .nogomain{top:100%}
  .specification{
  	width: 100%;
  	height: 100%;
  	position: fixed;
  	top: 0;left: 0;
  	z-index: 5;
  	background-color: rgba(0,0,0,0.5);
  }
	 .main{
	 		position: fixed;
	 		left: 0;
	 		width: 100%;
	 		z-index: 6;
	  	text-align: center;
	  	height: 70%;
	  	background-color: #F3F2F7;
    	-webkit-transition: 0.3s linear;
	  	.main-up{
	  		background-color: #FFF;
	  		line-height: 1rem;
	  		width: 100%;
	  		font-size: .34rem;
	  		height: 10%;
	  }
	  .main-box{
	  	text-align: start;
	  	height: 82%;
	  	overflow:scroll;
	  	.main-int{
	  		margin-top: 1px;
	  		padding: .13rem;
			  font-size:.28rem;
			  background-color: #FFF;
			  display:-webkit-flex;
			  >dd{
			  	color: #999;
			  	-webkit-box-flex: 1;
			  	flex: 1;
			  	width: 100%;
			  }
			  >dt{
			  	width: 2rem;
			  }
			}
	  }
	  .main-ok{
	  	background-color: #FF5500;
	  	height: 8%;
	  	line-height: 200%;
	  	color: #FFF;
	  	font-size: .35rem;
	  }
  }
   .enters{
  	border: 1px red solid;
  	width: 7rem;
  	height: .7rem;
  	.enters-up{
  		font-size:0.3rem;
  		text-align: center;
  		line-height:.7rem;
  	}
  }



  .go_content{
    position: fixed;
    z-index: 100;
    bottom: 1.5rem;
    right:0.25rem;
    .gohome{
      z-index: 100;
      >img{
        width: 0.8rem;
      }
    }
    .go_wrap{
      position:absolute;
      list-style: none;
      position: absolute;
      font-size: 0.2rem;
      background:rgba(248,248,248,0.8);
      bottom:0.7rem;
      width: 1.5rem;
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

  .select_mode_wrap{
    font-size: 0.3rem;
    z-index: 5;
    width: 100%;;
    position:fixed;
    top:0;
    bottom:0.96rem;
    background: rgba(0, 0, 0, .5);
    .select_wrap{
      position: fixed;
      width: 100%;
      top:3.5rem;
      bottom: 0.96rem;
      background: #fff;
      z-index: 5;
      padding: 0.3rem;

      >div{
        border-bottom: 1px solid #F0F0F0;
       }
       .select_top{
         position:relative;
         height: 3.2rem;
         .thumbnail{
           background: #fff;
           top:-0.7rem;
           position:absolute;
           padding:0.1rem;
           box-shadow: 0 0 5px #D3D3D3;
           height: 3.2rem;
           border-radius:5px;
           img{
             width: 3rem;
           }
         }
       }
  .select_content{
  padding:0.2rem 0.05rem;
    div:first-child{padding-bottom: 0.2rem}
    div:after{
      content: '';
      display:block;
      clear:both;
    }
    div>span{
      background:#F0F0F0;
      color:#000;
      padding:0.03rem 0.15rem;
      border-radius:8px;
      margin-right: 0.1rem;
      margin-bottom: 0.1rem;
      display: inline-block;
    }
    .active_s{
      background:#FB4874;color:#fff;padding:0.03rem 0.15rem;border-radius:8px;
    }
  }
  .select_num{
    padding:0.2rem 0.05rem;
    >div{
    display: inline-block;
       position:absolute;
       right:0.3rem;
      span{

      }
     }
  }
  .type_number {

  /*position: relative;*/
  > input {
      text-align: center;
      font-size: .3rem;
      color: #b2b2b2;
      /*position: absolute;*/
      /*left: 0;*/
      /*top: 0;*/
      width: 0.3rem;
      z-index: 22;
      display: inline-block;
      border: none;
      outline: none;
    }
  }
    }
  }
  .space {
    height: .2rem
  }
  .um {
    img {
      max-width: 100%;
    }
    word-wrap: break-word;
  }

  #box {
    position: relative;
    width: 100%;
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
  }
  #banner-img {
    width: 100%;
    font-size: 0;
    position: relative;
    .car-Img{
      position: fixed;
     /* top: 0.6rem;
      left: 0.3rem;*/
      bottom:2rem;
      right: 0.3rem;
      height: 0.6rem;
      width: 0.6rem;
      z-index: 3;
      cursor: pointer;
      >img{
        width: 100%;
        height: 100%;
      }
      .car-number{
        background-color: #fb4874;
        display: inline-block;
        border-radius: 0.15rem;
        vertical-align: bottom;
        line-height: 0.3rem;
        padding: 0 0.05rem;
        font-size: .12rem;
        height: 0.3rem;
        min-width: 0.30rem;
        _width: 0.3rem;
        color: #ffffff;
        position: absolute;
        left: 0.26rem;
        top: -0.05rem;
        margin-left: 0.05rem;
      }
      .car-number-more{
        padding: 0 0.08rem;
      }
    }

    img {
      width: 7.5rem;
      height: 4.5rem;

    }
  }

  #seckill-product-details {
    font-family: PingFangSC-Regular;
    width: 7.5rem;
    .product {
      background: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
      height: 2.80rem;
      display: flex;
      padding: .1rem;
      .product-com {

      }
      .product-img {
        flex: 260;
        width: 2.6rem;
        height: 2.6rem;
        img {
          width: 100%;
        }
      }
      .product-details {
        flex: 490;
        padding-left: .2rem;
        .product-details-name {
          margin-top: .18rem;
          font-size: .3rem;
          color: #474747;
          letter-spacing: 1.73px;
          line-height: .3rem;
          height: .3rem;
        }
        .product-details-info {
          margin-top: .1rem;
          max-height: .64rem;
          min-height: .64rem;
          font-size: .26rem;
          color: #868686;
          letter-spacing: .01rem;
          line-height: .32rem;
        }
        .product-details-price {
          height: .48rem;
          min-height: .48rem;
          font-size: .24rem;
          margin-top: .21rem;
          span {
            color: #fb4874;
          }
          .big-price {
            font-size: .48rem;
            letter-spacing: .02rem;
            line-height: .48rem;
          }
          .del-price {
            color: #9a9a9a;
          }
        }
        .product-details-amount {
          height: .54rem;
          display: flex;
          margin-top: .1rem;
          .amount {
            flex: 320;
            font-size: .24rem;
            line-height: .54rem;
            color: #b0aeae;
            letter-spacing: .02rem;
            .progress {
              background: #ececec;
              display: inline-block;
              width: 2.4rem;
              height: .2rem;
              position: relative;
              border-radius: .1rem;
              > i {
                display: inline-block;
                width: 100%;
                height: .2rem;
                background: #fb4874;
                z-index: 3;
                position: absolute;
                border-top-left-radius: .1rem;
                border-bottom-left-radius: .1rem;
                > span {
                  height: .2rem;
                  line-height: .2rem;
                  font-size: .24rem;
                  position: absolute;
                  right: -.75rem;
                  top: 0.03rem;
                }
              }

            }

          }
          .button {
            font-size: .24rem;
            flex: 150;
            line-height: .54rem;
            > button {
              width: 1.4rem;
              height: .54rem;
              margin-right: .1rem;
              border-radius: .06rem;
            }
            .fl-button {
              background: #e0e0e0;
              color: #b1b1b1;
            }
            .tr-button {
              background: #fb4874;
              color: #fff;
            }
          }
        }
      }
    }
  }

  #seckill-product-info {
    font-family: PingFangSC-Regular;
    padding-top: .26rem;
    height: 3.6rem;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);
    .info-name {
      padding-left: .2rem;
      font-size: .32rem;
      color: #323232;
      line-height: .32rem;
      min-height: .32rem;
      margin-top: .06rem;
      margin-bottom: .1rem;
    }
    .info-text   {
      padding-left: .2rem;
      max-height: .64rem;
      font-size: .26rem;
      color: #5c5c5c;
      line-height: .32rem;
      min-height: .32rem;
    }
    .info-price {
      padding-left: .2rem;
      height: .48rem;
      font-size: .28rem;
      color: #fb4874;
      line-height: .28rem;
      margin-top: .21rem;
      position: relative;
      > span {
        display: inline-block;
        height: .24rem;
      }
      .big-price {
        height: .48rem;
        font-size: .64rem;
        letter-spacing: 0.03rem;
      }
      .del-price {
        color: #9a9a9a;
      }
      .progresss {
        z-index:0;
        width: 3.6rem;
        background: #ececec;
        height: .3rem;
        position: absolute;
        right: .2rem;
        top: .09rem;
        border-radius: 1rem;
        > i {
          position: absolute;
          background-color: #fb4874;
          /*width: 100%;*/
          height: .3rem;
          z-index: 333;
          border-bottom-left-radius: 1rem;
          border-top-left-radius: 1rem;
          > span {
            position: absolute;
            right: .05rem;
            top: 0;
            font-size: .18rem;
            color: #fff;
          }
        }
        > span {
          position: absolute;
          right: .1rem;
          font-size: .2rem;
          color: #fb4874;
        }
      }
      .progresss-full {
        > i {
          border-radius: .1rem;
        }
      }
      .inventory {
        position: absolute;
        right: .2rem;
        top: .09rem;
      }
      .price-amount-button {
        display: inline-block;
        font-size: 0;
        position: absolute;
        right: .2rem;
        top: 0;
        > span {
          display: inline-block;
          width: .56rem;
          height: .56rem;
          line-height: .54rem;
          border: 1px solid #ebebeb;
          text-align: center;
          font-size: .26rem;
        }
        span:nth-of-type(1) {
          background-color: #ffe6e8;
          color: #fb4874;
        }
        span:nth-of-type(2) {
          background-color: #f9f9f9;
          width: .75rem;
        }

        span:nth-of-type(3) {
          background-color: #fb4874;
          color: #fff;
        }
        .type_number {
          /*position: relative;*/
          > input {
            text-align: center;
            font-size: .3rem;
            color: #b2b2b2;
            /*position: absolute;*/
            /*left: 0;*/
            /*top: 0;*/
            width: 100%;
            height: 100%;
            z-index: 22;
            display: inline-block;
            border: none;
            outline: none;
          }
        }
      }
    }
    .info-bottom {
      height: 1.2rem;
      border-top: .02rem solid #e3e3e3;
      display: flex;
      margin-top: .4rem;
      margin-bottom: .2rem;
      padding-right: .2rem;
      padding-top: .2rem;
      > div {
        font-size: .22rem;
        text-align: center;
        > img {
          display: inline-block;
          width: .5rem;
          height: .5rem;
        }
        > span {
          display: block;
          font-size: .22rem;
          color: #9c9c9c;
        }
      }
      .info-bottom-sales {
        flex: 150;
      }
      .info-bottom-courier-type {
        flex: 180;
      }
      .info-bottom-courier-fees {
        flex: 170;
      }
      .info-bottom-courier-time {
        flex: 210;
      }
    }
  }

  #product-notices {
    background-color: #fff;
    padding: .22rem .25rem;
    margin-bottom: 0.96rem;
    .notices-title {
      height: .68rem;
      display: flex;
      border: 1px solid #ccc;
      border-radius: .02rem;
      > div {
        line-height: .68rem;
        text-align: center;
        flex: 1;
        font-size: .3rem;
        color: #616161;
      }
      .title-active {
        background: #fb4874;
        color: #fff;
      }
    }
    .product-instructions {
      list-style: none;
      li {
        margin-top: .3rem;
        > h4 {
          font-size: .28rem;
          color: #6e6e6e;
        }
        > p {
          font-size: .26rem;
          color: #9a9a9a;
          margin-top: .1rem;
          letter-spacing: 0.01rem;
          line-height: .32rem;

        }
      }
    }
    .bus-type{
      margin-top: .25rem;
      height: .76rem;
      line-height: .76rem;
      font-size: .26rem;
      color: #616161;
      >span{
        font-size: .28rem;
        color: #616161;
        margin: 0 .04rem;
      }
    }
    .buy-instructions {
      list-style: none;
      padding-top: .3rem;
      > li {
        display: flex;
        font-size: .26rem;
        margin-bottom: .2rem;
        .instru-name {
          flex: 138;
          text-align: center;
          color: #8f8f8f;
        }
        .instru-info {
          flex: 545;
          color: #6e6e6e;
          letter-spacing: .01rem;
          line-height: .32rem;
          > span {
            display: inline-block;
            margin-right: .4rem;
          }
        }
      }
      .info-img {
        padding: .1rem;
        border-top: 2px solid #d8d8d8;
        p {
          text-align: center;
          color: #6e6e6e;
          font-size: .3rem;
          margin: .2rem 0;
        }
        img {
          height: 4.2rem;
          width: 100%;
        }
      }
    }
  }

  #buy-button-3 {
    display: flex;
    background-color: #fff;;
    color: #fb4874;
    margin-top: .2rem;
    > button {
      height: .96rem;
      outline: none;
      background: #ffe6e8;
      color: #fb4874;
    }
    .time {
      flex: 250;
      height: .96rem;
      text-align: center;
      //padding-left: 1.05rem;

      span {
        display: block;
        font-size: .3rem;
      }
      span:nth-of-type(1) {
        font-size: .2rem;
        margin-top: .15rem;
      }
    }
    .car {
      flex: 200;
    }
    .buy {
      flex: 200;
    }
    .button-active {
      background-color: #fb4874;
      color: #fff;
    }
  }

  #buy-button-2 {
    width: 100%;
    display: flex;
    font-size: 0;
    >div.bottom_banner{
      position:relative;
      text-align: center;
      flex:0.6;
     background: #fff;
      border-top:1px solid #F1F1F1;
      color: #999999;
    }
    > div {
      text-align: center;
      line-height: 0.96rem;
      font-size: 0.3rem;
      flex: 1;
      //background: #ffe6e8;
      height: .8rem;
      color: #fff;
     // background: -moz-linear-gradient(left, #ace, #f96);
      background: -webkit-linear-gradient(left, #FF7194, #FB4874);
      //background: -o-linear-gradient(left, #ace, #f96);
    }
    .button-active {
      background-color: #fb4874;
      color: #fff;
      background: -webkit-linear-gradient(left, #FF386A, #FF5C5C);
    }
  }
.po-bottom{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
<script type="text/javascript">
  import leaveWord from 'src/components/leaveWord/leaveWord.vue'
  import goHome from 'src/components/com/gohome.vue'
  export default{
    props: ['sData'],
    components:{leaveWord,goHome},
    data(){
      return {
      	entershave:false,
      	mainvalue:[],
      	jump:false,mains:{'gomain':false,'nogomain':true},
        isCollect:'',
        show_intro:false,
        heights:document.documentElement.clientHeight,
        Widths:document.documentElement.clientWidth,
        bby_show:true,
        show:false,
        registerUrl:'',
        qualiProgress:'',//申请进度 10表示成功
        categoryShow:'',//是否显示选择框
        select_show:false,
        type_sid:'',
        category:'',
        type_s:'',//选中规格
        types:[],//商品规格选择
        isActive:'',
        carNumber:'',
        goodsId: this.$route.params.id,
        isInstructions: true,
        type: '',//平常：0，特价：2，秒杀：1，积分：4
        productData: {
          //total总数
          //promotionPrice 特价
          //oldPrice 旧价
          //seckillPrice 秒杀价
          //digest 摘要
        },
        seckillTimeVal: '',
        prossWidth: '',
        setTimes: 100,
        second: 10,
        s: 10,
        m: 10,
        h: 10,
        times: ''
      }
    },
    beforeCreate(){

    },
    methods: {
    	imok(){this.jump = false;this.mains.gomain = false;this.mains.nogomain = true},
    	jumpa(){this.jump = true;this.mains.gomain = true;this.mains.nogomain = false},
      getProductParameters(){
    		this.getAjax(this.url.getProductParameters,{productId:this.goodsId},(res)=>{
    			if(res.code==200){
    				if(res.data!=''){
    					this.mainvalue = res.data;
    				  this.entershave = true;
    				}
    			}
    		})
    	},
      collect(productData){
//        m$.template({
//          val: '功能未开启',
//          time: 500
//        });
//        return
        this.postAjax(this.url.toggleCollection,{productId :this.goodsId},(res)=>{
        this.isCollect=res.data;
        if(res.data==0){
                  m$.template({
                    val: '收藏成功',
                    time: 500
                 });
        }  if(res.data==1){
          m$.template({
            val: '取消收藏成功',
            time: 500
          });
        }
      })
      },
      goSer(){
        m$.template({
          val: '功能暂未开启<br/>请在公众号内<br/>直接联系客户',
          time: 2000
        });
      },
      //获取有效分享次数
      getUserShareTimes(){
        this.postAjax(this.url.getUserShareTimes,{shareType:1},(res)=>{
        this.qualiProgress=res.data;
        this.canBuy=res.data/10>=1?res.data/10:0;
      })
      },
      close_konw(){
        this.show_intro=false;
      },
      shareMore(){
        m$.template({
          val: '点击右上角继续分享<br/>可以加速申请进度',
          time: 1000
        });
      },

      //分享商品
      getUserid(){
        //*this.show_intro=true;
       var groupType=this.productData.groupType
        var url=window.location.href;
        this.getAjax(this.url.getUserid,{},(res)=>{
          if(res.code==200){
          this.getAjax(this.url.getShareWxUserAuthUrlPlusUserid,{groupType:groupType,url:url},(res)=>{
          window.location.href=res.data;
          })
        }
        })
        this.getUserShareTimes();
        m$.template({
          val: '请开始你的分享之旅',
          time: 500
        });
      },
      getShareWxUserAuthUrl(){
        var url=window.location.href;/*分享地址*/
          this.getAjax(this.url.getShareWxUserAuthUrl,{url:url},(res)=>{
              if(res.code==200){
                  this.registerUrl = res.data
          m$.sessionStores.set('sliSus','success');
               window.location.href=res.data;
              }
          })
      },
      getWxUserShareUrl(){
        var url=window.location.href;
        // if(url.indexOf('openId')=='-1'){
        //
        // }else{
        //
        // };
        if(url.indexOf('openId')=='-1'){
            this.getAjax(this.url.getShareWxUserAuthUrl,{url:window.location.href},(res)=>{
                if(res.code==200){
                    this.registerUrl = res.data;
                //   console.log(location.href )
            //window.location.href=res.data;
        }
      })
      }else{
          var openId=location.href ? location.href.split('?')[1].split('=')[1]:'';
          //console.log(openId)
                }
      },
      getQualification(){
    		this.qualification=true;
    		var c=document.getElementById("buy-but");
        if(c){
          c.innerHTML="申请进度"+this.qualiProgress*10+"%";
        }
    		var w=this.qualiProgress*10*3
    		if(this.qualiProgress>=10){
    			m$.template({
        val: '申请成功<br/>欢迎购买积分产品',
        time: 500
      });
    		}
   	},
      close_s(){
        this.select_show=false;
      this.bby_show=true;
        m$.sessionStores.remove('goCar');
        m$.sessionStores.remove('gobuy');},
      posttypes(index,type){
      		this.type_s=type.name;
          this.isActive=index+1;
        this.type_sid=type.id;
      },
      toggleShow(){
        if(this.show==false){
          this.show=true;
          var isloged=m$.localStrages.get('yxdyb');
          if(isloged!=null){
            //this.getCarNumber();
          }else{}
        }else{
          this.show=false;
        }
      },
      getCarNumber(){
        this.getAjax(this.url.isLogged,{},(res)=>{
          if(res.code==200&&res.data==true){
            this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
              if(res.code=200){
                this.carNumber = res.data.quantityCount;

              }
            });
            //获取是否收藏状态
          this.getAjax(this.url.getCollectionStatus,{productId :this.goodsId},(res)=>{
          this.isCollect=res.data;
         // console.log()
        })
          }
        })
      },
      thisAccountGet(val){
        if(this.productData.groupType=='4'){
          if(val=='' || val<0 || val>1){
            this.productData.productAmount = 1;
          }
        }else{
          if(val=='' || val<0){
            this.productData.productAmount = 1;
          }
        }
      },
      InstructionsFun(boo){
        if (boo) {
          this.isInstructions = true;
        } else {
          this.isInstructions = false;
        }
      },
      getTimeChange(){
        this.postAjax(this.sData.url.getProductGroupShopVo, {
          status: 1,
          groupType: 1,
        }, (res) => {
          if (res.code == 200 && res.data.data[0]) {
            // res.data.data[0]
            var currentDate = new Date(res.data.data[0].currentDate.replace(
              /\-/g, '/'));
            var gmtEnd = new Date(res.data.data[0].gmtEnd.replace(
              /\-/g, '/'));
            var gmtStart = new Date(res.data.data[0].gmtStart);
            var time = (gmtEnd.getTime() - currentDate.getTime()) / 1000;
            //获得 秒杀结束时间
// console.log(time)
            var _this = this;
            _this.timer = setInterval(function () {
              time--;
              if (time == 0) {
                clearInterval(_this.timer);
                _this.seckillTimeVal == '00:00:00:000';
                return;
              }
              _this.formatSeconds(time);
            }, 1000)
          }
        })
      },
      formatSeconds(value){
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = "" + parseInt(theTime);
        if (theTime1 >= 0) {
          result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 >= 0) {
          result = "" + parseInt(theTime2) + ":" + result;
        }

        this.seckillTimeVal = result;

      },
      getType(){
        // console.log(this.$route.params.type);

      },
      getData () {
        //商品详情
        m$.template({
          val: '',
          time: 400
        });
        this.getAjax(this.sData.url.getProductDetailShopVoUrl, {productId: this.goodsId}, (res) => {
          var ii = {};
          ii.productAmount = res.data ? 1 : '0';
          ii.name = res.data && res.data.name ? res.data.name : '';//商品名
          ii.total = res.data && res.data.total ? res.data.total : '';//库存量
          ii.quantity = (typeof res.data.quantity == 'number') ? res.data.quantity : '';//当前库存量
          ii.totalQuantity = res.data && res.data.totalQuantity ? res.data.totalQuantity : '';//活动存量
          ii.seckillPrice = res.data && res.data.seckillPrice ? res.data.seckillPrice : "";//秒杀价
          ii.promotionPrice = res.data && (res.data.promotionPrice + '') ? (res.data.promotionPrice + '') : "";//促销价
          ii.oldPrice = res.data && res.data.oldPrice ? res.data.oldPrice : '';//普通价
          ii.bargainPrice = res.data && (res.data.bargainPrice + '') ? (res.data.bargainPrice + '') : '';//特价
          // ii.endPrice = res.data.promotionPrice ? res.data.promotionPrice : res.data.oldPrice;//普通商品最终价格
          ii.endPrice = (typeof res.data.bargainPrice == 'number') ? (res.data.bargainPrice + '') :
            ((typeof res.data.promotionPrice == 'number') ? (res.data.promotionPrice + '') :
              (res.data.oldPrice ? res.data.oldPrice : ''));
          ii.freight = res.data && res.data.freight ? res.data.freight : '';//运费
          ii.digest = res.data && res.data.digest ? res.data.digest : '';//摘要
          ii.intro = res.data && res.data.intro ? res.data.intro : '';//介绍
          ii.images = res.data && res.data.images ? res.data.images : '';//图片
          ii.thumbnail = res.data && res.data.thumbnail ? res.data.thumbnail : '';//缩略图片
          ii.businessId = res.data && res.data.businessId ? res.data.businessId : '';//商家id
          ii.id = res.data && res.data.id ? res.data.id : '';//id
          ii.saleCount = res.data && res.data.saleCount ? res.data.saleCount : '0';//id
          ii.businessName = res.data && res.data.businessName ? res.data.businessName : '';//发货商户
          ii.categoryId=res.data.categoryId;
          ii.groupType=res.data.groupType;
          this.productData = ii;
          this.type = (res.data.groupType >= 1 ? res.data.groupType : 0);
    //获取分类id
    this.postAjax(this.sData.url.categoryGetCategoryById, {categoryId: this.productData.categoryId}, (res) => {
    this.categoryShow=res.data;
    if(res.data){
      this.category=res.data.name;
      this.types=res.data.specifications;
    }
    });
          this.prossWidth = res.data.quantity / res.data.totalQuantity;
          setTimeout(function () {
            var swiper1 = new Swiper('#banner-img>.swiper-container', {
              pagination: '#banner-img .swiper-pagination',
              paginationClickable: true,
              autoplayDisableOnInteraction : false,
              autoplay: 2500
            });
          }, 10);
          setTimeout(function () {
            var allChriden = m$.dom('#pUm *');
            for (var j = 0; j < allChriden.length; j++) {

              if (allChriden[j].tagName.toLowerCase() != 'br') {
                allChriden[j].style.maxWidth = "100%";
                allChriden[j].style.height = 'auto';
              }
            }
            // console.log(allChriden)
          }, 12)
          if (this.type == 1) {
            this.getTimeChange();
          }

        })
      },
      goCar () {
     if(this.type_s!=''){
     	m$.sessionStores.remove('gobuy');
      		m$.sessionStores.remove('goCar');
     }else{
    if(this.categoryShow==null){

    }else{
    	this.select_show=true;
    	this.bby_show=false;
    	  //    如果有选择的口味弹出选择框
    if(this.types!='' &&  !m$.sessionStores.get('goCar')){
      m$.sessionStores.set('goCar','one');
      return;
    }else{
    if(this.type_s==''){
      m$.template({
        val: '请选择<br/>口味或规格',
        time: 500
      });
      return;
    }
    m$.sessionStores.remove('goCar');
    this.select_show=false;
    this.bby_show=true;
    }
}
    }
//productId 商品ID  quantity 数量默认为1
        var _this = this;
        this.postAjax(this.sData.url.saveCartUrl, {
          productId: this.goodsId,
          quantity: this.productData.productAmount,
          price: this.productData.endPrice,
          specificationId:this.type_sid
        }, (res) => {
          if (res.message == 'ok') {
            this.getCarNumber();
            m$.template({
              val: '加入购物车<br>成功',
              time: 2000,
            })
            this.select_show=false;
            this.bby_show=true;
          }
        })
      },
      amountChange(boo){
        //改变数量
        if (this.productData.total) {
          if (boo) {
            if(this.type=='1'){
              this.productData.productAmount='1';
              m$.template({
                val: '秒杀商品<br/>每人限购一件',
                time: 500
              })
            }else{
              //加数量 不超过 productData.total 库存量
              if (this.productData.total - this.productData.productAmount) {
                this.productData.productAmount++;
              } else {
                m$.template({
                  val: '商品已经<br/>没有了',
                  time: 500
                })
              }
            }
          } else {
            //减数量
            if (this.productData.productAmount - 1) {
              this.productData.productAmount--;
            } else {
              m$.template({
                val: '商品不能<br/>少于1',
                time: 500
              })
            }
          }
        }
      },
      getTime(){
      },
      goBuy () {
      	if(this.type_s!=''){
      		m$.sessionStores.remove('gobuy');
      		m$.sessionStores.remove('goCar');
      	}else{
    if(this.categoryShow==null){

    }else{
    	this.select_show=true;
    	this.bby_show=false;
    	 //    如果有选择的口味弹出选择框
      if(this.types!='' &&  !m$.sessionStores.get('gobuy')){
        m$.sessionStores.set('gobuy','one');
        return;
      }else if(this.type_s==''){
        m$.template({
          val: '请选择<br/>口味或规格',
          time: 500
        });
        return;
      }
      m$.sessionStores.remove('gobuy');
      this.select_show=false;
      this.bby_show=true;
    }
    }
        if (typeof this.productData.quantity == 'number' && this.productData.quantity == 0) {
          m$.template({
            val: '商品已抢光',
            time: 1000
          });
          return
        }
        this.getAjax(this.url.my,{},(res)=>{
          if(res.code==200){
            var products = {};
            products.goods = [];
            products.digest = this.productData.digest;
      //this.productData.digest =this.type_s;
      this.productData.specificationId=this.type_sid?this.type_sid:0;
      //this.productData.type_s=this.type_s;
			this.productData.specificationName=this.type_s?this.type_s:'';
            m$.sessionStores.set("products", this.productData);
            m$.localStrages.remove('item');
            window.location.href = (`#/sureOrder/-1`);
          }
          else{
            m$.template({
              val:res.message,
              time:800,
            })
          }
        })

      }
    },
    updated() {
if(this.$route.name=='goodsDetail'){
  var shareTitle=this.productData.name;
  var shareDesc=this.productData.digest;
  var shareImg=this.productData.thumbnail;
  var oGetUrlT = window.location.href.split("#")[0];
  this.getAjax(this.url.getSignedJsTicket, {url: oGetUrlT}, (res) => {
    if (res.code == 200) {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'onVoicePlayEnd',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
      });

//       wx.openLocation({
//     latitude: 0, // 纬度，浮点数，范围为90 ~ -90
//     longitude: 0, // 经度，浮点数，范围为180 ~ -180。
//     name: '我的位置', // 位置名
//     address: '', // 地址详情说明
//     scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
//     infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
// });
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        imgUrl: shareImg,//分享图片
        link:window.location.href,
        success: function (res) {
            // 用户确认分享后执行的回调函数
          m$.localStrages.set('success','1')
        },
        cancel: function (res) {
            // 用户取消分享后执行的回调函数
        }
      });
          wx.ready(function(){
            wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              imgUrl: shareImg,//分享图片
              success: function () {
                  // 用户确认分享后执行的回调函数
                m$.localStrages.set('success','1')
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
            });
  //分享到聊天
  wx.onMenuShareAppMessage({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      imgUrl: shareImg,//分享图片
      success: function () {
          // 用户确认分享后执行的回调函数
        m$.localStrages.set('success','1')
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
  });
  //分享到朋友圈
  wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      desc: shareDesc, // 分享描述
      imgUrl: shareImg,//分享图片
      success: function () {
          // 用户确认分享后执行的回调函数
        m$.localStrages.set('success','1')
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
  });
});
    }
  })
}else{}
  // 获取v-if后的元素
  var pro=this.qualiProgress!='';
  var c=document.getElementById("box");
  if(c && pro){
    //console.log(this.productData.groupType)

  }
},
    created () {
      //获取试用次数


//      var isSli=m$.sessionStores.get('sliSus');
//      if(isSli){
//       // 已经授权
//        m$.sessionStores.remove('sliSus')
//      }else{
//        this.getShareWxUserAuthUrl();
//      }
      var url=window.location.href;
      var n=url.indexOf('uid');
      if(n>0){
        this.getShareWxUserAuthUrl();
      }else{}

      m$.documentTitle("商品详细");
      m$.sessionStores.remove('ybpdmk');
      m$.scroll(function () {
        return null;
      });
      // var tt = new Date(this.time);
      // var othis = this;
      // setInterval(function () {
      //   if (othis.setTimes == 0) {
      //     othis.setTimes = 100
      //   }
      //   othis.setTimes--
      // }, 10);
      // setInterval(function () {
      //   if (othis.second == 0) {
      //     othis.second = 10
      //   }
      //   othis.second--
      // }, 1000);
      this.getCarNumber();
      this.getType();
      this.getData();
    },
    mounted(){
      var othis = this;

    },
    watch: {
      'qualiProgress':function(val){

      },
      'isInstructions':function (val) {
        if(val==true){
          setTimeout(function () {
            var allChriden = m$.dom('#pUm *');
            for (var j = 0; j < allChriden.length; j++) {
              if (allChriden[j].tagName.toLowerCase() != 'br') {
                allChriden[j].style.maxWidth = "100%";
                allChriden[j].style.height = 'auto';
              }
            }
          }, 12)
        }
      },
      'productData.productAmount': function (val) {
        var numgeG=/^[0-9]{1,6}$/;
        if (val&&(val <= 0  || numgeG.test(val)==false)) {
          this.productData.productAmount = 1
        }
      },
      'type': function (val) {
        if (val == 1) {
          // this.prossWidth=m$.localStrages.get('item').quantity/m$.localStrages.get('item').totalQuantity
        }
        if(val==4){
          this.getQualification()
          this.show_intro=true;
        }
      }
    }
  }
</script>
