<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router'

const router = useRouter()
const adminStore = useAdminStore();
function login() {
  adminStore.isLogin = true;
  router.push('/');
}


</script>

<template>
  <main>
    <h1>LOGIN</h1>
    <button @click="login">測試登入</button>
  </main>
</template>
