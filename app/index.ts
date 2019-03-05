import * as http from 'http'
import API from './api'

const port = process.env.PORT || 3000

API.listen(port, (err) => {
  if (err) return console.log(err)
  return console.log(`API server is listening on ${port}`)
})
