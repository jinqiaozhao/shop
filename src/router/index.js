import Vue from 'vue'
import Router from 'vue-router'
import components from 'src/router/components.js'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:components.index
    },{
      path:'/confirmation',
      name:'confirmation',
      component:components.confirmation
    },
    {'name':'couponCenter',
      path:'/couponCenter',
      component:components.couponCenter
    },{
      path:'/myCoupon/:id',
      name:'myCoupon',
      component:components.myCoupon
    } ,{
      path:'/decorateIndex',
      name:'decorateIndex',
      component:components.decorateIndex
    },{
      path:'/decorateCoupon',
      name:'decorateCoupon',
      component:components.decorateCoupon
    } ,{
      path:'/decorateMsg/:id',
      name:'decorateMsg',
      component:components.decorateMsg
    },{
      path:'/couponDetail/:id',
      name:'couponDetail',
      component:components.couponDetail
    },{
      path:'/login/:id',//登录页面
      name:'login',
      component:components.login
    },{
      path:'/register/:id',//id 0为注册,1为忘记密码,2为设置密码
      name:'register',
      component:components.register
    },{
      path:'/passwordSet/:id',
      name:'passwordSet',
      component:components.passwordSet
    },{
      path:'/newPhone/:id',
      name:'newPhone',
      component:components.newPhone
    },{
      path:'/my',
      name:'my',
      component:components.my
    },{
      path:'/collect',
      name:'collect',
      component:components.collect
    }
    ,{
      path:'/trial',
      name:'trial',
      component:components.trial
    },{
      path:'/aboutUs',
      name:'aboutUs',
      component:components.aboutUs
    },{
      path:'/question',
      name:'question',
      component:components.question
    },{
      path:'/addressManage/:type',
      name:'addressManage',
      component:components.addressManage
    }
    ,{
      path:'/addressMsg/:status',
      name:'addressMsg',
      component:components.addressMsg
    },
    //wwwwwww
    {
      path:'/seckillGoods',
      name:'seckillGoods',
      component:components.seckillGoods
    },{
      path:'/goodsDetail/:id',
      name:'goodsDetail',
      component:components.goodsDetail
    },{
      path:'/goodsItem/:id',
      name:'goodsItem',
      component:components.goodsItem
    },{
      path:'/decorateOrder/:id',
      name:'decorateOrder',
      component:components.decorateOrder
    },{
      path:'/orderList/:id',//修改
      name:'orderList',
      component:components.orderList
    },{
      path:'/orderDetail/:id',
      name:'orderDetail',
      component:components.orderDetail
    },{
      path:'/goPay',
      name:'goPay',
      component:components.goPay
    },{
      path:'/productCar',
      name:'productCar',
      component:components.productCar
    },{
      path:'/sureOrder/:id',
      name:'sureOrder',
      component:components.sureOrder
    },{
      path:'/today/:type/:id',
      name:'today',
      component:components.today
    },{
      path:'/paySuccess',
      name:'paySuccess',
      component:components.paySuccess
    },{
      path:'/banner',
      name:'banner',
      component:components.banner
    },{
      path:'/decoIndex',
      name:'decoIndex',
      component:components.decoIndex
    },{
      path:'/newProducts',//新品排行
      name:'newProducts',
      component:components.newProducts
    },{
      path:'/womanCare',//女性
      name:'womanCare',
      component:components.womanCare
    },{
      path:'/phonePro',//数码
      name:'phonePro',
      component:components.phonePro
    },{
      path:'/rank',//排行
      name:'rank',
      component:components.rank
    },{
      path:'/global',//全球
      name:'global',
      component:components.global
    },{
      path:'/tejia',//特价
      name:'tejia',
      component:components.tejia
    },{
      path:'/officeSnacks',//办公零食
      name:'officeSnacks',
      component:components.officeSnacks
    },{
      path:'/chihuo',//chihuo
      name:'chihuo',
      component:components.chihuo
    },{
      path:'/personalCare',//个人洗护
      name:'personalCare',
      component:components.personalCare
    },{
      path:'/electrical',//影音电器
      name:'electrical',
      component:components.electrical
    },{
      path:'/toneQuality',//巅峰
      name:'toneQuality',
      component:components.toneQuality
    },{
      path:'/provisions',//必备粮草
      name:'provisions',
      component:components.provisions
    },{
      path:'/tongueTip',//必备粮草
      name:'tongueTip',
      component:components.tongueTip
    },{
      path:'/tea',//必备粮草
      name:'tea',
      component:components.tea
    },{
      path:'/afternoonFoods',//必备粮草
      name:'afternoonFoods',
      component:components.afternoonFoods
    },{
      path:'/globalQuantity',//世界精品
      name:'globalQuantity',
      component:components.globalQuantity
    },{
      path:'/baiTu',
      name:'baiTu',
      component:components.baiTu
    },{
      path:'/jiYoujia',
      name:'jiYoujia',
      component:components.jiYoujia
    },{
      path:'/kangYuan',
      name:'kangYuan',
      component:components.kangYuan
    }
    ,{
      path:'/liMai',
      name:'liMai',
      component:components.liMai
    },{
      path:'/pinGe',
      name:'pinGe',
      component:components.pinGe
    },{
      path:'/xiuJia',
      name:'xiuJia',
      component:components.xiuJia
    },{
      path:'/findDecCom',
      name:'findDecCom',
      component:components.findDecCom
    }, {
      path:'/selfdom',
      name:'selfdom',
      component:components.selfdom
    }, {
      path:'/selfdom_bank',
      name:'selfdom_bank',
      component:components.selfdom_bank
    }, {
      path:'/loan',
      name:'loan',
      component:components.loan
    }, {
      path:'/renovate',
      name:'renovate',
      component:components.renovate
    }, {
      path:'/SeekSteward',
      name:'SeekSteward',
      component:components.SeekSteward
    },{
      path:'/stylegather/:id',
      name:'stylegather',
      component:components.stylegather
    },{
      path:'/supervisor',
      name:'supervisor',
      component:components.supervisor
    },{
      path:'/integral',
      name:'integral',
      component:components.integral
    },{
      path:'/integralHelp',
      name:'integralHelp',
      component:components.integralHelp
    },{
      path:'/apply',
      name:'apply',
      component:components.apply
    },{
      path:'/furniture',
      name:'furniture',
      component:components.furniture
    },{
      path:'/setpage',
      name:'setpage',
      component:components.setpage
    },{
      path:'/stock/:id',
      name:'stock',
      component:components.stock
    },{
      path:'/logistics/:id',
      name:'logistics',
      component:components.logistics
    },{
      path:'/classify',//分类
      name:'classify',
      component:components.classify
    },{
      path:'/setpersonage',//个人中心设置一二级
      name:'setpersonage',
      component:components.setpersonage
    },{
      path:'/setpersonal/:id',//个人中心设置一二级
      name:'setpersonal',
      component:components.setpersonal
    },{
      path:'/beauty',//美妆
      name:'beauty',
      component:components.beauty
    },{
      path:'/information/:id',
      name:'information',
      component:components.information
    },{
      path:'/aftersales/:id',
      name:'aftersales',
      component:components.aftersales
    },{
  path:'/afterSale',
    name:'afterSale',
    component:components.afterSale
},{
      path:'/questionnaire',//问卷
      name:'questionnaire',
      component:components.questionnaire
    },{
      path:'*',
      redirect:'/index'
    }

  ]
})
