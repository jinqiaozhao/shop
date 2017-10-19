<template>
  <div>
    <div class="banner-img">
      <img src="../../../assets/indexB/banner-rank.jpg" alt="" >
    </div>
    <div class="banner">
      <div  class="active"@click="searchPro(0,$event)">手机</div>
      <div @click="searchPro(1,$event)">音箱</div>
      <div @click="searchPro(2,$event)">零食</div>
      <div @click="searchPro(3,$event)">日化</div>
    </div>
    <div class="t-pro-wrap">
      <div class="t-pro" v-for="(v,i) in productData">
        <!--<div class="collect-img">-->
        <!--<img src="../../assets/index_nextpage/collect00.png" alt="" v-if="isCollect==0 " @click="collect(v.id)">-->
        <!--<img src="../../assets/index_nextpage/colloec01.png" alt="" v-if="isCollect==1"  @click="collect(v.id)">-->
        <!--</div>-->
        <div class="t-pro-content">
          <div class="t-pro-img">
            <img :src="v.thumbnail" alt="" @click="$router.push('/goodsDetail/'+v.id)">
          </div>
          <div class="t-pro-det" @click="$router.push('/goodsDetail/'+v.id)">
            <div class="t-name" v-text="v.name">无线蓝牙耳机</div>
            <div class="t-digst" v-text="v.digest">本款耳机采用。。</div>
            <div class="t-price">
              <span>促销价￥</span><span v-text="v.promotionPrice">668</span>
            </div>
          </div>
        </div>
        <div class="gobuy">
          <img src="../../../assets/index_nextpage/gobuy.png" alt="">
        </div>
      </div>
    </div>
    <!--提示下拉框-->
    <div id="info" v-show="binfo">
      已经到底了
    </div>
  </div>
