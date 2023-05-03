<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router'

const router = useRouter()
const adminStore = useAdminStore();
function logout() {
  adminStore.logout();
  router.push('/login');
}

</script>

<template>
  <main>
    <h1>Home</h1>
    <button @click="logout">測試登出</button>
  </main>
</template>
