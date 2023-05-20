<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { showInfo,showError,showSuccess } from "@/utilities/message";
import Axios from '@/utilities/axios';
import { setCookie } from 'typescript-cookie'

const router = useRouter()
const account = ref<string>('');
const password = ref<string>('');

function validate(): boolean{
  if (!account.value.trim()){
    showInfo("提示", "請輸入帳號");
    return false;
  }
  if (!password.value.trim()){
    showInfo("提示", "請輸入密碼");
    return false;
  }
  if (password.value.trim().length < 8){
    showInfo("提示", "密碼不得低於 8 字元");
    return false;
  }
  return true;
}
async function login() {
  if (!validate()){
    return;
  }
  await Axios.post('/api/admin/login', 
    {
      account: account.value.trim(),
      password: password.value.trim()
    })
    .then((response) => {
      // 儲存登入資訊
      const expiresTime = 1/24; // 以天為單位, 1/24 就是一小時
      const token = response.data.data.token;
      const account = response.data.data.account;
      setCookie('token', token, { expires: expiresTime });
      setCookie('account', account, { expires: expiresTime });
      // 跳至首頁
      router.push('/');
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.response ? error.response.data.message : error.message
      showError("登入失敗", errorMessage);
    });
}
</script>


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
      <div class="mt-5">
        <input 
        v-model="account" 
        type="text" 
        class="w-full border border-black-1 rounded py-3 px-4 mb-2" 
        placeholder="請輸入帳號" 
        @keyup.enter="login">
        <input 
        v-model="password" 
        type="password" 
        class="w-full border border-black-1 rounded py-3 px-4" 
        placeholder="請輸入密碼"
        @keyup.enter="login">
        <span class="caption text-black-10">密碼不得低於 8 字元</span>
      </div>
      <div class="mt-8">
        <button 
          @click="login"
          class="w-full flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded mb-2">
          <h6>登入</h6>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .login {
    background: #f5f5f8;
  }
</style>

