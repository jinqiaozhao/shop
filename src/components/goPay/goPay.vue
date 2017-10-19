/*
*作者---杨彬
*
*/
<template>
  <div>
    <header>
      <span class="title-text" v-text="sData.goPay.orderMoneyText"></span>
      <span class="price-warp com-div-middle-ab">
        <span class="symbol" v-text="sData.productCarSData.moneySymbol"></span>
        <span class="val">{{allPaidAmount}}</span>
      </span>
    </header>
    <section>
      <div class="div-pay"></div>
      <div class="item-pay" v-for="(gitem,ind) in sData.goPay.payWay" v-if="ind==0">
        <label class="com-div-middle-ab">
          <input type="radio" name="payWay" v-model='payType' :value='ind'>
          <img :src="hitem" v-for="(hitem,hindex) in sData.img.product" v-if="hindex==0">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABElJREFUWAnNWc1PU0EQn9lXP8ASPSCEJl6EozeDf4AHQ4EoKGg8GG/GEOIBgRATpYkXUionY2JMTNQDMVWBCGL8C4yJ8eIRjAdSQC8aigj2vXVmYWv7Plt4BTdp9mNmZ35vdndmdouwzSLjA40WynNS4kmQMiYRYighBohSglykdobaGep+FBKncHZ0fjuqsJxJsjNRl/v9qxfA6gQJJ8qZCwifAcRE5GD1fZxIfCt1bkkAZXciaq1kb0qAfvpFSxXuxkcKs/RLiaP1KXw2sOrGUzgWCDDXNngeLPlASllfOHGnbURcBoE9kZnkKz9ZwotIgNBs6R8G03oRNjjWqWSSbDM+cId1eeFwJcjusSpzZfEJbfZur4lhjiNg2qhpuIrpvjW7XIcFleWymae7BY4BsS5lEBdLOgBayuTQZf+SSvcZpNU6eNuup2iJ1YHgPQfkFPagkFIJhugqPDh5IOxKzOzqXCUORDnfyqfbqK1r1C4ov8TKz4XsSsoBpnnZQNb35X7dVxaUZ2/Vmxsbczt1wlpoUE1WWqA9t0gL2uzGS6CyRlW0kSOOsmBu40/vroEDHDfgWNO+2dQpRLjmBpCxbIZUCo6KAWWHG2PYY+Tvxo2a5is4e2OdZRvR6Li3Dor3VARnJWUHfm+pnpQ8uPRFUzPRoWzTbUdNyYhsGzouOGVyEEMecAP3Jz50mtQ89lNlyVyHUPmcH9cOaV7gEMzXdGKr/cQzNsHJph8TJZ3vwTBahIDrpOynL6+N6A0uNx0ETokibBHOhGkPepbIAeMyTo58ZQbZPvjJzME7chGHPSdsEbzBseWgKmg+0yVgg1Bpuh/3upXTZJxOfjAieCbIkv7g/JdV6+Ka3FBM8B2icNDeNqV8RGFwvx4PAhkWOK1PKI+uey410VvIHbwsBWTY4GgrZHiJMy64ioZoQ7cHgQwbHAOgkJfhJQ4EyMwBIB+qCFHghNnPleJKWLZnQVhEs7W/z7LgnieTjUCBftqIHrqA6cSGjZTvhgKOpJH1+gRfqvOSS2i4WbJwWljgWKYwjCmhbvzqUl2oxr/tBTJMcHzRx5mRL1sJq5jwh+Sk/gM5ppxurmWgdcd7rkjNJqbNhJWeNMy17Px2ckJypj9o3kKYGZEjYeXMlQZTRR9QYod81ZEwwbFaOoij+v1ma4lpQ/JbCT9H7HEhDEuiti7vVfIA1S2K3krIkr6hr5L4lW4pe/SNjnXlAXKH76P0BQlu70Vh3ZG3qaIDS6CLC51ONOODzykG78q7jNZOoTJtzCYvEciiFSyyIDMzg3rIoQl6cqVrBY4fj2zgFB4v5WxJfiuhOkGf5LC017xyxnnP8bKKN8m7buB8AWpFFXzAXKIMpMe+57ReXTuWWBN0zQeH30qIMUFfnNXj261ZhkAcJplNQeBYR1lL998+ortZy/E3BF1w+A7BvJwJI7+96L8hMDLJgd9NTtDYX/gyNp1/17ZyAAAAAElFTkSuQmCC">
        </label>
        <img :src="gitem.src">
        <span v-text="gitem.name"></span>
        <!--<span v-text="te"></span>-->
      </div>
    </section>
    <footer>
      <button type="button" v-text="sData.goPay.submitText" @click="isWeixinJSBridge"></button>
    </footer>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ['sData'],
    data(){
      return {
        payInfo: [],
        allPaidAmount: 0,
        payType: 0,
        te: '',
        registerUrl:''
      }
    },
    methods: {
      getRegisterUrl(){
        this.getAjax(this.url.getWxUserAuthUrl,{},(res)=>{
          if(res.code==200){
            this.registerUrl = res.data
          }
        })
      },
      wxPay(){
        var dtos = JSON.stringify(this.payInfo);
        var _this = this;
        var openid=window.location.href.split('?')[1];
        this.postAjax(this.url.payWeixin+'?'+openid, dtos, (res) => {
          if (res.code == 200) {
            // _this.te = res.data;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": res.data.appId,     //公众号名称，由商户传入
                "timeStamp": res.data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": res.data.nonceStr, //随机串
                "package": res.data.package,
                "signType": "MD5",         //微信签名方式：
                "paySign": res.data.paySign //微信签名
              }, function (rese) {
                if (rese.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  m$.localStrages.remove(['payInfo']);
                  _this.$router.replace('/paySuccess')
                } else if (rese.err_msg == "get_brand_wcpay_request:fail") {
                  m$.template({
                    val: '支付失败',
                    time: 1000,
                    fn(){
                      _this.$router.replace('/orderList/0')
                    }
                  })
                } else if (rese.err_msg == "get_brand_wcpay_request:cancel") {
                  m$.template({
                    val: '取消支付',
                    time: 1000,
                    fn(){
                      _this.$router.replace('/orderList/0')
                    }
                  })
                }
              }
            );
          } else if(res.code==206){
            m$.template({
              val: res.message,
              time: 1000,
              fn(){
                window.location.href = _this.registerUrl
              }
            })
          }else {
            m$.template({
              val: res.message,
              time: 1000,
              fn(){

              }
            })
          }
        })
      },
      isWeixinJSBridge(){
        var _this = this;
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', _this.wxPay, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', _this.wxPay);
            document.attachEvent('onWeixinJSBridgeReady', _this.wxPay);
          }
        } else {
          _this.wxPay();
        }
      },
      goPay(){
        //测试支付，并没有调用
        if (this.payType == null) {
          m$.template({
            val: '请选择<br>支付方式',
            time: 500
          });
        } else if (this.payType == 0) {
          //weixin
          var othis = this;
          var dtos = JSON.stringify(this.payInfo);
          this.$http.post(myUrl + this.sData.url.testPay, dtos).then(function (res) {
            if (res.data.code == 200) {
              m$.template({
                val: '',
                time: 500,
                fn(){
                  //m$.localStrages.remove(['payInfo']);
                  othis.$router.replace('/paySuccess')

                }
              });
            } else {
              m$.template({
                val: res.data.message,
                time: 500
              });
            }
          })
        } else if (this.payType == 1) {
          m$.template({
            val: '暂不支持<br>支付宝支付',
            time: 500
          });
        }
      },

    },
    created(){
        this.getRegisterUrl();
      m$.documentTitle("确认支付");
      this.payInfo = m$.localStrages.get('payInfo');
      for (var i = 0; i < this.payInfo.length; i++) {
        this.allPaidAmount += this.payInfo[i].paidAmount
      }
    },
  }
</script>
<style scoped lang="less">
  @import "goPay";
</style>
