/*
*作者---杨彬
*
*/
<template>
  <div>
    <addr-manage class="allItem" @clickDelete='clickDelete' v-for="(sitem,sindex) in getData" :key="sindex"
                 :sitem="sitem" :sindex="sindex" v-if="getData"></addr-manage>
    <router-link class="button" to="/addressMsg/new" tag="div">
      添加新地址
    </router-link>
  </div>
</template>
<script type="text/javascript">
  import addrManage from 'src/components/address/item.vue';
  export default {
    data(){
      return {
        getData:[],
      }
    },
    components: {addrManage},
    methods: {
      clickDelete(oitem){
        var othis = this;
        console.log(oitem);
        this.postAjax(
          this.url.deleteReceiver, {id: oitem[0].id}, (res) => {
            if (res.code == 200) {
              m$.template({
                time: 1200,
                val: '操作成功',
                fn(){
                  // othis.getData.splice(oitem[2], 1)
                  othis.getAddr()
                }
              })

            }
            else {
              m$.template({
                time: 1200,
                val: res.message
              })
            }
          }
        )
      },
      getAddr(){
        this.getAjax(this.url.findReceiver, {isDefault: '', receiveId: ''}, (res) => {
          var valName = '';
          if (res.code == 200) {
            if (res && res.data.length >= 1) {
              m$.template({
                time: 10,
                val: '',
              });
              this.getData =[];
              var othis=this;
              setTimeout(function () {
                othis.getData = res.data.reverse();
              },1)

            }
            else {
              m$.template({
                time: 1200,
                val: '暂无数据',
              })
            }
          }
          else {
            m$.template({
              time: 1200,
              val: res.message,
            })
          }


        });
      }
    },
    created(){
      m$.template({
        time: '',
        val: '',
      });
      this.getAddr();
      document.title = "地址管理";
      m$.documentTitle("地址管理")
    },
    beforeDestroy(){
      m$.template({
        time: 1,
        val: '',
      })
    }
  }
</script>
<style scoped lang="less">
  .button {
    margin-top: 2.5rem;
    background: #fb4874;
    font-family: PingFangSC-Regular;
    font-size: 0.34rem;
    color: #ffffff;
    letter-spacing: 0.94px;
    line-height: 0.88rem;
    text-align: center;
    height: 0.88rem;
  }
</style>
