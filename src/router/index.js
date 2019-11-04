/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 不带#
  // 配置应用中所有路由
  routes: [
    // 一般路由
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/news',
          component: News
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              path: '/home/message/detail/:id',
              component: MessageDetail
            }
          ]
        },
        {
          path: '/home',
          redirect: '/home/news',
        }
      ]
    },
    // 自动跳转路由
    {
      path: '/',
      redirect: '/about'
    }
  ]
})