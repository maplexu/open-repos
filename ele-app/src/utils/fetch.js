import axios from 'axios'

const service = axios.create({
  timeout: 10000
})

//request拦截
service.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(error);
})

//response拦截
service.interceptors.response.use( res => {
  return res.data;
}, error => {
  return Promise.reject(error);
})

export default service
