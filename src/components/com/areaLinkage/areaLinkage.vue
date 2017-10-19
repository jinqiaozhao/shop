/*
*作者---杨彬
*
*/
<template>
    <div class="areaLinkage-warp">

      <div class="areaLinkage">
        <div class="area-name">请选择地区 <img class="com-div-middle-ab" src="../../../assets/address/maskClose.png"
        @click="closeAreaAlert()" v-if="!districtid"><span class="sureAlert com-div-middle-ab" v-if="districtid" @click="closeAreaAlert2()">确定</span></div>
        <div class="area-list">
          <div class="item-list">
            <div class="item-name" :class="{'comBorder':areastatus==='0'}">{{province.name?province.name:province.title}}
              <!--//<input type="radio" v-model="areastatus"  value="0"  name="area">-->

            </div>
            <ul>
              <li v-for="(pitem,pindex) in province.val" :class="{'grayColor':provinceid==pitem.code}">{{pitem.name}}<input type="radio"  v-model="provinceid" @click="areaFnClick('p',pitem.code,pitem.name)"
                                                                                                                            name="province" :value="pitem.code"></li>
            </ul>
          </div>
          <div class="item-list">
            <div class="item-name" :class="{'comBorder':areastatus==='1'}">{{city.name?city.name:city.title}}
              <!--<input type="radio" v-model="areastatus"  value="1" name="area">-->
            </div>
            <ul>
              <li v-for="(citem,cindex) in city.val" :class="{'grayColor':cityid==citem.code}">{{citem.name}}<input type="radio"  v-model="cityid" @click="areaFnClick('c',citem.code,citem.name)"
                                                                                                                    name="city" :value="citem.code"></li>
            </ul>
          </div>
          <div class="item-list">
            <div class="item-name" :class="{'comBorder':areastatus==='2'}"
                 >{{district.name?district.name:district.title}}
              <!--<input type="radio" v-model="areastatus" value="2"  name="area">-->
            </div>
            <ul>
              <li v-for="(ditem,dindex) in district.val" :class="{'grayColor':districtid==ditem.code}">{{ditem.name}}
                <input type="radio"  v-model="districtid" @click="areaFnClick('d',ditem.code,ditem.name)" name="district" :value="ditem.code">
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
</template>
<script type="text/javascript">
  export default {
      data(){
      return {

            province:{
              title:'省/直辖市',
              id:'',
              name:'',
              val:[]
            } ,
            city:{
              title:'市',
              id:'',
              name:'',
              val:[]
            },
            district:{
              title:'区/县',
              id:'',
              name:'',
              val:[]
            },
            areastatus:"0",
            provinceid:'',
            cityid:'',
            districtid:'',
      }
    },
      methods:{
        areaFnClick(otype,oid,oname){
          if(otype==='p'){
            this.province.name=oname;
            this.province.id=oid;
            this.provinceid=oid;
          }
          else if(otype==='c'){
            this.city.name=oname;
            this.city.id=oid;
            this.cityid=oid;
          }
            else {
            this.district.name=oname;
            this.district.id=oid;
            this.districtid=oid;
            this.closeAreaAlert2()
          }
        },
        initArea(num) {
          if(num==2){
            this.city = {
              title:'市',
              id:'',
              name:'',
              val:[]
            };
            this.cityid='';

          }
          this.district = {
            title:'区/县',
            id:'',
            name:'',
            val:[]
          };
          this.districtid='';
        },
        getProvinceData(){
          this.postAjax(this.url.getProvince,{},(res)=>{
            this.province.val=res.data;
          })
        },
        getCityData(){
          this.postAjax(this.url.getCity,{'provinceCode':this.provinceid},(res)=>{
            this.city.val=res.data;
          })
        },
        getDistrictData(){
          this.postAjax(this.url.getDistrict,{'cityCode':this.cityid},(res)=>{
            this.district.val=res.data;
          })
        },
        closeAreaAlert2(){
          let areaObj={
            province:'',
            city:'',
            district:'',
          };
          areaObj.province=this.province;
          areaObj.city=this.city;
          areaObj.district=this.district;
          this.$emit('upAreaMsg',areaObj)
        },
        closeAreaAlert(){
          this.$emit('upAreaMsg',false)
        }
      },
      watch:{
        'provinceid':function (val) {
          this.initArea(2);
          this.areastatus=(this.city.val.length==0&&this.district.val.length==0?'1':'2');
          this.getCityData();
        },
        'cityid':function (val) {
          this.initArea()
          this.areastatus=(this.city.val.length>0&&this.district.val.length==0?'2':'1');
          this.getDistrictData();
        },
        'districtid':function (val) {
        }
      },
      created(){
      this.postAjax(this.url.getProvince,{},(res)=>{
        this.province.val=res.data;
      })
    }
  }
</script>
<style scoped lang="less">
    @import "areaLinkage";
</style>
