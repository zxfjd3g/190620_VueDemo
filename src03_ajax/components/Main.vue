<template>
  <div>

    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">正在请求中...</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>

    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="user.username">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        firstView: true,
        loading: false,
        users: [],
        errorMsg: ''
      }
    },

    mounted () {
      // 绑定事件监听
      this.$bus.$on('search', async (searchName) => {
        debugger
        // 更新数据(请求中)
        this.firstView = false
        this.loading = true
        try {
           // 发请求
          const response = await axios({
            url: '/api/search/users', // http://localhost:8080/api/search/users
            params: {
              q: searchName
            }
          })
          // 如果成功了, 更新数据(成功)
          const result = response.data
          const users = result.items.map(item => ({
            username: item.login,
            url: item.html_url,
            avatar_url: item.avatar_url,
          }))
          this.loading = false
          this.users = users
        } catch (error) {
          // 如果失败了, 更新数据(失败)
          this.loading = false
          this.errorMsg = error.message
        }
       

        
      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
