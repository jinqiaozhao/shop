/*
*作者---杨彬
*
*/
<template>
    <div class="sure-order-alert">
        <div class="alert-content com-div-center-center-ab">
          <p v-text="sData.sureOrder.alert.title"></p>
          <section v-text="sData.sureOrder.alert.content"></section>
          <div><button type="button"
                       v-text="jitem"
                       v-for="jitem in sData.sureOrder.alert.button"></button></div>
        </div>
    </div>
</template>
<script type="text/javascript">
  export default {
    props:['sData']
  }
</script>
<style scoped lang="less">
    @import "sureOrderAlert";
</style>
