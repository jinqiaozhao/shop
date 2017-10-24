/*
*作者---杨彬
*
*/
<template>
  <div >
    <div style="margin-bottom:1.24rem;position:relative;">
      <div class="product-select-warp" v-for="(citemb,cindex) in thisGetData" style="position:relative;margin-bottom:0.1rem;">
        <!--商户-->
        <div style="width:100%;height:40px;background:#fff;padding:0.1rem 0.2rem;">
          <div style="border-bottom:1px solid #ccc;position:absolute;top:40px;width: 95%;">
          </div>
          <section class="check-img com-div-middle-ab" style="position:absolute;top:20px;">
            <input
              type="checkbox"
              name="thisItem" class="item-checkbox" v-model="checkedBussID" :value="citemb" >
            <img src="../../assets/notCheck.png" class="not-checked"  v-show="!isAll">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC"
                 class="is-checked" >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC"
                  v-show="isAll ">
          </section>
          <img src="../../assets/homeGrey.png" alt="" style="position:absolute;top:3px;left:0.7rem;width: 0.7rem;">
          <div style="font-size: 0.25rem;position:absolute;top:15px;left:1.5rem;" v-text="citemb.businessName">宝宝余</div>

        </div>
        <!--商品-->
        <div class="all-select-item"  v-if='del'v-for="(citem,cindex) in citemb.items">
          <div class="content-detail-warp">
            <div class="content-detail">
              <section class="check-img com-div-middle-ab">
                <input
                  type="checkbox"
                  name="thisItem" class="item-checkbox" v-model="checkedID" :value="citem">
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
                <p class="cn-name">￥<span>{{citem.bargainPrice?citem.bargainPrice:citem.promotionPrice}}</span></p>
                <div class="number-operation-warp">
                  <div class="number-operation com-div-middle-ab">
                    <!--<img src="../../assets/productCar/car/minus.png" @click="accountOperation(0,cindex)">-->
                    <span class="number-value" @click="accountOperation(0,cindex,citem)">-</span>
                    <span class="number-value type_number">
                    <input type="number" v-model="citem.quantity" maxlength="4" :value='citem.quantity' max="4" @blur="check(citem.quantity,cindex)">
                  </span>
                    <span class="number-value" @click="accountOperation(1,cindex,citem)">+</span>
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
    </div>
    <footer class="product-car-foot">
      <div class="all-select-warp com-div-middle-re">
        <!--<section class="check-img com-div-middle-ab"><input-->
        <!--type="checkbox"-->
        <!--v-model="isAllChecked" value="true"-->
        <!--name="thisItem" class="item-checkbox"><img-->
        <!--src="../../assets/notCheck.png"-->
        <!--class="not-checked"><img-->
        <!--src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC"-->
        <!--class="is-checked"></section>-->
        <!--<span class="all-check-text" v-text="sData.productCarSData.allSelect"></span>-->
        <span
          class="all-check-sum" v-text="sData.productCarSData.sumText" style="margin-left:0.05rem;"></span><span
        class="all-money-symbol" v-text="sData.productCarSData.moneySymbol"></span>
        <span class="all-money" v-text="sum"></span>
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
        proData:[],
        thisGetData: [
        ],
        allPrice: 0,
        sum: '0.00',
        checkedID: [],
        checkedBussID:[],
        isAllChecked: [],
        isAll:false,
        WhoCheck:[],
      }
    },
    props: ['sData'],
    methods: {
      check(val,i){
        if(val=='' || val<=0){
          this.thisGetData[i].quantity = 1;
        }
      },
      accountOperation(obool, oindex,citem){
        // return;
        var oflag = false;
        for (var i = 0; i < this.checkedID.length; i++)   {
          if (this.checkedID[i].id == citem.id) {
            oflag = true;
          }
        }
        // if(oflag==false){
        //   return;
        // }
        if(citem.groupType=='4'){
          citem.quantity=1;
        }else{
          if (obool == 0) {
            if (citem.quantity > 1) {
              citem.quantity--;
            }
          }
          else {
            citem.quantity++;
          }}
        this.postAjax(this.sData.url.updateCartUrl, {
          id: citem.id,
          productId: citem.productId,
          quantity: citem.quantity,
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
          this.sum += this.checkedID[i].quantity * this.checkedID[i].price
          //this.sum += citem[this.checkedID[i]].quantity * citem[this.checkedID[i]].price 原有使用下标逻辑
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
        if (res.data.length) {
          for(var i=0;i<res.data.length;i++){
            for(var j=0;j<res.data[i].items.length;j++){
              res.data[i].items[j]['price']=(typeof res.data[i].items[j].bargainPrice=='number'?res.data[i].items[j].bargainPrice:(typeof res.data[i].items[j].promotionPrice=='number'?res.data[i].items[j].promotionPrice:res.data[i].items[j].oldPrice))
              this.proData.push(res.data[i].items[j])
            }
            // res.data[i]['price']=(typeof res.data[i].bargainPrice=='number'?res.data[i].bargainPrice:(typeof res.data[i].promotionPrice=='number'?res.data[i].promotionPrice:res.data[i].oldPrice))
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
        var j=1;
        for (var i = 0; i < this.checkedID.length; i++) {

          //obj.push(this.thisGetData[this.checkedID[i]]);
//          console.log(this.checkedID)
//          return;
          obj=this.checkedID;
          obj[i].quantity=parseInt(obj[i].quantity);
          if(obj.length>1){
            if(j>=this.checkedID.length){j=this.checkedID.length-1}
            if(obj[i].businessId!=obj[j].businessId ){
              m$.template({
                val: '不同商家产品</br>请单独下单',
                time: 700,
                // fn(){
                //     window.location.href=('#/index')
                // }
              })
              return;
            }else{
            }
          }else{
          }
          j++;
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
          for(var i = 0; i < this.thisGetData.length; i++){
            this.checkedBussID.push(this.thisGetData[i])
          }
//          for (var i = 0; i < this.proData.length; i++) {
//            this.checkedID.push(this.proData[i].id)
//          }
        }
        else {
          // this.checkedID = [];
          this.checkedBussID=[];
        }
      },
      'checkedID': function (val) {
        var checked=[];
        // return;
        this.sum = 0;
        for (var i = 0; i < val.length; i++) {
          //this.sum += this.thisGetData[val[i]].quantity * this.thisGetData[val[i]].price
          this.sum += val[i].quantity* val[i].price;
          }
        this.sum = this.sum.toFixed(2);
//        if(val.length == this.proData.length){
//          this.isAll=true;
//        }else{this.isAll=false;}
        if(val.length==0){
        }
      },
      'checkedBussID':function(val){
        //  return;
        this.checkedID = [];
        for(var i=0;i<val.length;i++){
          for(var j=0;j<val[i].items.length;j++){
            this.checkedID.push(val[i].items[j])
          }
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .product-select-warp{
    background:rgba(0,0,0,0.10);
    //margin-bottom: 1.24rem;
    .all-select-item{
      box-sizing: border-box;
      background-color: #ffffff;
      padding-left: 0.2rem;
      overflow: scroll;
      &:last-of-type{
        border-bottom:none;
      }
      .content-detail-warp{
        font-size: 1rem;
        width: 8.8rem;
        height: 2.08rem;
        display: -webkit-flex;
        .content-detail{
          flex: 750;
          position: relative;
          min-height: 1.48rem;
          _height:1.48rem;
          font-size: 0;
          .product-img{
            width: 1.48rem ;
            position: absolute;
            top: .32rem;
            left: 0.65rem;
            height:1.48rem;
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
            margin-left: 2.3rem;
            display: inline-block;
            >p{
              margin: 0.06rem 0;
            }
            .en-name{
              font-family:PingFangSC-Regular;
              font-size:0.26rem;
              color:#323137;
              letter-spacing:0px;
              // line-height:0.26rem;
              text-align:left;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .cn-name{
              font-family:PingFangSC-Regular;
              font-size: 0.24rem;
              color:#fb4874;
              letter-spacing:0px;
              line-height:0.28rem;
              text-align:left;
              margin-top: .2rem;
              >span{
                font-size: .32rem;
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
              line-height:0.2rem;
              text-align:left;
              margin: 0.12rem 0 0;
              //overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
        .button{
          flex: 130;
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
  .check-img{
    width: 0.42rem;
    height: 0.42rem;
    padding: .01rem;
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
  .check-img>*{
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0;
    left: 0;
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
</style>
