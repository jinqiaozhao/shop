<template>
  <div class="stroll">
    <div class="stroll-classify">
      <div class="classify" v-for='(ind,index) in classifydata':key='index' v-if='index!=2 && index!=3' @click="goPage(index)">
        <div class="stroll-lo">
          <span>{{ind.str}}</span>
          <span>{{ind.span}}</span>
        </div>
        <div class="stroll-one" >
          <img v-if='index == 1' src="../../assets/index/index_img10.png" />
          <img v-if='index == 0' src="../../assets/index/index_img09.png" />
        </div>
      </div>
    </div>

    <div class="stroll-classify" >
      <div class="classify" v-for='(ind,index) in classifydata':key='index' v-if='index!=0 && index!=1' @click="goPage(index)">
        <div class="stroll-lo">
          <span>{{ind.str}}</span>
          <span>{{ind.span}}</span>
        </div>
        <div class="stroll-one">
          <img v-if='index == 2' src="../../assets/index/index_img11.png" />
          <img v-if='index == 3' src="../../assets/index/index_img12.png" />
        </div>
      </div>
    </div>

    <div class="stroll-classify-two">
      <div class="classify-two" v-for='(ind,index) in classifydatatwo' @click="goPageOne(index)">
        <div class="stroll-lo">
          <span>—— {{ind.str}} ——</span>
          <span>"{{ind.span}}"</span>
          <img v-if="index == 0" src="../../assets/index/index_img13.png" style=""/>
          <img v-if="index == 0" src="../../assets/index/index_img14.png" style=""/>
          <img v-if="index == 1" src="../../assets/index/index_img15.png" style=""/>
          <img v-if="index == 1" src="../../assets/index/index_img16.png" style=""/>
        </div>
      </div>
    </div>
    <div class="stroll-classify-three">
      <div class="classify-three" v-for='(ind,index) in classifydatathree' @click="goPageTwo(index)">
        <span>{{ind.str}}</span>
        <span>{{ind.span}}</span>
        <img v-if="index == 0" src="../../assets/indexB/laoganma.png" style="width: 35px;"/>
        <img v-if="index == 1" src="../../assets/index/index_img18.png" style=""/>
        <img v-if="index == 2" src="../../assets/index/index_img19.png" style=""/>
        <img v-if="index == 3" src="../../assets/index/index_img20.png" style=""/>
      </div>
    </div>
  </div>
</template>

<script  type="text/javascript">
  export default {
    data(){
      return{
        classifydata:[
          {str:'手机数码',span:'机不留身，低头一族',imgs:'../index/654321.png'},
          {str:'吃货最爱',span:'吃点儿好的暖暖心',imgs:'../index/654321.png'},
          {str:'个人洗护',span:'洗的香香，身体棒棒',imgs:'../index/654321.png'},
          {str:'影音电器',span:'这个feel倍儿爽',imgs:'../index/654321.png'},
        ],
        classifydatatwo:[
          {str:'巅峰音质',span:'用耳朵聆听世纪',imgone:'../index/654321.png',imgtwo:'../index/654321.png'},
          {str:'必备粮草',span:'像奶油恋上芝士'},
        ],
        classifydatathree:[
          {str:'舌尖英雄',span:'三元真火穿肠过',imgs:'../index/654321.png'},
          {str:'养生茶品',span:'一杯香露暂留客',imgs:'../index/654321.png'},
          {str:'下午茶点',span:'慢慢好时光',imgs:'../index/654321.png'},
          {str:'世界精品',span:'歪果货',imgs:'../index/654321.png'},
        ]
      }
    },
    methods:{
      goPage(i){
        if(i==0){this.$router.push('/phonePro')}
        if(i==1){this.$router.push('/chihuo')}
        if(i==2){this.$router.push('/personalCare')}
        if(i==3){this.$router.push('/electrical')}

      },
      goPageOne(i){
        if(i==0){this.$router.push('/toneQuality')}
        if(i==1){this.$router.push('/provisions')}

      },
      goPageTwo(i){
        if(i==0){this.$router.push('/tongueTip')}
        if(i==1){this.$router.push('/tea')}
        if(i==2){this.$router.push('/afternoonFoods')}
        if(i==3){this.$router.push('/globalQuantity')}

      },
    }
  }
</script>

<style scoped lang="less">
  .stroll:after{content: '';display: block;clear: both;}
  .stroll-classify-three{
    display: flex;
    .classify-three{
      margin: .01rem;
      font-size: .3rem;text-align: center;
      width: 1.855rem;background-color: #FFF;
      height: 2.5rem;padding-top: .15rem;
      span{
        color: #FF7A4F;font-size: .2rem;
        display: block;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-top:0.05rem;
      }
      span:first-child{color: #000;font-size:.3rem;}
      img{height: 1.3rem;width: 1.3rem;margin: .1rem 0 0;}
    }
  }
  .stroll-classify{
    display: flex;
    .classify{
      display: flex;
      margin: .01rem;
      font-size: .3rem;height: 2.5rem;
      width: 3.73rem;
      background-color: #FFF;
      padding: .15rem;
      .stroll-lo{flex: 6;}
      .stroll-one{flex: 4;}
      span{

        display: block;
        display: -webkit-box;
        color: #FE3E4E;font-size: .2rem;  margin-top:0.05rem;}
      span:first-child{color: #000;font-size:.28rem}
      img{
        height: 1.7rem;width: 1.7rem;margin-top: .3rem;
      }
    }
  }
  .stroll-classify-two{
    display: flex;
    .classify-two{
      padding-top: .12rem;
      font-size: .3rem;background-color: #FFF;
      height: 2.5rem;
      margin: .01rem;
      width: 3.73rem;
      text-align: center;
      span{display:block;color: #FF7A4F;font-size: .2rem;margin-top:0.1rem;}
      span:first-child{color: #000;font-size:.28rem;}
      img{margin-top: .15rem;height: 1.3rem;width: 1.3rem;}
    }
  }

</style>
