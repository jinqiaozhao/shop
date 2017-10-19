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
            <div style="font-size:0.2rem; position:absolute; bottom:0.7rem;left:3.6rem;" v-if="oitem.amount">
              <p><span style="color:#fb4874;">￥</span> <span v-text="oitem.amount" style=" background: -webkit-linear-gradient(left, #FF7194 , #fb4874);-webkit-background-clip:text;-webkit-text-fill-color: transparent;
              font-size:0.45rem;font-weight:bold;"></span></p>
              <p ><span>满</span><span v-text="oitem.useAmount"></span>元可用</p>
            </div>
            <div class="com-div-middle-ab"
                 :class="(oitem.status==0||oitem.status==-1?'can':(oitem.status==1)?'used':(oitem.status==2?'outTime':''))">
              <p class="name" v-text="oitem.couponName"></p>
              <!--<p class='time' v-text="oitem.gmtStart+'-'+oitem.gmtEnd"></p>-->
              <p class='time' v-text="oitem.gmtEnd+' 到期'"></p>
              <p class="canTye" v-text="oitem.useIntro" style=""></p>
            </div>

          </div>
          <router-link class="click" tag="div" :to="'/couponDetail/'+oid" v-if="oitem.status!=-1 &&oitem.businessTypeId=='5'">

          </router-link>
          <router-link class="clicks" tag="div" :to="'/decorateMsg/'+oitem.id"
                       v-if="oitem.status==-1&&oitem.isDecorate==true">
          </router-link>
          <div class="click" @click="conponClick(oitem,oindex)" v-if="oitem.status==-1&&oitem.isDecorate==false">
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
      }
    },
    props: ['oitem', 'oindex', 'oid'],
    methods: {
      conponClick(obj, sindex){
        if(obj){
          let othis = this;
          this.getAjax(this.url.getCoupon, {id: obj.id}, (res) => {
            if (res.code == 200) {
            console.log(res.data)
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
        }else{
          console.log(obj,sindex);
          console.log(this.thisData[sindex.status])
          return;

        }

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
          display: flex;
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
            flex: 530;
            padding-left: 0.9rem;
            height: 100%;
            position: relative;
            > .can {
              .name {
                color: #fb4874;;
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
                font-family: PingFangSC-Regular;
                font-size: 0.32rem;
                letter-spacing: 0px;
                line-height: 100%;
                text-align: left;
              }
              .time {
                font-family: PingFangSC-Regular;
                font-size: 0.22rem;
                letter-spacing: 0px;
                margin: 0.14rem 0 0.3rem;
                line-height: 100%;
                text-align: left;
              }
              .canTye {
                font-family: PingFangSC-Regular;
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
            flex: 160;
            height: 100%;
            font-size: 0.2rem;
          }
        }

      }

    }
  }

</style>
