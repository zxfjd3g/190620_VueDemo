<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="isCheck"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Item',
    // 声明接收属性: 属性名/属性值的类型
    props: {
      todo: Object,
      deleteTodo: Function,
      updateTodo: Function
    },
    data () {
      return {
        bgColor: 'white',
        isShow: false
      }
    },

    computed: {
      isCheck: {
        get () {
          return this.todo.complete
        },

        set (value) {
          // this.todo.complte = value  // 不要直接在子组件中直接更新父组件的数据
          this.updateTodo(this.todo, value)
        }
      }
    },

    methods: {
      handleEnter (isEnter) {
        if (isEnter) { // 移入
          this.bgColor = '#cccccc'
          this.isShow = true
        } else { // 移出
          this.bgColor = '#fff'
          this.isShow = false
        }
      },

      deleteItem () {
        if (confirm('确定删除吗?')) {
          this.deleteTodo(this.todo.id)
        }
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
