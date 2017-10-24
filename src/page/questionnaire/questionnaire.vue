<template>
  <div class="questionnaireWrap" style="font-size:0.2rem;">
    <div class="title" v-text="datas.name"></div>
    <div class="infor" > &nbsp&nbsp&nbsp&nbsp {{datas.direction}}</div>
    <div class="questionWrap">
      <div style="color:#666;">答题：</div>
      <div class="questions" v-for="(q,ind) in datas.questions">
        <div class="qTitle">Q<span class="inNum"></span> : <span v-text="q.title">您的性别</span> <span v-if="q.isAnswer==0" style="color:#fb4874">*</span></div>
        <div class="qContent">
          <label v-for="(o,i) in q.options"> <input type="radio" :name="q.id" :value="o.id"  class="rdo" @click="changeSelect(q.id,o,i,o.id)" /> {{o.content}} </label>
        </div>
      </div>
    </div>
    <div class="thanks"> 感谢您的耐心参与</div>
    <div style="text-align: center;padding-bottom:0.2rem;"><input type="button" value="提交" style="color:#fff;background-color: #fb4874;padding:0.05rem 0.35rem;border-radius: 5px;"></div>
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
          font-size:10px;color:#333;line-height: 32px;

          >.inNum:before{
            content: counter(inNum);
            counter-increment: inNum;
          }
        }
        .qContent{
          font-size:10px;
          color:#666;
          line-height: 32px;
          input.rdo {
            background-color: #000;
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
            top: 0px;
            left: -1px;
            width: 16px;
            height: 16px;
            background-color: #fff;
            border: 1px solid #000;
          }
          .rdo:after {
            top: 3px;
            left: 3px;
            width: 8px;
            height: 8px;
            background-color: #fff;
          }
          .rdo:checked:after {
            top: 3px;
            left: 2px;
            width: 12px;
            height: 12px;
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

    }
  }
</style>
<script>
  export default {
    data(){
      return{
        checked:[],
        obj:{
          questionnaireId:'',
          openId:'',
          answers:[]
        },
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
      changeSelect(qid,o,i,id){
        var option={questionId:qid,answer:id}
//        this.obj.answers.push(option)
//        console.log(this.obj)

        if(this.obj.answers.length==0){
          this.obj.answers.push(option)
          console.log(option)
         // console.log(qid)
        }else{
          for(var i=0;i<this.obj.answers.length;i++){
            if(this.obj.answers[i].questionId==qid){
              this.obj.answers.splice(i,i+1,option)

            }else{
              this.obj.answers.push(option)

            }
          }
        }


      },
      submit(){

      }
    },
    watch:{
      'checked':function(val){console.log(val)}
    },
    created(){
      this.postAjax(this.sData.url.selectQuestionnaire,{id:1},(res)=>{
        if(res.code==200){
          // console.log(res.data)
          this.datas=res.data;
        }else{

        }

      })
    },
  }
</script>