</template>
<script  type="text/javascript">
  export default {
    props: ['sData'],
    data(){
      return{
        searchVal:'',
        binfo:'',
        pageNum:'1',
        productData:[],
        isCollect:'0',
      }
    },
    methods:{
      searchPro(i,e){
        var div=e.target;
        if(i==0){
          this.searchVal='手机';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.nextElementSibling.className='';
          this.productData=[];
          this.pageNum='1';
          this.getData(32,1);
        }else if(i==1){
          this.searchVal='音箱';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.previousElementSibling.className='';
          this.pageNum='1';
          this.getData(1,1);
        }else if(i==2){
          this.searchVal='零食';
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          this.pageNum='1';
          this.getData(2,1);
        }else{
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.previousElementSibling.className='';
          this.searchVal=''; this.pageNum='1';
          this.getData(3,1);}
        div.className='active';



      },
      getData(businessTypeId, type){
        if (type) {
          // type为搜索按钮，
          this.productData = [];
          this.pageNum = 1;
        }
        m$.scroll(function () {

        });
        this.postAjax(this.sData.url.getProductVoByTypeUrl, {
          businessTypeId: businessTypeId > 0 ? businessTypeId : '',
          keywords: this.searchVal,
          pageNum: this.pageNum,
          pageSize: '10',
          priceType:4,
          status: '1',
          //  isFilter:1
        }, (res) => {
          if (res.code == 200) {
          /*加载完成给出提示*/
//      var pro=document.getElementsByClassName('t-product')
//      console.log(pro.length)
          if(res.data.total<=res.data.pageNum*res.data.pageSize){
            var btn=document.getElementById('buttom_info');
            if(res.data.total>0 && res.data.total<=res.data.pageSize && btn){
              this.binfo=true;
            }else{
              this.binfo=true;
            }
          }
          else{
            this.binfo=false;
          }
          /*加载完成给出提示end*/
          if( res.data.data.length==0 &&this.pageNum==1){
            if(this.$route.params.id==29){this.nopro=true;}
            this.nopro=true;
            m$.sessionStores.set('noPro','0');
           // this.getDataThree();
          }else{
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
            }
            this.productData = this.unique5(this.productData);
            if (this.productData.length>0&&this.productData.length%10==0) {
              var othis = this;
              this.pageNum++;
              m$.scroll(function () {
                othis.getData(businessTypeId);
              })
            }
            else {
              m$.scroll(function () {
              })
            }}
        } else {
          m$.template({
            val: res.message,
            time: 1000
          })
        }
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
      getDataThree(){
        this.postAjax(this.sData.url.getProductVoByTypeUrl, {
          businessTypeId: '',
          keywords:'' ,
          pageNum: 1,
          pageSize: '10',
          //priceType:3,
          groupType:3,
          status: '1',
          //isFilter:1
        }, (res) => {
          if (res.code == 200) {
          if( res.data.data.length==0){
            //  if(this.$route.params.id==29){this.nopro=true;document.getElementById('text_like').className='close'; return;}
            //  document.getElementById('text_like').className='';
            this.nopro=true;
            m$.sessionStores.set('noPro','0');
          }else{
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
            }
            this.productData = this.unique5(this.productData);
            if (this.productData.length>0&&this.productData.length%10==0) {
              var othis = this;
              this.pageNum++;
              m$.scroll(function () {
                othis.getData(othis.$route.params.id,0);
              })
            }
            else {
              m$.scroll(function () {

              })
            }}
        } else {
          m$.template({
            val: res.message,
            time: 1000
          })
        }

      })
      },
      collect(productData){
        this.postAjax(this.url.toggleCollection,{productId :this.goodsId},(res)=>{
          this.isCollect=res.data;
        console.log(this.isCollect)
        if(res.data==1){
          m$.template({
            val: '收藏成功',
            time: 500
          });
        }else{
          m$.template({
            val: '取消收藏成功',
            time: 500
          });
        }
      })
      },
    },
    created(){
      this.searchVal='手机';
      this.getData(32,1)
    }
  }
</script>
<style scoped lang="less">
  .banner-img{
    height:150px;
    img{
      width:100%;
    }
  }
  .banner{
    display:flex;
    background: #FFFFFF;
    >div{
      text-align: center;
      font-size:0.35rem;
      flex:1;
      padding:0.2rem 0;
      margin:0 0.3rem;
      line-height: 0.35rem;
    }
    >div.active{
      // background: -moz-linear-gradient(left, #ace, #f96);
      background: -webkit-linear-gradient(left, #FD3433, #FDBC84);
      //background: -o-linear-gradient(left, #ace, #f96);
      position:relative;
      color: #FFF;
    }
    >div.active:after{
      position:absolute;
      bottom:0;
      right:0.55rem;
      content:'';
      border-top:5px solid transparent;
      border-left:5px solid transparent;
      border-bottom:5px solid #fff;
      border-right:5px solid transparent;

    }
  }
  .t-pro-wrap{

    >div.t-pro{
      position:relative;
      min-height: 100px;
      background: #fff;
      margin:0.15rem 0.15rem;
      >div.collect-img{
        >img{
          position:absolute;
          width:0.4rem;
          right:0.5rem;
          top:0;
        }
      }
      >div.t-pro-content{
        padding:0.1rem;
        display: flex;
        >div.t-pro-img{
          width:25%;

          >img{
            width:100%;
          }
        }
        >div.t-pro-det{
          width:75%;

          padding:0.1rem 0.2rem;
          >div.t-name{
            font-size:0.35rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          .t-digst{
            font-size:0.25rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:3;
          }
          .t-price{
            color:#fb4874;
            >span:first-child{
              font-size:0.25rem;
            }
            >span:last-child{
              font-size:0.35rem;
            }
          }
        }
      }
      >div.gobuy{

        >img{
          position:absolute;
          right:0.3rem;
          bottom:0.1rem;
          height:0.4rem;
        }

      }
    }
  }
  #info{
    font-weight: bolder;
    padding:0.1rem;
    background-color:#fff;
    opacity:0.8;
    width:100%;
    text-align: center;
    bottom:0;
    font-size: 0.3rem;
    color:#FB4874;
    border-top: 2px solid #F5F5F5;
  }
</style>
