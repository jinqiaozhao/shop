/*
*作者---
*
*/
<template>
  <div id="classify">
    <div class="search_wrap">
      <img src="../../assets/back.png" alt="" style="float:left;" @click="$router.go(-1)">
      <com-search class="indexSearch com-div-center-ab " @getSearchValue="gotoNextPage"></com-search>
    </div>
    <div class="all_wrap" style="position: relative;height: 85%;">
      <div class="classify_wrap" >
        <ul >
          <li v-for="(item,index) in nav"  v-bind:class="{ 'active': isAct==index+1 }" @click="posttypes(index,item)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="classify_det_wrap" >
        <div class="classify_banner">
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==2 }" src="http://ovn5haih3.bkt.clouddn.com/%E6%95%B0%E7%A0%81%E5%AE%B6%E7%94%B5banner.jpg"/><!-- 数码家电 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==3 }" src="http://ovn5haih3.bkt.clouddn.com/%E6%89%8B%E6%9C%BA%E6%95%B0%E7%A0%81banner.jpg"/><!-- 手机数码 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==4 }" src="http://ovn5haih3.bkt.clouddn.com/%E7%B2%BE%E9%80%89%E9%A3%9F%E5%93%81banner.jpg"/><!-- 精选食品 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==5 }" src="http://ovn5haih3.bkt.clouddn.com/%E4%B8%AA%E4%BA%BA%E6%B4%97%E6%8A%A4banner.jpg"/><!-- 美妆个护 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==6 }" src="http://ovn5haih3.bkt.clouddn.com/%E4%B8%AA%E4%BA%BA%E6%B4%97%E6%8A%A4banner.jpg"/><!-- 女性生活 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==7 }" src="http://ovn5haih3.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E6%97%A5%E5%8C%96banner.jpg"/><!-- 进口日化 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==8 }" src="http://ovn5haih3.bkt.clouddn.com/%E8%8C%B6%E9%85%92%E5%86%B2%E9%A5%AEbanner.jpg"/><!-- 茶酒冲饮 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==9 }" src="http://ovn5haih3.bkt.clouddn.com/%E7%B2%AE%E6%B2%B9%E8%B0%83%E5%91%B3banner.jpg"/><!-- 粮油调味 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==10 }" src="http://ovn5haih3.bkt.clouddn.com/%E5%AE%B6%E5%BA%AD%E6%B8%85%E6%B4%81banner.jpg"/><!-- 家庭清洁 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==11 }" src="http://ovn5haih3.bkt.clouddn.com/%E5%AE%B6%E5%B1%85%E5%BB%BA%E6%9D%90banner.jpg"/><!-- 家居建材 -->
          <img class="classify-img" v-bind:class="{ 'imgind': isAct==1 }" src="http://ovn5haih3.bkt.clouddn.com/%E5%85%A8%E7%90%83%E7%B2%BE%E9%80%89banner.jpg"/><!-- 全球精选 -->
        </div>
        <div v-for="(item,index) in cal_del" style="" class="cal_wrap">
          <div  class="cal_tit">—— {{item.tit}} ——</div>
          <div style="background:#FFF;">
            <div v-for="(v,i) in item.con" style="width: 33.33%;text-align: center;display: inline-block;padding:0.2rem" class="brand" @click="gotoNextPage({'val':v})">
              <img :src='item.img[i]' alt="" style="width: 80%;">
              <div style="font-size: 10px;">{{v}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <com-footer class="com-fix-b" style="z-index:10;"></com-footer>
  </div>
</template>
<script type="text/javascript">
  import comSearch from 'src/components/com/comSearch.vue';
  import comFooter from "src/components/com/comfooter.vue"
  import sData from 'src/assets/projectStaticsData.js'
  export default {
    data(){
      return{
        heights:document.documentElement.clientHeight,
        carNumber:0,
        sData:sData,
        nav:[{name:'全球精选'},{name:'数码家电'},{name:'手机数码'},{name:'精选食品'},{name:'美妆个护'},{name:'女性生活'},{name:'进口日化'},{name:'茶酒冲饮'},{name:'粮油调味'},{name:'家庭清洁'},{name:'家居建材'}],
        isAct:1,
        cla_del_show:[
          //全球精选
          [{tit:'产地',con:['台湾','泰国','越南','马来西亚','西班牙','俄罗斯','韩国','日本','美国'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E5%8F%B0%E6%B9%BE.png','http://orz6nce3e.bkt.clouddn.com/%E6%B3%B0%E5%9B%BD%E5%9B%BD%E6%97%97.png','http://orz6nce3e.bkt.clouddn.com/%E8%B6%8A%E5%8D%97.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E9%A9%AC%E6%9D%A5%E8%A5%BF%E4%BA%9A.png','http://orz6nce3e.bkt.clouddn.com/%E8%A5%BF%E7%8F%AD%E7%89%99.png','http://orz6nce3e.bkt.clouddn.com/%E4%BF%84%E7%BD%97%E6%96%AF.png',
            'http://orz6nce3e.bkt.clouddn.com/%E9%9F%A9%E5%9B%BD.png','http://orz6nce3e.bkt.clouddn.com/%E6%97%A5%E6%9C%AC%E5%9B%BD%E6%97%97.png','http://orz6nce3e.bkt.clouddn.com/%E7%BE%8E%E5%9B%BD%E5%9B%BD%E6%97%97.png'
          ]},
            {tit:'进口零食',con:['进口糕点','进口蔬果干','进口咖啡','进口零食','进口食用油','进口糖果','进口巧克力','进口饼干'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%B3%95%E7%82%B9.png','http://orz6nce3e.bkt.clouddn.com/%E8%94%AC%E6%9E%9C%E5%B9%B2.png','http://orz6nce3e.bkt.clouddn.com/%E5%92%96%E5%95%A1.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%9B%B6%E9%A3%9F.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A3%9F%E7%94%A8%E6%B2%B9.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%B3%96%E6%9E%9C.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E5%B7%A7%E5%85%8B%E5%8A%9B.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A5%BC%E5%B9%B2.png'
            ]},
            {tit:'进口酒饮',con:['进口咖啡','洋酒','进口啤酒','进口红酒'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E5%92%96%E5%95%A1.png','http://orz6nce3e.bkt.clouddn.com/%E6%B4%8B%E9%85%92.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E5%95%A4%E9%85%92.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%BA%A2%E9%85%92.png'
            ]}],
          //数码家电
          [{tit:'品牌',con:['JBL','漫步者','老板','公牛','魔杰','贝德'],img:[
            'http://orz6nce3e.bkt.clouddn.com/JBL.png','http://orz6nce3e.bkt.clouddn.com/%E6%BC%AB%E6%AD%A5%E8%80%85.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%80%81%E6%9D%BF.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E5%85%AC%E7%89%9B.png','http://orz6nce3e.bkt.clouddn.com/%E6%91%A9%E6%9D%B0.png','http://orz6nce3e.bkt.clouddn.com/%E8%B4%9D%E5%BE%B7.png'
          ]},
            {tit:'家庭影音',con:['音箱','耳机','蓝牙','电脑','车载','无线'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E9%9F%B3%E5%93%8D.png','http://orz6nce3e.bkt.clouddn.com/%E8%80%B3%E6%9C%BA.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%93%9D%E7%89%99.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E7%94%B5%E8%84%91.png','http://orz6nce3e.bkt.clouddn.com/%E8%BD%A6%E8%BD%BD.png','http://orz6nce3e.bkt.clouddn.com/%E6%97%A0%E7%BA%BF.png'
            ]},
            {tit:'数码周边',con:['优盘','移动硬盘','插座'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E4%BC%98%E7%9B%98.png','http://orz6nce3e.bkt.clouddn.com/%E7%A7%BB%E5%8A%A8%E7%A1%AC%E7%9B%98.png', 'http://orz6nce3e.bkt.clouddn.com/%E6%8F%92%E5%BA%A7.png'
            ]}
          ],
          //手机数码
          [{tit:'品牌',con:['苹果','华为','小米','OPPO','美图','三星','诺基亚','酷派'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E8%8B%B9%E6%9E%9Clogo.png','http://orz6nce3e.bkt.clouddn.com/%E5%8D%8E%E4%B8%BA.png', 'http://orz6nce3e.bkt.clouddn.com/%E5%B0%8F%E7%B1%B3.png'
            ,'http://orz6nce3e.bkt.clouddn.com/OPPO.png','http://orz6nce3e.bkt.clouddn.com/%E7%BE%8E%E5%9B%BE%E6%89%8B%E6%9C%BA.png','http://orz6nce3e.bkt.clouddn.com/%E4%B8%89%E6%98%9F.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E8%AF%BA%E5%9F%BA%E4%BA%9A.png','http://orz6nce3e.bkt.clouddn.com/%E9%85%B7%E6%B4%BE.png'
          ]},
            {tit:'手机配件',con:['蓝牙耳机','充电宝','苹果周边','手机耳机','数据线'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E8%93%9D%E7%89%99.png','http://orz6nce3e.bkt.clouddn.com/%E5%85%85%E7%94%B5%E5%AE%9D.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%8B%B9%E6%9E%9C%E5%91%A8%E8%BE%B9.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E6%89%8B%E6%9C%BA%E8%80%B3%E6%9C%BA.png','http://orz6nce3e.bkt.clouddn.com/%E6%95%B0%E6%8D%AE%E7%BA%BF.png'
            ]},
            {tit:'手机类型',con:['拍照手机','智能手机','游戏手机','大屏手机','老年机'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E6%8B%8D%E7%85%A7%E6%89%8B%E6%9C%BA.png','http://orz6nce3e.bkt.clouddn.com/%E6%99%BA%E8%83%BD%E6%89%8B%E6%9C%BA.png',
              'http://orz6nce3e.bkt.clouddn.com/phone.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E5%A4%A7%E5%B1%8F%E6%89%8B%E6%9C%BA.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%80%81%E5%B9%B4%E6%9C%BA.png']},
            {tit:'影音娱乐',con:['耳机','音箱','便携'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E6%89%8B%E6%9C%BA%E8%80%B3%E6%9C%BA.png','http://orz6nce3e.bkt.clouddn.com/%E9%9F%B3%E5%93%8D.png','http://orz6nce3e.bkt.clouddn.com/%E6%95%B0%E6%8D%AE%E7%BA%BF.png'
            ]}
          ],
          //精选食品
          [{tit:'品牌',con:['谷丽友','丹夫','祖名','卫龙','久久丫','慕兰卡','港荣','有友','周嗲嗲','佐佐甜品'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E8%B0%B7%E4%B8%BD%E5%8F%8B.png', 'http://orz6nce3e.bkt.clouddn.com/%E4%B8%B9%E5%A4%ABlogo.png','http://orz6nce3e.bkt.clouddn.com/%E7%A5%96%E5%90%8D.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E5%8D%AB%E9%BE%99.png','http://orz6nce3e.bkt.clouddn.com/%E4%B9%85%E4%B9%85%E4%B8%AB.png','http://orz6nce3e.bkt.clouddn.com/%E6%85%95%E5%85%B0%E5%8D%A1logo.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E6%B8%AF%E8%8D%A3logo.png','http://orz6nce3e.bkt.clouddn.com/%E6%9C%89%E5%8F%8B.png','http://orz6nce3e.bkt.clouddn.com/%E7%B3%95%E7%82%B9.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E5%B7%A6%E5%B7%A6%E7%94%9C%E5%93%81.png']},
            {tit:'进口食品',con:['进口糕点','进口蔬果干','进口咖啡','进口零食','进口食用油','进口饼干','进口糖果','进口巧克力'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E7%B3%95%E7%82%B9.png','http://orz6nce3e.bkt.clouddn.com/%E8%94%AC%E6%9E%9C%E5%B9%B2.png', 'http://orz6nce3e.bkt.clouddn.com/%E5%92%96%E5%95%A1.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%9B%B6%E9%A3%9F.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A3%9F%E7%94%A8%E6%B2%B9.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A5%BC%E5%B9%B2.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%B3%96%E6%9E%9C.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E5%B7%A7%E5%85%8B%E5%8A%9B.png'
            ]},
            {tit:'休闲零食',con:['糕点','饼干','面包','果冻','糖果','牛肉','禽肉','猪肉','膨化','坚果炒货','麻辣'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E7%94%9C%E5%93%81%E7%B3%95%E7%82%B9.png','http://orz6nce3e.bkt.clouddn.com/%E9%A5%BC%E5%B9%B2.png','http://orz6nce3e.bkt.clouddn.com/%E9%9D%A2%E5%8C%85.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E6%9E%9C%E5%86%BB.png','http://orz6nce3e.bkt.clouddn.com/%E7%B3%96%E6%9E%9C.png','http://orz6nce3e.bkt.clouddn.com/%E7%89%9B%E8%82%89.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E7%A6%BD%E8%82%89.png','http://orz6nce3e.bkt.clouddn.com/%E7%8C%AA%E8%82%89.png','http://orz6nce3e.bkt.clouddn.com/%E8%86%A8%E5%8C%96.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E5%9D%9A%E6%9E%9C%E7%82%92%E8%B4%A7.png','http://orz6nce3e.bkt.clouddn.com/%E9%BA%BB%E8%BE%A3.png']},
            {tit:'养生花茶',con:['红茶','绿茶','水果茶','花茶','保健茶','茶包'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E7%BA%A2%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E7%BB%BF%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E6%B0%B4%E6%9E%9C%E8%8C%B6.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E8%8A%B1%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E4%BF%9D%E5%81%A5%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E8%8C%B6%E5%8C%85.png'
            ]}
          ],
          //美妆个护
          [{tit:'进口洗护',con:['进口沐浴露','进口牙膏','进口牙刷','进口护肤'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E6%B2%90%E6%B5%B4%E9%9C%B2.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E8%86%8F.png',
            'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E5%88%B7.png'
          ,'http://ovn5haih3.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E6%8A%A4%E8%82%A4.jpg']},
            {tit:'个人洗护',con:['洗发水','沐浴露','洗手液','牙刷','牙膏','湿巾','身体乳'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E6%B4%97%E5%8F%91%E6%B0%B4.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B2%90%E6%B5%B4%E9%9C%B2.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B4%97%E6%89%8B%E6%B6%B2.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E5%88%B7.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E8%86%8F.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B9%BF%E5%B7%BE.png',
              'http://ovn5haih3.bkt.clouddn.com/%E8%BA%AB%E4%BD%93%E4%B9%B3.jpg',
            ]},
            {tit:'面部护肤',con:['卸妆','洁面','爽肤水','面霜','精华','面膜','眼霜'],img:[
              'http://ovn5haih3.bkt.clouddn.com/%E5%8D%B8%E5%A6%86.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E6%B4%81%E9%9D%A2.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E7%88%BD%E8%82%A4%E6%B0%B4.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E9%9D%A2%E9%9C%9C.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E7%B2%BE%E5%8D%8E.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E9%9D%A2%E8%86%9C.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E7%9C%BC%E9%9C%9C.jpg'
            ]},
            {tit:'彩妆香氛',con:['唇香','唇彩','香水'],img:[
              'http://ovn5haih3.bkt.clouddn.com/%E5%94%87%E8%86%8F.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E5%94%87%E5%BD%A9.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E9%A6%99%E6%B0%B4.jpg'
            ]},
            {tit:'品牌',con:['云南白药','强生','舒肤佳','迪奥','兰蔻','雅诗兰黛','理肤泉','兰芝'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E4%BA%91%E5%8D%97%E7%99%BD%E8%8D%AF.png',
              'http://orz6nce3e.bkt.clouddn.com/%E5%BC%BA%E7%94%9F.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%88%92%E8%82%A4%E4%BD%B3.png',
              'http://ovn5haih3.bkt.clouddn.com/%E8%BF%AA%E5%A5%A5.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E5%85%B0%E8%94%BB.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E9%9B%85%E8%AF%97%E5%85%B0%E9%BB%9B.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E7%90%86%E8%82%A4%E6%B3%89.jpg',
              'http://ovn5haih3.bkt.clouddn.com/%E5%85%B0%E8%8A%9D.jpg'
            ]}
          ],
          //女性生活
          [{tit:'女性护理',con:['卫生巾','卫生护垫','日用','夜用'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E5%8D%AB%E7%94%9F%E5%B7%BE.png',
            'http://orz6nce3e.bkt.clouddn.com/%E5%8D%AB%E7%94%9F%E6%8A%A4%E5%9E%AB.png',
            'http://orz6nce3e.bkt.clouddn.com/%E6%97%A5%E7%94%A8.png',
            'http://orz6nce3e.bkt.clouddn.com/%E5%A4%9C%E7%94%A8.png']},
            {tit:'纸巾',con:['抽纸','卷纸','湿纸巾'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E7%BA%B8%E5%93%81png.png',
              'http://orz6nce3e.bkt.clouddn.com/%E5%8D%B7%E7%BA%B8.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B9%BF%E5%B7%BE.png'
            ]},
            {tit:'品牌',con:['七度空间','苏菲','清风','心相印','洁云','竹浆'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E4%B8%83%E5%BA%A6%E7%A9%BA%E9%97%B4.png',
              'http://orz6nce3e.bkt.clouddn.com/%E8%8B%8F%E8%8F%B2.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B8%85%E9%A3%8E.png',
              'http://orz6nce3e.bkt.clouddn.com/%E5%BF%83%E7%9B%B8%E5%8D%B0.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B4%81%E4%BA%91.png',
              'http://orz6nce3e.bkt.clouddn.com/%E7%AB%B9%E6%B5%86.png'
            ]}
          ],
          //进口日化
          [{tit:'进口洗护',con:['进口洗发水','进口沐浴露','进口香皂','进口牙膏','进口牙刷'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E6%B4%97%E5%8F%91%E6%B0%B4.png','http://orz6nce3e.bkt.clouddn.com/%E6%B2%90%E6%B5%B4%E9%9C%B2.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A6%99%E7%9A%82.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E8%86%8F.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%89%99%E5%88%B7.png']},
            {tit:'进口家庭清洁',con:['进口洗衣液','进口除污','进口洗衣皂','进口湿巾'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E6%B4%97%E5%8F%91%E6%B0%B4.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%99%A4%E6%B1%A1.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A6%99%E7%9A%82.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E6%B9%BF%E5%B7%BE.png']},
            {tit:'品牌',con:['清妍萃','哈皮卡','O-ZONE','Jamshed','艾佩丽','德露宝','皓蓝'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E6%B8%85%E5%A6%8D%E8%90%83.png','http://orz6nce3e.bkt.clouddn.com/%E5%93%88%E7%9A%AE%E5%8D%A1.png', 'http://orz6nce3e.bkt.clouddn.com/O-ZONE.png',
              'http://orz6nce3e.bkt.clouddn.com/Jamshed.png','http://orz6nce3e.bkt.clouddn.com/%E8%89%BE%E4%BD%A9%E4%B8%BD.png', 'http://orz6nce3e.bkt.clouddn.com/%E5%BE%B7%E9%9C%B2%E5%AE%9D.png',
              'http://orz6nce3e.bkt.clouddn.com/%E7%9A%93%E8%93%9D.png'
            ]}
          ],
          //茶酒冲饮
          [{tit:'进口酒饮',con:['进口咖啡','洋酒','进口啤酒','进口红酒'],img:[
            'http://orz6nce3e.bkt.clouddn.com/%E5%92%96%E5%95%A1.png','http://orz6nce3e.bkt.clouddn.com/%E6%B4%8B%E9%85%92.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E5%95%A4%E9%85%92.png',
            'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E7%BA%A2%E9%85%92.png']},
            {tit:'养生花茶',con:['红茶','绿茶','水果茶','花茶','保健茶','茶包'],img:['http://orz6nce3e.bkt.clouddn.com/%E7%BA%A2%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E7%BB%BF%E8%8C%B6.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B0%B4%E6%9E%9C%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E8%8A%B1%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E4%BF%9D%E5%81%A5%E8%8C%B6.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E8%8C%B6%E5%8C%85.png','http://orz6nce3e.bkt.clouddn.com/%E4%BF%9D%E5%81%A5%E8%8C%B6.png','http://orz6nce3e.bkt.clouddn.com/%E8%8C%B6%E5%8C%85.png']},
            {tit:'品牌',con:['青宴','高原狐'],img:['http://orz6nce3e.bkt.clouddn.com/%E9%9D%92%E5%AE%B4.png',
              'http://orz6nce3e.bkt.clouddn.com/%E9%AB%98%E5%8E%9F%E7%8B%90.png'
            ]}
          ],
          //粮油调味
          [{tit:'食用油',con:['调和油','葵花籽油','花生油','植物油'],img:['http://orz6nce3e.bkt.clouddn.com/%E8%B0%83%E5%92%8C%E6%B2%B9.png','http://orz6nce3e.bkt.clouddn.com/%E8%91%B5%E8%8A%B1%E7%B1%BD%E6%B2%B9.png',
            'http://orz6nce3e.bkt.clouddn.com/%E8%8A%B1%E7%94%9F%E6%B2%B9.png'
            ,'http://orz6nce3e.bkt.clouddn.com/%E6%A4%8D%E7%89%A9%E6%B2%B9.png']},
            {tit:'厨房调味',con:['酱油','味精','辣椒调料','调味料'],img:['http://orz6nce3e.bkt.clouddn.com/%E9%85%B1%E6%B2%B9.png','http://orz6nce3e.bkt.clouddn.com/%E5%91%B3%E7%B2%BE.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E8%BE%A3%E6%A4%92%E8%B0%83%E5%91%B3%E6%96%99.png','http://orz6nce3e.bkt.clouddn.com/%E8%B0%83%E5%91%B3%E6%96%99.png']},
            {tit:'品牌',con:['老干妈','西湖味精','太太乐','海天','李锦记','湖羊','国良','川崎'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E8%80%81%E5%B9%B2%E5%A6%88.png','http://orz6nce3e.bkt.clouddn.com/%E8%A5%BF%E6%B9%96%E5%91%B3%E7%B2%BE.png', 'http://orz6nce3e.bkt.clouddn.com/%E5%A4%AA%E5%A4%AA%E4%B9%90.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B5%B7%E5%A4%A9.png','http://orz6nce3e.bkt.clouddn.com/%E6%9D%8E%E9%94%A6%E8%AE%B0.png', 'http://orz6nce3e.bkt.clouddn.com/%E6%B9%96%E7%BE%8A.png',
              'http://orz6nce3e.bkt.clouddn.com/%E5%9B%BD%E8%89%AF.png','http://orz6nce3e.bkt.clouddn.com/%E5%B7%9D%E5%B4%8E.png'
            ]}
          ],
          //家庭清洁
          [{tit:'进口家庭清洁',con:['进口洗衣液','进口除污','进口洗衣皂','进口湿巾'],img:[ 'http://orz6nce3e.bkt.clouddn.com/jinkouxi.png','http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%99%A4%E6%B1%A1.png',
            'http://orz6nce3e.bkt.clouddn.com/%E8%BF%9B%E5%8F%A3%E9%A6%99%E7%9A%82.png','http://orz6nce3e.bkt.clouddn.com/%E6%B9%BF%E5%B7%BE.png']},
            {tit:'衣物清洁',con:['洗衣液','肥皂','漂白','柔顺剂','天然皂粉'],img:['http://orz6nce3e.bkt.clouddn.com/xiyiye.png','http://orz6nce3e.bkt.clouddn.com/%E8%82%A5%E7%9A%82.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%BC%82%E7%99%BD.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E6%9F%94%E9%A1%BA%E5%89%82.png','http://orz6nce3e.bkt.clouddn.com/%E5%A4%A9%E7%84%B6%E7%9A%82%E7%B2%89.png']},
            {tit:'品牌',con:['蓝月亮','奥妙','虹丝克润','雕牌','威猛先生'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E8%93%9D%E6%9C%88%E4%BA%AE.png','http://orz6nce3e.bkt.clouddn.com/%E5%A5%A5%E5%A6%99.png', 'http://orz6nce3e.bkt.clouddn.com/%E8%99%B9%E4%B8%9D%E5%85%8B%E6%B6%A6.png'
              ,'http://orz6nce3e.bkt.clouddn.com/%E9%9B%95%E7%89%8C.png', 'http://orz6nce3e.bkt.clouddn.com/%E5%A8%81%E7%8C%9B%E5%85%88%E7%94%9F.png'
            ]},
            {tit:'厨房清洁',con:['抽纸','卷纸','湿纸巾','洗洁精'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E7%BA%B8%E5%93%81png.png','http://orz6nce3e.bkt.clouddn.com/%E5%8D%B7%E7%BA%B8.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B9%BF%E5%B7%BE.png',
              'http://orz6nce3e.bkt.clouddn.com/%E6%B4%97%E6%B4%81%E7%B2%BE.png'
            ]}
          ],
          //家居建材
          [
            {tit:'五金配件',con:['五金配件'],img:[
              'http://orz6nce3e.bkt.clouddn.com/%E4%BA%94%E9%87%91%E9%85%8D%E4%BB%B6.png'
            ]}
          ]
        ],
        cla_del:[],
      }
    },
    components:{
      comSearch,comFooter,
    },
    methods:{
      posttypes(index,type){
        this.cal_del= this.cla_del_show[index];
        this.type_s=type.name;
        this.isAct=index+1;
        //  console.log(this.isActive)
        this.type_sid=type.id;
      },
      gotoNextPage(val){
        m$.sessionStores.set('indexSearch',val.val);
        this.$router.push('/goodsItem/0');
      },
    },
    mounted(){
      var classify=document.getElementById('classify');
    },
    created(){
      this.cal_del=this.cla_del_show[0];
      this.getAjax(this.sData.url.getAllBusinessTypeUrl,{},(res)=>{
        //配置导航栏
        for(var i =0; i<res.data.length;i++){
        if( i != 4 && i!= 5){//去点家装 和 礼品中心
          var ii = {};
          ii.name = res.data[i].name//导航名字
          ii.url =`/goodsItem/${i+1}`;//导航地址
          ii.id=res.data[i].id;
          ii.icon=res.data[i].icon;
          //this.nav.push(ii)
        }
      }
    });

    }
  }
</script>
<style scoped lang="less">
  .imgind{z-index: 9;}
  .classify_banner{
    position: relative;
    height: 1.35rem;width: 100%;
    .classify-img{
      position: absolute;
      width: 100%;
    }
  }
  #classify{
    position:fixed;
    bottom:0;
    top:0;
    background: #F3F5F7;
    width: 100%;
    .search_wrap{
      border-bottom: 1px solid #ccc;
      padding:0.1rem;
      img{

      }
    }
    .search_wrap:after{
      content:'';
      display: block;
      clear: both;
    }
    .classify_wrap{
      width: 27%;
      ul{
        list-style: none;
        //font-size: 0.3rem;
        font-size:12px;
        >li{
          padding:0.3rem 0.35rem;
          background: #FFF;
        }
        li.active{
          background: #F3F5F7;
          color:#fb4874;
        }
      }
    }
    .classify_det_wrap{
      // font-size: 0.2rem;
      font-size: 11px;
      position:absolute;
      top:0;
      right:0.1rem;
      width:70%;
      overflow: scroll;
      height: 100%;
      .cal_wrap{
        .cal_tit{
          text-align: center;
          padding:0.15rem;
          //  font-weight: bold;
        }
      }
    }
  }
</style>
