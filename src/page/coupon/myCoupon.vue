/*
*作者---杨彬
*
*/
<template>
    <div>
        <coupon-nav></coupon-nav>
        <coupon-item :oitem="oitem" :oindex="oindex" :oid="oitem.id" @couponCkFn='conponItemClick'
                     v-for="(oitem,oindex) in allCouponData"
                     :key="oindex" v-if="allCouponData"></coupon-item>
    </div>
</template>
<script type="text/javascript">
    import  couponItem from 'src/components/coupon/couponItem.vue';
    import  couponNav from 'src/components/coupon/couponNav.vue';

    export default {
        data(){
            return {
                status: '',
                allCouponData: [],
                spage: 1,
                slength: 10
            }
        },
        methods: {
            conponItemClick(obj){
                this.allCouponData[obj[0]].status = 0;
                this.allCouponData[obj[0]].detailId = obj[1];
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
            getData(opage, olength){
                m$.template({
                    time: '',
                    val: ''
                });
              m$.scroll(function () {

              });
                this.getAjax(this.url.myCoupon, {
                    pageNum: this.spage,
                    pageSize: this.slength,
                    status: this.status
                }, (res)=> {
                    if (res.code == 200) {
                        if(res.data.length>=1){
                            m$.template({
                                time: 10,
                                val: ''
                            });
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
                        }
                        else {
                            m$.template({
                                time: 800,
                                val: '暂无数据'
                            });
                        }

                    }
                    else {
                        m$.template({
                            time: 1000,
                            val: res.message
                        });
                    }
                })

            }
        },
        created(){

            this.status = this.$route.params.id;
            this.getData();
            m$.documentTitle('我的优惠券')
            document.title = '我的优惠券';

        },
        watch: {
            '$route': function (val) {
                console.log(val)
                if (val.params.id != 3) {
                    this.status = val.params.id;
                    this.spage=1;
                    this.slength=10;
                  this.allCouponData=[];
                    this.getData();
                }
            }
        },
        components: {couponItem, couponNav}
    }
</script>
<style scoped lang="less">
</style>
