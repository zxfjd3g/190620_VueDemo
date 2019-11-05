/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  components: {
    App
  },
  template: '<App/>',
  store // 配置vuex的store对象  ===> 所有组件对象都能看到这个store对象: $store
}).$mount('#app')