<template>
  <div id="leave-word">
    <div class="words-all">
      <div class="word" v-for='item in deData'>
        <div class="top">
          <p class="tel" v-text='item.userMobile'></p>
          <p class="time" v-text='item.gmtCreate'></p>
        </div>
        <div class="info" v-text='item.text'></div>
      </div>
    </div>
    <div class="loading" v-if="btn1">
      <img src="../../assets/loading1.png">
      <span>正在加载更多</span>
    </div>
    <!--<div style="height:.68rem"></div>-->
    <div class="btn">
      <button @click.stop="showPop(1)"> 我要留言</button>
    </div>
    <div class="pop-up" v-if='isLeaveBtn' @click="cancle">
      <div class="com-div-center-center-ab inner-box" v-if='isLoading1' @click.stop="stopPop">
        <div class="pop-area">
          <textarea placeholder="输入留言内容" v-model='leaveWordModel' maxlength="100"></textarea>
          <p v-text="leaveWordModel.length+'/100'"></p>
        </div>
        <div class="pop-btn">
          <button style="margin-right:.5rem" @click.stop="showPop(0)">取消</button>
          <button @click.stop="sureLeaveWord">确认</button>
        </div>
      </div>
      <div class="no-login com-div-center-center-ab " v-if='isLoading' @click.stop="stopPop">
          <p>登录后可以留言</p>
        <div style="width:100%;border-top:1px solid #9c9c9c;margin-top:.55rem"></div>
          <p style="margin-top:.25rem"><button @click="goLogin">确定</button></p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default{
    props: ['sData'],
    data(){
      return {
        deData: []
        , isLeaveBtn: false,
        leaveWordModel: '',
        pageNum: 0,
        pageSize: 10,
        btn1: false,//分页loding显示隐藏按钮
        btn2: false,//添加留言，
        isLoading:false,
        isLoading1:false
      }
    },
    methods: {
      cancle(){
        this.isLeaveBtn = false;
        this.leaveWordModel='';
      },
      stopPop(){},
      showPop(boo){
        if (boo) {
          this.isLeaveBtn = true;
            this.getAjax(this.url.isLogged,{},(res)=>{
                if(res.code==200){
                  if(!res.data){
                    this.isLoading=true;
                    this.isLoading1=false;
                  }else {
                    this.isLoading=false;
                    this.isLoading1=true;
                  }
                }
            });
        } else {
          this.leaveWordModel='';
          this.isLeaveBtn = false;
        }
      },
      goLogin(){
          this.getAjax(this.url.my,{},(res)=>{

          })
      },
      unique5(array){
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (array[i].id === array[j].id) j = ++i;
          r.push(array[i]);
        }
        return r;
      },
      getData(){
          if(this.btn2){
              this.deData=[]
          }
        this.btn2=false;
        var obj = {};
        obj.productId = this.$route.params.id;
        obj.pageSize = this.pageSize;
        var lastData = this.deData.length&&this.deData[this.deData.length-1];
        if (this.deData.length>0) {
          obj.lastGmtCreate = lastData.gmtCreate;
          obj.lastId = lastData.id;
        }
        m$.scroll(function () {

        });
        this.postAjax(this.sData.url.productReviewsPage, JSON.stringify(obj), (res) => {
          if (res.code == 200) {
            var othis = this;
            for (var i=0;i<res.data.length;i++){
              this.deData.push(res.data[i]);
              // console.log(res.data[i])
            }
            if(this.deData.length>0&&this.deData.length%10==0){
              this.btn1=true;
              m$.scroll(function () {
                othis.getData();
              })
            }else {
              this.btn1=false;
              m$.scroll(function () {

              })
            }
          }else {
            this.btn1=true;
          }
        })
      },
      sureLeaveWord(){
        var obj = {};
        obj.text = this.leaveWordModel;
        obj.product = {
          'id': this.$route.params.id
        };
        this.postAjax(this.sData.url.productReviewsSave, JSON.stringify(obj), (res) => {
          if (res.code == 200) {
            var _this = this;
            this.pageNum = 1;
            m$.template({
              val: '成功',
              time: 600,
              fn(){
                _this.isLeaveBtn = false ;
                _this.leaveWordModel = '';
                _this.btn2  =  true;
                _this.getData();
              }
            })
          } else {
              m$.template({
                val: res.message,
                time: 600,
              })
          }
        })
      }
    },
    created(){

      this.getData()
    }
  }
</script>
<style lang="less" scoped>
  //@import "${fileName}";
  #leave-word {
    width: 100%;
    .words-all {
      font-size: .22rem;
      color: #333;
      .word {
        border-bottom: 2px solid #e3e3e3;
        .top {
          display: flex;
          border-bottom: 1px solid #e3e3e3;
          > p {
            flex: 1;
            height: .56rem;
            line-height: .56rem;
            font-size: .2rem;
            color: #9a9a9a;
          }
          .tel {
            text-align: left;
          }
          .time {
            text-align: right;
          }

        }
        .info {
          padding: .2rem 0;
          > p {
            font-size: .26rem;
            color: #6e6e6e;
          }
        }
      }
    }
    .loading {
      color: #9a9a9a;
      height: .8rem;
      line-height: .8rem;
      font-size: .22rem;
      text-align: center;
      > span {
        color: #9a9a9a;
        font-size: .22rem;
      }
      > img {
        vertical-align: middle;
        display: inline-block;
        width: .22rem;
        height: .2rem;
        -webkit-transform: rotate(360deg);
        animation: rotation 3s linear infinite;
        -moz-animation: rotation 3s linear infinite;
        -webkit-animation: rotation 3s linear infinite;
        -o-animation: rotation 3s linear infinite;
      }
    }
    .btn {
      padding-right: .25rem;
      position: fixed;
      bottom: 0rem;
      font-size: 0;
      > button {
        position: absolute;
        left: -.25rem;
        bottom: 0;
        height: .98rem;
        background-color: #fb4874;
        color: #fff;
        width: 7.5rem;
      }
    }
    .pop-up {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(23, 23, 23, .48);
      z-index: 999;
      .inner-box {
        border-radius: 4px;
        width: 5rem;
        height: 3.56rem;
        background-color: #fff;
        padding: .2rem;
        .pop-area {
          position: relative;
          width: 4.6rem;
          height: 2.3rem;
          > textarea {
            width: 4.6rem;
            height: 2.3rem;
            color: #9c9c9c;
            padding: .16rem;
            resize: none;
            border-radius: 1px;
            border: 1px solid #979797;
          }
          > p {
            position: absolute;
            bottom: 0.08rem;
            right: 0.08rem;
            font-size: .26rem;
            color: #9c9c9c;
          }
        }

        > .pop-btn {
          width: 100%;
          height: .54rem;
          font-size: 0;
          text-align: center;
          margin-top: .26rem;
          > button {
            display: inline-block;
            height: .54rem;
            width: 1.4rem;
            border-radius: .1rem;
            background-color: #fb4874;
            border: 1px solid #fb4874;
            color: #fff;
          }
          > button:nth-of-type(1) {
            background-color: #fff;
            color: #fb4874;
          }
        }
      }
      .no-login{
        border-radius: 4px;
        width: 4rem;
        height: 2.6rem;
        background-color: #fff;
        padding-top: .4rem;
        >p{
            font-size: .26rem;
          color: #9c9c9c;
          text-align: center;
          margin-top: .3rem;
          >button{
            margin: 0 auto;
            width: 1.2rem;
            height: .5rem;
            background-color: #fb4874;
            color: #fff;
            border-radius: 4px;
          }
        }

      }
    }
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
