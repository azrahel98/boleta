import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://192.168.18.125:8000',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Bearer: localStorage.getItem('jwt')
  }
})
