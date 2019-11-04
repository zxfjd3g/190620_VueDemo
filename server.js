const express = require('express')
const axios = require('axios')

const app = express()

// 注册路由
// app.get('/', (req, res) =>{
//   res.send('Hello express!')
// })

app.get('/search/users', (req, res) => {
  const q = req.query.q
  axios.get('https://api.github.com/search/users', {
    params: {
      q
    }
  })
    .then(response => {
      const result = response.data
      res.send(result)
    }).catch(error => {
      console.log(error.message)
    })
})

app.listen('4000', () => {
  console.log('服务器启动成功: http://localhost:4000')
})