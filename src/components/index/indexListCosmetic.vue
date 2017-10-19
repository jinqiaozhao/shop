/*
*作者---杨彬
*
*/
<template>
  <div class="index-list" style="position:relative;">
    <img src="http://ovn5haih3.bkt.clouddn.com/cosmeticBack.png" alt="" style="position:absolute;top:0;width:100%;left:0;">
    <div  :class="'list'+oindex" v-for="(oitem,oindex) in nav"  @click="goPage(oitem,oindex)">
      <!-- <img class="list-img" :src="oitem.icon"> -->
      <div class="back" v-if='oindex==0'><img src="http://ovn5haih3.bkt.clouddn.com/dior.png"></div>
      <div class="back" v-if='oindex==1'><img src="http://ovn5haih3.bkt.clouddn.com/lancome.png"></div>
      <div class="back" v-if='oindex==2'><img src="http://ovn5haih3.bkt.clouddn.com/laneige.png"></div>
      <div class="back" v-if='oindex==3'><img src="http://ovn5haih3.bkt.clouddn.com/esteeLauder.png"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import sData from 'src/assets/projectStaticsData.js'
  export default {
    data(){
      return{
        defaultq:[
//          {text:'dsd', href:'/ddd'},
//          {text:'eee', href:'/ddd'},
//          {text:'yyy', href:'/ddd'},
//          {text:'iii', href:'/ddd'},
        ],
        nav:[],
        sData:sData

      }        },
    methods:{
      goPage(items,index){
        if(index==0){
          m$.sessionStores.set('keyword','迪奥')
        }else if(index==1){  m$.sessionStores.set('keyword','兰蔻')}
        else if(index==2){  m$.sessionStores.set('keyword','兰芝')}
        else if(index==3){  m$.sessionStores.set('keyword','雅诗兰黛')}
       // m$.sessionStores.set('keyword',items.name)
        this.$router.push(items.url)
      },
    },
    created(){
      this.getAjax(this.sData.url.getAllBusinessTypeUrl,{},(res)=>{
        //配置导航栏
        for(var i =0; i<=3;i++){
        var ii = {};
        ii.name = res.data[i].name;//导航名字
        ii.url =`/comActive/`+i;
        ii.id=res.data[i].id;
        ii.icon=res.data[i].icon;
        this.nav.push(ii)
      }
    });
    }

  }
</script>
<style scoped lang="less">
  /*@colorOne:#9964ba;
  @colorTwo:#d44767;
  @colorThree:#3076ae;
  @colorFour:#4c935d;*/
  .index-list{
    //background-image: url('http://ovn5haih3.bkt.clouddn.com/cosmeticBack.png');
    background-size: 100%;
    font-size: 0;
    height: 5.4rem;
    padding: 1rem 0 0.3rem 0;
    text-align: center;
    >div{
      border-radius:0.16rem;
      width: 3.44rem;
      _height: 1.2rem;
      min-height: 1.2rem;
      position: relative;
      display: inline-block;
      text-align: right;
      margin-top: 0.71rem;
      margin-right:0.22rem ;
      &:nth-of-type(2n){
        margin-right: 0;
      }
      &:nth-of-type(-n+2){
        margin-top: 0;

      }
      >.list-img{
        position: absolute;
        bottom: -0.1rem;
        top:-0.65rem;
        left: -0.25rem;
        width: 2rem;
        z-index: 9;
      }
      .back{
        position: absolute;
        top: -0.4rem;
        left: -0.08rem;
        height: 1.6rem;
        width: 3.6rem;
        >img{width: 100%;height: 100%;}
      }
      >.title-warp{
        color: #000000;
        position: relative;
        width: 1.68rem;
        text-align: center;
        display: inline-block;
        font-size: 0;
        padding: 0.16rem 0;
        margin-right: 0.28rem;
        >p{
          font-family:PingFangSC-Regular;
          font-size:0.3rem;
          letter-spacing:0px;
          line-height:0.25rem;
          text-align:left;
          letter-spacing: 2px;
        }
        .list-link{
          display: inline-block;
          border-radius:1rem;
          margin-top: 0.16rem;
          font-family:PingFangSC-Regular;
          font-size:0.22rem;;
          letter-spacing:0px;
          line-height:100%;
          text-align:center;

        }

      }
    }

  }


</style>
