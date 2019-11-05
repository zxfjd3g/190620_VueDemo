<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      search () {
        const searchName = this.searchName.trim()
        if (searchName) {
          // 触发发请求的异步action执行
          this.$store.dispatch('searchAsync', searchName)
        }
      }
    }
  }
</script>

<style scoped>

 
</style>
