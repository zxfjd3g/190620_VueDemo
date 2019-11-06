## 1. vue脚手架

	用来创建vue项目的工具包
	创建项目:
	    npm install -g @vue/cli
      vue create vue-demo   // 创建基于3的项目
      npm install -g @vue/cli-init
      vue init webpack vue-demo  // 登陆基于2的项目
	开发环境运行:
	    cd VueDemo
	    npm install
	    npm run dev
	生产环境打包发布
	    npm run build
	    npm install -g serve
	    serve dist
	    http://localhost:5000


## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程
    vue文件包含3个部分
        <template>
          <div></div>
        </template>
        <script>
          export default {
            props: []/{}
            data(){},
            computed: {}
            methods: {},
            watch: {}
            filters: {}
            directives: {}
            components: {}
          }
        </script>
        <style>
        </style>
    组件化编码的基本流程
        1). 拆分界面, 抽取组件
        2). 编写静态组件
        3). 编写动态组件
            初始化数据, 动态显示初始化界面
            实现与用户交互功能

## 4. 组件间通信
    1). 组件通信的5种方式
        props
        vue的自定义事件
        全局事件总线
        slot
        vuex(后面单独讲)
    2). props:
        父子组件间通信的基本方式
        属性值的2大类型:
            一般/非函数: 父组件-->子组件
            函数: 子组件-->父组件
        隔层组件间传递: 必须逐层传递(麻烦)
        兄弟组件间: 必须借助父组件(麻烦)
    2). vue自定义事件
        给子组件标签绑定事件监听
        子组件向父组件的通信方式
        功能类似于function props
        不适合隔层组件和兄弟组件间的通信
    3). 全局事件总线
        利用vm对象的$on()/$emit()/$off()
        利用vm对象是组件对象的原型对象
        创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
          Vue.prototype.$bus = new Vue()
            任意组件A可以通过this.$bus.$on()绑定监听接收数据
        任意组件B可以通过this.$bus.$emit()分发事件, 传递数据
    4). slot
        父组件向子组件通信
        通信是带数据的标签
        注意: 标签是在父组件中解析
    5). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比事件总线强大, 更适用于vue项目

## 5. 自定义全局事件总线: mini-event-bus
	1). EventBus: 事件总线是一个对象, 是组件间进行通信的共用桥梁, 它包含了用于通信的方法
	2). EventBus的方法
      on(eventName, listener): 绑定事件监听---保存监听回调
      emit(eventName, data): 分发事件---触发所有对应的监听回调调用, 并传入data
      off(eventName): 解绑事件监听---移除对应的所有监听回调
	3). 内部存储listener的容器数据结构:
      {
        eventName1: [listener1, listener2],
        eventName2: [listener3]
      }

## 6. ajax
    相关库:
        vue-resource: vue插件, 多用于vue1.x
        axios: 第三方库, 多用于vue2.x
    vue-resource使用
        // 引入模块
        import VueResource from 'vue-resource'
        // 使用插件
        Vue.use(VueResource)

        // 通过vue/组件对象发送ajax请求
        this.$http.get('/someUrl').then((response) => {
          // success callback
          console.log(response.data) //返回结果数据
        }, (response) => {
          // error callback
          console.log(response.statusText) //错误信息
        })
    axios使用
        // 引入模块
        import axios from 'axios'

        // 发送ajax请求
        axios.get(url)
          .then(response => {
            console.log(response.data) // 得到返回结果数据
          })
          .catch(error => {
          console.log(error.message)
          })
    执行ajax的时机
        mounted()
        事件回调函数
    解决开发时ajax跨域的问题: 配置代理

## 7. vue UI组件库
    常用的UI组件库
        PC: Element / iview /
        Mobile: mint-ui / cube-ui / vant
    mint-ui的使用
        根据官方文档使用
        按需打包

## 8. vue-router
    vue用来实现SPA的插件
    使用vue-router
        1. 创建路由器: router/index.js
          new VueRouter({
            mode: 'hash/history'
            routes: [
              { // 一般路由
                path: '/about',
                component: About
              },
              { // 自动跳转路由
                path: '/',
                redirect: '/about'
              }
            ]
          })
        2. 注册路由器: main.js
           import router from './router'
           	new Vue({
           		router
           	})
        3. 使用路由组件标签:
           	<router-link to="/xxx">Go to XXX</router-link>
           	<router-view></router-view>
        4. 2个对象
            $router: 代表路由器对象, 包含一些实现路由跳转/导航的方法: push()/replace()/back()
            $route: 代表当前路由对象, 包含一些路由相关的属性: path/params/query/meta
    编写路由的3步
        1. 定义路由组件
        2. 映射路由
        3. 编写路由2个标签
    嵌套路由
        children: [
            {
              path: '/home/news/:xxx/:yyy',
              component: news
            },
            {
              path: 'message',
              component: message
            }
        ]
    向路由组件传递数据
        params/query: <router-link to="/home/news/abc/123?zzz=1234">
        将请求参数映射成props: props: route => ({id: route.params.id})
        变相props: <router-view msg='abc'>
    缓存路由组件对象
        路由组件对象默认的生命周期: 被切换时就会死亡, 切换回来时重新创建
        <keep-alive exclude="A" include="A">
          <router-view></router-view>
        </keep-alive>
    路由的编程式导航
        this.$router.push({path: ''}): 相当于点击路由链接(可以返回到当前路由界面)
        this.$router.replace({name: '', params: {}}): 用新路由替换当前路由(不可以返回到当前路由界面)
        this.$router.back(): 请求(返回)上一个记录路由
