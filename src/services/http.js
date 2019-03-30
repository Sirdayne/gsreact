import axios from 'axios'
import BASE_URL from './BASE_URL'
import Auth from './Auth'

const TIMEOUT = 5 * 60 * 1000

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  config.headers['Authorization'] = Auth.getToken()
  config.headers['X-TenantID'] = Auth.getTenant()
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  let message = error.response.data && error.response.data.message ? error.response.data.message : error
  console.log(message)
  return Promise.reject(error)
})

export default api
