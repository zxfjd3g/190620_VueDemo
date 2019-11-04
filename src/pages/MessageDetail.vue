<template>
  <ul>
    <li>ID: {{$route.params.id}}</li>
    <li>TITLE: {{detail.title}}</li>
    <li>CONTENT: {{detail.content}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
  const allDetails = [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 3, title: 'message003', content: 'message content003'},
    {id: 5, title: 'message005', content: 'message content005'}
  ]
  export default {
    data () {
      return {
        detail: {}
      }
    },

    /* 
    默认:
    从一个A路由跳转到另一个B路由: A会死亡
    从B跳回到A: A会重新创建
    从A跳转到A: A不会重新创建, 直接复用
    */
    mounted () {
      console.log('Detail mounted()')
      setTimeout(() => {
        const id = this.$route.params.id * 1
        const detail = allDetails.find(detail => detail.id===id)
        this.detail = detail
      }, 1000);
    },

    watch: {
      // $route代表当前路由信息对象
      $route (value) {
        setTimeout(() => {
          const id = value.params.id * 1
          const detail = allDetails.find(detail => detail.id===id)
          this.detail = detail
        }, 1000);
      }
    }
  }
</script>

<style scoped>

 
</style>
