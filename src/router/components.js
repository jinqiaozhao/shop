/**
 * Created by yang on 2017/2/15.
 */
import index from 'src/page/index/index.vue'
import couponCenter from 'src/page/coupon/couponCenter.vue'
import myCoupon from 'src/page/coupon/myCoupon.vue'
import decorateIndex from 'src/page/decorate/decorate.vue'
import decorateMsg from 'src/page/decorate/decorateMsg.vue'
import couponDetail from 'src/page/coupon/couponDetail.vue'
import login from 'src/page/login/login.vue'
import register from 'src/page/login/register.vue'
import passwordSet from 'src/page/my/passwordSet.vue'
import newPhone from 'src/page/my/newPhone.vue'
import my from 'src/page/my/my.vue'
import trial from 'src/page/my/trial.vue'
import collect from 'src/page/my/collect.vue'
import addressManage from 'src/page/address/manage.vue'
import addressMsg from 'src/page/address/msg.vue'
import decorateCoupon from 'src/page/decorate/decorateCoupon.vue'
import confirmation from 'src/page/confirmation.vue'
import aboutUs from 'src/page/aboutUs.vue'
import question from 'src/page/question.vue'
import setpersonage from 'src/page/my/setpersonage.vue'
import setpersonal from 'src/page/my/setpersonal.vue'
import setpage from 'src/page/my/setpage.vue'
//wwwwwwwww
import newProducts from 'src/components/index/newProducts.vue'
import phonePro from 'src/components/index/nextPage/phonePro.vue'
import womanCare from 'src/components/index/nextPage/womanCare.vue'
import rank from 'src/components/index/nextPage/rank.vue'
import beauty from 'src/components/index/nextPage/beauty.vue'
import global from 'src/components/index/nextPage/global.vue'
import tejia from 'src/components/index/nextPage/tejia.vue'
import electrical from 'src/components/index/nextPage/electrical.vue'
import toneQuality from 'src/components/index/nextPage/toneQuality.vue'
import chihuo from 'src/components/index/nextPage/chihuo.vue'
import provisions from 'src/components/index/nextPage/provisions.vue'
import personalCare from 'src/components/index/nextPage/personalCare.vue'
import officeSnacks from 'src/components/index/nextPage/officeSnacks.vue'
import tongueTip from 'src/components/index/nextPage/tongueTip.vue'
import afternoonFoods from 'src/components/index/nextPage/afternoonFoods.vue'
import globalQuantity from 'src/components/index/nextPage/globalQuantity.vue'
import tea from 'src/components/index/nextPage/tea.vue'
import productCar from 'src/components/productCar/productCar.vue'
import orderList from 'src/components/orderList/orderList.vue'
import orderDetail from 'src/components/orderDetail/orderDetail.vue'
import goPay from 'src/components/goPay/goPay.vue'
import sureOrder from 'src/components/sureOrder/sureOrder.vue'
import seckillProduct from 'src/components/seckillProduct/seckillProduct.vue'
import seckillGoods from 'src/components/seckillGoods/seckillGoods.vue'
import goodsDetail from 'src/components/goodsDetail/goodsDetail.vue'
import goodsItem from 'src/components/goodsItem/goodsItem.vue'
import decorateOrder from 'src/components/decorateOrder/decorateOrder.vue'
import today from 'src/components/today/today.vue'
import paySuccess from 'src/page/paySuccess.vue'
import integral from 'src/page/integral/integral_index.vue'
import integralHelp from 'src/components/integral/integralHelp.vue'
import apply from 'src/page/integral/apply.vue'
import logistics from 'src/components/orderEvaluate/logistics.vue'
import aftersales from 'src/components/afterSale/after-sales.vue'//售后
import afterSale from 'src/components/afterSale/afterSale.vue'//售后
import information from 'src/components/afterSale/information.vue'
//jinqiao_add
import findDecCom from 'src/components/decorate/find_dec_com.vue'
import decoIndex from 'src/components/decorate/deco_index.vue'
import baiTu from 'src/components/decorate/baitu.vue'
import jiYoujia from 'src/components/decorate/jiyoujia.vue'
import kangYuan from 'src/components/decorate/kangyuan.vue'
import liMai from 'src/components/decorate/limai.vue'
import pinGe from 'src/components/decorate/pinge.vue'
import xiuJia from 'src/components/decorate/xiujia.vue'
import selfdom from 'src/components/decorate/selfdom.vue'
import selfdom_bank from 'src/components/decorate/selfdom_bank.vue'
import loan from 'src/components/decorate/loan.vue'
import renovate from 'src/components/decorate/renovate.vue'
import SeekSteward from 'src/components/decorate/SeekSteward.vue'
import stylegather from 'src/components/decorate/stylegather.vue'
import supervisor from 'src/components/decorate/supervisor.vue'
import furniture from 'src/components/decorate/furniture.vue'
import stock from 'src/components/decorate/stock.vue'
import classify from 'src/components/com/classify.vue'
import questionnaire from 'src/page/questionnaire/questionnaire.vue'

export default {
  questionnaire,
  afterSale,
  information,
  aftersales,
  beauty,
  setpage,
  setpersonage,
  setpersonal,
  logistics,
  globalQuantity,
  afternoonFoods,
  tea,
  tongueTip,
  provisions,
  toneQuality,
  electrical,
  personalCare,
  chihuo,
  officeSnacks,
  tejia,
  global,
  rank,
  phonePro,
  womanCare,
  newProducts,
  collect,//我的收藏
  trial,//我的试用
  classify,
  stock,
  furniture,
  apply,
  integral,
  integralHelp,
  supervisor,
  stylegather,
  SeekSteward,
  renovate,
  loan,
  selfdom,
  selfdom_bank,
  findDecCom,
  xiuJia,
  pinGe,
  liMai,
  pinGe,
  liMai,
  kangYuan,
  jiYoujia,
  baiTu,
  decoIndex,
//jin
  confirmation,

  index,
  couponCenter,
  myCoupon,
  decorateIndex,
  decorateMsg,
  couponDetail,
  login,
  register,
  passwordSet,
  newPhone,
  my,
  aboutUs,
  question,
  addressManage,
  addressMsg,
  decorateCoupon,
  paySuccess,
  //wwwww
  orderList,
  orderDetail,
  goPay,
  productCar,
  sureOrder,
  seckillProduct,
  seckillGoods,goodsDetail,goodsItem,decorateOrder,today
}
