<template>
  <div class="box">
    <div class="background-t" style="height: 100%;width: 100%;background-color:#E5E5E5;position: fixed;z-index: -1;"></div>
    <div class="alt">
      <div class="alt-img"><img :src="thumbnail"/></div>
      <div class="kvp">
        <tr><td style="color: #000;">物流信息</td><td style="color:#1FB428;">{{indent.status}}</td></tr>
        <tr><td>承运来源 :</td><td>{{indent.shippingMethod}}</td></tr>
        <tr><td>运单编号 :</td><td>{{indent.shippingSn}}</td></tr>
        <tr><td>官方电话 :</td><td>暂无</td></tr>
      </div>
    </div>
    <div style="width: 100%;height: .8rem;font-size: .27rem;line-height: .8rem;padding-left: .2rem;background-color: #FFF;margin: .2rem 0 1px 0;">本数据由<span style="color: #1588EF;">菜鸟裹裹</span>提供</div>
    <div class="logistics-refer">
      <div class="refer" v-for="i in order">
        <div class="refer-index">●</div>
        <div class="refer-in">
          <div class="key">{{i.AcceptStation}}</div>
          <div class="value">{{i.AcceptTime}}</div>
        </div>
      </div>
      <div class="logistics-left"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["sData"],
    data(){
      return {
        indent:'',
        order:[],
        thumbnail:'',
      }
    },
    created(){
      this.orderDetailsUrl()
    },
    methods:{
      getLogisticsMessage(){
        this.postAjax(this.url.getLogisticsMessage,{
          orderId:        this.$route.params.id,
          shippingMethod: this.indent.shippingMethod,
          shippingSn:     this.indent.shippingSn
        },(res)=>{
          if(res.code==200){
            this.order = res.data;
            var n = res.data.split('AcceptTime').length-1
            for(var i=0;i<n*2;i++){
              this.order = this.order.replace('=','":"')
              this.order = this.order.replace('{A','{"A')
              this.order = this.order.replace(', A','", "A')
              this.order = this.order.replace('}, ','"},')
            }
            this.order = this.order.replace('}]','"}]')
            this.order = eval("("+this.order+")").reverse()
            console.log(this.order)
          }
        })
      },
      orderDetailsUrl(){
        this.postAjax(this.sData.url.orderDetailsUrl,{orderId:this.$route.params.id},(res)=>{
          if(res.code==200){
            this.indent = res.data
            console.log(this.indent)
            if(res.data.status==2){this.indent.status='未签收'}
            else if(res.data.status==3){this.indent.status='已签收'}
            else if(res.data.status==1){this.indent.status='未发货'}
            this.thumbnail = res.data.items[0].thumbnail;
            this.getLogisticsMessage()
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .logistics-left{
    position: absolute;top: .45rem;left: .48rem;
    height: 100%;
    width: 1px;
    border-left: 1px solid #E5E5E5;
  }
  .logistics-refer{
    background-color: #FFF;
    position: relative;
  }
  .refer{
    padding: .1rem 0 .1rem 0;
    background-color: #FFF;
    .refer-in{
      color: #787878;
      margin-left: 1rem;
      border-bottom: 1px solid #6E6E6E;
      font-size: .3rem;
    }
    .key{font-size: .26rem;margin-bottom: .15rem;}
    .value{font-size:.2rem ;margin-bottom: .15rem;}
  }
  .refer:first-child{
    .refer-in{color: #26AD5F;}
    .refer-index{font-size: .4rem;margin-left: .36rem;color: #26AD5F;}
  }
  .refer-index{
    margin-left: .4rem;
    font-size: .25rem;
    float: left;
    color: #E5E5E5;
  }
  .refer-index:after{content: '';display: block;clear: both;}
  .alt{
    background-color: #FFF;
    padding: .3rem;
    .alt-img{
      padding: 0.1rem;
      float: left;
      width: 2.2rem;height: 2.2rem;
      border: 1px solid #BFBFBF;
      border-radius: 3px;
      img{
        width: 2rem;height: 2rem;
        border: 1px solid #BFBFBF;
      }
    }
  }
  .alt:after{
    content: '';
    display: block;
    clear: both;
  }
  .kvp{
    margin: .55rem 0 0 .25rem;
    float: left;
    font-size: .3rem;
    td{
      color: #7E7E7E;
    }
  }
</style>
