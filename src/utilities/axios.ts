import axios, { AxiosHeaders } from 'axios';
import { showError } from '@/utilities/message';
import router from '@/router';
import { getCookie } from 'typescript-cookie';
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 開啟 loading
    showLoadingMask();

    const token = getCookie('token');
    if (token) {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  function (error) {
    // 關閉 loading
    hideLoadingMask();
    return Promise.reject(error.response.data.error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    // 關閉 loading
    hideLoadingMask();

    return response;
  },
  function (error) {
    // 關閉 loading
    hideLoadingMask();

    // 呼叫後端失敗，若為權限失敗要跳轉頁面，其餘 errorCallBack
    if (error && error.response && error.response.status) {
      if (401 == error.response.status) {
        const message = error.response.data ? error.response.data.message : undefined;
        showError('權限錯誤', message ? message : '');

        // 清空登入資訊
        document.cookie = 'token=';
        document.cookie = 'account=';

        // 跳轉至 login
        router.push('/login');
      } else {
        return Promise.reject(error.response.data);
      }
    }
  },
);

/* 開啟 Loading 圈圈 */
function showLoadingMask() {
  const loading = useLoadingStore();
  const { setLoadingCount, showLoading } = loading;
  const { loadingCount } = storeToRefs(loading);

  setLoadingCount(loadingCount.value + 1);
  showLoading();
}

/* 關掉 Loading 圈圈 */
function hideLoadingMask() {
  const loading = useLoadingStore();
  const { setLoadingCount, hideLoading } = loading;
  const { loadingCount } = storeToRefs(loading);

  setLoadingCount(loadingCount.value - 1);
  if (loadingCount.value <= 0) {
    setLoadingCount(0);
    hideLoading();
  }
}

export default axiosInstance;
