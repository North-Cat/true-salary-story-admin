<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import BaseFormSelect from '@/component/BaseFormSelect.vue';
import BaseButton from '@/component/BaseButton.vue';
import PaginationButton from '@/component/PaginationButton.vue';
import { showError, showSuccess } from '@/utilities/message';
import Axios from '@/utilities/axios';
import { openConfirmModal } from '@/utilities/dialog';

interface IKeyword {
  id: string;
  rank: number;
  score: number;
  keyword: string;
  status: number;
  linkNumber: number;
  createdAt: string;
  updatedAt: string;
}

// 選擇時間區間
const dateRangeCondition = ref();
const endDate = dateToString(new Date());
const startDate = dateToString(new Date(new Date().setMonth(new Date().getMonth() - 1)));
dateRangeCondition.value = [startDate, endDate];
function dateToString(date: Date): string {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}
const format = (dateRange: Date[]) => {
  console.log('test???');
  let startDateFormat = '';
  let endDateFormat = '';
  for (let i in dateRange) {
    if (i == '0') {
      startDateFormat = dateToString(dateRange[i]);
    } else if (i == '1') {
      endDateFormat = dateToString(dateRange[i]);
    }
  }
  return `${startDateFormat} 至 ${endDateFormat}`;
};

// 選擇狀態
const statusOption = [
  {
    text: '全部',
    value: 99,
  },
  {
    text: '停用',
    value: 0,
  },
  {
    text: '啟用',
    value: 1,
  },
];
const statusCondition = ref();
statusCondition.value = statusOption[0].value;
watch(statusCondition, () => {
  curPage.value = 1;
  getKeywords();
});

// 關鍵字
const selectedId = ref(); // 選到的關鍵字
const keywords = ref<IKeyword[]>([]);
const keywordCount = ref();
const computedStatus = computed(() => (status: number) => {
  const option = statusOption.find((item) => item.value == status);
  return option?.text;
});

// 頁數
const limit = ref(10);
const curPage = ref(1);
const totalPages = ref();
// 重新渲染頁數
const componentKey = ref(0);
const forceRender = () => {
  componentKey.value += 1;
};

// 重新整理
function refresh() {
  curPage.value = 1;
  getKeywords();
}
// 關閉日曆
function closed() {
  curPage.value = 1;
  getKeywords();
}
// 換頁
function changePage(page: number) {
  curPage.value = page;
  getKeywords();
}
// 刪除提示
function clickDeleteKeyword(id: string) {
  selectedId.value = id;
  openConfirmModal('提示', '確定要刪除此關鍵字？', deleteKeyword);
}

// call 取得關鍵字 api
async function getKeywords() {
  await Axios.get(
    `/api/keywords?page=${curPage.value}&limit=${limit.value}&startDate=${dateRangeCondition.value[0]}&endDate=${dateRangeCondition.value[1]}&status=${statusCondition.value}`,
  )
    .then((response) => {
      keywords.value = response.data.data;
      keywords.value.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
      // FIXME
      const keywordCount = 22;
      totalPages.value = Math.ceil(keywordCount / limit.value);

      selectedId.value = undefined;

      // 先不要滾到最上面，這樣一直編輯畫面一直會動不好使用
      // scrollToTop();
    })
    .catch((error) => {
      console.log(error);
      showError('取得關鍵字失敗', error.response.data.message);
    });
}
// call 編輯關鍵字 api
async function editKeyword(id: string, enable: boolean) {
  await Axios.patch(`/api/keywords/${id}`, {
    status: enable ? 1 : 0,
  })
    .then((response) => {
      const text = enable ? '啟用' : '停用';
      showSuccess('成功', `關鍵字已${text}`);

      // 重新查詢
      getKeywords();
    })
    .catch((error) => {
      console.log(error);
      showError('編輯關鍵字失敗', error.response.data.message);
    });
}

// call 刪除關鍵字 api
async function deleteKeyword() {
  await Axios.delete(`/api/keywords/${selectedId.value}`)
    .then((response) => {
      showSuccess('成功', `關鍵字已刪除`);

      // 重新查詢
      getKeywords();
    })
    .catch((error) => {
      console.log(error);
      showError('刪除關鍵字失敗', error.response.data.message);
    });
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
    <h5 class="w-full text-white bg-black-10 p-6">管理關鍵字</h5>
    <!-- 管理關鍵字 -->
    <div class="w-full flex flex-col p-6">
      <div class="w-full flex justify-between items-center">
        <div class="flex">
          <div class="w-1/2 flex-col items-center me-5">
            <h6 class="text-black-6 mb-2">更新日期區間</h6>
            <VueDatePicker
              class="h-[48px]"
              v-model="dateRangeCondition"
              range
              :clearable="false"
              :enable-time-picker="false"
              week-start="0"
              :day-names="['日', '一', '二', '三', '四', '五', '六']"
              format="yyyy-MM-dd"
              model-type="yyyy-MM-dd"
              auto-apply
              @closed="closed"
            />
          </div>
          <div class="flex-col items-center">
            <h6 class="text-black-6 mb-2">狀態</h6>
            <BaseFormSelect
              class="h-[38px]"
              v-model="statusCondition"
              :options="statusOption"
              name="status"
              required="required"
            />
          </div>
        </div>
        <BaseButton class="mt-[22px]" cate="gray-text" @click="refresh">
          <div class="icon-refresh text-2xl"></div>
        </BaseButton>
      </div>

      <table class="table-auto" aria-describedby="待審核表格">
        <thead class="">
          <tr>
            <th>管理</th>
            <th>關鍵字</th>
            <th>排名</th>
            <th>搜尋分數</th>
            <th>連結數</th>
            <th>狀態</th>
            <th>上架日期</th>
            <th>更新日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="keyword in keywords" :key="keyword.id">
            <td>
              <div class="flex">
                <BaseButton
                  v-if="keyword.status == 0"
                  content="啟用"
                  class="me-3"
                  @click="editKeyword(keyword.id, true)"
                >
                </BaseButton>
                <BaseButton v-else content="停用" class="me-3" cate="red" @click="editKeyword(keyword.id, false)">
                </BaseButton>

                <BaseButton content="刪除" cate="gray" @click="clickDeleteKeyword(keyword.id)"> </BaseButton>
              </div>
            </td>
            <td>{{ keyword.keyword }}</td>
            <td>{{ keyword.rank }}</td>
            <td>{{ keyword.score }}</td>
            <td>{{ keyword.linkNumber }}</td>
            <td>{{ computedStatus(keyword.status) }}</td>
            <td>{{ keyword.createdAt }}</td>
            <td>{{ keyword.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 頁數 -->
      <PaginationButton
        v-if="keywords && keywords.length != 0"
        :key="componentKey"
        class="w-full flex justify-center -mt-5 lg:mt-5"
        :init-page="curPage"
        :total-pages="totalPages"
        @change-page-event="changePage"
      >
      </PaginationButton>
    </div>
  </div>
</template>
