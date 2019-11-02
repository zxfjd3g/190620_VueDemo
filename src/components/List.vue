<template>
  <ul class="todo-main">
    <Item v-for="todo in todos" :key="todo.id" :todo="todo" :deleteTodo="deleteTodo"/>
  </ul>
</template>

<script type="text/ecmascript-6">
  import Item from './Item'
  export default {
    name: 'List',
    // 声明接收标签属性: 属性名
    // 结果: 接收到的属性会成为当前组件对象的属性: this.todos
    // 组件对象: 相当于是一个小的vm对象
    props: ['todos', 'deleteTodo'],
    components: {
      Item
    }
  }
</script>

<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
