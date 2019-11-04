<template>
  <div class="container">
    <mt-button type="danger" @click="hint" style="width: 100%">danger</mt-button>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
    
    methods: {
      hint () {
        MessageBox('提示', '操作成功')
      }
    }
  }
</script>

<style>
</style>
