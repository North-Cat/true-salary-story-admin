<template>
  <router-view></router-view>
  <!-- 通知 -->
  <notifications position="top right" class="my-notification" :duration="3000" :max="5"/>
  <!-- modal -->
  <default-modal></default-modal>
</template>

<script setup lang="ts">
import router from './router';
import { useAdminStore } from '@/stores/admin';
import defaultModal from '@/component/defaultModal.vue';

router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore();
  const isLogin = adminStore.isLogin; // 是否有登入

  // 測試用
  if (to.name === 'guideline'){
    next();
  }


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