
<template>
    <div class="bg-stone-300 text-black-10 h-content ">
        <div class="container mx-auto max-w-7xl flex flex-col pt-10">
            <div class="mb-1 text-stone-600">Style</div>
            <div class="py-10 bg-white px-10">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full sm:w-1/2 px-2">
                        <div class="text-2xl text-blue mb-5">Color</div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-white border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-white</div>
                                <div class="text-xs text-stone-600">#FFFFFF</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-gray border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-gray</div>
                                <div class="text-xs text-stone-600">#F5F5F8</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-dark border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-dark</div>
                                <div class="text-xs text-stone-600">#D4D4D7</div>
                            </div>
                        </div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-black-10 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-10</div>
                                <div class="text-xs text-stone-600">#2B2B31</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-6 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-6</div>
                                <div class="text-xs text-stone-600">#2B2B31A8</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-5 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-5</div>
                                <div class="text-xs text-stone-600">#2B2B3180</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-3 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-3</div>
                                <div class="text-xs text-stone-600">#2B2B314D</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-black-1 border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-black-1</div>
                                <div class="text-xs text-stone-600">#2B2B311A</div>
                            </div>
                        </div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-blue border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-blue</div>
                                <div class="text-xs text-stone-600">#366BAB</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-blue-light border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-blue-light</div>
                                <div class="text-xs text-stone-600">#E9F7FF</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-blue-dark border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-blue-dark</div>
                                <div class="text-xs text-stone-600">#25469A</div>
                            </div>
                        </div>
                        <div class="flex flex-row mb-5 font-semibold">
                            <div class="flex flex-col">
                                <div class="bg-green border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-green</div>
                                <div class="text-xs text-stone-600">#329063</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-yellow border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-yellow</div>
                                <div class="text-xs text-stone-600">#D08B24</div>
                            </div>
                            <div class="flex flex-col">
                                <div class="bg-red border border-stone-200 me-5 mb-1" style="height:79px; width:79px"></div>
                                <div class="text-sm text-stone-900">bg-red</div>
                                <div class="text-xs text-stone-600">#BE2C61</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-1/2 px-2">
                        <div class="text-2xl text-blue mb-5">Typography</div>
                        <div class="mb-2">
                            <h1 class="mb-2 me-4 inline-block">Title / H1</h1>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h1Code"></span>
                        </div>
                        <div class="mb-2">
                            <h2 class="mb-2 me-4 inline-block">Title / H2</h2>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h2Code"></span>
                        </div>
                        <div class="mb-2">
                            <h3 class="mb-2 me-4 inline-block">Title / H3</h3>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h3Code"></span>
                        </div>
                        <div class="mb-2">
                            <h4 class="mb-2 me-4 inline-block">Title / H4</h4>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h4Code"></span>
                        </div>
                        <div class="mb-2">
                            <h5 class="mb-2 me-4 inline-block">Title / H5</h5>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h5Code"></span>
                        </div>
                        <div class="mb-2">
                            <h6 class="mb-2 me-4 inline-block">Title / H6</h6>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="h6Code"></span>
                        </div>
                        <div class="mb-2">
                            <div class="body mb-2 me-4 inline-block">Title / Body.20</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="bodyCode"></span>
                        </div>
                        <div class="mb-2">
                            <div class="body-sm mb-2 me-4 inline-block">Title / Body.16</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="bodySmCode"></span>
                        </div>
                        <div class="mb-10">
                            <div class="caption mb-2 me-4 inline-block">Title / Caption</div>
                            <span class="bg-stone-200 p-2 text-xs text-stone-600 rounded " v-text="captionCode"></span>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="w-full">
                        <div class="text-2xl text-blue mb-5">Icon</div>
                        <div class="mb-5">以下將設計師給的 SVG 打包成字體，各 icon 的 class name ：</div>
                        <div class="flex flex-wrap">
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-time-bad me-2"></span>
                                <p>icon-time-bad</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-time-good me-2"></span>
                                <p>icon-time-good</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-time-normal me-2"></span>
                                <p>icon-time-normal</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-coin me-2"></span>
                                <p>icon-coin</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-cross me-2"></span>
                                <p>icon-cross</p>
                            </div>

                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-edit me-2"></span>
                                <p>icon-edit</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-face-bad me-2"></span>
                                <p>icon-face-bad</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-face-good me-2"></span>
                                <p>icon-face-good</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-face-normal me-2"></span>
                                <p>icon-face-normal</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-file me-2"></span>
                                <p>icon-file</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-filter me-2"></span>
                                <p>icon-filter</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-hide me-2"></span>
                                <p>icon-hide</p>
                            </div>

                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-list me-2"></span>
                                <p>icon-list</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-message me-2"></span>
                                <p>icon-message</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-message-blank me-2"></span>
                                <p>icon-message-blank</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-person me-2"></span>
                                <p>icon-person</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-person-circle me-2"></span>
                                <p>icon-person-circle</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-person-checked me-2"></span>
                                <p>icon-person-checked</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-plus me-2"></span>
                                <p>icon-plus</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-plus-circle me-2"></span>
                                <p>icon-plus-circle</p>
                            </div>

                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-search me-2"></span>
                                <p>icon-search</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-share me-2"></span>
                                <p>icon-share</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-shield-checked me-2"></span>
                                <p>icon-shield-checked</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-slide me-2"></span>
                                <p>icon-slide</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-sparkle-checked me-2"></span>
                                <p>icon-sparkle-checked</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-star me-2"></span>
                                <p>icon-star</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-star-circle me-2"></span>
                                <p>icon-star-circle</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-down-arrow me-2"></span>
                                <p>icon-down-arrow</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-left-arrow me-2"></span>
                                <p>icon-left-arrow</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-right-arrow me-2"></span>
                                <p>icon-right-arrow</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-up-arrow me-2"></span>
                                <p>icon-up-arrow</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-mail me-2"></span>
                                <p>icon-mail</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-fire me-2"></span>
                                <p>icon-fire</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-star-circle-fill me-2"></span>
                                <p>icon-star-circle-fill</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-message-word me-2"></span>
                                <p>icon-message-word</p>
                            </div>
                            <div class="flex flex-row items-center me-5 mb-8">
                                <span class="text-2xl icon-file-gear me-2"></span>
                                <p>icon-file-gear</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto max-w-7xl flex flex-col pt-10">
            <div class="mb-1 text-stone-600">Component</div>
                <div class="py-10 bg-white px-10">
                    <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-5">
                    <div class="w-full sm:w-2/12 px-2">
                    </div>
                    <div class="w-full sm:w-6/12 px-2">
                        <div class="flex flex-row justify-center ">
                        <h4>Default / Hover / Pressed</h4>
                        </div>
                    </div>
                    <div class="w-full sm:w-4/12 px-2">
                        <div class="flex flex-row justify-center">
                        <h4>使用方法</h4>
                        </div>
                    </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 border-b-2 border-stone-300 py-10 ">
                        <div class="w-full sm:w-2/12 px-2">
                            <h4 class="h4 ms-10">Button</h4>
                        </div>
                        <div class="w-full sm:w-6/12 px-2">
                            <div class="flex flex-col justify-center items-center mb-6 ">
                                <button
                                    @click="confirmOpen"
                                    class="mb-5 px-6 py-2 text-white bg-blue rounded shadow"
                                    type="button"
                                >
                                    Open confirmOpen
                                </button>
                                <button
                                    @click="promptOpen"
                                    class="px-6 py-2 text-white bg-blue rounded shadow"
                                    type="button"
                                >
                                    Open promptOpen
                                </button>
                            </div>
                        </div>
                        <div class="w-full sm:w-4/12 px-2">
                            <div class="flex flex-col justify-center items-start">
                            <div class="w-full bg-stone-200 py-2 px-5 text-xs text-stone-600 rounded overflow-x-scroll">
                                <pre><code>
