/*
*作者---杨彬
*
*/
<template>
    <div style="font-size:24px;">

      <label><input class="mui-switch" type="checkbox"> 默认未选中</label>
      <label><input class="mui-switch" type="checkbox" checked> 默认选中</label>
      <label><input class="mui-switch mui-switch-animbg"
                    type="checkbox"> 默认未选中,简单的背景过渡效果,加mui-switch-animbg类即可</label>
      <label><input class="mui-switch mui-switch-animbg" type="checkbox" checked> 默认选中</label>
      <label> 默认未选中，过渡效果，加 mui-switch-anim
        类即可</label>
      <label><input class="mui-switch mui-switch-anim" type="checkbox" checked> 默认选中</label>
    </div>
</template>
<script type="text/javascript">
  export default {

  }
</script>
<style scoped lang="less">
    @import "switch";
</style>
