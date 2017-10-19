/*
*作者---杨彬
*
*/
<template>
  <div>
    <div class="product-select-warp">
      <div class="all-select-item" v-for="(citem,cindex) in thisGetData" v-if='del'>
        <div class="content-detail-warp">
          <div class="content-detail">
            <section class="check-img com-div-middle-ab">
              <input
                type="checkbox"
                name="thisItem" class="item-checkbox" v-model="checkedID" :value="cindex">
              <img src="../../assets/notCheck.png" class="not-checked">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC"
                   class="is-checked">
            </section>
            <img class="product-img" :src="citem.productImg">
            <img src="http://ovn5haih3.bkt.clouddn.com/FreeFre.png" alt="" style="width:0.6rem;position:absolute;top:0.3rem;left:1.6rem;" v-if="citem.isFreight=='1' || citem.groupType=='4'">
            <div class="item-money-warp"><span
              v-text="sData.productCarSData.moneySymbol" class="money-symbol"></span><span
              class="item-money" v-text="citem.price"></span></div>
            <!--<img class="item-delete" src="../../assets/productCar/car/delete.png">-->
            <section class="product-content">
              <p class="en-name" v-text="citem.productName"></p>
              <!--<p class="expain-type"><span class="type"-->
              <!--v-text="sData.productCarSData.size" v-if="cindex%2==0"></span><span class="type"-->
              <!--v-text="sData.productCarSData.weight" v-if="cindex%2!=0"></span><span-->
              <!--class="size" v-text="citem.size"></span></p>-->
              <div class="cn-notice" v-text="citem.digest"></div>
              <div class="cn-notice" v-if="citem.specificationId">已选：<span v-text="citem.specificationName" ></span></div>
              <p class="cn-name">￥<span>{{citem.price}}</span></p>
              <div class="number-operation-warp">
                <div class="number-operation com-div-middle-ab">
                  <!--<img src="../../assets/productCar/car/minus.png" @click="accountOperation(0,cindex)">-->
                  <span class="number-value" @click="accountOperation(0,cindex)">-</span>

                  <span class="number-value type_number">
                    <input type="number" v-model="citem.quantity" maxlength="4" :value='citem.quantity' max="4" @blur="check(citem.quantity,cindex)">
                  </span>
                  <span class="number-value" @click="accountOperation(1,cindex)">+</span>
                  <!--<img src="../../assets/productCar/car/add.png" @click="accountOperation(1,cindex)">-->
                </div>
              </div>
            </section>
          </div>
          <div class="button" @click="delProduct(citem,cindex)">删除</div>
        </div>
        <!--<div class="number-operation-warp">-->
        <!--<div class="number-operation com-div-middle-ab"><img-->
        <!--src="../../assets/productCar/car/minus.png" @click="accountOperation(0,cindex)"><span class="number-value" v-text="citem.number"></span><img-->
        <!--src="../../assets/productCar/car/add.png" @click="accountOperation(1,cindex)"></div>-->
        <!--</div>-->

      </div>
    </div>
    <footer class="product-car-foot">
      <div class="all-select-warp com-div-middle-re">
        <section class="check-img com-div-middle-ab"><input
          type="checkbox"
          v-model="isAllChecked" value="true"
          name="thisItem" class="item-checkbox"><img
          src="../../assets/notCheck.png"
          class="not-checked"><img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC"
          class="is-checked"></section>
        <span class="all-check-text" v-text="sData.productCarSData.allSelect"></span><span
        class="all-check-sum" v-text="sData.productCarSData.sumText"></span><span
        class="all-money-symbol" v-text="sData.productCarSData.moneySymbol"></span><span class="all-money"
                                                                                         v-text="sum"></span>
      </div>
      <div class="goAccount" v-text="sData.productCarSData.goAccount" @click="goSureOrder()"></div>
    </footer>
  </div>
