import Axios, { AxiosError } from 'axios';
// import Store from '@/store/index.js'
import Router from '@/router/index.js'
// import Log from '@/services/log.service.js'
import { useAdminStore } from '@/stores/admin';

/*
	ajax/form service
	request pattern
		token : JWT 權限認證，系統自帶，沒有導回 login page
		source : 發送系統，系統自帶，e.g. MobileCounter
		data : 商務邏輯資料，這邊就交給 PG 送
	response pattern
		status code : 後端 AP 回傳的狀態碼
		分類 : success, notification, form
		詳細狀態碼可再設計
		message : 需處理的訊息，e.g. vaildate message
		{form field : vaildate msg} or {error msg : 非4G門號無法使用}
		data : 商務邏輯資料，這邊就交給 PG 送
	response pattern (exception)
		http status code : 4xx, 500
		errorhandler : 發生錯誤統一處理，return page or notification，並記錄下 error log
	header service
	跨網站傳送訊息，e.g. token
*/

/* 新增 axios request 攔截器 */
Axios.interceptors.request.use(function (config) {
	// 取得 token 放入 header，供後端驗證
	const adminStore = useAdminStore();
    const token = adminStore.token;
	if (token?.trim() != undefined && token?.trim() != '') {
		config.headers.Authorization = `Bearer ${token}`;
		// config.headers.system = Store.state.agent.system;
	}
	// showLoading(); // 開啟 Loading 圈圈
	return config;

}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

/* 新增 axios response 攔截器 */
// Axios.interceptors.response.use(function (response) {
	// window.console.info(response);
// 	closeLoading(); // 關掉 Loading 圈圈
	
// 	// 將後端給的 token 存入 state，待下一次 request 時送給後端
// 	if(response && response.headers && response.headers.token) {
// 		Store.dispatch('setToken', response.headers.token);
// 	}
// 	return response;

// }, function (error) {
// 	window.console.error(error);
// 	closeLoading(); // 關掉 Loading 圈圈
// 	return Promise.reject(error);
// });

const AjaxService = {
	/* 強制關掉 Loading 圈圈 */
	// closeLoading(){
	// 	Store.dispatch('setAjaxCount', 0);
	// 	Store.dispatch("hideAjaxBlock");
	// },
	/* ajax post */
	async post(actionName:string, url:string, data:object, callBack:Function, errorCallBack:Function, urlParam?:object) {
		// Log.info(`Action: ${actionName} START`);
	
		Axios.post(`${url}`, data, {
			params: urlParam
		})
		.then((response) => {
			// Log.info(`Action: ${actionName} END`);
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
	/* ajax post Excel 匯出用 */
	// async postExcelFile(actionName, url, data, callBack, errorCallBack) {
	// 	// Log.info(`Action: ${actionName} START`);

	// 	Axios.post(`${url}`, data, {
	// 		responseType: 'arraybuffer'
	// 	})
	// 	.then((response) => {
	// 		// Log.info(`Action: ${actionName} END`);
	// 		// 1. 處理正常回傳
	// 		if (response && response.headers && response.data) {
	// 			// 認 Header 的 content-type，判斷要跳訊息還是要下載檔案
	// 			const contentType = response.headers['content-type'];
	// 			if (contentType) {
	// 				// 回傳這個表示要跳訊息
	// 				if (contentType.indexOf('json') !== -1) {
	// 					const text = Buffer.from(response.data).toString('utf8');
	// 					let jsonObj = JSON.parse(text);
	// 					callBack(jsonObj);
	// 				} else {
	// 					downloadFile(response);
	// 					callBack({
	// 						success: true
	// 					});
	// 				}
	// 			}
	// 		}
	// 	}).catch((error) => {
	// 		// Log.error(error);
	// 		// 呼叫後端失敗，若為權限失敗要跳轉頁面，其餘 errorCallBack
	// 		if (checkAuthorized(error)) {
	// 			if (errorCallBack) {
	// 				// 有給自定義要執行的 error call back 的 function
	// 				errorCallBack(error);
	// 			}
	// 		}
	// 	});
	// },
};

/* 下載檔案 */
// function downloadFile(response) {
// 	let filename = moment().format('YYYY-MM-DD') + '.xls';
// 	// 取後端傳回的檔案名稱
// 	const contentDisposition = response.headers['content-disposition'];
// 	if (contentDisposition) {
// 		if (contentDisposition.indexOf('filename=') !== -1) {
// 			let filenameStr = contentDisposition.substring(contentDisposition.indexOf('filename='));
// 			let filenameArr = filenameStr.split('=');
// 			filename = decodeURI(filenameArr[1]);
// 		}
// 	}

// 	// 下載檔案
// 	const url = window.URL.createObjectURL(new Blob([response.data]));
// 	const link = document.createElement('a');
// 	link.href = url;
// 	link.setAttribute('download', filename); //or any other extension
// 	document.body.appendChild(link);
// 	link.click();
// 	link.remove();
// 	window.URL.revokeObjectURL(url);
// }

/* 開啟 Loading 圈圈 */
// function showLoading() {
// 	// Ajax 計數 + 1
// 	Store.dispatch('setAjaxCount', Store.state.ajaxCount + 1);
// 	Store.dispatch("showAjaxBlock");
// }

/* 關掉 Loading 圈圈 */
// function closeLoading() {
// 	// Ajax 計數 - 1
// 	Store.dispatch('setAjaxCount', Store.state.ajaxCount - 1);
// 	if (Store.state.ajaxCount <= 0) {
// 		Store.dispatch('setAjaxCount', 0);
// 		Store.dispatch("hideAjaxBlock");
// 	}
// }

/* 判斷權限驗證是否通過 */
// function checkAuthorized(error:AxiosError) {
// 	if (error != null) {
// 		if (error.response && error.response.status) {
// 			// token 驗證失敗回傳 401，導頁至權限失敗頁面
// 			if (401 == error.response.status) {
// 				let message = error.response.data ? error.response.data.message : null;
// 				Router.push({
// 					path: "/authFailed",
// 					query: {
// 						message: message
// 					}
// 				});
// 				return false;
// 			}
// 		}
// 	}
// 	return true;
// }

export default AjaxService;