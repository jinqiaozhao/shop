/*
*作者---杨彬
*
*/
<template>
    <div>
      <header class="headNav">
        <div>
          <div class="allItem" v-for="(oitem,ind) in navData" :key='ind'>
            <router-link class="navItem" tag="div"
                         v-text="oitem.name" :to="{path:oitem.url}" active-class="navIsSelect"></router-link>
            <div @click="willGo(oitem.url)" class='navItem com-div-middle-ab itemC' ></div>
          </div>
         </div>
      </header>
    </div>
</template>
<script type="text/javascript">
  export  default {
    props:["navData"],
    methods:{
      willGo(ourl){
        this.$router.replace(ourl)
      }
    }
  }
</script>
<style scoped lang="less">
    @import "nav";
</style>
