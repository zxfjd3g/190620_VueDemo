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
  export default {
    data () {
      return {
        count: 0
      }
    },

    computed: {
      evenOrOdd () {
        return this.count %2 === 0 ? '偶数' : '奇数'
      }
    },

    methods: {
      increment () {
        this.count++
      },
      decrement () {
        this.count--
      },
      incrementIfOdd () {
        if (this.count %2 === 1) {
          this.count++
        }
      },
      incrementAsync () {
        setTimeout(function ()  {
          this.count++
        }.bind(this), 1000);
      },
    }
  }

</script>

<style>
</style>
