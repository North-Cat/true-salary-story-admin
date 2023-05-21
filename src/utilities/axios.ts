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
    if (checkAuthorized(error)) {
      return Promise.reject(error.response.data)
    }
  }
)


// 判斷權限驗證是否通過
function checkAuthorized(error : AxiosError) {
  if (error && error.response && error.response.status) {
    // token 驗證失敗回傳 401，導頁至權限失敗頁面
    if (401 == error.response.status) {
      let message = error.response.data ? error.response.data.message : undefined;
      showError("權限錯誤", message ? message : "" );

      // 清空登入資訊
      removeCookie('token');
      removeCookie('account');
      // 跳轉至 login
      router.push('/login');

      return false;
    }
  }
	return true;
}

export default axiosInstance
