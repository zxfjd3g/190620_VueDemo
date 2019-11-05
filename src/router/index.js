/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 不带#
  // 配置应用中所有路由
  routes
})