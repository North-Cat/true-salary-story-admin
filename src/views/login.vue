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
        <input 
        v-model="account" 
        type="text" 
        class="w-full border border-black-1 rounded py-3 px-4 mb-2" 
        placeholder="請輸入帳號" >
        <input 
        v-model="password" 
        type="password" 
        class="w-full border border-black-1 rounded py-3 px-4" 
        placeholder="請輸入密碼">
        <span class="caption text-black-10">密碼不得低於 8 字元</span>
      </div>
      <div class="mt-8">
        <button 
          @click="login"
          class="w-full flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded mb-2">
          <h6>登入</h6>
        </button>
        <button 
          @click="signup"
          class="w-full flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-blue border border-blue fill-white bg-white hover:bg-blue-light rounded">
          <h6>註冊</h6>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { showInfo,showError,showSuccess } from "@/utilities/message";

const router = useRouter()
const adminStore = useAdminStore();
const account = ref<string>('');
const password = ref<string>('');

function validate(): boolean{
  if (!account.value.trim()){
    showInfo("請輸入帳號");
    return false;
  }
  if (!password.value.trim()){
    showInfo("請輸入密碼");
    return false;
  }
  if (password.value.trim().length < 8){
    showInfo("密碼不得低於 8 字元");
    return false;
  }
  return true;
}
async function login() {
  if (!validate()){
    return;
  }
  await adminStore.login(account.value.trim(), password.value.trim());
}
async function signup() {
  if (!validate()){
    return;
  }
  await adminStore.signup(account.value.trim(), password.value.trim());
}
</script>


<style>
  .login {
    background: #f5f5f8;
  }
</style>

