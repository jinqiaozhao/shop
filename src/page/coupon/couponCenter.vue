/*
*作者---杨彬
*
*/
<template>
  <div>
    <coupon-item :oitem="oitem" :oindex="oindex" :oid="oitem.detailId" @couponCkFn='conponItemClick'
                 v-for="(oitem,oindex) in allCouponData"
                 :key="oindex" v-if="allCouponData">
    </coupon-item>
  </div>
</template>
<script type="text/javascript">
  import  couponItem from 'src/components/coupon/couponItem.vue';
  import {coupon} from 'src/assets/statusData.js';
  export default {
    data(){
      return {
        kind: 2,
        status: 3,
        coupon: coupon,
        allCouponData: [],
        spage:1,
        slength:10
      }
    },
    components: {couponItem},
    methods: {
      conponItemClick(obj){
        this.allCouponData[obj[0]].status = 0;
        this.allCouponData[obj[0]].detailId = obj[1];
      },
      getData(opage, olength){
        m$.scroll(function () {

        });
        this.getAjax(this.url.couponCenter,{pageNum:this.spage,pageSize:this.slength},(res)=> {
          if(res.code==200){
          for (var i=0;i<res.data.length;i++){
            this.allCouponData.push(res.data[i]);
            var othis=this;
            m$.scroll(function () {
              if(othis.allCouponData.length%10<=0){
                othis.spage++;
                othis.getData()
              }
              else {}
            })
          }
          this.allCouponData=this.unique5(this.allCouponData)
        }else {
          m$.template({
            val:'暂无数据',
            time:1000,
            // fn(){
            //     window.location.href=('#/index')
            // }
          })
        }
      })

      }
      ,unique5(array){
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
      this.getData();
      document.title = '领券中心';

    }
  }
</script>
<style scoped lang="less">

</style>
