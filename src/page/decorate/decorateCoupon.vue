/*
*作者---杨彬
*
*/
<template>
	
    <div>  
    	 <!--<coupon-item :oitem="oitem" :oindex="oindex" :oid="oitem.detailId" @couponCkFn='conponItemClick'-->
                     <!--v-for="(oitem,oindex) in allCouponData"-->
                     <!--:key="oindex" v-if="allCouponData&&oitem.isDecorate==true">-->
        <coupon-item :oitem="oitem" :oindex="oindex" :oid="oitem.id" @couponCkFn='conponItemClick'
                     v-for="(oitem,oindex) in allCouponData"
                     :key="oindex" v-if="allCouponData&&oitem.isDecorate==true"></coupon-item>    
    	<div id="link-page" v-show="show" style="{height: 100%;}">
    		<img src="../../assets/decorate/link_page.png" alt="" />
    		<img src="../../assets/decorate/close_w.png" alt="" class="close" @click="close"/>
    	</div>
    </div>
</template>
<script type="text/javascript">
    import  couponItem from 'src/components/coupon/couponItem.vue';
    import {coupon} from 'src/assets/statusData.js';
    export default {
        data(){
            return {
            	show:true,
            	height_b:document.documentElement.clientHeight,
                kind: 2,
                status: 3,
                coupon: coupon,
                allCouponData: [],
                spage: 1,
                slength: 10
            }
        },
        components: {couponItem},
        mounted(){
        	//var link= document.getElementById('link-page');
            //console.log(this.height_b);
           // link.style.height=this.height_b+'px';
            if(sessionStorage.cou_pagecount){sessionStorage.cou_pagecount=Number(sessionStorage.cou_pagecount)+1; this.show=false;}else{sessionStorage.cou_pagecount=1;}       	
        },
        methods: {
        	close(){this.show=false;},
            conponItemClick(obj){
                this.allCouponData[obj[0]].status = 0;
                this.allCouponData[obj[0]].detailId = obj[1];
            },
            getData(opage, olength){
              m$.scroll(function () {

              })
                //this.getAjax(this.url.couponCenter, {pageNum: this.spage, pageSize: this.slength,onlyDcr:true}, (res)=> {
                	this.getAjax(this.url.myCoupon, {pageNum: this.spage, pageSize: this.slength,onlyDcr:true}, (res)=> {
                    if (res.code == 200) {
                        var kArry = [];
                        console.log(res.data)
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].isDecorate == true) {
                                kArry.push(res.data[i])
                            }

                        }
                        if(kArry.length==0){
                            m$.template({
                                val:'暂无数据',
                                time:1200
                            })
                        }
                        else {
                            var othis=this;
                          for (var i=0;i<kArry.length;i++){
                            othis.allCouponData.push(kArry[i]);
                            m$.scroll(function () {
                              if(othis.allCouponData.length%10<=0){
                                othis.spage++
                                othis.getData()
                              }
                              else {}
                            })
                          }
                        }

                    }
                })

            }
        },
        created(){
            this.getData();
            m$.documentTitle("领取装修优惠券");
            document.title = '领取装修优惠券';
           

        }
    }
</script>
<style scoped lang="less">

	#link-page{
		z-index: 100;
		position:fixed;
		top:0;
		bottom:0;
		width:100%;
		height:100%;
		background: rgba(0,0,0,0.3);
		padding:80px 50px 120px 50px;
		box-sizing: border-box;
		img{width:100%;opacity: 1;}
		.close{
			position:absolute;
			bottom:50px;
			left:45%;
			width:32px;
		}
	}
</style>
