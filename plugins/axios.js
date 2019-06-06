import axios from 'axios'

let options = {}
if (process.server) {
  options.baseURL = 'https://admin.77dress.cn'
}

export default axios.create(options)
