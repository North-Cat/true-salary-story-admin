import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admini=', {
  state: () => {
    return {
      isLogin: false,
    };
  }
});
