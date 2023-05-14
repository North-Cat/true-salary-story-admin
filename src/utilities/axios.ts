import axios, { AxiosHeaders } from 'axios'
import { useAdminStore } from '@/stores/admin'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 3000
})

axiosInstance.interceptors.request.use(
  function (config) {
    const adminStore = useAdminStore()
    const token = adminStore.token
    if (token) {
      ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  function (error) {
    return Promise.reject(error.response.data.error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error.response.data)
  }
)
export default axiosInstance
