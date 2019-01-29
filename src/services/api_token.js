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
  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
