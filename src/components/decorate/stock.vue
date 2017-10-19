<template>
  <div class="box">
    <div class="one" v-if='index == 0'>
      <!-- <img src="../../assets/decorate/furniture/hongmu0/01.jpg" /><img src="../../assets/decorate/furniture/hongmu0/02.jpg" /><img src="../../assets/decorate/furniture/hongmu0/03.jpg" /><img src="../../assets/decorate/furniture/hongmu0/04.jpg" />
            <img src="../../assets/decorate/furniture/hongmu0/05.jpg" /><img src="../../assets/decorate/furniture/hongmu0/06.jpg" /><img src="../../assets/decorate/furniture/hongmu0/07.jpg" /><img src="../../assets/decorate/furniture/hongmu0/08.jpg" />
            <img src="../../assets/decorate/furniture/hongmu0/09.jpg" /><img src="../../assets/decorate/furniture/hongmu0/10.jpg" /><img src="../../assets/decorate/furniture/hongmu0/12.jpg" /><img src="../../assets/decorate/furniture/hongmu0/13.jpg" />
            <img src="../../assets/decorate/furniture/hongmu0/14.jpg" /><img src="../../assets/decorate/furniture/hongmu0/15.jpg" /><img src="../../assets/decorate/furniture/hongmu0/16.jpg" />
            -->
      <img src="../../assets/decorate/furniture/aopu/aopu_02.png" /><img src="../../assets/decorate/furniture/aopu/aopu_03.png" /><img src="../../assets/decorate/furniture/aopu/aopu_04.jpg" />
    </div>

    <div class="one" v-if='index == 1'>
      <img src="../../assets/decorate/furniture/hongmu1/01.jpg" /><img src="../../assets/decorate/furniture/hongmu1/02.jpg" /><img src="../../assets/decorate/furniture/hongmu1/03.jpg" /><img src="../../assets/decorate/furniture/hongmu1/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu1/05.jpg" /><img src="../../assets/decorate/furniture/hongmu1/06.jpg" /><img src="../../assets/decorate/furniture/hongmu1/07.jpg" /><img src="../../assets/decorate/furniture/hongmu1/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu1/09.jpg" /><img src="../../assets/decorate/furniture/hongmu1/10.jpg" /><img src="../../assets/decorate/furniture/hongmu1/12.jpg" /><img src="../../assets/decorate/furniture/hongmu1/13.jpg" />
      <img src="../../assets/decorate/furniture/hongmu1/14.jpg" /><img src="../../assets/decorate/furniture/hongmu1/15.jpg" /><img src="../../assets/decorate/furniture/hongmu1/16.jpg" /><img src="../../assets/decorate/furniture/hongmu1/17.jpg" />
      <img src="../../assets/decorate/furniture/hongmu1/18.jpg" />
    </div>
    <div class="one" v-if='index == 2'>
      <img src="../../assets/decorate/furniture/hongmu2/01.jpg" /><img src="../../assets/decorate/furniture/hongmu2/02.jpg" /><img src="../../assets/decorate/furniture/hongmu2/03.jpg" /><img src="../../assets/decorate/furniture/hongmu2/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu2/05.jpg" /><img src="../../assets/decorate/furniture/hongmu2/06.jpg" /><img src="../../assets/decorate/furniture/hongmu2/07.jpg" /><img src="../../assets/decorate/furniture/hongmu2/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu2/09.jpg" /><img src="../../assets/decorate/furniture/hongmu2/10.jpg" /><img src="../../assets/decorate/furniture/hongmu2/12.jpg" /><img src="../../assets/decorate/furniture/hongmu2/13.jpg" />
      <img src="../../assets/decorate/furniture/hongmu2/14.jpg" /><img src="../../assets/decorate/furniture/hongmu2/15.jpg" /><img src="../../assets/decorate/furniture/hongmu2/16.jpg" /><img src="../../assets/decorate/furniture/hongmu2/17.jpg" />
      <img src="../../assets/decorate/furniture/hongmu2/18.jpg" />
    </div>
    <div class="one" v-if='index == 3'>
      <img src="../../assets/decorate/furniture/hongmu3/01.jpg" /><img src="../../assets/decorate/furniture/hongmu3/02.jpg" /><img src="../../assets/decorate/furniture/hongmu3/03.jpg" /><img src="../../assets/decorate/furniture/hongmu3/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu3/05.jpg" /><img src="../../assets/decorate/furniture/hongmu3/06.jpg" /><img src="../../assets/decorate/furniture/hongmu3/07.jpg" /><img src="../../assets/decorate/furniture/hongmu3/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu3/09.jpg" /><img src="../../assets/decorate/furniture/hongmu6/10.jpg" /><img src="../../assets/decorate/furniture/hongmu6/12.jpg" /><img src="../../assets/decorate/furniture/hongmu6/13.jpg" />
    </div>
    <div class="one" v-if='index == 4'>
      <img src="../../assets/decorate/furniture/hongmu6/01.jpg" /><img src="../../assets/decorate/furniture/hongmu6/02.jpg" /><img src="../../assets/decorate/furniture/hongmu6/03.jpg" /><img src="../../assets/decorate/furniture/hongmu6/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu6/05.jpg" /><img src="../../assets/decorate/furniture/hongmu6/06.jpg" /><img src="../../assets/decorate/furniture/hongmu6/07.jpg" /><img src="../../assets/decorate/furniture/hongmu6/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu6/09.jpg" /><img src="../../assets/decorate/furniture/hongmu6/10.jpg" /><img src="../../assets/decorate/furniture/hongmu6/12.jpg" /><img src="../../assets/decorate/furniture/hongmu6/13.jpg" />
      <img src="../../assets/decorate/furniture/hongmu6/14.jpg" /><img src="../../assets/decorate/furniture/hongmu6/15.jpg" /><img src="../../assets/decorate/furniture/hongmu6/16.jpg" /><img src="../../assets/decorate/furniture/hongmu6/17.jpg" />
      <img src="../../assets/decorate/furniture/hongmu6/18.jpg" /><img src="../../assets/decorate/furniture/hongmu6/18.jpg" />

    </div>
    <div class="one" v-if='index == 5'>
      <img src="../../assets/decorate/furniture/hongmu5/01.jpg" /><img src="../../assets/decorate/furniture/hongmu5/02.jpg" /><img src="../../assets/decorate/furniture/hongmu5/03.jpg" /><img src="../../assets/decorate/furniture/hongmu5/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu5/05.jpg" /><img src="../../assets/decorate/furniture/hongmu5/06.jpg" /><img src="../../assets/decorate/furniture/hongmu5/07.jpg" /><img src="../../assets/decorate/furniture/hongmu5/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu5/09.jpg" />
    </div>
    <div class="one" v-if='index == 6'>
      <img src="../../assets/decorate/furniture/hongmu4/01.jpg" /><img src="../../assets/decorate/furniture/hongmu4/02.jpg" /><img src="../../assets/decorate/furniture/hongmu4/03.jpg" /><img src="../../assets/decorate/furniture/hongmu4/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu4/05.jpg" /><img src="../../assets/decorate/furniture/hongmu4/06.jpg" /><img src="../../assets/decorate/furniture/hongmu4/07.jpg" /><img src="../../assets/decorate/furniture/hongmu4/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu4/09.jpg" /><img src="../../assets/decorate/furniture/hongmu4/10.jpg" /><img src="../../assets/decorate/furniture/hongmu4/12.jpg" /><img src="../../assets/decorate/furniture/hongmu4/13.jpg" />
      <img src="../../assets/decorate/furniture/hongmu4/14.jpg" /><img src="../../assets/decorate/furniture/hongmu4/15.jpg" /><img src="../../assets/decorate/furniture/hongmu4/16.jpg" /><img src="../../assets/decorate/furniture/hongmu4/17.jpg" />
      <img src="../../assets/decorate/furniture/hongmu4/18.jpg" /><img src="../../assets/decorate/furniture/hongmu4/18.jpg" />
    </div>
    <div class="one" v-if='index == 7'>
      <img src="../../assets/decorate/furniture/hongmu7/02.jpg" /><img src="../../assets/decorate/furniture/hongmu7/03.jpg" /><img src="../../assets/decorate/furniture/hongmu7/04.jpg" />
      <img src="../../assets/decorate/furniture/hongmu7/05.jpg" /><img src="../../assets/decorate/furniture/hongmu7/06.jpg" /><img src="../../assets/decorate/furniture/hongmu7/07.jpg" /><img src="../../assets/decorate/furniture/hongmu7/08.jpg" />
      <img src="../../assets/decorate/furniture/hongmu7/09.jpg" />
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    props: ["sData"],
    data(){
      return {
        index:''
      }
    },
    mounted(){
      this.index=this.$route.params.id;
    },
    methods(){

    }
  }
</script>

<style lang="less" scoped >
  .one{
    width: 100%;
    img{
      float:left;
      width: 100%;
    }
  }
</style>
