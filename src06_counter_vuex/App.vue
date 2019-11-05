<template>
  <div>
    <p>clicked {{count}} times, count is {{evenOrOdd}}</p>

    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">incrment if odd</button>
    <button @click="incrementAsync">incrment async</button>
  </div>
</template>

<script>

  /* 
  store对象:
    得到: this.$store
    使用: 
        读数据:
          this.$store.state.xxx
          this.$store.getters.yyy
        写数据:
          this.$store.dispatch('actionName')
          this.$store.commit('mutationName')
  */

  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
   
    mounted () {
      console.log(this.$store)
    },

    /* computed: {
      count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }
    }, */

    computed: {
      ...mapState(['count']),  // {count: function (){return this.$store.state['count']}}
      ...mapGetters(['evenOrOdd']) // {evenOrOdd () {return this.$store.getters['evenOrOdd']}}
    },

    methods: {
      ...mapMutations({
        increment: 'INCREMENT',
        decrement: 'DECREMENT'
      }),
      ...mapActions(['incrementIfOdd', 'incrementAsync']),
    }

    /* methods: {
      increment () {
        console.log('aaa')
        this.$store.commit('INCREMENT')
      },
      decrement () {
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        this.$store.dispatch('incrementAsync')
      },
    } */
  }

</script>

<style>
</style>
