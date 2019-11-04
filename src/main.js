/*
入口js
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

// 声明使用vue插件
Vue.use(VueResource) // 给所有组件对象添加了一个属性$http对象, 包含发ajax请求的方法get()/post()

new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')