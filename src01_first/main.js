/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'

// 定义全局组件
Vue.component('MyComponent', {
  data () {
    return {
      msg: 'atguigu'
    }
  },
  template: '<h2>{{msg}}</h2>'
})

new Vue({
  // el: '#app'
  components: { // 注册组件 ==> 指定标签名
    App
  },
  template: '<App />'
}).$mount('#app')

new Vue({
  template: '<MyComponent />'
}).$mount('#app2')

