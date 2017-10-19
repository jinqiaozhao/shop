/*
*作者---杨彬
*
*/
<template>
  <div>
    <!--  <div class="head_nav">
      <div class="head_left" @click="shop()"></div>
      <div class="head_edit" @click="showInput()">编辑</div>
    </div> -->
    <div class="head_navs">
      <div class="head_nav_one" @click="onclass(1)" v-bind:class="{ 'head_nav_two': isActive == 1 }" ><div class="shop-one">商品</div></div>
      <div class="head_nav_one" @click="onclass(2)" v-bind:class="{ 'head_nav_two': isActive == 2 }" ><div class="shop-one">编辑</div></div>
    </div>
    <div class="product-select-warp">
      <div class="all-select-item" v-for="(citem,cindex) in thisGetData" v-if='del'>
        <div class="content-detail-warp">
          <div class="content-detail">
            <section class="check-img com-div-middle-ab" v-show="isEdit">
              <input type="checkbox" name="thisItem" class="item-checkbox" v-model="checkedID" :value="citem.id">
              <img src="../../assets/notCheck.png" class="not-checked">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC" class="is-checked">
            </section>
            <div class="pro_right">
              <div class="select-all"></div>
              <img class="product-img" :src="citem.thumbnail" name="product-imgs">
              <div class="item-money-warp"><span
                v-text="sData.productCarSData.moneySymbol" class="money-symbol"></span><span
                class="item-money" v-text="citem.promotionPrice"></span></div>
              <section class="product-content">
                <p class="en-names" v-text="citem.name"></p>
                <div class="cn-notice" v-text="citem.digest"></div>
                <p class="cn-name">￥<span>{{citem.promotionPrice}}</span></p>
                <img class="pro-img" src="../../assets/index_nextpage/gobuy.png" />
              </section>
            </div>
          </div>
          <!--  <div class="button" @click="delCollect(citem.id,$event)">取消收藏</div> -->
        </div>
      </div>
    </div>

    <div class="collet-qiu" v-show="isEdit">
      <button @click='qiubu()' >取消收藏</button>
    </div>

    <div class="collect-hei" v-if='hei'></div>
    <div class="collect-et" v-if='hei'>
      <div class="collect-ns" @click="delCollect(checkedID,$event)">
        <span>确定删除{{num}}个宝贝</span>
      </div>
      <div class="collect-qu" @click='heifalse'>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return {
        num:'',
        qiuxiu:false,
        hei:false,
        checkedID:[],
        del: false,
        thisGetData: [],
        isEdit:false,
        ids:[],
        pageNum:1,
        isActive:1,
      }
    },
    props: ['sData'],
    methods: {
      qiubu(){this.hei = true;console.log(this.hei)},
      heifalse(){this.hei = false},
      onclass(index){
        if(index==1){
          this.isActive = 1;
          this.qiuxiu = false;this.showInputFalse();
        }else if(index==2){
          this.isActive = 2;
          this.qiuxiu = true;
          this.showInput();
        }
      },
      showInputFalse(){
        var img=document.getElementsByName('product-imgs')
        var content=document.getElementsByClassName('product-content');
        this.isEdit=false;
        for(var i=0;i<img.length;i++){
          img[i].style.left=0;
          content[i].style.margin='0.32rem 0 0 1.7rem'
        }
      },
      showInput(){
        var img=document.getElementsByName('product-imgs')
        var content=document.getElementsByClassName('product-content');
        if(this.isEdit==false){
          this.isEdit=true;
          for(var i=0;i<img.length;i++){
            img[i].style.left='0.65rem';
            content[i].style.margin='0.32rem 0 0 2.3rem'
          }
        }
      },
      delCollect(ids,e){
        if(ids==''){
          m$.template({
            val: '未选择商品',
            time: 1000
          })
          return;
        }
        //this.ids.push(ids);
        var top=e.target;
        console.log(top.offsetTop)
        var id=ids.toString();
        m$.sessionStores.set('top',top);
        this.postAjax(this.url.deleteCollections,{productId:id},(res)=>{
          if(res.code==200){
//          this.getAjax(this.url.pageCollection,{
//            pageNum:this.pageNum,
//            pageSize:10
//          },(res)=>{
//              console.log(res.data)
//          })
          console.log()
          var pageNum=this.pageNum;
          this.thisGetData=[]
          //this.pageCollection();
          this.pageCollection(pageNum);
          document.body.scrollTop= m$.sessionStores.get('top')?m$.sessionStores.get('top'):500;
          console.log(document.body.scrollTop)
        }
        //  console.log(res)
      })
        this.hei = false;this.onclass(1);
      },
      //获取收藏商品
      pageCollection(pageNum){
        this.getAjax(this.url.pageCollection,{
          pageNum:pageNum,
          pageSize:10
        },(res)=>{
          for(var i=0;i<res.data.data.length;i++){
          this.thisGetData.push(res.data.data[i].productDetailShopVo)
        }
        this.thisGetData=this.unique5(this.thisGetData);
        console.log(this.thisGetData);
        if (this.thisGetData.length>0&&this.thisGetData.length%10==0&&this.thisGetData.length!=10) {
          var othis = this;
          this.pageNum++;
          m$.scroll(function () {
            othis.pageCollection();
            console.log(this.thisGetData)
          })
        }
        else {
          m$.scroll(function () {
            console.log('加载已完成')
          })
        }
        console.log(this.thisGetData)
        this.del = true;
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
    created(){
      //获取收藏
      this.pageCollection(1);
      m$.sessionStores.remove('ybpdmk');
      m$.documentTitle("我的收藏");
    },
    watch: {
      /* 'isAllChecked': function (val) {
         this.checkedID.splice(0, this.checkedID.length);
         if (val.length > 0) {
           for (var i = 0; i < this.thisGetData.length; i++) {
             this.checkedID.push(i)
           }
         }
         else {
           this.checkedID = [];
         }
       },*/
      'checkedID': function (val) {
        this.num=val.length;
//      this.sum = 0;
//      for (var i = 0; i < val.length; i++) {
//        this.sum += this.thisGetData[val[i]].quantity * this.thisGetData[val[i]].price
//      }
//      this.sum = this.sum.toFixed(2);
//      if (val.length == this.thisGetData.length) {
//
//      }
      }
    }
  }
</script>
<style scoped lang="less">
  @import "productCar";
  .collet-qiu{
    z-index: 10;
    position: fixed;bottom: 0;
    width: 100%;background-color: #F7F7F7;
    border-top: 1px solid #FFF;
    text-align: center;
    line-height: .4rem;
    height: 1rem;
    button{
      background-color: #EF3561;color:#FFF;
      letter-spacing:2px;
      font-size: .3rem;
      border-radius: 8px;
      width:60%;height:40px;
    }
  }

  .collect-et{
    text-align: center;
    line-height: 50px;
    background-color: #F5F5F5;
    z-index: 10;font-size:0.3rem;
    width:100%;
    height:115px;
    position: fixed;bottom: 0;
    .collect-ns{
      height:50px;background-color:#FFF;color:#FA557D;
    }
    .collect-qu{
      margin-top: 15px;
      height:50px;background-color:#FFF;
    }

  }
  .collect-hei{width: 100%;height: 100%;position: fixed;z-index: 9;background-color:rgba(0,0,0,.5);top: 0;}
  .pro-img{
    position: absolute;top: 1.6rem;right: 0.4rem;
    width: 1.35rem;
  }
  .head_nav_one{
    width: 50%;
    .shop-one{
      display: inline-block;
      height: 50px;width: 50px;color:#525252;
    }
  }
  .head_nav_two{
    width: 50%;
    .shop-one{
      display: inline-block;
      height: 50px;width: 50px;color:red;
      border-bottom: 1px solid red;
    }
  }
  .pro_right{

    >img {
      border: 1px solid #DADCDE;
    }
  }
  #pro_right{
    position:absolute;

  }
  .head_navs{
    height: 50px;
    background-color: #FFF;
    font-size: .32rem;
    display: flex;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #DADCDE;
  }
  .head_nav {
    height: 30px;
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
    .head_edit {
      border-left: 1px solid #f3f3f3;
      font-size: 0.3rem;
      line-height: 30px;
      padding: 0 5px;
      float: right;
    }
  }
  .product-car-foot{
    height: 1.14rem;
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    .all-select-warp{
      height: 0.42rem;
      flex: 545;
      padding-left: 0.2rem;
      background-color: #ffffff;
      font-size: 0;
      .all-check-text{
        font-family:PingFangSC-Regular;
        font-size:0.3rem;
        color:#231916;
        letter-spacing:1.5px;
        text-align:center;
        line-height: 0.3rem;
        margin-left: 0.72rem;
      }
      .all-check-sum{
        font-family:PingFangSC-Regular;
        font-size:0.28rem;
        color:#7e7e7e;
        letter-spacing:1.2px;
        line-height: 0.24rem;
        text-align:center;
        margin-left: 0.85rem;
      }
      .all-money-symbol{
        font-family:PingFangSC-Regular;
        font-size:0.24rem;
        color:#ff1b1b;
        letter-spacing:1.2px;
        line-height:0.24rem;
        text-align:center;
      }
      .all-money{
        font-family:PingFangSC-Regular;
        font-size:0.36rem;
        color:#ff1b1b;
        letter-spacing:1.2px;
        line-height:0.36rem;
        text-align:center;
      }
    }
    .goAccount{
      background:#fb4874;
      flex: 205;
      color: #ffffff;
      font-family:PingFangSC-Regular;
      font-size:0.36rem;
      letter-spacing:1.79px;
      height: inherit;
      line-height: 1.14rem;
      text-align: center;
    }
  }
  .product-select-warp{
    background:rgba(0,0,0,0.10);
    margin-bottom: 1.24rem;
    .all-select-item{
      box-sizing: border-box;
      background-color: #ffffff;
      padding-left: 0.2rem;
      margin-bottom: .1rem;
      overflow: scroll;
      &:last-of-type{
        border-bottom:none;
      }
      .content-detail-warp{
        font-size: 1rem;
        width: 7.5rem;
        height: 2.08rem;
        display: -webkit-flex;
        .content-detail{
          flex: 750;
          position: relative;
          min-height: 1.48rem;
          _height:1.48rem;
          font-size: 0;
          .check-img{
            width: 0.42rem;
            height: 0.42rem;
            padding: .01rem;
            z-index:10;
            .item-checkbox{
              z-index: 4;
              opacity: 0;
              &:checked~.not-checked{
                display: none;
              }
              &:checked~.is-checked{
                display: inline-block;
              }
            }
            .not-checked{
              z-index: 2;
            }
            .is-checked{
              z-index: 3;
              display: none;
            }
          }
          >.check-img>*{
            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            top: 0;
            left: 0;
          }

          .product-img{
            width: 1.6rem ;
            position: absolute;
            top: .32rem;
            left: 0rem;
            height:1.6rem;
          }
          .item-delete{
            width: 0.46rem;
            height: 0.46rem;
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .product-content{
            margin-top: .32rem;
            // margin-left: 2.3rem;
            margin-left: 1.8rem;
            display: inline-block;
            >p{
              margin: 0.06rem 0;
            }
            .en-names{
              font-family:PingFangSC-Regular;
              font-size:0.28rem;
              color:#323137;
              letter-spacing:0px;
              text-align:left;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              width: 5.5rem;
            }
            .cn-name{
              font-family:PingFangSC-Regular;
              font-size: 0.24rem;
              color:#fb4874;
              letter-spacing:0px;
              line-height:0.28rem;
              text-align:left;
              margin-top: .4rem;
              >span{
                font-size: .35rem;
              }
            }
            .expain-type{
              font-family:PingFangSC-Regular;
              font-size: 0.28rem;
              color:#323137;
              letter-spacing:0px;
              line-height:0.28rem;
              text-align:left;
            }
            .cn-notice{
              font-family:PingFangSC-Regular;
              font-size:0.2rem;
              color:#7e7e7e;
              letter-spacing:0.99px;
              text-align:left;
              margin: 0.12rem 0 0;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
        .button{
          flex: 150;
          background:#fb484a;
          width:1.30rem;
          height:100%;
          line-height:2rem;
          font-size: .32rem;
          color: #fff;
          text-align: center;
        }
      }
      .number-operation-warp{
        .number-operation{
          position: absolute;
          right: 0.35rem;
          top:1.54rem;
          font-size: 0;
          border: 1px solid #e4e4e4;
          border-radius: .06rem;
          >span{
            vertical-align: middle;
            display: inline-block;
            height: 0.42rem;
            width: .42rem;
            font-family:PingFangSC-Regular;
            font-size:0.3rem;
            color:#323137;
            letter-spacing:0px;
            text-align:center;

          }
          >span:nth-of-type(1){
            color: #b2b2b2;
            font-size: .42rem;
            line-height:0.36rem;
          }
          >span:nth-of-type(3){
            color: #fb4874;
            font-size: .42rem;
            line-height:0.36rem;
          }
          >span:nth-of-type(2){
            min-width: .7rem;
            border-right: 1px solid #e4e4e4;
            border-left: 1px solid #e4e4e4;
            position: relative;
          }
          .type_number {
            position: relative;
            >input{
              text-align: center;
              font-size: .3rem;
              color: #b2b2b2;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 22;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .all-select-warp{
    .check-img{
      width: 0.4rem;
      height: 0.4rem;
      .item-checkbox{
        z-index: 4;
        opacity: 0;
        &:checked~.not-checked{
          display: none;
        }
        &:checked~.is-checked{
          display: inline-block;
        }
      }
      .not-checked{
        z-index: 2;
      }
      .is-checked{
        z-index: 3;
        display: none;
      }
    }
    >.check-img>*{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>

