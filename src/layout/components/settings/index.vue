<!-- 设置页面 -->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        系统布局配置
      </h3>
      <div class="drawer-item">
        <span>显示侧边栏 Logo</span>
        <el-switch v-model="state.showSidebarLogo"
                   class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="state.fixedHeader"
                   class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示换肤按钮</span>
        <el-switch v-model="state.showThemeSwitch"
                   class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示全屏按钮</span>
        <el-switch v-model="state.showScreenfull"
                   class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings";
import { reactive, watch } from "vue";

const settingsStore = useSettingsStore();

const state = reactive({
  fixedHeader: settingsStore.fixedHeader,
  showSidebarLogo: settingsStore.showSidebarLogo,
  showThemeSwitch: settingsStore.showThemeSwitch,
  showScreenfull: settingsStore.showScreenfull,
});

watch(
  () => state.fixedHeader,
  (value: boolean) => {
    settingsStore.changeSetting({
      key: "fixedHeader",
      value,
    });
  }
);

watch(
  () => state.showSidebarLogo,
  (value: boolean) => {
    settingsStore.changeSetting({
      key: "showSidebarLogo",
      value,
    });
  }
);

watch(
  () => state.showThemeSwitch,
  (value: boolean) => {
    settingsStore.changeSetting({
      key: "showThemeSwitch",
      value,
    });
  }
);

watch(
  () => state.showScreenfull,
  (value: boolean) => {
    settingsStore.changeSetting({
      key: "showScreenfull",
      value,
    });
  }
);
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    color: #303133;
    font-size: 14px;
    line-height: 22px;
  }
  .drawer-item {
    color: #303133;
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
