<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading';
import BaseLoading from '@/component/BaseLoading.vue';
const loading = useLoadingStore();
const { isShowLoading } = storeToRefs(loading);
</script>

<template>
  <div v-if="isShowLoading" class="fixed top-0 left-0 w-screen h-screen bg-black-3 z-[999]">
    <div class="w-full h-full flex justify-center items-center">
      <BaseLoading></BaseLoading>
    </div>
  </div>
</template>
