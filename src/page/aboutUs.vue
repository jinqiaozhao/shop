/*
*作者---杨彬
*
*/
<template>
    <div class="abs">
      <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">版本说明</p>
      <p class="text">1.0版本</p>
      <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">用户服务协议：</p>
      <p class="text">1.本服务协议为杭州哆宝余电子商务有限公司旗下客户端“宝宝余”与宝宝余客户端用户，本服务协议具有合同效力。<br/>
      2.本服务协议内容包括协议正文及所有宝宝余已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。
      <br>3.在本服务协议中没有以“规则”字样表示的链接文字所指示的文件不属于本服务的组成部分，而是其他内容的协议或有关参考的资料，与本协议没有法律上的直接关系
        <br>4.用户在使用宝宝余提供的各项服务的同时，承诺并遵守各项相关规则的规定。宝宝余有权限据需要不时地制定、修改本协议或各类规则。 <br>
      5.用户确认本服务协议后，本服务协议即在用户和宝宝余之间产生法律效力。请用户务必在注册之间认真阅读全部内容，如有任何疑问，可向宝宝余咨询。
        <br>6.无论用户事实上是否在注册之前认真阅读了本服务协议，只要用户点击协议正本下方的“确认”按钮并按照宝宝余注册程序成功注册为用户，用户的行为仍然表示其同意并签署了本服务协议。
      <br>
      7.本协议不涉及用户与宝宝余其他用户之间因网站上交易而产生的法律关系及法律纠纷。
      </p>
      <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">免责说明</p>
      <p class="text">您正在使用的应用由杭州哆宝余电子商务有限公司开发或拥有。Apple不承担该程序任何方面的任何责任，包括但不限于其性能、知识产权、支持、服务、收费及内容。<br>
     任何宝宝余手机客户端的手机品牌合作商，如Appstore，并不因合作获得宝宝余手机客户端的知识产权，也非宝宝余客户端的赞助商。<br>
      宝宝余对于任何包含、经由或者连接、下载或从任何与有关网站所获得的任何内容、信息或广告，不声明或保证其正确性和可靠性；并且对于用户经本网站上的内容、广告、展示而购买、取得任何产品、信息或资料，宝宝余不负保证责任。用户自行负担使用本网站的风险。
      <br>宝宝余有权但无义务，改善或更正本手机客户端的任何错误或缺陷。</p>
    </div>
</template>
<script type="text/javascript">
  export default {
    created(){
      m$.documentTitle('关于我们');
    }
  }
</script>
<style scoped lang="less">
.abs{

    background-color: #fff;
    font-size: 0.28rem;
    padding: 0.3rem 0.75rem 0.3rem 0.9rem;
    .headOne{
      font-family:PingFangSC-Regular;
      font-size:0.28rem;
      position: relative;
      color:#fb4874;
      letter-spacing:0px;
      >img{
        left: -0.13rem;
        width: 0.08rem;
        height: 0.08rem;
      }
    }
    .text{
      margin: 0.1rem 0 0.26rem 0;
      font-family:PingFangSC-Regular;
      font-size:0.26rem;
      color:#a0a0a0;
      position: relative;
      letter-spacing:0px;
      line-height:0.34rem;
    }
  }
</style>
