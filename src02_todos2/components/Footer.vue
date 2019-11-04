<template>
  <div class="todo-footer">
    <label>
     <!--  <input type="checkbox" v-model="isCheckAll"/> -->
     <slot name="left"></slot>
    </label>
    <slot name="center"></slot>
   <!--  <span>
      <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
    </span> 
    -->
    <slot name="right">默认界面</slot>
    <!-- <button class="btn btn-danger" v-show="completeSize>0" @click="clearAllComplete">清除已完成任务</button> -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
   
    
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
