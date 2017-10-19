<template>
    <div class="calculate_wrap">
        <div class="top_wrap">
          <div class="one">算算要还多少钱?</div>
          <div class="two">装修花10万，每期还 <span>1916</span>元</div>
        </div>
      <div class="calculate">
        <div class="cal_top">
          每期仅还
          <span v-text="paid_month">0</span> 元，月利仅需
          <span v-text=" month_interest">0</span> 元
        </div>
        <div class="cal_amount">
          <input type="text" placeholder="输入贷款总额" v-model="amount"/>
        </div>
        <select name="term-wrap" id="term" @change="" v-model="term" >
          <option value="15">60期</option>
          <option value="13">48期</option>
          <option value="11">36期</option>
          <option value="8">24期</option>
          <option value="4">12期</option>
        </select>
      </div>
      <div class="cal_button" @click="calculate">
        算算要还多少钱
      </div>
    </div>
</template>
<style scoped lang="less">
  .calculate_wrap{
    background: #fff;
    min-height: 2rem;
    font-size: 0;
    padding-bottom:0.3rem;
    .top_wrap{
      text-align:center;
      padding:0.7rem;
      .one{
        font-size: 0.3rem;
        color:#494949;
      }
      .two{
        font-size: 0.2rem;
        color:#CFCFCF;
        margin-top: 0.06rem;;
      }
    }
  .calculate{
    margin:0.2rem;
    border:1px solid #F3F3F3;
  >div{
     padding:0.2rem;
     border-bottom: 1px solid #F1F1F1;
   }
    .cal_top{
      text-align: center;
      font-size: 0.25rem;
      color:#5B5B5B;
      >span{
    color:#FB3968;
       }
    }
  #term{
    width:100%;
    padding:0.2rem;
    color:#A1A1A1;
    border:0;
    -webkit-appearance: none;
    background:url("../../../assets/more.png") no-repeat 96%;
    background-color: #FCFCFC;
  }
  }
  .cal_button{
    padding:0.2rem;
    margin:0.3rem 0.2rem 0;
    text-align:center;
    font-size: 0.27rem;
    background: #FB3968;
    border-radius: 0.1rem;
    color:#fff;
    font-weight: bolder;
  }
  }
</style>
<script>
  export default {
    data(){
    return {
      term:'15',
      amount:'',
      paid_month:'0',
      month_interest:'0'
    }
  },
  created(){
    let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(curHeight)
  },
  methods: {
    calculate(){
      var amount=parseInt(this.amount);
      var term=parseInt(this.term);
     var total=amount*(1+term/100);
      if(this.term=='4'){
        this.paid_month=(total/12).toFixed(2); ;
        this.month_interest=((total-amount)/12).toFixed(2); ;
        console.log(this.paid_month,this.month_interest)
      }else if(this.term=='8'){
        this.paid_month=(total/24).toFixed(2); ;
        this.month_interest=((total-amount)/24).toFixed(2); ;
        console.log(this.paid_month,this.month_interest)
      }else if(this.term=='11'){
        this.paid_month=(total/36).toFixed(2); ;
        this.month_interest=((total-amount)/36).toFixed(2); ;
        console.log(this.paid_month,this.month_interest)
      }else if(this.term=='13'){
        this.paid_month=(total/48).toFixed(2); ;
        this.month_interest=((total-amount)/48).toFixed(2); ;
        console.log(this.paid_month,this.month_interest)
      }else if(this.term=='15'){
        this.paid_month=(total/60).toFixed(2); ;
        this.month_interest=((total-amount)/60).toFixed(2); ;
        console.log(this.paid_month,this.month_interest)
      }
    }
  }
  }
</script>
