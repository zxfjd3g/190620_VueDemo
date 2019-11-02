/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'

import './base.css'

new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')