
/*
*作者---杨彬
*
*/
/*<template>
    <div>
        <div class="banner">
            <img src="../../assets/decorate/decorateBanner.png">
        </div>
        <section>
            <router-link to="/decorateCoupon" tag="div">
                <img class="icon" src="../../assets/decorate/icon.png">
                <span>
                    领取装修优惠券
                </span>
                <img class="go-more com-div-middle-ab" src="../../assets/decorate/goMore.png">
            </router-link>
        </section>
    </div>
</template>
<script type="text/javascript">
</script>
<style scoped lang="less">
    .banner{
        width: 100%;
        font-size: 0;
        height:2.7rem ;
        >img{
            width: 100%;
            height: 100%;
        }
    }
    section{
        padding: 0.4rem 0.2rem 0;
        >div{
            position: relative;
            height:1.2rem ;
            padding-left: 0.3rem;
            background:#ffffff;
            border-radius:0.1rem;
            font-size: 0;
            line-height:1.2rem ;
            >*{
                display: inline-block;
                vertical-align: middle;
            }
            >.go-more{
                right: 0.3rem;
                height: 0.35rem;
            }
            >.icon{

                height: 0.8rem;
            }
            >span{
                font-family:PingFangSC-Regular;
                font-size:0.32rem;
                color:#424242;
                letter-spacing:0px;
                line-height:100%;
                text-align:center;
                margin-left: 0.25rem;
            }
        }
    }
</style>*/
<template>
  <div class="box">
    <!-- 图片区 -->
    <div class="drwing">
      <img src="../../assets/decorate/top.jpg" class="drwing-ing"/>
    </div>
    <!-- 头条区 -->
    <div class="top">
      <head-line></head-line>
    </div>
    <!-- 分类区 -->
    <div class="menu">
      <div class="menu-number" v-for="d in datas" >
        <div class="one" @click="guideone(d.n)" v-bind:class="{ bgcone:d.n==0,bgctwo:d.n==1,bgcthree:d.n==2}">
          <img v-if="d.n==0" class="imgs"  src="../../assets/decorate/png-0.png" />
          <img v-if="d.n==1" class="imgs"  src="../../assets/decorate/png-1.png" />
          <img v-if="d.n==2" class="imgs"  src="../../assets/decorate/png-2.png" />
          <p>{{d.text1}}</p>
        </div>
        <div class="two" @click="guidetwo(d.n)" v-bind:class="{ bgcone:d.n==0,bgctwo:d.n==1,bgcthree:d.n==2}">
          <p>{{d.text2}}</p>
        </div>
        <div class="three" @click="guidethree(d.n)" v-bind:class="{ bgcone:d.n==0,bgctwo:d.n==1,bgcthree:d.n==2}">
          <p>{{d.text3}}</p>
        </div>
      </div>
    </div>

    <div class="browse">
      <div class="tag">
        <span class="tag-span">装修实景作品</span>
      </div>
      <div class="main" v-for="m in styles" @click="test(m)">
        <div class="img" >
          <!-- < img :src="m.imgsrc"> -->
          <img src="../../assets/decorate/1.jpg"  v-if="m.s==0"/>
          <img src="../../assets/decorate/2.jpg" v-if="m.s==1"/>
          <img src="../../assets/decorate/3.jpg"  v-if="m.s==2"/>
          <img src="../../assets/decorate/4.jpg" v-if="m.s==3"/>
          <img src="../../assets/decorate/5.jpg"  v-if="m.s==4"/>
          <img src="../../assets/decorate/6.jpg" v-if="m.s==5"/>
        </div>
        <div class="text">
          <div class="name">
            <span>{{m.name}}</span>
          </div>
          <div class="intro">
            <span>{{m.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="background-color: #FFF;">
          <div style="text-align: center; font-size: .4rem;background-color: #FFF;color: #FA3165;">为什么要选择宝宝余？</div>
          <img src="../../assets/decorate/bottom.png" alt="" style="padding-top.5rem;width:100%;display: flex;margin-top: .5rem;"/>
      </div>
      <!--<img src="../../assets/decorate/bottom.png" alt="" style="width:100%;display: flex"/>-->
    </div>
  </div>
</template>
<style scoped lang="less">
  .tag{
    width: 7.5rem;
    height: .8rem;
    font-size: .4rem;
    background-color: #FFF;
  .tag-span {
    margin-top: .2rem;
    margin-left: .2rem;
  }
  }
  .main{
    width: 3.6rem;
    background-color: #FFF;
    margin: 0 0rem 0.1rem 0.1rem;
    float: left;
  .img{
    width: 3.6rem;
    height: 1.8rem;
  img {
    width: 3.6rem;
    height: 1.8rem;
  }
  }
  .text{
    height: .85rem;
    font-family:"黑体";
  .name{
    font-size: .3rem;
    margin: 0 0 0 0.1rem;
    letter-spacing:2px;
  }
  .intro{
    font-size: .23rem;
    padding:0 0 0 0.1rem;
    letter-spacing:2px;
    color: #A0A0A0;
  }
  }
  }

  .menu{
    margin-top: .1rem;
    width: 7.5rem;
    height: 7.1rem;
    z-index: 1;
    background-color: #FFF;
  .menu-number{
    margin-top: .12rem;
    margin-left: .1rem;
    float: left;
    z-index: 2;
    width: 7.5rem;
    height: 2.2rem;
  img {
    position:absolute;
    left: 1.1rem;
    width: 1.7rem;
  }
  p {
    font-size: .33rem;
  }
  .bgcone{
    background-color: #5CC6C2;
    color:#fff;
  }
  .bgctwo{
    background-color: #F0913D;
    color:#fff;
  }
  .bgcthree{
    background-color: #FFD3D4;
    color:#FA3165;
  }
  .one {
    float: left;
    width:3.6rem;
    height:2.2rem;
    border-radius: 0.08rem;
    margin-right: .07rem;
    vertical-align:bottom;
  >p {
     text-align:center;
     margin-top: 1.6rem;
   }
  }
  .two {
    text-align:center;
    line-height:1.07rem;
    float: left;
    width: 3.6rem;
    height: 1.07rem;
    border-radius: 0.1rem;
    margin-bottom: .03rem;

  }
  .three{
    margin-top: .03rem;
    text-align:center;
    line-height:1.07rem;
    float: left;
    width: 3.6rem;
    height: 1.07rem;
    border-radius: 0.1rem;
  }
  }
  }
  .drwing{
    width: 7.5rem;
    height: 3.4rem;
  .drwing-ing{
    width: 7.5rem;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  }

</style>
<script>
  import headLine from 'src/components/index/headline.vue';
  export default{
    components:{
      headLine
    },
    data(){
    return{
      datas:[
        {n:'0', text1:'找装修公司', text2:'个性化装修', text3:'旧房翻新'},
        {n:'1', text1:'团建材家具', text2:'装修必买清单', text3:'口碑家具'},
        {n:'2', text1:'问装修管家', text2:'低息装修贷款', text3:'装修监理'}
      ],
      styles:[
        {s:'0',name:'地中海',content:'三居室   130m²'},
        {s:'1',name:'混搭现代',content:'两居室   90m²'},
        {s:'2',name:'简欧唯美',content:'三居室   156m²'},
        {s:'3',name:'简约欧式',content:'两居室   102m²'},
        {s:'4',name:'美式乡村',content:'两居室   90m²'},
        {s:'5',name:'轻奢简欧风',content:'两居室   89m²'}
      ]
    }
  },
  mounted(){
  },

  methods: {
    test(m){
      var id = m.s;
      console.log(id);
      window.location.href = (`#/stylegather/${id}`);
    },
    guideone(d){
      if(d=='0'){
        //this.$router.push({path:'/one'});
        this.$router.push('/findDecCom');
      }else if(d=='1'){

          this.$router.push('/furniture');
      }else if(d=='2'){
        this.$router.push('/SeekSteward');
      }
    },
    guidetwo(d){
      if(d=='0'){
        this.$router.push('/selfdom')
      }else if(d=='1'){

      }else if(d=='2'){
        this.$router.push('/loan')
      }
    },
    guidethree(d){
      if(d=='0'){
        this.$router.push('/renovate')
      }else if(d=='1'){
        console.log('口碑家具')
      }else if(d=='2'){
        this.$router.push('/supervisor')
      }
    }
  }
  }
</script>
