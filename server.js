const express = require('express')

const app = express()

// https://api.github.com/search/repositories?q=v&sort=stars
app.get('/search/repositories', (req, next) => {
  const {q, sort} = req.query
  axios('https://api.github.com/search/repositories', {
    params: {q, sort}
  }).then(response => {
    // const response.data
  })
})

app.listen('4000', () => {
  console.log('server启动成功!, http://localhost:4000')
})