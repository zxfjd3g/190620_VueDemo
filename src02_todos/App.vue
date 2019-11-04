<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>

      <Footer :todos="todos" :selectAll="selectAll" :clearAllComplete="clearAllComplete"/>
    </div>
  </div>
</template>

<script>
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

    mounted () {
      setTimeout(() => {
        // 读取local保存的todos数据
        const todos = JSON.parse(localStorage.getItem('todos_key') || '[]')
        // 更新数据
        this.todos = todos
      }, 1000);
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
