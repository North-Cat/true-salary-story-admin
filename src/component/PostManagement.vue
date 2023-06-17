<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { IPost } from '@/interface/IPost';
import Axios from '@/utilities/axios';
import { showInfo, showSuccess, showError } from '@/utilities/message';
import { openConfirmModal, openPromptModal } from '@/utilities/dialog';
import BaseButton from '@/component/BaseButton.vue';
import PaginationButton from '@/component/PaginationButton.vue';

/**
 * 共用功能
 */
const limit = ref(10);
const unComfirmCurPage = ref(1);
const unComfirmtotalPages = ref(1);
const comfirmCurPage = ref(1);
const comfirmtotalPages = ref(1);
enum PostStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
enum Tab {
  UNCONFIRMED = 'unconfirmed',
  CONFIRMED = 'confirmed',
}
const curTab = ref(); // 目前在哪個頁千, 預設 "未審核"
curTab.value = Tab.UNCONFIRMED;
function changeTab(tab: Tab) {
  curTab.value = tab;
}
function isTab(tab: Tab): boolean {
  return curTab.value == tab;
}
const tabClass = computed(() => (tab: Tab) => {
  let className = isTab(tab) ? 'border-b-2 text-blue border-b-blue' : 'border-b-2 border-b-transparent';
  return className;
});
const title = computed(() => {
  let title = '管理匿名分享';
  if (curTab.value == Tab.UNCONFIRMED) {
    if (curUnconfirmPost.value) {
      title = '審核內容';
    }
  }
  return title;
});
function changePage(page: number) {
  if (isTab(Tab.UNCONFIRMED)) {
    unComfirmCurPage.value = page;
    getUnconfirmedPosts();
  } else if (isTab(Tab.CONFIRMED)) {
    comfirmCurPage.value = page;
    getConfirmedPosts();
  }
}
// 重新渲染頁數
const componentKey = ref(0);
const forceRender = () => {
  componentKey.value += 1;
};

/**
 * 待審核相關
 */
const curUnconfirmPost = ref<IPost>(); // 目前選到的未審核物件
const unconfirmedPosts = ref<IPost[]>([]);
const unconfirmedPostsCount = ref(0);
// 一進頁面就呼叫取得待審核 api
initUnconfirmPost();
function selectCurPost(post: IPost) {
  curUnconfirmPost.value = post;
}
async function getUnconfirmedPosts() {
  // call 取得未審核 api
  await Axios.get(`/api/admin/unconfirmedPosts?page=${unComfirmCurPage.value}&limit=${limit.value}`)
    .then((response) => {
      unconfirmedPosts.value = response.data.data.posts;
      unconfirmedPostsCount.value = response.data.data.totalCount;
      unComfirmtotalPages.value = Math.ceil(unconfirmedPostsCount.value / limit.value);

      scrollToTop();
      forceRender();
    })
    .catch((error) => {
      console.log(error);
      showError('取得未審核薪資失敗', error.response.data.message);
    });
}
const resultSalaryTitle = computed(
  () => (post: IPost) => post.monthlySalary ? '月薪' : post.dailySalary ? '日薪' : '時薪',
);
const resultSalary = computed(
  () => (post: IPost) =>
    post.monthlySalary ? post.monthlySalary : post.dailySalary ? post.dailySalary : post.hourlySalary,
);

