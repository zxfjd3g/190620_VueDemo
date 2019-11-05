/* 
应用中所有路由配置的数组
*/
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

export default [
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
            name: 'detail',  // 标识名称
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