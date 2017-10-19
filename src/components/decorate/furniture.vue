<template>
  <div class="box">
      <!-- <img src="../../assets/decorate/furniture/414.jpg" /> -->
      <img src="../../assets/decorate/bby_active_1.jpg" alt="banner图片" style="width:100%;"/>

    <div class="recommend">
      <div class="top">推荐商品<img src="../../assets/decorate/gd.png"></div>
      <div class="one"><img src="../../assets/decorate/furniture/yuba.jpg" @click="jump(0)"><div class="spanone"><span>奥普浴霸套餐</span></div></div>
      <div class="two"><img src="../../assets/decorate/furniture/spantwo.jpg" @click="jump(1)"><div class="spantwo"><span>“明清古典”</span></div></div>
      <div class="two"><img src="../../assets/decorate/furniture/spanthree.jpg"@click="jump(2)"><div class="spantwo"><span>“榫卯结构”</span></div></div>
    </div>
    <div class="brand">
      <div class="top">装修好品牌<img src="../../assets/decorate/gd.png"></div>
      <img style="width: 100%;" src="../../assets/decorate/furniture/tu-1.jpg" />
      <img style="width: 100%" src="../../assets/decorate/furniture/tu-2.jpg" />
    </div>
    <div class="imgsurl">
      <div class="top" style="background-color: #FFF;">套餐组合<img src="../../assets/decorate/gd.png"></div>
      <div class="imgs"><img src="../../assets/decorate/furniture/41408.png" @click="jump(7)"/><div class="spant"><span>欧式触控大吸力油烟机正品</span></div></div>
      <div class="imgs"><img src="../../assets/decorate/furniture/41401.jpg" @click="jump(3)"/><div class="spant"><span>龙森现代新中式红木沙发</span></div></div>
      <div class="imgs"><img src="../../assets/decorate/furniture/41402.jpg" @click="jump(4)"/><div class="spant"><span>刺猬紫檀实木沙发组合</span></div></div>
      <div class="imgs"><img src="../../assets/decorate/furniture/41403.jpg" @click="jump(5)"/><div class="spant"><span>客厅仿古雕花家具</span></div></div>
      <div class="imgs"><img src="../../assets/decorate/furniture/41404.jpg" @click="jump(6)"/><div class="spant"><span>清仿古转角组合家具</span></div></div>
    </div>

  </div>
</template>

<script  type="text/javascript">
  export default{
    data(){
      return{
      }
    },
    methods:{
      jump(index){
        var id = index;
        window.location.href=(`#/stock/${id}`)
      }
    }
  }
</script>

<style scoped lang="less">
  .imgs{
    position: relative;
    width: 100%;
    img{
      width: 100%;
      z-index: 5;
    }
    .spant{
      text-align: center;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 2.3rem;
      z-index: 9;
      font-size:.38rem;
      color: #FFF;
    }

  }
  .top{
    padding-top: .12rem;
    height: 1.1rem;
    text-align: center;
    font-size: .4rem;
    img{
      width: 3rem;
      display:block;
      margin-left: 2.23rem;
    }
  }

  .banner:after{
    content: '';
    display: block;
    clear: both;
  }
  .spantwo{
    position: relative;
    width: 100%;
    height: .41rem;
    color: #FFF;
    font-size: .35rem;
    top: 1.01rem;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.6);
    span{
      position:relative;
      top: -1.4rem;
      margin-left: .9rem;
    }
  }
  .spanone{
    position: relative;
    top: -.59rem;
    color: #FFF;
    height: .35rem;
    font-size: .3rem;
    background-color: #000000;
    background-color: rgba(0, 0, 0, 0.6);
    span{
      margin-left: .5rem;
    }
  }
  .recommend:after{
    content: '';
    display: block;
    clear:both;
  }
  .recommend{
    margin-top: 0.2rem;
    font-family: '黑体';
    background-color: #FFF;
    .one{
      margin-left: .2rem;
      float:left;
      img{
        width: 3.04rem;
        height: 3.04rem;
      }
    }
    .two{
      float:left;
      margin-left: .2rem;
      img{
        float:left;
        height: 1.42rem;
        width: 3.9rem;
      }
    }
    .two:last-child{
      margin-top: .2rem;
    }
  }
</style>
