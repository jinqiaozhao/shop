/*
*作者---杨彬
*
*/
<template>
    <div class="footer">
      <div class="navItem-warp"  v-for="(zitem,zindex) in sData.comfootSData.navText">
        <router-link :to="zitem.url"
                     :class="['footer-nav'+zindex]" class="navItem"
                     active-class="footer-select">
          <span class="car-number" v-if="zindex==2&&carNumber>0" v-text="carNumber"></span>
          <span v-text="zitem.name" class="footer-text com-div-center-ab"></span>
        </router-link>
      </div>

    </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return{
        carNumber:1
      }
    },
    props:['sData'],

    created(){
        console.log(232)

    }
  }
</script>
<style scoped lang="less">
@import "footer";
</style>
