<template>
  <div class="phone">
    <div class="phone-banner">
      <img src="http://ovn5haih3.bkt.clouddn.com/%E6%89%8B%E6%9C%BA%E6%95%B0%E7%A0%81banner.jpg">
    </div>
    <div class="banner"><img src="http://ovn5haih3.bkt.clouddn.com/%E4%B8%8A%E6%96%B0%E5%93%81.png" /></div>
    <div class="OvO"></div>
    <div class="phone-top" v-if="phonePro">
      <div class="phone-left" >
        <img :src="phonePro[0].thumbnail" style="width:100%;height:175px;" @click="$router.push('/goodsDetail/'+phonePro[0].id)"/>
      </div>
      <div class="phone-right">
        <div class="right-one"><img :src="phonePro[1].thumbnail" style="width:50%;height:75px;" @click="$router.push('/goodsDetail/'+phonePro[1].id)"/><img :src="phonePro[2].thumbnail" style="width:50%;height:75px;"@click="$router.push('/goodsDetail/'+phonePro[2].id)"/></div>
        <div class="right-two"><img :src="phonePro[3].thumbnail" style="width:50%;height:75px;" @click="$router.push('/goodsDetail/'+phonePro[3].id)"/><img :src="phonePro[4].thumbnail" style="width:50%;height:75px;"@click="$router.push('/goodsDetail/'+phonePro[4].id)"/></div>
      </div>
    </div>
    <div class="OvO"></div>
    <div class="phone-main">
      <div class="main-img">
        <img @click='phoneskip(0)' src="http://ovn5haih3.bkt.clouddn.com/%E8%8B%B9%E6%9E%9Clogo.png"/>
        <img @click='phoneskip(1)' src="http://ovn5haih3.bkt.clouddn.com/%E5%8D%8E%E4%B8%BA.png"/>
        <img @click='phoneskip(2)' src="http://ovn5haih3.bkt.clouddn.com/%E7%BE%8E%E5%9B%BElogo.png"/>
        <img @click='phoneskip(3)' src="http://ovn5haih3.bkt.clouddn.com/xiaomiaaa.png"/>
        <div class="phone-img"  v-bind:class="classObject" ></div>
      </div>

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
  </div>
</template>

<script type="text/javascript">

  export default{
    props: ['sData'],
    data(){
      return{
        searchVal:'',
        binfo:'',
        pageNum:'1',
        productData:[],
        phonePro:[],
        isCollect:'0',
        classObject:{'classa':true,'classb':false,'classc':false,'classd':false},
      }
    },
    methods:{
      phoneskip(index){
        this.classObject.classa=false;this.classObject.classb=false;this.classObject.classc=false;this.classObject.classd=false;
        if(index == 0){
          this.classObject.classa=true;
          this.searchVal='苹果手机';
          this.productData=[];
          this.pageNum='1';
          this.getData();
        }else if(index == 1){
          this.classObject.classb=true;
          this.searchVal='华为';
          this.productData=[];
          this.pageNum='1';
          this.getData();
        }else if(index == 2){
          this.classObject.classc=true;
          this.searchVal='美图';
          this.productData=[];
          this.pageNum='1';
          this.getData();
        }else if(index == 3){
          this.classObject.classd=true;
          this.searchVal='小米';
          this.productData=[];
          this.pageNum='1';
          this.getData();
        }
      },
      searchPro(i,e){
        var div=e.target;
        if(i==0){
          this.searchVal='推荐';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
        }else if(i==1){
          this.searchVal='手机';
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
        }else{
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          this.searchVal='零食';}
        this.productData=[];
        this.pageNum='1';
        this.getData();
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
          businessTypeId: 32,
          keywords: this.searchVal,
          pageNum: this.pageNum,
          pageSize: '10',
          priceType:4,
          status: '1',
          //  isFilter:1
        }, (res) => {
          if (res.code == 200) {
          if( res.data.data.length==0 &&this.pageNum==1){
            if(this.$route.params.id==29){this.nopro=true;}
            this.nopro=true;
            m$.sessionStores.set('noPro','0');
          }else{
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
              if(i<6 ){this.phonePro.push(res.data.data[i]);}
            }
            this.productData = this.unique5(this.productData);
            if (this.productData.length>0&&this.productData.length%10==0) {
              var othis = this;
              this.pageNum++;
              m$.scroll(function () {
                othis.getData();
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
    },
    mounted(){
      this.searchVal='手机';
      this.getData();
  },
    created(){

//      this.searchVal='苹果';
//      this.productData = [];
//      this.getData()
    }
  }

</script>
<style lang="less">
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
          >div{
            margin-bottom:6px;
          }
          >div.t-name{
            font-size:0.3rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          .t-digst{
            color:#868585;
            font-size:0.25rem;
            text-overflow:ellipsis;
            overflow:hidden;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:3;
          }
          .t-price{
            color:#fb4874;
            display: flex;
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
  .classa{left: .8rem;}.classb{left: 2.6rem;}.classc{left: 4.4rem;}.classd{left: 6.2rem;}
  .OvO{height: .1rem;}
  .phone-main{
    position: relative;
    height: 1.5rem;
    display: flex;
    background-color: #FFF;
    .main-img{
      display: flex;
      img{width: 22%;margin: 0 .1rem 0 .1rem;}
    }
  }
  .phone-img{
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: .15rem solid transparent;
    border-right: .15rem solid transparent;
    border-bottom: .25rem solid #F5F5F5;
    -webkit-transition: 0.3s linear;
  }
  .phone-top{
    width: 100%;height: 3.6rem;
    display: flex;
    .phone-left{
      background-color: #FFF;
      border-radius:5px;
      margin: .1rem;
      width: 3.6rem;
    }
    .phone-right{
      margin: .1rem;
      width: 3.6rem;
      float: left;
      .right-one{
        border-radius:5px;
        background-color: #FFF;
        height: 48.5%;
        margin-bottom: .1rem;
      }
      .right-two{
        border-radius:5px;
        background-color: #FFF;
        margin-top: .1rem;
        height: 48.5%;
      }
    }
  }

  .phone-banner{
    width: 7.5rem;
    img{width: 100%;float: left;}
  }
  .phone-banner:after{content: '';display: block;clear: both;}
  .banner{background-color: #FFF;width: 100%;text-align: center;height: .7rem;position: relative;
    img{height: .7rem;position: absolute;top: 0;left: 33%;}
  }
</style>
