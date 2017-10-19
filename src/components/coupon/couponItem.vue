/*
*作者---杨彬
*
*/
<template>
  <div class="coupon-warp">
    <div class="item-warp">
      <img :src="thisData[oitem.status+1]">
      <div>
        <div class="detail-warp">
          <!--<img class="type" :src="oitem.typeIcon" v-if="oitem.typeIcon">-->
          <div class="detail">
            <div style="position:absolute;top:20%;left:25%;">
              <p class="canTye"  v-if="oitem.amount" style="color:#fff;font-weight: bold;font-size:0.4rem;">￥<span  style="font-size:0.65rem;">{{oitem.amount}}</span> </p>
              <p class="canTye"  v-if="oitem.amount" style="margin-top:2px;color:#fff;margin-left:4px;font-size: .3rem"> <span>满<span v-text="oitem.useAmount"></span>可用</span></p>
            </div>
            <div class="com-div-middle-ab"
                 :class="(oitem.status==0||oitem.status==-1?'can':(oitem.status==1)?'used':(oitem.status==2?'outTime':''))" style="right:0;">
              <p class="name" v-text="oitem.couponName"></p>
            </div>
            <div v-if="oitem.useIntro" style="position:absolute;bottom:0;font-size:0.2rem;left:10px;"><p class="canTye" >使用规则：{{oitem.useIntro}}</p></div>
            <div style="position:absolute;bottom:0;font-size:0.2rem;right:10px;"><p class='' v-text="'使用期限：'+oitem.gmtStart+'-'+oitem.gmtEnd" ></p></div>
          </div>
          <!--<router-link class="click" tag="div" :to="'/couponDetail/'+oid" v-if="oitem.status!=-1">-->
          <!--查看详情-->
          <!--</router-link>-->
          <router-link  tag="div" :to="'/couponDetail/'+oid" v-if="oitem.status==0 && oitem.businessTypeId=='5'" style="position:absolute;font-size:0.2rem;right:0;top:0.15rem;bottom:0;color:#4E4E4E;font-family:'Microsoft YaHei';">
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </router-link>
          <router-link  tag="div" :to="'/index'" v-if="oitem.status==0 && oitem.businessTypeId!='5'" style="position:absolute;font-size:0.2rem;right:0;bottom:0;top:0.15rem;color:#4E4E4E;font-family:'Microsoft YaHei';">
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </router-link>
          <div  v-if="oitem.status==1" style="position:absolute;font-size:0.2rem;right:0;bottom:0;top:0.15rem;color:#4E4E4E;font-family:'Microsoft YaHei';">
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </div>
          <div  v-if="oitem.status==2" style="position:absolute;font-size:0.2rem;right:0;bottom:0;top:0.15rem;color:#4E4E4E;font-family:'Microsoft YaHei';">
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </div>
          <router-link tag="div" :to="'/decorateMsg/'+oitem.id"
                       v-if="oitem.status==-1&&oitem.isDecorate==true" style="position:absolute;font-size:0.2rem;top:0.15rem;right:0;bottom:0;color:#4E4E4E;">
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </router-link>
          <!--<div class="click" @click="conponClick(oitem,oindex)" v-if="oitem.status==-1&&oitem.isDecorate==false" style="color:#fb4874;">-->
          <!--点击领取-->
          <!--</div>-->
          <div  @click="conponClick(oitem,oindex)" v-if="oitem.status==-1&&oitem.isDecorate==false" style="position:absolute;top:0.15rem;font-size:0.2rem;right:0;bottom:0;color:#4E4E4E;font-family:'Microsoft YaHei';">
            <!--点击领取-->
            <img :src="thisDataIcon[oitem.status+1]" style="width:1.05rem;">
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {coupon} from 'src/assets/statusData.js';
  export default {
    data(){
      return {
        thisData: coupon.item,
        thisDataIcon: coupon.itemIcon,
      }
    },
    props: ['oitem', 'oindex', 'oid'],
    methods: {
      conponClick(obj, sindex){
        let othis = this;
        this.getAjax(this.url.getCoupon, {id: obj.id}, (res) => {
          if (res.code == 200) {
          m$.template({
            time: 800,
            val: okImgDiv,
            fn(){
              othis.$emit('couponCkFn', [sindex, res.data])
            }
          })
        }
      else {
          m$.template({
            time: 1200,
            val: res.message,
          })
        }
      })
      }
    },
    created(){
    }
  }
</script>
<style scoped lang="less">
  .coupon-warp {
    z-index: -1;
    text-align: center;
    font-size: 0;
    .item-warp {
      width: 7.1rem;
      height: 1.82rem;
      display: inline-block;
      margin: 0 auto;
      position: relative;
      margin-top: 0.28rem;
      &:first-of-type {
        margin-top: 0.4rem;
      }
      > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      > img {
        z-index: 1;
        position: absolute;
      }
      > div {
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 0.1rem 0.12rem 0;
        font-size: 0;
        .detail-warp {
          // display: flex;
          height: 1.7rem;
          position: relative;
          font-size: 0;
          .type {
            position: absolute;
            top: 0rem;
            left: 0.1rem;
            width: 0.62rem;
            height: 0.74rem;
          }
          .detail {
            //display: inline-block;
            //width: 53%;
            //   flex: 530;
            padding-left: 0.9rem;
            height: 100%;
            position: relative;
            > .can {
              position: absolute;
              top:.75rem;

              .name {
                color: #DD657B;
                font-weight:bold;
              }
              .time {
                color: #484848;
              }
              .canTye {
                color: #a0a0a0;
              }
            }
            > .used {
              .name {
                color: #a0a0a0;;
              }
              .time {
                color: #a0a0a0;
              }
              .canTye {
                color: #a0a0a0;
              }
            }
            > .outTime {
              .name {
                color: #bebebe;
              }
              .time {
                color: #bebebe;
              }
              .canTye {
                color: #bebebe;
              }
            }
            > div {

              .name {
                font-family: '黑体';
                margin-right: 1.4rem;
                font-size: 0.35rem;
                letter-spacing: 0px;
                line-height: 100%;
              }
              .time {
                font-family: '黑体';
                font-size: 0.22rem;
                letter-spacing: 0px;
                margin: 0.14rem 0 0.3rem;
                line-height: 100%;
                text-align: left;
              }
              .canTye {
                font-family: '黑体';
                font-size: 0.22rem;
                letter-spacing: 0px;
                line-height: 100%;
                text-align: left;
              }
            }

          }
          .click {
            /*display: inline-block;*/
            /*width: 16%;*/
            // flex: 160;
            height: 100%;
            font-size: 0.2rem;
          }
        }

      }

    }
  }

</style>
