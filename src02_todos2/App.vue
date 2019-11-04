<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header :addTodo="addTodo" /> -->
      <!-- <Header @addTodo="addTodo" /> --> <!-- 的父组件中给子组件对象绑定自定义事件监听 -->
      <Header ref="header"/> 
      <List :todos="todos" :updateTodo="updateTodo"/>

      <Footer>
        <span slot="center">
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span> 
        <input type="checkbox" v-model="isCheckAll" slot="left"/>
        <button class="btn btn-danger" v-show="completeSize>0" @click="clearAllComplete" slot="right">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Header from './components/Header'
  import List from './components/List'
  import Footer from './components/Footer'
  export default {

    data () {
      return {
        todos: [],
        xxx: 2
      }
    },

    computed: {
      completeSize () {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },

      isCheckAll: {
        get  () {
          return this.todos.length === this.completeSize && this.completeSize>0
        },
        set (value) { // 用户进行勾选操作
          this.selectAll(value)
        }
      }
    },

    mounted () {
      // 组件对象的原型(父)对象就是一个vm对象
      console.log('App mounted()', this, new Vue())

      // 给header组件对象绑定自定义事件监听
      this.$refs.header.$on('addTodo', this.addTodo)
      // this.$on('addTodo', this.addTodo)   // 不可以

      // 通过事件总线对象绑定事件监听(deleteTodo))
      this.$eventBus.$on('deleteTodo', this.deleteTodo)

      setTimeout(() => {
        // 读取local保存的todos数据
        const todos = JSON.parse(localStorage.getItem('todos_key') || '[]')
        // 更新数据
        this.todos = todos
      }, 1000);
    },

    // 在组件对象死亡前, 解绑事件监听
    beforeDestroy () {
      this.$eventBus.$off('deleteTodo')
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        handler: (value) => { // todos的最新的值
          // 将最新todos保存local中
          localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    },


    methods: {
      // 增加
      addTodo (todo) {
        console.log('addTodo()')
        this.todos.unshift(todo)
      },
      // 删除
      deleteTodo (id) {
        this.todos = this.todos.filter(todo => id!==todo.id)
      },
      // 全选/全不选
      selectAll (check) {
        this.todos.forEach(todo => todo.complete = check)
      },
      // 清除所有已完成的
      clearAllComplete () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },

      // 更新todo的complete值
      updateTodo (todo, isCheck) {
        todo.complete = isCheck
      }
    },

    components: { // 定义局部组件
      Header,
      List,
      Footer
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
