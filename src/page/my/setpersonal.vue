<template>
  <div class="box" style="height: 7.5rem;padding-top: .2rem;">
    <div class="box-ba"></div>
    <div v-if='index == 2' class="name">
      <input value="" v-model='User.userName' /><img @click='emptyName' class="name-img" src="http://ovn5haih3.bkt.clouddn.com/padlock.png" />
    </div>
    <div v-if='index == 2' class="d-span"><span>4-20个字符，可由中英文，数字组成。</span></div>
    <input v-if='index == 2' @click='present' type="button" value="确定" class="buttom-ok"/>
    <div v-if='index == 3' class="gender">
      <div class="genders" @click='selectSEX(1)'>男<div class="gen" v-bind:class="{ 'spanclass': isActive==1 }"></div><img class="gender-img" src="http://ovn5haih3.bkt.clouddn.com/check.png"></div>
      <div class="genders" @click='selectSEX(2)'>女<div class="gen" v-bind:class="{ 'spanclass': isActive==2 }"></div><img class="gender-img" src="http://ovn5haih3.bkt.clouddn.com/check.png"></div>
      <div class="genders" @click='selectSEX(3)'>保密<div class="gen" v-bind:class="{ 'spanclass': isActive==3 }"></div><img class="gender-img" src="http://ovn5haih3.bkt.clouddn.com/check.png"></div>
    </div>
    <div v-if='index == 4' class="date">
      <input type="date"  id="dataid" v-model='DateFrom'/>
    </div>

    <!-- <span class="com-position-re">
        <input type="text" placeholder="起始日期" disabled v-model="DateFrom">
            <el-date-picker
                v-model="DateFrom"
                placeholder="选择日期"
                size='mini'
                format='yyyy-MM-dd'
                @change='sss'
                class='product-date-picker'
                :picker-options="pickerOptions0">
            </el-date-picker>
    </span> -->


    <input v-if='index == 4' @click='DataupdateUserInformation()' type="button" value="确定" class="buttom-ok"/>
  </div>
</template>

<script type="text/javascript">
  export default{
    data(){
      return{
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        index:this.$route.params.id,
        classObject:{'classa':false,'classb':false,'classc':false},
        isActive:'0',
        User:'',
        DateFrom:'',
      }
    },
    created(){
      this.getUserInformation()
    },
    props: ['sData'],
    methods:{
      eee(val){
        if (val) {
          this.DateTo = val.split(':')[0] + ':00:00';
        }date-p
      },
      present(){
        var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
        if(!reg.test(this.User.userName)){
          m$.template({
            val: '昵称不能包含特殊符',
            time: 2000,
          })
        }else{
          this.postAjax(this.url.updateUserInformation,{userName:this.User.userName},(res)=>{
            if(res.code == 200){
            console.log('成功')
            window.location.href = (`#/setpersonage`);
          }
        })
        }
      },
      emptyName(){this.User.userName = '';},
      selectSEX(index){
        if(index == '1'){this.isActive='1';this.SEXupdateUserInformation(index)}
        else if(index == '2'){this.isActive='2';this.SEXupdateUserInformation(index)}
        else if(index == '3'){this.isActive='3';this.SEXupdateUserInformation(index)}
        console.log(index,this.clagen)
      },
      SEXupdateUserInformation(index){
        this.postAjax(this.url.updateUserInformation,{sex:index},(res)=>{
          if(res.code==200){
          window.location.href = (`#/setpersonage`);
        }
        console.log(res.code)
      })
      },
      getUserInformation(){
        this.getAjax(this.url.getUserInformation,{},(res)=>{
          if(res.code == 200){
          this.User = res.data;
          this.isActive = res.data.sex;
          this.DateFrom = res.data.birthday;
        }
      })
      },
      DataupdateUserInformation(){
        var did = document.getElementById('dataid').value
        console.log(did)
        this.postAjax(this.url.updateUserInformation,{birthday:did},(res)=>{
          if(res.code=200){
        }
        console.log(res.code)
      })
      },
    }
  }
</script>

<style scoped lang="less">



  .com-position-re{
    border: 1px solid red;
    input{
      width: 100%;height: .5rem;
    }
    .product-date-picker {
      position: absolute;
      top: .04rem;
      right: 0.04rem;
      width: 2.3rem;
      opacity: 0;
      z-index: 22;
      > input {
        height: .32rem;
      }
    }
    > span {
      position: relative;
      > input {
        background: #ffffff;
        border: 1px solid #bfbfbf;
        width: 2.3rem;
        height: .30rem;
        padding-left: .1rem;
      }
      > img {
        position: absolute;
        right: .12rem;
        width: .16rem;
        height: .16rem;
      }
    }
    .to {
      margin: 0 .07rem;
    }

  }

  .box-ba{background-color:#F3F2F7;width: 100%;height: 100%;position: fixed;z-index: -1;}
  .buttom-ok{position: absolute;font-size:14px;right: 6px;top: 45px;width: 50px;height: 25px;background-color: rgba(0,0,0,0);border: 1px solid #1FB428;border-radius:8px ;}

  ::-webkit-datetime-edit-fields-wrapper { background-color: #eee; }
  ::-webkit-datetime-edit-text { color: #4D90FE; padding: 0 100%; }
  ::-webkit-inner-spin-button { visibility: hidden; }

  ::-webkit-calendar-picker-indicator {
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: inset 0 1px #fff, 0 1px #eee;
    background-color: #eee;
    background-image: -webkit-linear-gradient(top, #f0f0f0, #e6e6e6);
    color: #666;
  }
  .date{
    position: relative;
    width: 100%;height: 40px;
    input{
      position: absolute;height:38px;width: 100%;
      background-color: #FFF;
    }
  }
  .spanclass{
    display:none;
  }
  .one{display: none;}.two{display: none;}.three{display: none;}
  .gen{
    width: 25px;
    height: 25px;
    background-color: #FFF;z-index: 9;
    position: absolute;top:5px;right: 3px;
  }
  .gender{
    .genders{
      position: relative;
      height: .75rem;font-size: .32rem;line-height: .75rem;padding-left: .1rem;
      background-color: #FFF;
      margin-top: 1px;
    }
    .gender-img{
      position: absolute;
      top: 7px;right: 4px;width: .42rem;
    }
  }
  .name{
    width: 100%;height: 40px;
    position: relative;
    border: 1px solid #1FB428;
    background-color: #FFF;
    padding-left: 6px;
    input{
      width: 90%;
      position: absolute;
      height: 38px;font-size: .35rem;}
    .name-img{
      position: absolute;
      right: 0;width: 23px;margin: 8px 5px 0 0;}
  }
  .d-span{
    font-size: .25rem;
    margin: 5px 0 0 8px;color: #525252;
  }
</style>
