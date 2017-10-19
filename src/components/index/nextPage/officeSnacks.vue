<template>
  <div>
    <div class="banner-img">
      <img src="../../../assets/indexB/lingshiBanner.jpg" alt="" @click="$router.push('//goodsDetail/1163')">
    </div>
    <div class="banner">
      <div  class="active"@click="searchPro(0,$event)">综合优选</div>
      <div @click="searchPro(1,$event)">火爆热卖</div>
      <div @click="searchPro(2,$event)">天天低价</div>
      <!--<div @click="searchPro(3,$event)">品牌仓库</div>-->
    </div>
    <div class="t-pro-wrap">
      <div class="t-pro" v-for="(v,i) in productData">
        <div class="t-pro-content">
          <div class="t-pro-img">
            <img :src="v.thumbnail" v-if='v.id' alt="" @click="$router.push('/goodsDetail/'+v.id)">
            <img :src="v.thumbnail" v-if='v.productId' alt="" @click="$router.push('/goodsDetail/'+v.productId)">
          </div>
          <div class="t-pro-det" v-if='v.id' @click="$router.push('/goodsDetail/'+v.id)">
            <div class="t-name" v-text="v.productName" v-if="v.productName">无线蓝牙耳机</div>
            <div class="t-name" v-text="v.name" v-if="v.name">无线蓝牙耳机</div>
            <div class="t-digst" v-text="v.digest">本款耳机采用。。</div>
            <div class="t-price">
              <span>促销价￥</span><span v-text="v.price" v-if="v.price">668</span><span v-text="v.promotionPrice" v-if="v.promotionPrice">668</span>
            </div>
          </div>

          <div class="t-pro-det" v-if='v.productId' @click="$router.push('/goodsDetail/'+v.productId)">
            <div class="t-name" v-text="v.productName" v-if="v.productName">无线蓝牙耳机</div>
            <div class="t-name" v-text="v.name" v-if="v.name">无线蓝牙耳机</div>
            <div class="t-digst" v-text="v.digest">本款耳机采用。。</div>
            <div class="t-price">
              <span>促销价￥</span><span v-text="v.price" v-if="v.price">668</span><span v-text="v.promotionPrice" v-if="v.promotionPrice">668</span>
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
<script  type="text/javascript">
  export default {
    props: ['sData'],
    data(){
      return{
        pageNum:'1',
        productData:[],
        isCollect:'0',
        groupType2:[],
        searchVal:'',
        businessTypeId:'',
      }
    },
    methods:{
      searchPro(i,e){
        var div=e.target;

        if(i==0){
          this.searchVal='办公零食';
          div.nextElementSibling.className='';
          div.nextElementSibling.nextElementSibling.className='';
          this.productData=[];
          this.pageNum='1';
          this.getData();
        }else if(i==1){
         // this.productData=this.groupType2[1].detailVos
          div.nextElementSibling.className='';
          div.previousElementSibling.className='';
          this.searchVal='';
          this.businessTypeId=2;
          this.getData(2,1);
        }else if(i==2){

          div.previousElementSibling.className='';
          div.previousElementSibling.previousElementSibling.className='';
          this.productData = [];
          this.getDataTwo();
        }
//        else{
//          this.searchVal='品牌';
//          this.businessTypeId='';
//          this.productData = [];
//          this.getData();
//          div.previousElementSibling.className='';
//          div.previousElementSibling.previousElementSibling.className='';
//          div.previousElementSibling.previousElementSibling.previousElementSibling.className='';
//        }
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
          businessTypeId: this.businessTypeId > 0 ? this.businessTypeId : '',
          keywords: this.searchVal,
          pageNum: this.pageNum,
          pageSize: '10',
          priceType:4,
          status: '1',
          //  isFilter:1
        }, (res) => {
          if (res.code == 200) {
          	console.log(res.data)
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
            for (var i = 0; i < res.data.data.length; i++) {
              this.productData.push(res.data.data[i]);
            }
            console.log(this.productData)
            this.productData = this.unique5(this.productData);
            console.log(this.productData)
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
            }
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
      getDataTwo(){
        this.postAjax(this.sData.url.getProductGroupShopVo,{
          status:'',
          groupType:2,
        },(res)=>{
          if(res.data&&res.data.data&&res.data.data.length>=1){
          this.groupType2 = res.data.data;
//          console.log(this.groupType2.length);
          for(var j=0;j<this.groupType2.length;j++){
            for(var k=1;k<this.groupType2[j].detailVos.length;k++){
              this.productData.push(this.groupType2[j].detailVos[k])
            }
          }
          console.log(this.productData)
          this.productData=this.productData;
          setTimeout(function () {
            var swipe = new Swiper('.seckill>.swiper-container', {
              autoplay:2500
            });
          },10)
        }
      })
      },
    },
    created()
    {
      this.searchVal='办公零食';
      this.getData()
    },
    watch:{
      'groupType2':function (val) {
        this.productData=val[0].detailVos;
      }
    }
  }
</script>
<style scoped lang="less">
  @import "com";
</style>
