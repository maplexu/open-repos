import axios from 'axios'

const $http = axios.create({
  baseURL: '/proxy',
  timeout: 10000
})

$http.interceptors.request.use(function (config) {
  return config
}, function (err) {
  return Promise.reject(err)
})

$http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default $http
