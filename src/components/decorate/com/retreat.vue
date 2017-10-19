<template>
  <section>
    <div class="content"  style="font-size: 0.3rem;padding:0.25rem;background-color: #fff;border-bottom: 1px solid #f5f5f5;color: #4E4E4E">
      <form action="" method="get">
        <span style="width:20%;">翻新项目</span>
        <div style="position:relative;display: inline-block;width: 75%;" >
          <span @click="test">请选择</span>
          <div class="retr_select_wrap" style="top:0.5rem;position:absolute;color: #000;background: rgba(243,243,243,1);width: 100%;padding:0.1rem 0; z-index: 100;" v-show="checkboxShow" >
            <label ><input name="Fruit" type="checkbox" value="换瓷砖" v-model="checkbox"/>换瓷砖 </label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="换地板" v-model="checkbox"/>换地板 </label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="换橱柜" v-model="checkbox"/> 换橱柜</label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="换吊顶" v-model="checkbox" />换吊顶</label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="换墙纸" v-model="checkbox"/> 换墙纸</label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="木工" v-model="checkbox"/> 木工</label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="拆墙/砌墙" v-model="checkbox"/> 拆墙/砌墙</label>
            <br/>
            <label><input name="Fruit" type="checkbox" value="其他" v-model="checkbox"/> 其他</label>

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
      checkbox: [],
    }
  },
  methods: {
    test(){
      if( this.checkboxShow==false){this.checkboxShow=true;}else{this.checkboxShow=false;}
      var checkbox=this.checkbox.toString();
      console.log(checkbox);
      this.$emit('getcheckbox',this.checkbox);
      m$.sessionStores.set("checkbox", checkbox);
    }
  }
  }
</script>
