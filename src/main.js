import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import axios from "axios";
Vue.prototype.axios = axios;

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue();

fastClick.attach(document.body);

Vue.use(vueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
