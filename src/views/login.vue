<template>
  <div class="login h-screen w-screen flex justify-center items-center">
    <div class="login-box bg-white border-2 p-10 w-10/12 md:w-[400px]">
      <div>
        <img
          src="../assets/img/LOGO.png"
          alt="LOGO"
          class="w-[120px] md:w-[150px]"
        />
      </div>
      <h2 class="text-blue mt-5 md:text-3xl text-2xl">管理後台</h2>
      <div class="mt-10">
        <input type="text" class="w-full border border-black-1 rounded py-3 px-4 mb-5" placeholder="請輸入帳號" >
        <input type="text" class="w-full border border-black-1 rounded py-3 px-4" placeholder="請輸入密碼">
      </div>
      <div class="mt-10">
        <button 
          @click="login"
          class="w-full flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded">
          登入
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router'

const router = useRouter()
const adminStore = useAdminStore();
function login() {
  adminStore.login('username','password');
  router.push('/');
}
</script>


<style>
  .login {
    background: #f5f5f8;
  }
</style>

