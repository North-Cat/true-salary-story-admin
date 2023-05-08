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
        @click="logout"
        class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-black-10 hover:bg-blue rounded">
          <span class="icon-person text-lg me-2"></span>
          <h6>登出</h6>
          </button>
      </div>
    </div>
  </nav>
  <section class="bg-gray pt-[168px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen ">  
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20">
      
      <div class="w-full flex sm:flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20">
        <!-- 側邊選單 -->
        <div class="border border-black-1 bg-white lg:w-2/6 flex flex-col justify-start items-start py-6 px-3 lg:mr-[30px] h-fit">
          <div class="group w-full" @click="changePage(Page.POST)">
            <button 
            :class="{'bg-blue-light text-blue-dark  border-transparent' : isPage(Page.POST)}"
            class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue-dark  group-hover:border-transparent  transition duration-300 ease-in-out">
              <div class="w-[48px] h-[48px] flex justify-center items-center mr-3">
                <span 
                :class="{'text-blue-dark' : isPage(Page.POST)}"
                class="icon-file-gear text-2xl text-black-5 group-hover:text-blue-dark transition duration-300 ease-in-out"></span>
              </div>
              <h6>管理匿名分享</h6>
            </button>
          </div>
          <div class="group w-full" @click="changePage(Page.KEYWORD)">
            <button 
            :class="{'bg-blue-light text-blue-dark  border-transparent' : isPage(Page.KEYWORD)}"
            class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue-dark  group-hover:border-transparent  transition duration-300 ease-in-out">
              <div class="w-[48px] h-[48px] flex justify-center items-center mr-3">
                <span 
                :class="{'text-blue-dark' : isPage(Page.KEYWORD)}"
                class="icon-message-word text-2xl text-black-5 group-hover:text-blue-dark transition duration-300 ease-in-out"></span>
              </div>
              <h6>管理關鍵字</h6>
            </button>
          </div>
        </div>

        <!-- 頁面內容 -->
        <div class="lg:w-4/6">
          <!-- 切頁 -->
          <PostManagement v-if="isPage(Page.POST)"/>
          <KeywordManagement v-if="isPage(Page.KEYWORD)"/>
        </div>
        
          

      </div>

    </div>
  </section>
</template>


<script setup lang="ts">
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router';
import PostManagement  from '@/component/postManagement.vue';
import KeywordManagement from '@/component/keywordManagement.vue';
import { ref } from 'vue';

// 共用
enum Page {
  POST = 'post',
  KEYWORD = 'keyword',
}
const curPage = ref(); // 目前在哪個分頁, 預設 "管理匿名分享"
curPage.value = Page.POST;
function changePage(page: Page){
  curPage.value = page;
}
function isPage(page: Page) : boolean{
  return curPage.value == page;
}
const router = useRouter()
const adminStore = useAdminStore();
function logout(){
  adminStore.logout();
}

</script>