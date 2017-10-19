/*
*作者---杨彬
*
*/
<template>
  <div class="index-list">

    <router-link  :class="'list'+oindex" v-for="(oitem,oindex) in nav" :to="oitem.url" tag="div" :key="oindex">
      <!-- <img class="list-img" :src="oitem.icon"> -->
      <div class="back" v-if='oindex==0'><img src="http://ovn5haih3.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E6%9C%80%E6%96%B0%E9%A3%8E%E6%A0%BC1.png"></div>
      <div class="back" v-if='oindex==1'><img src="http://ovn5haih3.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E6%9C%80%E6%96%B0%E9%A3%8E%E6%A0%BC2.png"></div>
      <div class="back" v-if='oindex==2'><img src="http://ovn5haih3.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E6%9C%80%E6%96%B0%E9%A3%8E%E6%A0%BC3.png"></div>
      <div class="back" v-if='oindex==3'><img src="http://ovn5haih3.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E6%9C%80%E6%96%B0%E9%A3%8E%E6%A0%BC4.png"></div>
      <!-- <div class="title-warp">
        <p v-text="oitem.name"></p>
        <span class="list-link">点击进入>></span>
      </div> -->
    </router-link>
  </div>
</template>
<script type="text/javascript">
  import sData from 'src/assets/projectStaticsData.js'
  export default {
    data(){
      return{
        defaultq:[
          {text:'dsd', href:'/ddd'},
          {text:'eee', href:'/ddd'},
          {text:'yyy', href:'/ddd'},
          {text:'iii', href:'/ddd'},
        ],
        nav:[],
        sData:sData

      }        },
    created(){
      this.getAjax(this.sData.url.getAllBusinessTypeUrl,{},(res)=>{
        //配置导航栏
        for(var i =0; i<=3;i++){
        var ii = {};
        ii.name = res.data[i].name//导航名字
        if(i==0){ii.url =`/today/1/${502}`}
        else if(i==1){ii.url =`/today/1/${504}`}
        else if(i==2){ii.url =`/today/1/${505}`}
        else if(i==3){ii.url =`/today/1/${503}`}
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
    background-image: url('http://ovn5haih3.bkt.clouddn.com/%E9%A6%96%E9%A1%B5%E5%87%BA%E8%A1%8C%E5%BF%85%E5%A4%87.png');
    background-size: 100%;
    font-size: 0;
    height: 6.8rem;
    padding: 3.3rem 0 0.3rem 0;
    text-align: center;
    >div{
      /*&.list0{
          >.title-warp{
              color: @colorOne;
              .list-link{
                  border: 1px solid @colorOne;
              }
          }
      }
      &.list1{
          >.title-warp{
              color: @colorTwo;
              .list-link{
                  border: 1px solid @colorTwo;
              }
          }
      }
      &.list2{
          >.title-warp{
              color: @colorThree;
              .list-link{
                  border: 1px solid @colorThree;
              }
          }
      }
      &.list3{
          >.title-warp{
              color: @colorFour;
              .list-link{
                  border: 1px solid @colorFour;
              }
          }
      }*/
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
