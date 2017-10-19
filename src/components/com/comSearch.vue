/*
*作者---杨彬
*
*/
<template>
  <div class="search-warp">
    <div class="nav_container">

    </div>
    <!--<input type="text" v-model="serchVal" @input="searchInput(serchVal)"-->
    <!--placeholder="请输入商品名称" >-->
    <input type="text" v-model="searchVal2"
           placeholder="" @keyup.enter="searchValFun(searchVal2)" id="test">
    <img src="../../assets/indexSearch.png" @click="searchValFun(searchVal2)" class="com-div-middle-ab" v-show="sShow">
    <div id="p-holder" @click="show_s" v-show="!sShow">
      <span>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACuklEQVRYR8WW7VEVQRBFLxEoESARKBGAESgRqBEoEagRCBFIBmAEYARqBGoEmoHUoeZSTb+e3dYfz6l6BbU7031uf83uqL8eSdqTdBSO/JD0TdLXvpn7O3caB19Kei3pycJeQC4lvZf0u2HzbssSAEo/SkL5z+EAJzjjx2IP759Lejacnw6QFscMANU4x/E7SecNa4Cw73DAvupEowJ4I+mDpM9D2V+FVJLhqYunaxAZgFBeSPo0nDeEl1sMQUSIxHRFgIeSvo+wk9usHKPkGUgvVOLkrPBA6t4OgGkKI4APELbrYBAwogIULUchetEZQFGUx0U78vyPpP1ZCCIAinEcFeL8ahjgeQSLEChkRgAfZwLQnCcNZRQM4NyjIirkEO8wtDRsAOX9L0kHSS1R4F0UtjEH7AhDXrQVNcFwIT1ry2orES8klS3vhw5tHLNuR/LnwbMGwT5sUbBei3YMQIiogQiAagwRie6qhDgyubhvbRoA5+Q+kjNSmWo5p0swpBLgKKQFUJG7LTsXVpwLOZJtgAdJLT3+ZW2QFEV7IonoeVnIbjWWrW5WKESG/iYNa3cCKfTtGPfyHDFlLRnAajM9z4GgHZcuFnJPq+WBQ1szGxjViNxYMb90AmnIY5MBggNGKuHklmQviihSnvF/hseZw08Ey0EWAVws1eDBAcZQmRdAvMtjmjPUEDdr7K5753OFYwRVZc9KIqSkhR+K4tdRNBzvEPZOB1kG8EwnFfli6Q4j9tEFfEdOLyEbq3rcheecV3f9GowjOc39EgDviARGHo+/KCKXs0W+aT23n89XV/RiDWQHFA/OSYm/F2I144jiJWq51VoQnTGLIVrR3wXAxMVXEtGiE/KwWoXoAFRhJ+TdKzrW1EZh/yvAWhHm91OIbQEAVEJsE6CE2DZAhOCCO/gfAIYgJec3Pe66IV+utmoAAAAASUVORK5CYII=" alt=""/>
        请输入商品名称</span>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return{
        searchVal2:'',
        sShow:false,
        show:true,
      }
    },
    methods:{
      show_s(){
       this. sShow=true;
       document.getElementById('test').focus();
      },

      // searchInput(val){
      //     this.$emit('getSearchValue',val);
      // },
      searchValFun (val) {
          var obj={};
        obj.val=val;
        obj.type='0';
        this.$emit('getSearchValue',obj);
      },
    },
 /* watch: {
    searchVal2: function (val, oldVal) {
      //console.log('val:' + val + ' - oldVal: ' + oldVal);
      if(val==''){
        this.searchValFun(val);
       // console.log(val)
      }
    }
  },*/
    created(){
      if(this.$route.name=='goodsItem'){
        this.searchVal2=m$.sessionStores.get('indexSearch')?m$.sessionStores.get('indexSearch'):'';
        m$.sessionStores.remove('indexSearch');
      }
    },
  }
</script>
<style scoped lang="less">
  .search-warp{

    width: 5.9rem;
    height:0.6rem ;
    opacity:0.8;
    background:#ffffff;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    padding-left: 0.3rem;
    font-size: 0;

    >*{vertical-align: middle;}
    line-height: 0.6rem;
    img{
      height: 0.34rem;
      right: .2rem;
    }
    input{
      background-color: transparent;
      margin-left:0.1rem ;
      font-family:PingFangSC-Regular;
      font-size:0.3rem;
      color:#737373;
      letter-spacing:0px;
      line-height:100%;
      text-align:left;
    }
    #p-holder{
      position:relative;
      top:-0.6rem;
    span{
      display: block;
      font-size: 0.2rem;
      text-align:center;
  img{
    position:absolute;
    left: 1.6rem;
    bottom: 0.13rem;
  }
  }
  }
  }
</style>
