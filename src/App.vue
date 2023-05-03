<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import router from './router';
import { useAdminStore } from '@/stores/admin';

router.beforeEach((to, from, next) => {
  // 取用 pinia 一定要寫在 router.beforeEach 裡面才有用
  const adminStore = useAdminStore();
  const isLogin = adminStore.isLogin; // 是否有登入
  if (to.name === 'login' && isLogin){
    // 如果已經登入就不用再進登入頁，轉到頁面
    next('/');
  }else if (to.name !== 'login' && !isLogin) {
    // 如果還沒登入，就轉到登入頁面
    next('/login');
  }else{
    next();
  }
});

</script>