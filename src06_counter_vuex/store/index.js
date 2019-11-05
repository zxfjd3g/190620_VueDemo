/* 
vuex最核心的管理对象: store
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* 
相当于vue中的data对象
*/
const state = {
  count: 1 // 初始化数据
}

/* 
一个包含n个用于直接更新状态数据的方法的对象
方法只能包含更新数据的同步代码
*/
const mutations = {
  INCREMENT (state) {
    state.count++
  },

  DECREMENT (state) {
    state.count--
  }
}

/* 
一个包含n个用于间接更新状态数据的方法的对象
*/
const actions = {
  /* increment ({commit}) { // 实参是对象, 对象包含commit方法
    // 提交给mutation
    commit('INCREMENT')
  },

  decrement ({commit}) {
    // 提交给mutation
    commit('DECREMENT')
  }, */

  // 同步action
  incrementIfOdd ({commit, state}) { 
    if (state.count%2===1) { // 在action中执行逻辑处理
      // 提交给mutation
      commit('INCREMENT')
    }
  },

  // 异步action
  incrementAsync ({commit}) {
    // 启动异步任务
    setTimeout(() => {
      // 有了结果后, 提交给mutation
      commit('INCREMENT')
    }, 1000);
  },
}

/* 
一个包含n个基于state数据的getter计算属性的方法的对象
*/
const getters = {
  evenOrOdd (state) {
    return state.count %2===1 ? '奇数' : '偶数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})