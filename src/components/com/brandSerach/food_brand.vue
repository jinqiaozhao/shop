<template>
  <div class="sort">
    <div class="sort-brand" >
      <P>品牌</P>
    </div>
    <div class="t-sort-button" >
      <!--<input type="button" value="brand"  v-for="brand in brand" v-model="searchVal2" active-class="active-select-buton-test"  @click="searchValFun(searchVal2)"/>-->
      <div v-for="brand in brand" v-text="brand" v-model="searchVal2" class="select-buton-test" active-class="active-select-buton-test" @click="searchValFun('阿弟仔')"></div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      brand:['阿弟仔','谷丽友','久久丫','焦糖玛奇朵','卡布奇诺 普罗旺斯','其他'],
        searchVal2:'',
  },
  }
</script>
<style scoped lang="less">
  .sort {
    width: 7.5rem;
    height: 2rem;
    background-color: #FFF;
  .sort-brand {
  p{
    margin-bottom: 0.12rem;
    padding-top: .177rem;
    margin-left: 0.24rem;
    font-size: 0.35rem;
    color: #D94E6A;
  }
  }
  .t-sort-button{
    font-size: 0.35rem;
  >.select-buton-test {
     display: inline-block;
     border-radius: 1rem;
     height: 0.5024rem;
     padding: .04rem .26rem .1rem .2rem;
     margin: .05rem .1rem .05rem .1rem;
     background-color:#F5F5F5;
   }
  >.active-select-buton-test{
     background-color:mediumvioletred;
   }
  }
  }
</style>
