<template>
  <section>
    <div class="content"  style="font-size: 0.3rem;padding:0.25rem;background-color: #fff;border-bottom: 1px solid #f5f5f5;color: #4E4E4E">
      <form action="" method="get">
        <span style="width:20%;">选择套餐：</span>
        <div style="position:relative;display: inline-block;width: 75%;" >
          <span @click="test">请选择</span>
          <div class="retr_select_wrap" style="top:0.5rem;position:absolute;color: #000;background: rgba(243,243,243,1);width: 100%;padding:0.1rem 0; z-index: 100;" v-show="checkboxShow" >
            <label ><input name="checkpackage" type="checkbox" value="换瓷砖" v-model="checkpackage"/>换瓷砖 </label>
            <br/>
            <label><input name="checkpackage" type="checkbox" value="换地板" v-model="checkpackage"/>换地板 </label>
            <br/>
            <label><input name="checkpackage" type="checkbox" value="换橱柜" v-model="checkpackage"/> 换橱柜</label>
            <br/>
            <label><input name="checkpackage" type="checkbox" value="换吊顶" v-model="checkpackage" />换吊顶</label>

          </div>
        </div>
        <br/>
      </form>
    </div>
  </section>
</template>
<style scoped lang="less">
  .retr_select_wrap{
  label{
    padding-bottom:0.1rem;
  }
  }
</style>
<script>
  export default {
    data(){
    return {
      checkboxShow: false,
      checkpackage: [],
    }
  },
  methods: {
    test(){
      if( this.checkboxShow==false){this.checkboxShow=true;}else{this.checkboxShow=false;}
      var checkpackage=this.checkpackage.toString();
      console.log(checkpackage);
      m$.sessionStores.set("checkpackage", checkpackage);
    }
  }
  }
</script>
