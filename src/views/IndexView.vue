<template>
  <nav
    class="z-10 fixed top-0 left-0 bg-white/80 w-full sm:py-3 sm:px-3 md:py-6 md:px-10 lg:py-6 lg:px-10 shadow-nav backdrop-blur-sm"
    aria-label="平板電腦版選單"
  >
    <div class="container mx-auto max-w-[1800px] flex justify-between items-center">
      <a href="#" class="sm:w-[80px] md:w-[150px] lg:w-[150px]">
        <img src="../assets/img/LOGO.png" alt="LOGO" />
      </a>
      <div class="sm:hidden md:flex flex-row justify-center items-center">
        <button
          @click="showUserList = !showUserList"
          class="rounded-full bg-blue h-12 w-12 flex justify-center items-center"
          type="button"
        >
          <h4 class="text-white">{{ account ? account.slice(0, 1).toUpperCase() : '' }}</h4>
        </button>
        <div v-if="showUserList" class="absolute shadow bg-white top-[90px] right-0 w-[300px] p-5 rounded">
          <div class="flex justify-between pb-3 border-b border-b-black-5">
            <div class="text-xl">
              {{ account }}
            </div>
            <div>
              <button class="bg-black-1 px-2 py-1 mr-2 text-sm tracking-widest" @click="showUserList = false">
                <i class="icon-cross"></i>
              </button>
            </div>
          </div>
          <div class="flex justify-center items-center pt-2">
            <button
              class="rounded py-5 px-3 bg-white group hover:bg-blue-light hover:text-blue w-full text-center"
              @click="logout"
            >
              <span class="text-black-10 group-hover:text-blue"> 登出 </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <section class="bg-gray pt-[168px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen">
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
    >
      <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20">
        <!-- 側邊選單 -->
        <div
          class="border border-black-1 bg-white lg:w-2/6 flex flex-col justify-start items-start py-6 px-3 lg:mr-[30px] h-fit"
        >
          <div class="group w-full" @click="changePage(Page.POST)">
            <button
              :class="{ 'bg-blue-light text-blue-dark  border-transparent': isPage(Page.POST) }"
              class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue-dark group-hover:border-transparent transition duration-300 ease-in-out"
            >
              <div class="w-[48px] h-[48px] flex justify-center items-center mr-3">
                <span
                  :class="{ 'text-blue-dark': isPage(Page.POST) }"
                  class="icon-file-gear text-2xl text-black-5 group-hover:text-blue-dark transition duration-300 ease-in-out"
                ></span>
              </div>
              <h6>管理匿名分享</h6>
            </button>
          </div>
          <div class="group w-full" @click="changePage(Page.KEYWORD)">
            <button
              :class="{ 'bg-blue-light text-blue-dark  border-transparent': isPage(Page.KEYWORD) }"
              class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue-dark group-hover:border-transparent transition duration-300 ease-in-out"
            >
              <div class="w-[48px] h-[48px] flex justify-center items-center mr-3">
                <span
                  :class="{ 'text-blue-dark': isPage(Page.KEYWORD) }"
                  class="icon-message-word text-2xl text-black-5 group-hover:text-blue-dark transition duration-300 ease-in-out"
                ></span>
              </div>
              <h6>管理關鍵字</h6>
            </button>
          </div>
        </div>

        <!-- 頁面內容 -->
        <div class="lg:w-4/6">
          <!-- 切頁 -->
          <PostManagement v-if="isPage(Page.POST)" />
          <KeywordManagement v-if="isPage(Page.KEYWORD)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import PostManagement from '@/component/PostManagement.vue';
import KeywordManagement from '@/component/KeywordManagement.vue';
import { ref } from 'vue';
import Axios from '@/utilities/axios';
import { getCookie } from 'typescript-cookie';
import { showError } from '@/utilities/message';

// 共用
enum Page {
  POST = 'post',
  KEYWORD = 'keyword',
}
const curPage = ref(); // 目前在哪個分頁, 預設 "管理匿名分享"
curPage.value = Page.POST;
function changePage(page: Page) {
  curPage.value = page;
}
function isPage(page: Page): boolean {
  return curPage.value == page;
}
const router = useRouter();
async function logout() {
  console.log('登出');
  await Axios.post('/api/admin/logout')
    .then((response) => {
      // 清除登入資訊
      console.log('清除登入資訊 before', document.cookie);
      document.cookie = 'token=';
      document.cookie = 'account=';
      console.log('清除登入資訊 after', document.cookie);

      // 跳至登入頁
      console.log('跳至登入頁');
      router.push('/login');
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.response ? error.response.data.message : error.message;
      showError('登出失敗', errorMessage);
    });
}
// 使用者 modal
const showUserList = ref(false);
const account = getCookie('account');
</script>
