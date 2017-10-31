<template>
  <div class="questionnaireWrap" style="font-size:0.2rem;">
    <div class="title" v-text="datas.name"></div>
    <div class="infor" > &nbsp&nbsp&nbsp&nbsp {{datas.direction}}</div>
    <div class="questionWrap">
      <div style="color:#666;">答题：</div>
      <div class="questions" v-for="(q,ind) in questions">
        <div class="qTitle">Q<span class="inNum"></span> : <span v-text="q.title">您的性别</span> <span v-if="q.isAnswer==0" style="color:#fb4874">*</span></div>
        <div class="qContent">
          <label v-for="(o,i) in q.options"  v-if="q.type=='0'"> <input  type="radio" :name="q.id" :value="o.id"  class="rdo" @click="changeSelect(q,o,ind)"></i><span v-if="o.content=='其它' || o.remark!=''">{{o.content}}</span>
            <!--<span v-if="o.remark!=''" v-text="o.remark"></span>-->
            <!--<input type="text" v-if="other && o.content=='其它'" v-model="o.remark" style="border-bottom:1px solid #000;width:30px;" placeholder="其他" @blur="text(q,o,i)">-->
          </label>
          <label v-for="(o,i) in q.options" v-if="q.type=='1'"> <input type="checkbox" :name="q.id" :value="o.id"  class="rdo" @click="changeSelect(q,o,ind)" v-model="obj[ind].selectedOptionsId"> </i>{{o.content}}
            <!--<input type="text" v-if="other && o.content=='其它'" v-model="o.remark" style="border-bottom:1px solid #000;width:30px;" placeholder="其他" >-->
          </label>
          <textarea name="text" id="" cols="40" rows="3" v-if="q.type=='2'" v-model="o.remark"></textarea>
        </div>
      </div>
    </div>
    <div class="thanks"> 感谢您的耐心参与</div>
    <div  class="submit" ><input type="button" value="提交" @click="submit()"></div>
  </div>
</template>
<style lang="less" scoped>
  .questionnaireWrap{
      padding:0;
      background:#fff;
      min-height:500px;
      padding:0 0.5rem;
     font-family: "Microsoft YaHei";
    .title{
      text-align: center;
      font-size:16px;
      height:40px;
      line-height: 40px;
      font-weight:bold;
    }
    .infor{
      color:#666;
      font-size:12px;
      line-height: 30px;
    }
    .questionWrap{
      counter-reset:inNum;
      .questions{
        .qTitle{
          font-size:10px;
          color:#333;
          line-height: 32px;
          font-weight: bold;
          >.inNum:before{
            content: counter(inNum);
            counter-increment: inNum;
          }
        }
        .qContent{
          font-size:10px;
          color:#666;
          line-height: 25px;
          label{display: block;}
          span{  }
          input.rdo {
            background-color: #fff;
            margin-right: 6px;
            margin-left: 6px;
            border-radius: 50%;
            position: relative;
          }
          .rdo:before,.rdo:after {
            content: '';
            display: block;
            position: absolute;
            border-radius: 50%;
            transition: .3s ease;
          }
          .rdo:before {
            top: 1px;
            left: -1px;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border: 1px solid #000;
          }
          .rdo:after {
            top: 4px;
            left: 4px;
            width: 8px;
            height: 8px;
            background-color: #fff;
          }
          .rdo:checked:after {
            top: 3px;
            left: 1px;
            width: 10px;
            height: 10px;
            background-color:#ea879a;
          }
          .rdo:checked:before {
            border-color:#ea879a;
          }
      }
      }
    }
    .thanks{
      font-weight: bold;
      font-size:10px;
      line-height: 32px;
    }
    .submit{
      text-align: center;
      padding-bottom:1rem;
      >input{
        color:#fff;
        background-color: #fb4874;
        padding:0.05rem 0.35rem;
        border-radius: 5px;
      }
    }
  }
