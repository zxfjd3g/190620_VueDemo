/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mint-ui'

// 注册全局组件
Vue.component(Button.name, Button)  // mt-button

new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')