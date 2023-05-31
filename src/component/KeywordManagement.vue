<template>
  <div class="border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white">
    <h5 class="w-full text-white bg-black-10 p-6">管理關鍵字</h5>
    <!-- 管理關鍵字 -->
    <div class="w-full flex flex-col p-6">
      <div class="w-full flex">
        <div class="mr-3">
          <input type="text" class="w-full border border-black-1 rounded py-3 px-4 mb-5" placeholder="開始日期" />
        </div>
        <div class="mr-3">
          <input type="text" class="w-full border border-black-1 rounded py-3 px-4 mb-5" placeholder="開始日期" />
        </div>
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
