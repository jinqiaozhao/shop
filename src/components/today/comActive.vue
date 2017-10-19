<template>
  <div class="eight">
    <div class="banner01">
      <img src="http://ovn5haih3.bkt.clouddn.com/%E6%BD%AE%E5%A6%86%E4%B8%BB%E4%B9%89.jpg" v-if="searchVal==''">
      <img src=" http://ovn5haih3.bkt.clouddn.com/diorbanner.jpg" v-if="searchVal=='迪奥'">
      <img src=" http://ovn5haih3.bkt.clouddn.com/laneigebanner.jpg" v-if="searchVal=='兰芝'">
      <img src=" http://ovn5haih3.bkt.clouddn.com/lancombanner.jpg" v-if="searchVal=='兰蔻'">
      <img src=" http://ovn5haih3.bkt.clouddn.com/esteeLauderbanner.jpg" v-if="searchVal=='雅诗兰黛'">
    </div>
    <div class="commoditys">
      <div class="commodity-pattern"  v-for="(v,i) in productData" @click="$router.push('/goodsDetail/'+v.id)">
        <div class="commodity-img">
          <img :src="v.thumbnail" alt="" >
        </div>
        <div class="commdity-text">
          <div class="commdity-name" v-text="v.name">JBL (T450BT) 无线蓝牙耳机耳机耳机耳机耳机耳机</div>
          <div class="commdity-price" style="">价格:￥ <span v-text="v.bargainPrice?v.bargainPrice:v.promotionPrice">668</span></div>
          <div><img  class="commdity-shopping"  src="http://ovn5haih3.bkt.clouddn.com/%E8%B4%AD%E7%89%A9%E8%BD%A6.png"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .commoditys{
    display: inline-block;
    .commodity-pattern{
      float: left;
      margin: .2rem .1rem 0 .1rem;
      position: relative;
      background-color: #FFF;
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
        margin-bottom: .05rem;
        .commdity-name{font-size: .25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .commdity-price{font-size: .3rem;color: #FB0000;margin-top: .15rem;
          span{font-size: .3rem;}
        }
        .commdity-shopping{
          position: absolute;bottom: .1rem;right: .1rem;
          height: .42rem;
        }
      }
    }
  }
</style>
<script>
  import sData from 'src/assets/projectStaticsData.js'
  export default {
    data(){
      return{
        sData:sData,
        searchVal:'',
        binfo:'',
        pageNum:'1',
        productData:[],
        isCollect:'0',
      }        },
    methods:{
      unique5(array){
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (array[i].id === array[j].id) j = ++i;
          r.push(array[i]);
        }
        return r;
      },
      willGo(ourl){
        this.$router.replace(ourl)
      },
      getData(businessTypeId, type){
        //如果已经有商品加载完成。删除这个元素。
        var btn=document.getElementById('buttom_info');
        if(btn){
          var box=document.getElementById('box');
          box.removeChild(btn);};
//      m$.template({
//        val: '',
//        time: 100
//      });
        // this.ofg++;
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
          priceType:'',
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
            }else{
              for (var i = 0; i < res.data.data.length; i++) {
                this.productData.push(res.data.data[i]);
              }
              this.productData = this.unique5(this.productData);
              if (this.productData.length>0&&this.productData.length%10==0 &&this.productData.length!=res.data.total) {
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
      unique5(array){
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (array[i].id === array[j].id) j = ++i;
          r.push(array[i]);
        }
        return r;
      },
      goBuy(id){
        m$.sessionStores.set('originListGoodsItem',{pageNum:this.pageNum,productData:this.productData,pageScrollPosition:window.scrollY})
        window.location.href = (`#/goodsDetail/${id}`);
        // console.log(window.location.host)
        // var newPath=window.location.href.split("#")[0]
        // window.open(newPath+`#/goodsDetail/${id}`);
      },
      goCar (id,promotionPrice,category) {
        if(category!=0){
          window.location.href = (`#/goodsDetail/${id}`);
          return;
        }else{}
        //productId 商品ID  quantity 数量默认为1
        var _this = this;
        this.postAjax(this.sData.url.saveCartUrl, {
          productId: id,
          quantity: 1,
          price: promotionPrice
        }, (res) => {
          if (res.message == 'ok') {
            this.getCarNumber();
            m$.template({
              val: '加入购物车<br>成功',
              time: 2000,
            })
          }
        })
      },
      getSearchVal(val){
        if(val.type==0){
          this.$router.push('/goodsItem/0');
        }
        if( m$.sessionStores.get('noPro')=='0'){this.nopro=false; m$.sessionStores.remove('noPro')}
        this.searchVal = val.val;
        this.getData(this.$route.params.id, val.type)
      },

      getCarNumber(){
        this.getAjax(this.url.isLogged,{},(res)=>{
          if(res.code==200&&res.data==true){
            this.getAjax(this.sData.url.getCountByUserId,{},(res)=>{
              if(res.code=200){
                this.carNumber = res.data.quantityCount
              }
            });
          }
        })
      },
    },
    created(){
      var id=this.$route.params.id;
     if(id){
       if(id==0){
        this.searchVal='迪奥';
       }else if(id==1){this.searchVal='兰蔻';}else if(id==2){this.searchVal='兰芝';}else if(id==3){this.searchVal='雅诗兰黛';}
     }else{
       this.searchVal= m$.sessionStores.get('keyword')?m$.sessionStores.get('keyword'):'';
     }
      this.getData();
    }
  }
</script>
