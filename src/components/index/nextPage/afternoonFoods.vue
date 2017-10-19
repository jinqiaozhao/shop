<template>
  <div class="eight">
    <div class="banner01"><img src="../../../assets/indexB/banner-after.png"></div>
    <div class="banner02">
      <div  class="active"@click="searchPro(0,$event)">糕点</div>
      <div @click="searchPro(1,$event)">面包</div>
      <div @click="searchPro(2,$event)">饼干</div>
      <div @click="searchPro(3,$event)">威化</div>
    </div>
    <div class="commodity">
      <div class="commodity-pattern"  v-for="(v,i) in productData" @click="$router.push('/goodsDetail/'+v.id)">
        <div class="commodity-img">
          <img :src="v.thumbnail" alt="" >
        </div>
        <div class="commdity-text">
          <div class="commdity-name" v-text="v.name">JBL (T450BT) 无线蓝牙耳机耳机耳机耳机耳机耳机</div>
          <div class="commdity-price">价格:￥ <span v-text="v.promotionPrice">668</span></div>
          <div><img  class="commdity-shopping"  src="http://ovn5haih3.bkt.clouddn.com/%E8%B4%AD%E7%89%A9%E8%BD%A6.png"></div>
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
        isCollect:'0',
      }
    },
    methods:{
      searchPro(i,e){
        var div=e.target;
        if(i==0){
          this.searchVal='糕点';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.nextElementSibling.className='';
        }else if(i==1){
          this.searchVal='面包';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          div.previousElementSibling.className='';
        }else if(i==2){
          this.searchVal='饼干';
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
        }else{
          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.previousElementSibling.className='';
          this.searchVal='威化';}
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
          businessTypeId:2,
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
            this.getDataThree();
          }else{
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
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
      this.searchVal='糕点';
      this.getData()
    }

  }

</script>
<style lang="less">
  .banner02{
    display:flex;
    background: #FFFFFF;
    width: 100%;
    height: 0.7rem;
    >div{
      text-align: center;
      font-size:0.35rem;
      line-height: 0.35rem;
      flex:1;
      padding:0.2rem 0;
      margin:0 0.3rem;
    }
    >div.active{
      // background: -moz-linear-gradient(left, #ace, #f96);
      background: -webkit-linear-gradient(left, #FD3433, #FDBC84);
      //background: -o-linear-gradient(left, #ace, #f96);
      position:relative;color: #FFF;
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
  .commodity{
    display: inline-block;
    .commodity-pattern{
      float: left;
      margin: .2rem .1rem 0 .1rem;
      position: relative;
      background-color: #FFF;
      height:5rem;
      .commodity-img{
        width: 3.51rem;height: 3.5rem;
        img{max-height: 100%;}
      }
      .commdity-top{
        position: absolute;
        right: .2rem;top: -.15rem;
        width: .65rem;height: .7rem;
      }
      .commdity-text{
        padding-left:.1rem;
        width: 3.51rem;
        .commdity-name{font-size: .25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .commdity-price{font-size: .3rem;color: #FB0000;margin-top: .15rem;
          span{font-size: .52rem;}
        }
        .commdity-shopping{
          position: absolute;bottom: .1rem;right: .1rem;
          height: .42rem;
        }
      }
    }
  }
  .banner01{
    width: 7.5rem;
    img{
      float: left;max-width:100%;}
  }
  .banner:after{content: '';display: block;clear: both;}
  .eight-main{
    width: 100%;
    font-size: .26rem;
    img{height: .8rem;}
    .main{
      padding-top: .1rem;
      display: inline-block;
      height: 1.5rem;width: 25%;
      background-color: #FFF;
      text-align: center;
      span{display: block;}
    }
  }
</style>
