import axios, { AxiosHeaders, AxiosError } from 'axios'
import { showError } from '@/utilities/message'
import router from '@/router'
import { getCookie, removeCookie } from 'typescript-cookie'



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 3000
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getCookie('token');
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
    // 呼叫後端失敗，若為權限失敗要跳轉頁面，其餘 errorCallBack
    if (error && error.response && error.response.status) {
      if (401 == error.response.status){
        let message = error.response.data ? error.response.data.message : undefined;
        showError("權限錯誤", message ? message : "" );
  
        // 清空登入資訊
        const domainValue =  window.location.hostname;
        const pathValue =  window.location.pathname;
        removeCookie('token', {path: pathValue, domain: domainValue})
        removeCookie('account', {path: pathValue, domain: domainValue})

        // 跳轉至 login
        router.push('/login');

      }else {
        return Promise.reject(error.response.data)
      }
    }
  }
)

export default axiosInstance