// 審核內容
const feelingClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '非常開心':
      className = 'icon-face-good text-green';
      break;
    case '還算愉快':
      className = 'icon-face-good text-green';
      break;
    case '平常心':
      className = 'icon-face-normal text-yellow';
      break;
    case '有苦說不出':
      className = 'icon-face-bad text-red';
      break;
    case '想換工作了':
      className = 'icon-face-bad text-red';
      break;
  }
  return className;
});
const overtimeClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '準時上下班':
      className = 'icon-time-good text-green';
      break;
    case '很少加班':
      className = 'icon-time-good text-green';
      break;
    case '偶爾加班':
      className = 'icon-time-normal text-yellow';
      break;
    case '常常加班':
      className = 'icon-time-bad text-red';
      break;
    case '賣肝拼經濟':
      className = 'icon-time-bad text-red';
      break;
  }
  return className;
});
const numberRange = computed(() => (number: number) => {
  let text = '-';
  let range = 0;
  if (number >= 100000) {
    // 若為六位數，範圍間距為 10k
    range = 10000;
  } else if (number >= 1000 && number < 100000) {
    // 若為四、五位數，範圍間距為 1k
    range = 1000;
  }

  let max = Math.ceil(number / range); // ceil 回傳大於等於所給數字的最大整數
  let min = Math.floor(number / range); // floor 回傳小於等於所給數字的最大整數
  max = min == max ? (max += 1) : max; // 若為整數 (例 40000) 依上述寫法會變成 40-40k， 則將上限加 1k 變為 40-41k

  if (number >= 100000) {
    text = `${min * 10} - ${max * 10}k`;
  } else if (number >= 1000 && number < 100000) {
    text = `${min} - ${max}k`;
  } else if (number > 0 && number < 1000) {
    text = '低於 1k';
  }
  return text;
});

// 開啟是否審核通過 Modal
function openConfirmPost() {
  openConfirmModal('提示', '確定通過此薪資分享？', confirmPost);
}
// 確定審核
async function confirmPost() {
  // call 審核 api
  await Axios.post(`/api/admin/confirmPost/${curUnconfirmPost.value?.postId}`, {
    status: PostStatus.APPROVED,
  })
    .then((response) => {
      showSuccess('審核成功', '');
      // 重新取得未審核清單
      initUnconfirmPost();
    })
    .catch((error) => {
      console.log(error);
      showError('審核失敗', error.response.data.message);
    });
}

// 開啟審核拒絕原因 Modal
const isRejectModalOpen = ref(false);
// 拒絕原因
const rejectReason = ref();
const rejectReasonModal = ref(null);
onClickOutside(rejectReasonModal, () => {
  isRejectModalOpen.value = false;
});
// 開啟拒絕 Modal
function openRejectModal() {
  isRejectModalOpen.value = true;
}
// 點擊確定拒絕
function clickRejectPost() {
  if (!rejectReason.value || !rejectReason.value.trim()) {
    showInfo('提示', '請輸入原因');
    return;
  }
  openConfirmModal('提示', '確定拒絕此薪資分享？', rejectPost, openRejectModal);
}
// 拒絕審核
async function rejectPost() {
  // call 審核 api
  await Axios.post(`/api/admin/confirmPost/${curUnconfirmPost.value?.postId}`, {
    status: PostStatus.REJECTED,
    rejectReason: rejectReason.value,
  })
    .then((response) => {
      showSuccess('拒絕成功', '');
      isRejectModalOpen.value = false;
      // 重新取得未審核清單
      initUnconfirmPost();
    })
    .catch((error) => {
      console.log(error);
      showError('審核失敗', error.response.data.message);
    });
}
// 待審核頁面初始化
async function initUnconfirmPost() {
  // 取得未審核清單
  await getUnconfirmedPosts();
  // 清空目前選擇的資訊
  curUnconfirmPost.value = undefined;
  // 清空拒絕原因
  rejectReason.value = undefined;
}

/**
 * 已審核相關
 */
const confirmedPosts = ref<IPost[]>([]);
async function getConfirmedPosts() {
  // call 取得已審核 api
  await Axios.get(`/api/admin/confirmedPosts?page=${comfirmCurPage.value}&limit=${limit.value}`)
    .then((response) => {
      confirmedPosts.value = response.data.data.posts;
      const confirmedPostsCount = response.data.data.totalCount;
      comfirmtotalPages.value = Math.ceil(confirmedPostsCount / limit.value);

      scrollToTop();
      forceRender();
    })
    .catch((error) => {
      console.log(error);
      showError('取得已審核薪資失敗', error.response.data.message);
    });
}
const statusText = computed(() => (status: string) => {
  let text = '';
  switch (status) {
    case 'approved':
      text = '已通過';
      break;
    case 'rejected':
      text = '已拒絕';
      break;
    case 'removed':
      text = '已下架';
      break;
  }
  return text;
});
function openRejectReasonModal(message: string) {
  openPromptModal('拒絕原因', message);
}

