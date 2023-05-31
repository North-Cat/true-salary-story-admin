<script lang="ts" setup>
import { ref } from 'vue';
import BaseFormSelect from '@/component/BaseFormSelect.vue';
import BaseButton from '@/component/BaseButton.vue';
import { showError } from '@/utilities/message';

const dateRangeCondition = ref();
const endDate = new Date();
const startDate = new Date(new Date().setMonth(endDate.getMonth() - 1));
dateRangeCondition.value = [startDate, endDate];
const format = (dateRange: Date[]) => {
  let startDateFormat = '';
  let endDateFormat = '';
  for (let i in dateRange) {
    const day = dateRange[i].getDate();
    const month = dateRange[i].getMonth() + 1;
    const year = dateRange[i].getFullYear();
    if (i == '0') {
      startDateFormat = `${year}-${month}-${day}`;
    } else if (i == '1') {
      endDateFormat = `${year}-${month}-${day}`;
    }
  }
  return `${startDateFormat} 至 ${endDateFormat}`;
};
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

function refresh() {
  showError('1', 'test');
}
function closed() {
  showError('2', 'test');
}
</script>
<template>
  <div class="border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white">
    <h5 class="w-full text-white bg-black-10 p-6">管理關鍵字</h5>
    <!-- 管理關鍵字 -->
    <div class="w-full flex flex-col p-6">
      <div class="w-full flex justify-between items-center">
        <div class="flex">
          <div class="flex-col items-center me-5">
            <h6 class="text-black-6 mb-2">上假日期區間</h6>
            <VueDatePicker
              class="h-[48px]"
              v-model="dateRangeCondition"
              range
              :format="format"
              :clearable="false"
              :enable-time-picker="false"
              week-start="0"
              :day-names="['日', '一', '二', '三', '四', '五', '六']"
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
            <th>排名</th>
            <th>關鍵字</th>
            <th>搜尋分數</th>
            <th>狀態</th>
            <th>上架日期</th>
            <th>連結數</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="flex">
                <button
                  class="flex py-3 px-5 justify-center items-center transition duration-300 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded me-5"
                >
                  編輯
                </button>
                <button
                  class="flex py-3 px-5 justify-center items-center transition duration-300 ease-in-out flex-row text-white fill-white bg-red hover:bg-black-10 rounded"
                >
                  刪除
                </button>
              </div>
            </td>
            <td>1</td>
            <td>年前跳槽</td>
            <td>47</td>
            <td>啟用</td>
            <td>2023/3/16</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
