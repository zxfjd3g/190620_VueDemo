/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'

import './base.css'

// 创建一个全局事件总线对象, 并保存Vue的原型对象上(让所有的组件对象都能看到)
// Vue.prototype.$globalEventBus = new Vue()
Vue.prototype.$eventBus = new Vue()
// Vue.prototype.$bus = new Vue()

new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')