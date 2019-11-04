/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  // 配置应用中所有路由
  routes: [
    // 一般路由
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
  ]
})