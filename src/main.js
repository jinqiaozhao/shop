// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import resource from 'vue-resource';
import myResource from './resource/myResource';
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element);
Vue.use(resource);
Vue.config.productionTip = false
for(var key in myResource){
  (Vue.prototype)[key]=myResource[key];
};
(Vue.prototype)['newChangeYangbinCode']=newChangeYangbinCode;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
