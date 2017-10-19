/*
*作者---杨彬
*
*/
<template>
    <div class="index-nav-warp">
        <router-link tag="div" v-for="(oitem,ind) in navData" :to="oitem.href" :key='ind'>
          <div class="img_wrap">
            <img :src="oitem.src">
          </div>
            <p v-text="oitem.val"></p>
        </router-link>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return{

            }
        },
        props:['navData'],
          methods: {
      willGo(ourl){
        window.clearInterval();
        this.$router.replace(ourl)
      }
    },
        created(){
            // console.log(this.navData)
        }

    }
</script>
<style scoped lang="less">
    .index-nav-warp{
        background-color: #fff;
        display: flex;
        >div{
            flex: 1;
            text-align: center;
            font-size: 0;
            padding:0.2rem;
         .img_wrap{
           //padding:0.15rem;
          // background: #ECECEC;
        //  border-radius: 50%;

           >img{
              width:100%;
             }
         }

            >p {
                white-space: nowrap;
                margin-top: 0.12rem;
                font-family:PingFangSC-Regular;
                font-size:0.25rem;
                color:#696969;
                letter-spacing:0px;
                line-height:100%;
                text-align:center;
            }
        }
    }
</style>
