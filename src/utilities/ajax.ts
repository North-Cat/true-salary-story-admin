import Axios from 'axios';
import { useAdminStore } from '@/stores/admin';

/* axios request 攔截器 */
Axios.interceptors.request.use(function (config) {
	// 取得 token 放入 header，供後端驗證
	const adminStore = useAdminStore();
    const token = adminStore.token;
	if (token?.trim() != undefined && token?.trim() != '') {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;

}, function (error) {
	return Promise.reject(error);
});

const AjaxUtil = {
	/* ajax post */
	async post(actionName:string, url:string, data:object, callBack:Function, errorCallBack:Function, urlParam?:object) {
		Axios.post(`${url}`, data, {
			params: urlParam
		})
		.then((response) => {
			// 回傳正確資訊
			callBack(response.data);
		})
		.catch((error) => {
			// Log.error(error);
			// 呼叫後端失敗，若為權限失敗要跳轉頁面，其餘 errorCallBack
			// if (checkAuthorized(error)) {
				if (errorCallBack) {
					// 有給自定義要執行的 error call back 的 function
					errorCallBack(error);
				}
			// }
		});
	},
};

export default AjaxUtil;