<template>
  <div>
    <h2>App组件</h2>
    <img class="logo" src="./assets/logo.png" alt="logo">
    <HelloWorld/>
    <MyComponent/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  export default {
    components: { // 定义局部组件
      HelloWorld
    }
  }
</script>

<style>
  .logo {
    width: 200px;
    height: 200px;
  }
</style>
