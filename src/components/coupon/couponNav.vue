/*
*作者---杨彬
*
*/
<template>
    <div class="header">

            <div v-for="oitem in coupon.nav">
                <div @click="willGo(oitem.url)" class='item-nav com-div-middle-ab itemC' ></div>
                <router-link :to="'/myCoupon/'+oitem.url" v-text="oitem.name" class='item-nav' active-class="active-nav"></router-link>
            </div>
    </div>
</template>
<script type="text/javascript">
    import {coupon} from 'src/assets/statusData.js';
    export default {
        data(){
            return{
                coupon:coupon
            }
        },
      methods:{
        willGo(ourl){
         this.$router.replace('/myCoupon/'+ourl)
        }
      }
    }

</script>
<style scoped lang="less">
    .header{
        display: flex;
        height: 0.88rem;
        background-color: white;
        >div{
            flex: 1;
            font-size: 0;
            text-align: center;
            height: 0.88rem;
            position: relative;
        }
      .itemC{
z-index:3;
      }
        .item-nav{
            height: inherit;
            display: inline-block;
            width: 72%;
            font-family:PingFangSC-Regular;
            font-size:0.32rem;
            color:#5b5b5b;
            letter-spacing:0px;
            line-height:0.88rem;
            text-align:center;
        }
        .active-nav{
            font-family:PingFangSC-Regular;
            color:#fb4874;
            letter-spacing:0px;
            text-align:center;
            border-bottom: 0.04rem solid #fb4874;
        }
    }
</style>