// 目前選到的已審核文章id
const curConfirmPostId = ref();
// 下架原因
const removeReason = ref();
// 開啟下架原因 Modal
const isRemoveModalOpen = ref(false);
const removeReasonModal = ref(null);
onClickOutside(removeReasonModal, () => {
  isRemoveModalOpen.value = false;
  // removeReason.value = undefined;
});
// 點擊下架
function clickRemovePost(id?: string) {
  curConfirmPostId.value = id ? id : undefined;
  isRemoveModalOpen.value = true;
}
// 點擊確定下架
function clickConfirmRemovePost() {
  if (!removeReason.value || !removeReason.value.trim()) {
    showInfo('提示', '請輸入原因');
    return;
  }
  openConfirmModal('提示', '確定下架此薪資分享？', removePost, clickRemovePost);
}
async function removePost() {
  // call 下架 api
  await Axios.post(`/api/admin/removePost/${curConfirmPostId.value}`, {
    rejectReason: removeReason.value,
  })
    .then((response) => {
      showSuccess('下架成功', '');
      isRemoveModalOpen.value = false;
      // 重新取得已審核清單
      initConfirmedPost();
    })
    .catch((error) => {
      console.log(error);
      showError('審核失敗', error.response.data.message);
    });
}
// 已審核頁面初始化
async function initConfirmedPost() {
  // 取得已審核清單
  await getConfirmedPosts();
  // // 清空目前選擇的資訊
  curConfirmPostId.value = undefined;
  // // 清空下架拒絕原因
  removeReason.value = undefined;
}
// 重新整理
function refresh() {
  if (curTab.value === Tab.CONFIRMED) {
    getConfirmedPosts();
  } else if (curTab.value === Tab.UNCONFIRMED) {
    getUnconfirmedPosts();
  }
}
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white">
    <h5 class="w-full text-white bg-black-10 p-6">
      {{ title }}
    </h5>
    <!-- 管理匿名分享 -->
    <div class="w-full flex flex-col p-6">
      <div class="w-full flex justify-between items-center">
        <div class="flex">
          <div class="py-3 pe-6">
            <button
              :class="tabClass(Tab.UNCONFIRMED)"
              class="pb-2 border-b-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              @click="changeTab(Tab.UNCONFIRMED), initUnconfirmPost()"
            >
              <h6>{{ `待審核( ${unconfirmedPostsCount} )` }}</h6>
            </button>
          </div>
          <div class="py-3 pe-6">
            <button
              :class="tabClass(Tab.CONFIRMED)"
              class="pb-2 border-b-2 hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
              @click="changeTab(Tab.CONFIRMED), initConfirmedPost()"
            >
              <h6>已審核</h6>
            </button>
          </div>
        </div>
        <BaseButton class="" cate="gray-text" @click="refresh">
          <div class="icon-refresh text-2xl"></div>
        </BaseButton>
      </div>

      <!-- 待審核頁籤 -->
      <table class="table-auto" aria-describedby="待審核表格" v-if="isTab(Tab.UNCONFIRMED) && !curUnconfirmPost">
        <thead class="">
          <tr>
            <th>管理</th>
            <th>公司名稱</th>
            <th>應徵職務</th>
            <th>職務類別</th>
            <th>建立日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in unconfirmedPosts" :key="post.postId">
            <td>
              <BaseButton @click="selectCurPost(post)" content="審核"></BaseButton>
            </td>
            <td>{{ post.companyName }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.employmentType }}</td>
            <td>{{ post.createDate }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 待審核頁數 -->
      <PaginationButton
        v-if="isTab(Tab.UNCONFIRMED) && !curUnconfirmPost && unconfirmedPosts && unconfirmedPosts.length != 0"
        :key="componentKey"
        class="w-full flex justify-center -mt-5 lg:mt-5"
        :init-page="unComfirmCurPage"
        :total-pages="unComfirmtotalPages"
        @change-page-event="changePage"
      >
      </PaginationButton>

      <!-- 待審核內容 -->
      <div v-if="isTab(Tab.UNCONFIRMED) && curUnconfirmPost" class="flex flex-col">
        <div class="p-6 flex flex-col border border-black-1 rounded mb-10">
          <!-- 標題列 -->
          <div class="flex mb-5">
            <div class="w-[48px] h-[48px] flex justify-center items-center rounded bg-blue-light mr-[18px]">
              <span class="icon-sparkle-checked text-3xl text-blue-dark"></span>
            </div>
            <div class="flex flex-col justify-between">
              <h5>{{ curUnconfirmPost.companyName }} | {{ curUnconfirmPost.title }}</h5>
              <div class="flex">
                <div class="caption text-black-6">{{ curUnconfirmPost.employmentType }}</div>
                <span class="caption text-black-6 px-3">|</span>
                <div class="caption text-black-6">{{ curUnconfirmPost.city }}</div>
                <span class="caption text-black-6 px-3">|</span>
                <div class="caption text-black-6">{{ curUnconfirmPost.createDate + ' 分享' }}</div>
              </div>
            </div>
          </div>
          <!-- 月薪、年薪、上班心情、加班頻率 等等 -->
          <div class="flex flex-col pb-5 border-b border-b-black-1 mb-5">
            <div class="w-full flex justify-between mb-5">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">{{ resultSalaryTitle(curUnconfirmPost) }}</div>
                    <h6>{{ numberRange(resultSalary(curUnconfirmPost)) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span class="icon-coin text-2xl text-blue"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年薪</div>
                    <h6>{{ numberRange(curUnconfirmPost.yearlySalary) }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">年終</div>
                    <h6>{{ numberRange(curUnconfirmPost.yearEndBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">三節</div>
                    <h6>{{ numberRange(curUnconfirmPost.holidayBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">分紅</div>
                    <h6>{{ numberRange(curUnconfirmPost.profitSharingBonus) }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">其他</div>
                    <h6>{{ numberRange(curUnconfirmPost.otherBonus) }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-between">
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="feelingClass(curUnconfirmPost.feeling)" class="text-2xl"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">上班心情</div>
                    <h6>{{ curUnconfirmPost.feeling }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                    <span :class="overtimeClass(curUnconfirmPost.overtime)" class="text-2xl"></span>
                  </div>
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">加班頻率</div>
                    <h6>{{ curUnconfirmPost.overtime }}</h6>
                  </div>
                </div>
              </div>
              <div class="lg:w-1/2 flex justify-between items-center">
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">在職年資</div>
                    <h6>{{ curUnconfirmPost.workYears > 0 ? `${curUnconfirmPost.workYears}年` : '未滿1年' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">個人總年資</div>
                    <h6>
                      {{ curUnconfirmPost.totalWorkYears > 0 ? `${curUnconfirmPost.totalWorkYears}年` : '未滿1年' }}
                    </h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">日均工時</div>
                    <h6>{{ curUnconfirmPost.avgHoursPerDay ? curUnconfirmPost.avgHoursPerDay : 8 + '小時' }}</h6>
                  </div>
                </div>
                <div class="w-full flex justify-start items-center">
                  <div class="flex flex-col">
                    <div class="caption text-black-5 mb-1">在職狀況</div>
                    <h6>{{ curUnconfirmPost.inService ? '仍在職' : '已離職' }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 工作內容 -->
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">工作內容</div>
            <p class="body-sm">{{ curUnconfirmPost.jobDescription }}</p>
          </div>
          <!-- 其他建議 -->
          <div class="flex flex-col mb-5">
            <div class="caption text-black-5 mb-1">其他建議</div>
            <p class="body-sm">{{ curUnconfirmPost.suggestion }}</p>
          </div>
          <!-- 標籤 -->
          <div class="flex flex-wrap">
            <span class="body-sm text-black-5 me-5" v-for="tag in curUnconfirmPost.tags" :key="tag"> #{{ tag }} </span>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton @click="openConfirmPost()" content="通過" class="me-3"></BaseButton>
          <BaseButton @click="openRejectModal()" content="拒絕" cate="red"></BaseButton>
        </div>
      </div>

      <!-- 已審核頁籤 -->
      <table class="table-auto" aria-describedby="已審核表格" v-if="isTab(Tab.CONFIRMED)">
        <thead class="">
          <tr>
            <th>管理</th>
            <th>審核狀態</th>
            <th>公司名稱</th>
            <th>應徵職務</th>
            <th>職務類別</th>
            <th>更新日期</th>
            <th>更新人員</th>
            <th>拒絕原因</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in confirmedPosts" :key="post.postId">
            <td>
              <BaseButton
                v-if="post.status == PostStatus.APPROVED"
                @click="clickRemovePost(post.postId)"
                content="下架"
                cate="red"
              ></BaseButton>
            </td>
            <td>{{ statusText(post.status) }}</td>
            <td>{{ post.companyName }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.employmentType }}</td>
            <td>{{ post.updateDate }}</td>
            <td>{{ post.updateUser ? post.updateUser.account : '' }}</td>
            <td>
              <div class="flex justify-center">
                <BaseButton v-if="post.rejectReason" @click="openRejectReasonModal(post.rejectReason)" cate="gray-text">
                  <div class="icon-file text-2xl"></div>
                </BaseButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 已審核頁數 -->
      <PaginationButton
        v-if="isTab(Tab.CONFIRMED) && confirmedPosts && confirmedPosts.length != 0"
        :key="componentKey"
        class="w-full flex justify-center -mt-5 lg:mt-5"
        :init-page="comfirmCurPage"
        :total-pages="comfirmtotalPages"
        @change-page-event="changePage"
      >
      </PaginationButton>
    </div>
  </div>

  <!-- 拒絕原因 Modal -->
  <div v-if="isRejectModalOpen" class="fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
    <div ref="rejectReasonModal" class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h4>提示</h4>
        <button class="px-2 py-1 text-sm tracking-widest" @click="isRejectModalOpen = false">
          <i class="icon-cross text-lg"></i>
        </button>
      </div>
      <div class="mt-4">
        <p class="mb-4 body">請輸入拒絕原因 (100 字以內)：</p>
        <textarea v-model="rejectReason" class="w-full border-2 border-black-1 mb-5" rows="4" cols="55" maxlength="100">
        </textarea>
        <div class="flex justify-end">
          <BaseButton @click="clickRejectPost()" content="確認拒絕" cate="red" class="me-3"> </BaseButton>
          <BaseButton @click="isRejectModalOpen = false" content="取消" cate="white"></BaseButton>
        </div>
      </div>
    </div>
  </div>

  <!-- 下架原因 Modal -->
  <div v-if="isRemoveModalOpen" class="fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
    <div ref="removeReasonModal" class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h4>提示</h4>
        <button class="px-2 py-1 text-sm tracking-widest" @click="isRemoveModalOpen = false">
          <i class="icon-cross text-lg"></i>
        </button>
      </div>
      <div class="mt-4">
        <p class="mb-4 body">請輸入下架原因 (100 字以內)：</p>
        <textarea v-model="removeReason" class="w-full border-2 border-black-1 mb-5" rows="4" cols="55" maxlength="100">
        </textarea>
        <div class="flex justify-end">
          <BaseButton @click="clickConfirmRemovePost()" content="確認下架" cate="red" class="me-3"> </BaseButton>
          <BaseButton @click="isRemoveModalOpen = false" content="取消" cate="white"></BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