js:
import { openConfirmModal, openPromptModal } from "@/utilities/dialog";

// 開啟有 "確定" 跟 "取消" 按鈕的彈出視窗
openConfirmModal(title, message, confirmFunc, cancelFunc);

// 開啟有 "確定"按鈕的彈出視窗
openPromptModal(title, message, confirmFunc);


參數說明:
title: 
    標題, 傳入 String
message: 
    內容, 傳入 String
confirmFunc: 
    確認方法, 傳入 Function | undefined , 點擊確定會觸發此方法並關閉視窗
    cancelFunc: 
    取消方法, 傳入 Function | undefined , 點擊取消會觸發此方法並關閉視窗
                                        </code></pre>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { openConfirmModal, openPromptModal } from "@/utilities/dialog";

const h1Code = ref('<h1>Title / H1</h1>');
const h2Code = ref('<h2>Title / H2</h2>');
const h3Code = ref('<h3>Title / H3</h3>');
const h4Code = ref('<h4>Title / H4</h4>');
const h5Code = ref('<h5>Title / H5</h5>');
const h6Code = ref('<h6>Title / H6</h6>');
const bodyCode = ref('<div class="body">Title / Body.20</div>');
const bodySmCode = ref('<div class="body-sm">Title / Body.16</div>');
const captionCode = ref('<div class="caption">Title / Caption</div>');

const isOpen = ref(false);
const isOpen2 = ref(false);

function confirmOpen(){
    // 使用 utilities 的 dialog 開啟視窗
    let title = "標題";
    let message = "內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文";
    openConfirmModal(title, message, confirmFunc, cancelFunc);
}
function promptOpen(){
    // 使用 utilities 的 dialog 開啟視窗
    let title = "標題2";
    let message = "內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文2";
    console.log(title, message);
    openPromptModal(title, message, confirmFunc);
}
function confirmFunc(){
    console.log("觸發確定按鈕");
}
function cancelFunc(){
    console.log("觸發取消按鈕");
}

</script>