<template>
  <div id="headLine">
    <div class="head-img"><div class="spanA" style="width:1rem;position: absolute;font-size:.32rem;top:0px;">宝宝</div><img style="width:.75rem;position: absolute;top: 0;left: .7rem;" src="http://ovn5haih3.bkt.clouddn.com/headline.png" alt="头条" id="headLine_img"/></div>
    <div class="wraps" >
      <div class="mode" id="n_wrap">
        <div class="n_block">
          <a class="news_wrap"  v-for="(iteom,ind) in test_news" v-if="ind == 0" :href="iteom.link" :key='ind'>
            <!--<img src="" alt="围观"/>-->
            <span v-if="ind==0">劲爆</span>
            <div v-text="iteom.title" class="n_title"></div>
          </a>
        </div>

        <div class="n_block">
          <a class="news_wrap"  v-for="(iteom,ind) in test_news" v-if="ind == 1" :href="iteom.link" :key='ind'>
            <!--<img src="" alt="围观"/>-->
            <span v-if="ind==1">头条</span>
            <div v-text="iteom.title" class="n_title"></div>
          </a>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return{
        int:'',
        test_news:[
//        {title:'孩子一出生就会说话？长得还不像爹？结果竟然是',link:'https://mp.weixin.qq.com/s/bhgXz2Mr1B1vfUiSPZLySw'},
//        {title:'浙江的考生注意啦！查到分数后，这件事一定要知道！！',link:'https://mp.weixin.qq.com/s/ZDosiX_AuMP1u4-2hh8lvQ'},
//        {title:'黄磊怎么也想不到自己主演的《深夜食堂》，最后竟成了“尴尬食堂+广告食堂””活动',link:'https://mp.weixin.qq.com/s/GcDyL1XrqrOJ325pQxG2Kw'},
//        {title:'心疼杭州人，接下来的日子不好过啦！！',link:'http://mp.weixin.qq.com/s/Ph3tQJeseff-ARcDZ3s26Q'},
        ]
      }
    },
    props:['navData','sData'],
    created(){
      // console.log(this.navData)
      this.hBanner();
      var n_wrap=document.getElementById('n_wrap');
      var sum=-25;
      var int=setInterval(function () {
        if(!this.n_wrap){ clearInterval(int)}
        if(this.n_wrap){this.n_wrap.style.webkitTransform="translate3d(0,"+sum+"px"+",0)"}
        sum+=-25;
        if(sum<-25){
          sum=0;
        }
      },3000)
    },
    methods:{
      hBanner(){
        this.postAjax('/News/getNews',{},(res)=>{
          this.test_news=res.data;
      })
      }
    },
    watch: {

    },

  }
</script>
<style scoped lang="less">
  .n_block:not(:first-child){
    margin-top:10px;
  }
  .n_title{
    line-height: 20px;
    text-overflow:ellipsis;
    overflow:hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }
  .mode{
    height:95px;
    overflow: hidden;
    transition-duration: 0.3s;
    transform: translate3d(0,0,0);
  }
  .wraps{
    height: 25px;
    overflow: hidden;
  }
  #headLine{
    padding: 10px;
    background-color: #fff;
    display: flex;
    height:40px;
    .head-img{
      position: relative;
    }
    .news_wrap:first-child{
      margin-bottom:1px;
    }
    .news_wrap{
      padding-right: .1rem;
      margin: 3px 0 0 1.6rem;
      display: block;
      height:15px;
      font-size:0.2rem;
      >span{
        height: 20px;
        line-height: 20px;
        width:0.65rem;
        float:left;
        margin-right:0.05rem;
        border:1px solid #FB4874;
        text-align: center;
        border-radius: 5px;
        color: #FB4874;
        box-sizing: border-box;
      }
    }
  }
</style>
