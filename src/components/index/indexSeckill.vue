/*
*作者---杨彬
*
*/
<template>
  <div class="seckill_wrap">
    <div class="index-seckill">
    <!--<div v-for="(oitem,ind) in groupType2" :key="ind" v-if="ind<3">-->
      <div v-for="(oitem,ind) in groupType2" :key="ind" v-if="ind<3">
        <img :src="oitem.thumbnail" @click="goGoodsDetal(oitem.productId)">
        <p class="name" v-text="oitem.productName"></p>
        <p class="price">
            <span class="nowP" v-text="'￥'+oitem.price+' '"></span>
            <span class="oldP">￥<s v-text="oitem.oldPrice"></s></span>
        </p>
    </div>
    </div>
    </div>
</template>
<script type="text/javascript">
    export default {
    props:['groupType2'],
        data(){
            return{

            }

        },
      methods:{
        goGoodsDetal(productId){
          window.location.href=(`#/goodsDetail/${productId}`)
        }
      },
      created(){
        // console.log(this.groupType2)
      }
    }
    </script>
<style scoped lang="less">
  .seckill_wrap{
    overflow:scroll;
  }
    .index-seckill{
        background-color: #fff;
        text-align: center;
        width: 7.5rem;
        display: flex;
        margin: 0 auto;
        >div{
            flex: 1;
            font-size: 0;
            text-align: center;
            >img{
                width: 1.7rem;
                height: 1.6rem;
            }
            >.name{
                margin-top: 0.15rem;
                font-family:PingFangSC-Regular;
                font-size:0.24rem;
                color:#6a6a6a;
                letter-spacing:0px;
                /*line-height:100%;*/
                text-align:center;
               text-overflow:ellipsis;
               overflow:hidden;
               display:-webkit-box;
               -webkit-box-orient:vertical;
               -webkit-line-clamp:2;
            }
            >.price{
                font-size: 0;
                margin-top: 0.09rem;
                .nowP{
                    font-family:PingFangSC-Regular;
                    font-size:0.24rem;
                    color:#fb4874;
                    letter-spacing:0px;
                    line-height:100%;
                    text-align:center;
                }
                .oldP{
                    font-family:PingFangSC-Regular;
                    font-size:0.2rem;
                    color:#9a9a9a;
                    letter-spacing:0px;
                    line-height:100%;
                    text-align:center;
                }

            }
        }
    }
</style>
