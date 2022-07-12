<template>
  <div class="app-container">
    视频列表
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";

const state = reactive<any>({});

onMounted(() => {
  console.log("onMounted");
});
</script>
<style lang="scss" scoped>
</style>