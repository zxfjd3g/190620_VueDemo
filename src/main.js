/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import router from "./router"

new Vue({
  components: {
    App
  },
  template: '<App/>',
  router // 配置路由器
}).$mount('#app')