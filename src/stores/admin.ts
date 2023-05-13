import { defineStore } from 'pinia';
import Axios from 'axios';
import { showInfo, showError, showSuccess } from "@/utilities/message";


export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      isLogin: false,
      token: '',
      account: ''
    };
  },
  persist: true, // 預設將 state 儲存至 localStorage
  actions: {
    async signup(account: string, password: string) {
      await Axios.post('/api/admin/signup', 
      {
        account: account,
        password: password
      })
      .then((response) => {
        const token = response.data.data.token;
        this.token = token;
        this.isLogin = true;
        this.account = account;
        this.router.push('/');
      })
      .catch((error) => {
        console.log(error);
        showError("註冊失敗", error.response.data.message);
      });
    },
    async login(account: string, password: string) {
      await Axios.post('/api/admin/login', 
      {
        account: account,
        password: password
      })
      .then((response) => {
        const token = response.data.data.token;
        this.token = token;
        this.isLogin = true;
        this.account = account;
        this.router.push('/');
      })
      .catch((error) => {
        console.log(error);
        showError("登入失敗", error.response.data.message);
      });
    },
    async logout() {
      await Axios.post('/api/admin/logout')
      .then((response) => {
        const token = response.data.data.token;
        this.isLogin = false;
        this.account = '';
        this.token = '';
        this.router.push('/login');
      })
      .catch((error) => {
        console.log(error);
        showError("登出失敗", error.response.data.message);
      });
    },
  }
});
