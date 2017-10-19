<template>
  <div class="box">
    <div class="top-page" @click="goset()">
      <img :src="myData.headIcon"   class="top-imgs"/>
      <div class="myData"><div class="myData-dav">{{myDataAW.userName}}
        <img class="box-sex" v-if='myDataAW.sex==2' src="http://ovn5haih3.bkt.clouddn.com/%E5%A5%B3%E5%AD%A9.png" />
        <img class="box-sex" v-if='myDataAW.sex==1' src="http://ovn5haih3.bkt.clouddn.com/%E6%80%A7%E5%88%AB%E7%94%B7%E5%9B%BE%E7%89%87.png"/></div>
        <span>用户名: {{myDataAW.mobile}}</span>
      </div>
      <img src="../../assets/sea.png" class="bottom-imgs"/>
    </div>
    <img class="box-img" src="http://ovn5haih3.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20170914104449.jpg"/>
    <div class="imgs"></div>
    <div class="function-nav">
      <!--<router-link v-if="mindex!= 1 && mindex!= 2 && mindex!=5" v-for="(oitem,mindex) in mySData.contentOne"-->
                   <!--class="function-nav-item" :to="oitem.url" :key='mindex'>-->
        <!--<span class="nav-item-title" v-text="oitem.name"></span>-->
        <!--<img class="go-arrow com-div-middle-ab" src="../../assets/my/goArrow.png">-->
      <!--</router-link>-->
      <div v-for="(oitem,mindex) in mySData.contentOne"
                   class="function-nav-item" @click="goPage(oitem.url,mindex)">
        <span class="nav-item-title" v-text="oitem.name"></span>
        <img class="go-arrow com-div-middle-ab" src="../../assets/my/goArrow.png">
      </div>

    </div>
    <div class="div-space"></div>
    <div class="function-nav">
      <router-link v-for="(oitem,mindex) in mySData.contentTwo"
                   class="function-nav-item" :to="oitem.url" :key='mindex'>
        <span class="nav-item-title" v-text="oitem.name"></span>
        <img class="go-arrow com-div-middle-ab"
             src="../../assets/my/goArrow.png">
      </router-link>
    </div>
    <div class="foot">
      <button @click="logout()" type="button">退出登录</button>
    </div>
  </div>
</template>

<script>
  import {my} from 'src/assets/statusData.js'
  export default {
    props: ['sData'],
    data(){
      return{
        myData:"",
        mySData:my,
        myDataAW:'',
        myData:'',
      }
    },
    methods:{
      goPage(url,i){
        if(this.myDataAW.mobile!='' && i==2){
          m$.template({
            val:'已绑定<br>手机号',
            time:1200,
          })
         return;
        }else{
        this.$router.push(url)
        }

      },
//组件方法
      getUserInformation(){
        this.getAjax(this.url.getUserInformation,{},(res)=>{
          if(res.code==200){
            this.myDataAW = res.data;
            if(this.myDataAW.mobile != ''){
              this.selectnum=false;
              this.selectnumtwo=true;
            }
          }
        })
        this.getAjax(this.url.my,{},(res)=>{
          if(res.code==200){
            this.myData = res.data;
          }
        })
      },
      goset(){
        window.location.href = (`#/setpersonage`);
      },
      logout(){
        this.postAjax(this.url.logout,{},(res)=>{
          var othis=this;
          if(res.code==200&&res.message=='ok'){
            m$.template({
              val:'操作<br>成功',
              time:1200,
              fn:function () {
                m$.localStrages.remove('yxdyb')
                othis.$router.push('/login/0')
              }
            })
          }
        })
      }
    },
    created(){
      this.getUserInformation()
    },

  }
</script>

<style scoped lang="less">
  .box-img{width: 100%;}
  .top-page{
    background-color: #FFF;
    height: 1.65rem;font-size: .3rem;
    padding: .05rem;
    display:flex;
    .top-imgs{
      margin: .15rem 0 0 .1rem;
      border: 1px solid #7B7C80;
      height: 1.25rem;width: 1.25rem;
      border-radius: 100%;
    }
    .myData{
      flex:6;
      padding:.35rem 0 0 .2rem;
      .myData-dav{display:block;font-size: .32rem;
        .box-sex{
          width: .35rem;height: .35rem;
        }
      }
      span:last-child{font-size: .25rem;color: #7B7C80;}
    }
    .bottom-imgs{
      margin-top: .61rem;margin-right: .1rem;
      width: .3rem;height: .3rem;
    }
  }
  .div-space{
    height: 0.15rem;
    background-color:#ececec;
  }
  .foot{
    font-size: 0;
    margin-top:0.48rem;
    text-align: center;
    margin-bottom: 1.18rem;
    button{
      background: -webkit-linear-gradient(left, #FF9504 , #FE3501);
      font-family:PingFangSC-Regular;
      font-size:0.38rem;
      color:#ffffff;
      letter-spacing: 0px;
      text-align:center;
      -webkit-border-radius: 0.15rem;
      -moz-border-radius: 0.15rem;
      border-radius: .08rem;;
      width: 7.2rem;
      height: 1rem;
    }
  }

  .function-nav{
    padding-left: 0.2rem;
    background-color: #fff;
    border-bottom: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
    .function-nav-item{
      border-bottom: 0.1px solid #e3e3e3;
      line-height: 0.78rem;
      height: 0.78rem;
      padding-left: 0.15rem;
      padding-right: 0.35rem;
      display: block;
      position: relative;
      font-size: 0;
      text-align:left;
      &:last-of-type{
        border-bottom: none;
      }
      .nav-item-title{
        font-family:PingFangSC-Regular;
        font-size:0.3rem;
        display:block;
        color:#323137;
        letter-spacing:0.83px;
      }
      .go-arrow{
        right: 0.35rem;
        height: 0.22rem;
      }
    }
  }
</style>
