<template>
  <div class="pattern">
    <div class="commodity-pattern" v-for="(i,ind) in patterndata":key='ind'>
      <div class="pattern-int one" @click="goPage(i,ind,0)">
        <div class="chunk">
          <img v-if='ind == 0' class="one-img" src="../../assets/indexB/newpublish.png" />
          <img v-if='ind == 1' class="one-img" src="../../assets/indexB/rankinglist.png" style="width: .95rem;" />
          <span>{{i.span[0]}}</span>
          <img class="two-img" src="../../assets/index/index_img01.png"  v-if='ind == 0'/>
          <img class="two-img" src="../../assets/index/index_img05.png"  v-if='ind == 1' />
        </div>
        <div class="chunk-one">
          <img class="three-img" src="../../assets/index/index_img02.png"  v-if='ind == 0'/>
          <img class="three-img" src="../../assets/index/index_img06.png"  v-if='ind == 1' />
        </div>
      </div>
      <div class="pattern-int two" @click="goPage(i,ind,1)">
        <div class="chunk-int">
          <img v-if='ind == 0' class="one-img" src="../../assets/indexB/Officesnacks.png" />
          <img v-if='ind == 1' class="one-img" src="../../assets/indexB/CareWomen.png"  />
          <span>{{i.span[1]}}</span>
          <img class="two-img indexC" src="../../assets/index/index_img03.png"  v-if='ind == 0'/>
          <img class="two-img indexC" src="../../assets/index/index_img07.png" v-if='ind == 1'/>
        </div>
      </div>
      <div class="pattern-int two" @click="goPage(i,ind,2)">
        <div class="chunk-int">
          <img v-if='ind == 0' class="one-img" src="../../assets/indexB/SpecialOffer.png" />
          <img v-if='ind == 1' class="one-img" src="../../assets/indexB/globalshopping.png" style="width: .95rem;"/>
          <span>{{i.span[2]}}</span>
          <img class="two-img indexC" src="../../assets/indexB/tejia-cookie.png"  v-if='ind == 0'/>
          <img class="two-img indexC" src="../../assets/index/index_img08.png" v-if='ind == 1'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script  type="text/javascript">
  export default {
    data(){
      return{
        patterndata:[
          {span:['"惠"等你来','吃货的诱惑','物美价廉'],img:[]},
          {span:['总有一款适合你','婆婆妈妈用','飘扬过海来寻你'],img:[]},
        ]
      }
    },
    methods:{
      goPage(v,ind,sInd){
        console.log(v.span[sInd])
        console.log(ind)
        console.log(sInd)
        if(ind==0&& sInd==0){
          this.$router.push('/newProducts');
        }
        if(ind==0&& sInd==1){
          this.$router.push('/officeSnacks');
        }
        if(ind==0&& sInd==2){
          this.$router.push('/tejia');
        }
        if(ind==1&& sInd==0){
          this.$router.push('/rank');
        }
        if(ind==1&& sInd==1){
          this.$router.push('/womanCare');
        }
        if(ind==1&& sInd==2){
          this.$router.push('/global');
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .pattern:after{content: '';display: block;clear:both}
  .chunk{
    flex: 5;
  }
  .chunk-one{
    flex: 5;
  }
  .commodity-pattern{
    font-size: .2rem;
    display: flex;
    .one{
      width: 3.75rem;
      margin-top: 1px;
    }
    .two{
      margin: 1px 0 0 .02rem;
      width: 1.855rem;
    }
    .pattern-int{
      padding: .1rem 0 0 .2rem;
      background-color: #FFF;
      height: 2.5rem;
      display: flex;
      span{display: block;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .one-img{
        width: 1.2rem;height: .34rem;
      }
      .two-img{
       width: 1.2rem;margin-top: .1rem;
      }
      .three-img{
       width: 1.15rem;;margin: .8rem 0 0 .1rem;
      }
      .indexC{left:25%}
    }
    img{

    }
  }
</style>
