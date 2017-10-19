<template>
  <div class="coms">
    <div class="banner_img">
      <img src="../../assets/decorate/bannerios.jpg" alt="banner图片" class="img-responsive"/>
      <!-- <img src="http://orz6nce3e.bkt.clouddn.com/china_bank.jpg" alt="banner图片" class="img-responsive"/> -->
    </div>
    <div class="top_banner">
      <div>
        <img src="../../assets/decorate/Ruler.png" alt=""/>
        <div>户型设计</div>
      </div>
      <div>
        <img src="../../assets/decorate/money01.png" alt=""/>
        <div>在线报价</div>
      </div>
     <div>
       <img src="../../assets/decorate/marketing.png" alt=""/>
       <div>装修管家</div>
     </div>
      <div>
        <img src="../../assets/decorate/company.png" alt=""/>
        <div>装修实景</div>
      </div>
    </div>
    <div style="padding:0.4rem 0 0.1rem 0;">
      <order ></order>
    </div>
    <img src="../../assets/decorate/find_com_bottom.jpg" alt="" style="width: 100%">
  </div>
</template>
<script>
  import order from 'src/components/decorate/com/order.vue';
  export default {
    components: {order},
    data () {
    return {
      datas: []
    }
  }
  }
</script>
<style scoped lang="less">
  .coms{
    background: #fff;
    font-size: 0;
    width:100%;
    .top_banner{
      border-bottom:1px solid #EFEFEF;
      >div{
        display: inline-block;
        width: 25%;
        padding:0.4rem;
        text-align: center;
        border-left:1px solid #EFEFEF;
        >div{
          margin-top:0.2rem;
          font-size: 0.25rem;
      }
      }
      img{
        width: 60%;
      }
    }
  }

  .coms:before{
    content: '';
    display: block;
  }
  .coms:after{
    content: '';
    display:block;
    clear:both;
  }
  .banner_img{
    padding-bottom:0.2rem;
    border-bottom:1px solid #EFEFEF;
    >img{
      width:100%;
    }
  }
</style>
