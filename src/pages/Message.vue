<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <!-- <router-link :to="'/home/message/detail/' + message.id">{{message.title}}</router-link> -->
        <!-- <router-link :to="{path: '/home/message/detail/' + message.id}">{{message.title}}</router-link> -->
        <router-link :to="{name: 'detail', params: {id: message.id}}">{{message.title}}</router-link>
        --<button @click="pushShow(message.id)">push查看</button>
        --<button @click="replaceShow(message.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">回退</button>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 3, title: 'message003'},
          {id: 5, title: 'message005'}
        ]
        this.messages = messages
      }, 1000)
    },

    methods: {
      pushShow (id) {

        console.log('先执行一些逻辑处理')

        // this.$router.push('/home/message/detail/' + id)
        // this.$router.push({path: '/home/message/detail/' + id})
        this.$router.push({name: 'detail', params: {id}})
      },

      replaceShow (id) {
        // this.$router.push('/home/message/detail/' + id)
        // this.$router.push({path: '/home/message/detail/' + id})
        this.$router.replace({name: 'detail', params: {id}})
      }
    }
  }
</script>

<style scoped>

 
</style>
