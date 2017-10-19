/*
*作者---杨彬
*
*/
<template>
    <div class="address-warp">
        <div class="p-msg">
            <span class="name" v-text="sitem.consignee"></span>
            <span class="tel" v-text="sitem.phone"></span>
        </div>
        <p class="d-mag" v-text="sitem.provinceName+sitem.cityName+sitem.districtName+sitem.detailAddress" @click="gocar(sitem)"></p>
        <section>
            <div class="checked-warp">
                <input type="radio" name='address' class="com-div-middle-ab"
                       v-model='itemRadio' :value="sitem.id" @click="goCheckRadio(sitem.id)">
                <div class="one"><img src="../../assets/address/notChecked.png" class=""><span>设为默认</span></div>
                <div class="two"><img src="../../assets/address/checked.png" class=""><span>默认地址</span></div>
            </div>
            <div class="operation-warp">
               <div class="one" @click="clickDelete(sitem,sindex)"><img src="../../assets/address/delete.png"><span>删除</span></div>
               <router-link tag="div" class="two" :to="'/addressMsg/'+sitem.id"
               ><img src="../../assets/address/edit.png"><span>编辑</span></router-link>
            </div>
        </section>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
          return{
              itemRadio:'',
          }
        },
        props:['sitem','sindex'],
        watch:{
        },
        methods:{
            clickDelete(oitem,oindex){
                this.$emit('clickDelete',[oitem,oindex])
            },
            goCheckRadio(oid){
                // console.log(this.itemRadio)
                this.postAjax(this.url.updateReceiver,{id:oid,isDefault:1},(res)=>{

                })
            },
            gocar(sitem){
                if(this.$route.params.type==1){
                    window.location.href=(`#/sureOrder/${sitem.id}`);

                } else {

                }

            }
        },
        created(){
            if(this.sitem.isDefault==1){
                this.itemRadio=this.sitem.id;
            }
        }

    }
    </script>
<style scoped lang="less">
    .address-warp{
        background-color: #ffffff;
        padding-top:0.15rem;
        margin-bottom: 0.2rem;

        >div{
            font-size: 0px;
            height: 0.62rem;
            line-height: 0.62rem;
            padding: 0 0.2rem;
            >*{
                display: inline-block;
                font-family:PingFangSC-Regular;
                font-size:0.32rem;
                color:#222222;
                letter-spacing:0px;
            }
            .name{
                    width: 1.64rem;
            }

        }
        >p{
            font-family:PingFangSC-Regular;
            padding: 0 0.2rem;
            font-size:0.28rem;
            color:#a0a0a0;
            letter-spacing:0px;
            line-height:0.34rem;
            margin-bottom: 0.3rem;
        }
        >section{
            height: 0.9rem;
            border-top: 1px dashed #e3e3e3;
            padding: 0 0.2rem;
            display: flex;
            position: relative;
            >div{
                flex: 1;
                position: relative;
            }
            .operation-warp{
                text-align: right;
                line-height: 0.9rem;
                position: relative;
                font-size: 0;
                .two{
                    margin-left: 0.6rem;
                }
                >div{
                    display: inline-block;
                    font-family:PingFangSC-Regular;
                    font-size: 0;
                    color:#787878;
                    text-align:center;
                    >*{
                        vertical-align: middle;

                    }
                    img{
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                    span{
                        margin-left:0.1rem ;
                        font-family:PingFangSC-Regular;
                        font-size:0.26rem;
                        color:#787878;
                        letter-spacing:0.72px;
                        text-align:center;
                    }

                }
            }
            .checked-warp{
                text-align: left;
                line-height: 0.9rem;
                position: relative;
                font-size: 0;
                >input{
                    left: 0;
                    z-index: 3;
                    height: 0.4rem;
                    height: 0.4rem;
                    opacity: 0;

                }
                >input:checked~.one{

                    display: none;
                }>input:checked~.two{
                    display: inline-block;
                }
                .one{
                display: inline-block;
                }
                .two{
                    display: none;
                }
                >div{
                    display: inline-block;
                    font-family:PingFangSC-Regular;
                    font-size: 0;
                    color:#787878;
                    letter-spacing:0.72px;
                    text-align:center;
                    >*{
                        vertical-align: middle;

                    }
                    img{
                        width: 0.4rem;
                        height: 0.4rem;
                    }
                    span{
                        margin-left:0.1rem ;
                        font-family:PingFangSC-Regular;
                        font-size:0.26rem;
                        color:#787878;
                        letter-spacing:0.72px;
                        text-align:center;
                    }

                }

            }
        }
    }
</style>
