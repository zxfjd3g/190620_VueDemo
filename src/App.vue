<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos"/>

      <Footer/>
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
        todos: [
          {id: 1, title: 'A', complete: false},
          {id: 2, title: 'B', complete: true},
          {id: 4, title: 'C', complete: false},
        ]
      }
    },

    methods: {
      // 增加
      addTodo (todo) {
        this.todos.unshift(todo)
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
