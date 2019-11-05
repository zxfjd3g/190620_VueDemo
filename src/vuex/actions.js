/* 
包含n个用于间接更新状态数据的方法的对象
*/
import axios from 'axios'
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from './mutation-types'

export default {
  
  /* 
  搜索的异步action
  */
  async searchAsync ({commit}, searchName) {
    // 更新状态(请求中)
    commit(REQUESTING)

    // 发异步ajax请求
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
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 如果失败了, 更新数据(失败)
      commit(REQ_ERROR, error.message)
    }
  }
}