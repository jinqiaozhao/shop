<template>
  <div class="coms">
    <div class="banner_img">
      <img src="../../assets/decorate/bannerios.jpg" alt="banner图片" class="img-responsive"/>
      <!-- <img src="http://orz6nce3e.bkt.clouddn.com/china_bank.jpg" alt="banner图片" class="img-responsive"/> -->
    </div>
    <div class="com_wrap">
      <div class="com_det" v-for="d in datas">
        <img v-if="d.n==1" src="../../assets/decorate/1.jpg" alt=""/>
        <img v-if="d.n==2" src="../../assets/decorate/2.jpg" alt=""/>
        <img v-if="d.n==3" src="../../assets/decorate/3.jpg" alt=""/>
        <img v-if="d.n==4" src="../../assets/decorate/4.jpg" alt=""/>
        <img v-if="d.n==5" src="../../assets/decorate/5.jpg" alt=""/>
        <img v-if="d.n==6" src="../../assets/decorate/6.jpg" alt=""/>
        <!--<img v-if="d.n==0" src="../../assets/decorate/7.jpg" alt=""/>-->
        <div class="com_con">
          <div class="c_title">{{ d.tit }}</div>
          <div class="c_text">
            {{ d.text }}
          </div>
          <router-link v-bind:to="d.location" class="loadmore" style="color:#fb4874">查看详情
            <img src="../../assets/decorate/goMroe_r.png" style="float:right;width:14px;margin-top:0.09rem;margin-left:3px"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
    return {
      datas: [
//        {n: '0', tit: '杭州哆宝余电子商务有限公司', text: '杭州哆宝余电子商务有限公司成立于2016年12月。公司以服务客户为宗旨......', location: 'decoIndex'},
        {n: '1', tit: '杭州百图装饰有限公司', text: '杭州百图装饰工程有限公司自2010年从事家装企业至今，百图装饰仍是......', location: 'baitu'},
        {n: '2', tit: '杭州集悠家装饰设计工程有限公司', text: '杭州集悠家装饰设计工程有限公司成立于2015......', location: 'jiyoujia'},
        {n: '3', tit: '杭州品阁装饰工程有限公司', text: '杭州品阁装饰设计工程有限公司本着“以小博大，微于细节，贵与专业”......', location: 'pinge'},
        {n: '4', tit: '杭州秀家装饰工程有限公司', text: '杭州秀家装饰工程有限公司隶属于浙江康源装饰集团，是一家......', location: 'xiujia'},
        {n: '5', tit: '浙江康源装饰有限公司', text: '浙江康源装饰有限公司成立于2006年,创业几年来发展迅速，已成为一家专业从事家居......', location: 'kangyuan'},
        {n: '6', tit: '杭州利迈装饰工程有限公司', text: '杭州利迈装饰工程有限公司是一家从事建筑室内装饰设计及施工的专业化公司......', location: 'limai'}]
      //,url0:require('../../assets/decorate/7.jpg'),url1:require('../../assets/decorate/1.jpg'),url2:require('../../assets/decorate/2.jpg'),url3:require('../../assets/decorate/3.jpg'),url4:require('../../assets/decorate/4.jpg'),url5:require('../../assets/decorate/5.jpg'),url6:require('../../assets/decorate/6.jpg'), gourl:require('../../assets/decorate/goMroe_r.png')
    }
  }
  }
</script>
<style scoped lang="less">
  .img-responsive{
    width:100%;
    height:auto;
  }
  .coms{
    background: #E6E6E6;
  }
  *{margin:0;padding:0;}
  .coms:before{
    content: '';
    display: block;
  }
  .coms:after{
    content: '';
    display:block;
    clear:both;
  }
  .coms{
    font-size: 0;
    width:100%;

  }
  .banner_img{
    float:left;
    padding-bottom:10px;
  }
  .com_wrap{

  }
  .com_det:after{
    content: '';
    display: block;
    clear:both;
  }
  .com_det{
    float:left;
    background-color: #fff;
    padding-left: 8px;
    height:1.7rem;
    margin-bottom: 8px;
  }
  .com_det>img{
    float:left;
    width:30%;
  }
  .com_con:after{
    content: '';
    display: block;
    clear:both;
  }
  .com_con{
    padding-left:0.1rem;
    width:70%;
    float:left;
    box-sizing: border-box;
    padding-right:0.25rem;
  }
  .c_title{
    text-align:left;
    float:left;
    padding-top:0.1rem;
    width:100%;
    font-size: 0.3rem ;
    color:#333;
  }
  .c_text{
    text-align:justify;
    float:left;
    width:100%;
    font-size: 0.22rem;
    color:#5c5c5c;
    word-break:break-all;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .loadmore{
    margin:0.05rem 0.1rem 0.1rem 0.05rem;
    font-size:0.3rem;
    color:#fb4874;
    text-decoration: none;
    float:right;
    box-sizing:border-box;
  }
</style>
