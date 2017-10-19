<template>
  <div class="column">
    <div class="top-wrap">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMjlmMzc0Ni00NGZhLTIxNDQtYTE2OC02ZjgwNzY1MmRiMmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI0QzI2NDk0RjE4MTFFN0IxOEVFNzM1MDFDRUMxMUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzI0QzI2NDg0RjE4MTFFN0IxOEVFNzM1MDFDRUMxMUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjhjYjBlMDMtOWYxYy0wNTRjLWE2ZTAtNWRlOThmN2MyZDhjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmYyOWYzNzQ2LTQ0ZmEtMjE0NC1hMTY4LTZmODA3NjUyZGIyYSIv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"
          alt="column"/>
        <span>栏目</span>
        <div class="more">
          <span>往期栏目 </span>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjklEQVQ4T2NkoBAw4tP/x6Mo4d9/pnzWn38cGQ9M+IBNLV4DQBp+eRQvYPjPqI/LEIIGEDKEKAPwGUK0AbgMIckAbIaQbACyIWw7ewzJNoCRgVGBdUePA8kGQKKVwYD1518HUNogyQB0zSDvEG0ANs1EG4BLM1EG4NNM0ABQZvrPwJTA8uNPANmZiVBuBwAF3WoRjgh08QAAAABJRU5ErkJggg=="
            alt="more"/>
        </div>
    </div>
    <div class="column_wrap">
      <div v-for="msgs in msg ">
        <img src="" alt="imgs" class="test_img"/>
        <div class="title_one">{{msgs.tit}}</div>
        <div class="title_two">{{msgs.ftit}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .column:before{content: '';display: block}
  .column:after{content: '';display: block;clear: both}
  .column{
  .top-wrap{
    background: #fff;
    width: 100%;
    height:0.7rem;
    color:#fb4874;
  img{width: 0.35rem;
    margin:0.2rem  0.1rem;
    float: left
  }
  span{float: left;padding-top: 0.15rem;font-size: 0.3rem;font-weight: bold;}
  .more{
    float:right;
    border: 1px solid #fb4874;
    margin-top:0.2rem;
  margin-right:0.35rem;
    span{padding-top: 0;font-size: 0.1rem;font-weight: normal;}
    img{width: 0.2rem;margin:0.05rem;}
  }
  }
.column_wrap{
  color:#575757;
  padding:0.3rem;
  margin-top: 0.05rem;
  background: #fff;
  display: flex;
text-align:center;
  >div{flex: 1;width:47%;}
   >div:last-child{margin-left: 0.4rem;}
   img{width:100%;background: #ccc;display:inline-block;}
   .title_one{
     font-size:0.3rem;
     font-weight: bolder;
     overflow:hidden;
     display:-webkit-box;
     -webkit-box-orient:vertical;
     -webkit-line-clamp:1;
   }
   .title_two{
     font-size:0.2rem;
     overflow:hidden;
     display:-webkit-box;
     -webkit-box-orient:vertical;
     -webkit-line-clamp:1;
     color:#d5d5d5;
   }
}
  }


</style>
<script>
  export default {
    data()
  {
    return {
      msg: [{tit:'【夏日和海】清凉一夏的家居小物',ftit:'.jldjlajfo4564989ji412316546oaijfdojdsifsdf'}, {tit:'【夏日和海】清凉一夏的家居小物',ftit:'.jldjlajfojioaijfdojdsifsdf'}]
    }
  }
  ,
  props:['navData'],
    created()
  {
    // console.log(this.navData)
  }
  }
</script>
