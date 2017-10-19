/*
*作者---杨彬
*
*/
<template>
  <div class="qut">

    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">如何购买？</p>
    <p class="text">注册手机号或者第三方登入。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">忘记密码？</p>
    <p class="text">用原先注册的手机号进行验证码验证，验证通过即可修改密码。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">支付方式？</p>
    <p class="text">微信支付方式。</p>

    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">退货说明？</p>
    <p class="text">该商品支持7天无理由退货，请您放心购买。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">换货说明？</p>
    <p class="text">该商品支持换货，订单签收7天内可申请换货。</p>

    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">退款去向？</p>
    <p class="text">原路返回。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">修改收货地址？</p>
    <p class="text">如果您在购买过程中，想要更改地址，可以在（提交订单界面），点击上方的地址栏，就可以进行新增收货地址哦。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">收货地址错误怎么办？</p>
    <p class="text">请您及时联系商家客服。</p>

    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">物流说明？</p>
    <p class="text">本商品免物流运费，物流配送圆通中通等随机发货。配送过程中因物流原因导致损坏的，买家当场向快递人员说明情况，并及时联络本站，经本站核查情况属实，可当场整单拒签。</p>

    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">如何申请售后？</p>
    <p class="text">在交易成功的7天内，可以通过（我的订单）找到对应的订单，点击（申请售后）；如果交易已经过了7天，联系卖家协商处理，如无法协商，建议您提供有效的凭证电话联系客服重新开通售后服务。</p>
    <p class="headOne"><img src="../assets/my/rectangle.png" class="com-div-middle-ab">商品质量问题？</p>
    <p class="text">为保障您自身的利益，贵重物品、电器、易碎物品等应当快递小哥的面验收，如有不符或破损可拒签，及时联系卖家告知情况并协商处理办法。
      <br>如果已经签收，请将商品问题的照片保存好，联系卖家沟通处理方法。若沟通无果请您将订单号反馈给我们客服，我们会协助您处理问题。</p>

  </div>
</template>
<script type="text/javascript">
  export default {
    created(){
      m$.documentTitle('常见问题');
    }
  }
</script>
<style scoped lang="less">
  .qut {
    background-color: #fff;
    font-size: 0.28rem;
    padding: 0.3rem 0.75rem 0.3rem 0.9rem;
    .headOne {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      position: relative;
      color: #fb4874;
      letter-spacing: 0px;
      > img {
        left: -0.13rem;
        width: 0.08rem;
        height: 0.08rem;
      }
    }
    .text {
      margin: 0.1rem 0 0.26rem 0;
      font-family: PingFangSC-Regular;
      font-size: 0.26rem;
      color: #a0a0a0;
      position: relative;
      letter-spacing: 0px;
      line-height: 0.34rem;
    }
  }
</style>