</template>
<script type="text/javascript">

  export default {
    data(){
      return {
        type_sid:0,
        ischeck: false,
        del: false,
        thisGetData: [
          // {money:'2.02',enName:'华为Mate9 4GB+32GB版',number:1,
          //   notice:'仅限成都配送  餐具2套'},
          // {money:'0.40',enName:'Apple iPhone6s 32GB版',number:2,
          //   notice:'全国配送'},
          // {money:'0.35',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'仅限成都配送  餐具2套'},
          // {money:'1.95',enName:'Apple iPhone10s 32GB版e',number:1,
          //   notice:'仅限成都配送  餐具2套'},
          // {money:'1.62',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'全国配送'}, {money:'1.62',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'全国配送'}, {money:'1.62',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'全国配送'}, {money:'1.62',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'全国配送'}, {money:'1.62',enName:'Apple iPhone6s 32GB版',number:1,
          //   notice:'全国配送'},
          // {money:'8.71',enName:'Apple iPhone10s 32GB版',number:1,
          //   notice:'仅限成都配送  餐具2套'}
        ],
        allPrice: 0,
        sum: '0.00',
        checkedID: [],
        isAllChecked: [],
      }
    },
    props: ['sData'],
    methods: {
      check(val,i){
        if(val=='' || val<=0){
          this.thisGetData[i].quantity = 1;
        }
      },
      accountOperation(obool, oindex){
        var oflag = false;
        for (var i = 0; i < this.checkedID.length; i++) {
          if (this.checkedID[i] == oindex) {
            oflag = true;
          }
        }
        // if(oflag==false){
        //   return;
        // }
        if(this.thisGetData[oindex].groupType=='4'){
          this.thisGetData[oindex].quantity=1;
        }else{
          if (obool == 0) {
            if (this.thisGetData[oindex].quantity > 1) {
              this.thisGetData[oindex].quantity--;
            }
          }
          else {
            this.thisGetData[oindex].quantity++;
          }}
        this.postAjax(this.sData.url.updateCartUrl, {
          id: this.thisGetData[oindex].id,
          productId: this.thisGetData[oindex].productId,
          quantity: this.thisGetData[oindex].quantity,
          isChosen:[],
        }, (res) => {
          if (res.code == 200) {
          // window.location.reload()
        }
      else {
          m$.template({
            val: res.message,
            time: 800,
          })
        }
      })
        this.sum = 0;
        for (var i = 0; i < this.checkedID.length; i++) {
          this.sum += this.thisGetData[this.checkedID[i]].quantity * this.thisGetData[this.checkedID[i]].price
        }
        this.sum = this.sum.toFixed(2)
      },
      delProduct (citem, cindex) {
        var _this = this;
        m$.template({
          val: '删除中...',
          time: 600,
          fn: _this.postAjax(this.sData.url.deleteCartUrl, {id: citem.id}, (res) => {
            //删除成功后 获取购物车商品
            if (res.code == 200) {
          _this.del = false;
          _this.getProduct(10);
        }
      })
      })

      },
      getProduct (pageSize) {
        this.getAjax(this.sData.url.getCartVoUrl, {pageNum: '1', pageSize: pageSize}, (res) => {
          this.thisGetData = [];
        // console.log("获取商品成功")
        console.log(res.data)
        if (res.data.length) {
          for(var i=0;i<res.data.length;i++){
            res.data[i]['price']=(typeof res.data[i].bargainPrice=='number'?res.data[i].bargainPrice:(typeof res.data[i].promotionPrice=='number'?res.data[i].promotionPrice:res.data[i].oldPrice))
          }
          // console.log(res.data)
          this.thisGetData =res.data ;
          this.del = true;
        } else {
          m$.template({
            val: '暂无数据',
            time: 600,
            // fn(){
            //     window.location.href=('#/index')
            // }
          })
        }
      })
      },
      goSureOrder(){
        var obj = [];
        for (var i = 0; i < this.checkedID.length; i++) {
          obj.push(this.thisGetData[this.checkedID[i]]);
          obj[i].quantity=parseInt(obj[i].quantity)
        }
        if (obj && obj.length > 0) {
          // m$.localStrages.set('orderItemBeans',obj);
          // m$.localStrages.set('couponId','')
          // m$.localStrages.set('addressId','')
          // this.$router.push({name:'sureOrder'});
          m$.sessionStores.set("products", obj);
          window.location.href = (`#/sureOrder/-1`);
        }
      },
      modifyCar(){
        this.postAjax(this.sData.url.updateCartUrl, {}, (res) => {
          //删除成功后 获取购物车商品
          this.getProduct(10)
      })
      }
    },
    created(){
      var _this = this;
      m$.sessionStores.remove('ybpdmk');
      // m$.scroll(function () {
      //   _this.getProduct (20)
      // });
      document.title = this.sData.productCarSData.title;
      m$.documentTitle("购物车");
      this.getProduct(10)
    },
    watch: {
      'isAllChecked': function (val) {
        this.checkedID.splice(0, this.checkedID.length);
        if (val.length > 0) {
          for (var i = 0; i < this.thisGetData.length; i++) {
            this.checkedID.push(i)
          }
        }
        else {
          this.checkedID = [];
        }
      },
      'checkedID': function (val) {
        this.sum = 0;
        for (var i = 0; i < val.length; i++) {
          this.sum += this.thisGetData[val[i]].quantity * this.thisGetData[val[i]].price
        }
        this.sum = this.sum.toFixed(2);
        if (val.length == this.thisGetData.length) {

        }
      }
    }
  }
</script>
<style scoped lang="less">
  @import "productCar";
</style>