</style>
<script>
  export default {
    data(){
      return{
        openId:'',
        other:false,
        startTime:'',
        endTime:'',
        obj:[],
        questions:[],
        datas:{
//          id:'01',
//          name:'调查问卷',
//          diretion:'',
//          thanksMes:'',
//          questions:[
//            {id:'',title:'您的性别',option:[{id:'',content:'男'},{id:'',content:'女'}]},
//            {id:'',title:'您所从事的行业',option:[{id:'',content:''}]}
//          ]
        }
      }
    },
    props: ['sData'],
    methods:{
      text(q,o,i){
        this.obj[i].remark.push(o.remark);
        this.changeSelect(q,o,i)
      },
      changeSelect(q,o,i) {
        if(o.content=='其它'){this.other=true;}else{this.other=false;}
        var openId='o8g-OxMQdHFbOnCIJri6yNhIErnI';
        var questionnaireId=this.datas.id;
        this.obj[i].openId=openId;
        this.obj[i].questionnaireId=questionnaireId;
        this.obj[i].type=q.type;
        this.obj[i].questionId=q.id;
        if(q.type==0){
          this.obj[i].selectedOptionId=o.id;
          }
    if(q.type==1){
      this.obj[i].selectedOptionId='';
     // var id=o.id;
//      this.checked.push(id);
//      this.obj[i].remark=this.checked;
        console.log(this.obj)
      }

      },
      submit(){

//      if( this.obj.length<this.datas.questions.length){
//        m$.template({
//          val: '请先完成问卷<br>后提交',
//          time: 800,
//        })
//      }
        for(var i=0;i<this.obj.length;i++){
          if(this.obj[i].remark=='' && this.obj[i].selectedOptionId=='' && this.obj[i].selectedOptionsId.length==0){
                    m$.template({
          val: '请先完成问卷<br>后提交',
          time: 800,
        })
            return;
          }
        }

        var answers= JSON.stringify(this.obj);
        this.postAjax(this.sData.url.saveQuestionAnswer,answers,(res)=>{
          if(res.code==200){
            m$.sessionStores.set('questionNaire',this.datas.id)
            m$.sessionStores.set('openId',this.openId?this.openId:'o8g-OxMQdHFbOnCIJri6yNhIErnI')
            console.log(this.$route)
            this.$router.push('/Redpacket')
          }else{

          }
        })

      }
    },
    watch:{

    },
    created(){
      if(m$.sessionStores.get('authWXRegistLogin')){
        var url=location.href;
        var openId;
        url.indexOf('?')>-1?openId= location.href.split('?')[1].split('=')[1]:openId='';
        m$.sessionStores.set('openId',openId)
      }else{
        this.postAjax(this.url.authWXRegistLogin,{url:window.location.href},(res)=>{
          if(res.code==200){
            //console.log(res.data)
            window.location.href=res.data
            m$.sessionStores.set('authWXRegistLogin','1')
          }
        })
      }
     this.openId= m$.sessionStores.get('openId');
      this.postAjax(this.sData.url.selectQuestionnaire,{id:1},(res)=>{
        if(res.code==200){
          this.datas=res.data;
         this.questions=res.data.questions;
         // this.obj.length=this.questions.length;
          this.startTime=res.data.gmtStart;
          this.endTime=res.data.gmtEnd;
         for(var i=0;i<this.questions.length;i++){
           var option={
             "questionnaireId":"1",
             "openId": this.openId?this.openId:"o8g-OxMQdHFbOnCIJri6yNhIErnI",
             "questionId": "",
             "selectedOptionId": "",
             "selectedOptionsId":[],
            "remark" :"",
             "type": ""
           }
           this.obj.push(option)
         }
        // console.log(this.obj)
          var date=new Date();
          console.log(Date.parse(date)>this.startTime && Date.parse(date)<this.endTime)
          if(Date.parse(date)>this.startTime && Date.parse(date)<this.endTime){

          }else{
           m$.template({
              val: '活动已结束<br>2秒后跳转商城',
              time: 1000,
            })
          //  setTimeout(function(){ window.location.href="#/index";},2000)
          }
        }else{
        }
      })
    },
  }
</script>
