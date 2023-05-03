<template>
    <div class="border-2 rounded flex flex-col justify-start items-start lg:min-w-[850px] bg-white">
        <h5 class="w-full text-white bg-black-10 p-6">
        {{ title }}
        </h5>

        <!-- 管理匿名分享 -->
        <div class="w-full flex flex-col p-6">
            <div class="w-full flex ">
                <div class="py-3 pe-6">
                    <button
                        :class="{'border-b-2 text-blue border-b-blue' : isTab(Tab.UNCONFIRMED)}"
                        class="pb-2 border-b-2 border-b-transparent hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                        @click="changeTab(Tab.UNCONFIRMED), initUnconfirmPost()">
                        <h6>{{ `待審核( ${unconfirmedPostsCount} )` }}</h6>
                    </button>
                </div>
                <div class="py-3 pe-6">
                    <button
                        :class="{'border-b-2 text-blue border-b-blue' : isTab(Tab.CONFIRMED)}"
                        class="pb-2 border-b-2 border-b-transparent hover:border-b-2 hover:text-blue hover:border-b-blue transition duration-300 ease-in-out mr-3"
                        @click="changeTab(Tab.CONFIRMED)">
                        <h6>已審核</h6>
                    </button>
                </div>
            </div>

            <!-- 待審核頁籤 -->
            <table class="table-auto " aria-describedby="待審核表格" v-if="isTab(Tab.UNCONFIRMED) && !curUnconfirmPost">
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
                            <button
                                class="flex py-3 px-5 justify-center items-center transition duration-300 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded"
                                @click="selectCurPost(post)">
                                審核
                            </button>
                        </td>
                        <td>{{ post.companyName }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.type }}</td>
                        <td>{{ post.createDate }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- 待審核內容 -->
            <div v-if="isTab(Tab.UNCONFIRMED) && curUnconfirmPost" class="flex flex-col">
                <div class="p-6 flex flex-col border border-black-1 rounded mb-10">
                    <!-- 標題列 -->
                    <div class="flex mb-5">
                        <div class="w-[48px] h-[48px] flex justify-center items-center rounded bg-blue-light mr-[18px]">
                            <span 
                            class="icon-sparkle-checked text-3xl text-blue-dark"></span>
                        </div>
                        <div class="flex flex-col justify-between">
                            <h5>{{ curUnconfirmPost.companyName }} | {{ curUnconfirmPost.title }}</h5>
                            <div class="flex">
                                <div class="caption text-black-6">{{ curUnconfirmPost.type }}</div>
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
                                        <div class="caption text-black-5 mb-1">月薪</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>70-71k</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                                        <span class="icon-coin text-2xl text-blue"></span>
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">年薪</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>980-990k</h6> 
                                    </div>
                                </div>
                            </div>
                            <div class="lg:w-1/2 flex justify-between items-center">
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">年終</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>-</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">三節</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>-</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">分紅</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>-</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">其他</div>
                                        <!-- TODO 數值 computed 成範圍 -->
                                        <h6>-</h6> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex justify-between">
                            <div class="lg:w-1/2 flex justify-between items-center">
                                <div class="w-full flex justify-start items-center">
                                    <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                                        <span 
                                        :class="feelingClass(curUnconfirmPost.feeling)"
                                        class="text-2xl"></span>
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">上班心情</div>
                                        <h6>{{ feelingText(curUnconfirmPost.feeling) }}</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="w-[22px] h-[22px] flex justify-center items-center mr-3">
                                        <span 
                                        :class="overtimeClass(curUnconfirmPost.overtime)"
                                        class="text-2xl"></span>                                </div>
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">加班頻率</div>
                                        <h6>{{ overtimeText(curUnconfirmPost.overtime) }}</h6> 
                                    </div>
                                </div>
                            </div>
                            <div class="lg:w-1/2 flex justify-between items-center">
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">在職年資</div>
                                        <h6>{{curUnconfirmPost.workYears + ' 年'}}</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">個人總年資</div>
                                        <h6>{{curUnconfirmPost.totalWorkYears + ' 年'}}</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">日均工時</div>
                                        <h6>{{curUnconfirmPost.avgHoursPerDay + ' 小時'}}</h6> 
                                    </div>
                                </div>
                                <div class="w-full flex justify-start items-center">
                                    <div class="flex flex-col">
                                        <div class="caption text-black-5 mb-1">在職狀況</div>
                                        <h6>{{curUnconfirmPost.inService ? '仍在職' : '已離職'}}</h6> 
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
                        <span 
                        class="body-sm text-black-5 me-5" 
                        v-for="tag in curUnconfirmPost.tags" :key="tag">
                            #{{tag}}
                        </span>
                    </div>
                </div>
                <div class="flex justify-end ">
                    <button 
                    
                    class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-blue hover:bg-black-10 rounded mr-5">
                    通過
                    </button>
                    <button 
                    
                    class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out flex-row text-white fill-white bg-red hover:bg-black-10 rounded">
                    拒絕
                    </button>
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
                        <th>建立日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <button
                                class="flex py-3 px-5 justify-center items-center transition duration-300 ease-in-out flex-row text-white fill-white bg-red hover:bg-black-10 rounded">
                                下架
                            </button>
                        </td>
                        <td>通過</td>
                        <td>城市創意有限公司</td>
                        <td>前端工程師</td>
                        <td>全職</td>
                        <td>2023/3/16</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { IPost } from '@/interface/IPost';

// 未審核
const curUnconfirmPost = ref<IPost>(); // 目前選到的未審核物件
const unconfirmedPosts = ref<IPost[]>([]);
const unconfirmedPostsCount = computed(() => {
    return unconfirmedPosts.value.length || 0; // 未取得資料時先返回 0
});
onMounted(() => {
    initUnconfirmPost();
})
function selectCurPost(post : IPost){
    curUnconfirmPost.value = post;
}
function initUnconfirmPost() {
    // call 取得未審核 api
    unconfirmedPosts.value = [
        {
            postId: "Post1234",
			title: "工程師",
			companyName: "卯咪股份有限公司",
			taxId: "87654321",
			type: "全職",
			inService: true,
			city: "台北",
			workYears: 1,
			totalWorkYears: 5,
			avgHoursPerDay: 8,
			monthlySalary: 40000,
			yearlySalary: 480000,
			yearEndBonus: 40000,
			holidayBonus: 2000,
			profitSharingBonus: 2000,
			otherBonus: 2000,
			overtime: "4",
			feeling: "3",
			jobDescription: "對於資深設計師來說可以學習到很多管理上及處事合作上的工作方法，也練習如何在草創環境中執行製作且時程緊迫的專案中完成任務， 會是一個執得學習的場所。",	
            suggestion: "印象最深的是老闆會親自舉辦很多工作坊，對於職場新鮮人或是職場老手都很有收穫，公司重視提升軟實力，很建議對自己有要求，想要自我提升的人來此公司。",
			tags: ["有升遷管道", "固定加薪", "免費零食/水果", "固定加薪", "免費零食/水果", "固定加薪", "免費零食/水果", "固定加薪", "免費零食/水果", "固定加薪", "免費零食/水果", "固定加薪", "免費零食/水果"],
			status: "待審核",
			createDate: "2023.4.12",
		},
		{
			postId: "Post1234",
			title: "工程師2",
			companyName: "卯咪股份有限公司",
			taxId: "87654321",
			type: "全職",
			inService: true,
			city: "台北",
			workYears: 1,
			totalWorkYears: 5,
			avgHoursPerDay: 8,
			monthlySalary: 40000,
			yearlySalary: 480000,
			yearEndBonus: 40000,
			holidayBonus: 2000,
			profitSharingBonus: 2000,
			otherBonus: 2000,
			overtime: "1",
			feeling: "1",
			jobDescription: "主要是前後端開發，我們團隊使用 Vue + Java，也有其他團隊使用 React、Angular、.Net 等等。",	
            suggestion: "印象最深的是老闆會親自舉辦很多工作坊，對於職場新鮮人或是職場老手都很有收穫，公司重視提升軟實力，很建議對自己有要求，想要自我提升的人來此公司。",
			tags: ["有升遷管道", "固定加薪", "免費零食/水果"],
			status: "待審核",
			createDate: "2023.4.12",
		},
	]
    // 清空目前選擇的資訊
    curUnconfirmPost.value = undefined;
}

// 審核內容
const feelingText = computed(() => (id:string) => {
    let text = '';
    switch(id){
        case '1' :
            text = '非常開心';
            break;
        case '2' :
            text = '還算愉快';
            break;
        case '3' :
            text = '平常心';
            break;
        case '4' :
            text = '有苦說不出';
            break;
        case '5' :
            text = '想換工作了';
            break;
    }
    return text;
});
const feelingClass = computed(() => (id:string) => {
    let className = '';
    switch(id){
        case '1' :
            className = 'icon-face-good text-green';
            break;
        case '2' :
            className = 'icon-face-good text-green';
            break;
        case '3' :
            className = 'icon-face-normal text-yellow';
            break;
        case '4' :
            className = 'icon-face-bad text-red';
            break;
        case '5' :
            className = 'icon-face-bad text-red';
            break;
    }
    return className;
});
const overtimeText = computed(() => (id:string) => {
    let text = '';
    switch(id){
        case '1' :
            text = '準時上下班';
            break;
        case '2' :
            text = '很少加班';
            break;
        case '3' :
            text = '偶爾加班';
            break;
        case '4' :
            text = '常常加班';
            break;
        case '5' :
            text = '賣肝拼經濟';
            break;
    }
    return text;
});
const overtimeClass = computed(() => (id:string) => {
    let className = '';
    switch(id){
        case '1' :
            className = 'icon-time-good text-green';
            break;
        case '2' :
            className = 'icon-time-good text-green';
            break;
        case '3' :
            className = 'icon-time-normal text-yellow';
            break;
        case '4' :
            className = 'icon-time-bad text-red';
            break;
        case '5' :
            className = 'icon-time-bad text-red';
            break;
    }
    return className;
});
// 共用
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
const title = computed(() => {
    let title = '管理匿名分享';
    if (curTab.value == Tab.UNCONFIRMED) {
        if (curUnconfirmPost.value){
            title = '審核內容'
        }
    }
    return title;
});
</script>