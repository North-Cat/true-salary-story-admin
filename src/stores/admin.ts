import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admini=', {
  state: () => {
    return {
      isLogin: false,
    };
  },
  actions: {
    login(username: string, password: string) {
      // TODO: call 登入 api 並儲存 token
      const token = 'token';
      localStorage.setItem('auth_token', token);
      this.isLogin = true;
    },
    
    logout() {
      localStorage.removeItem('auth_token')
      this.isLogin = true;
    },
  }
});
