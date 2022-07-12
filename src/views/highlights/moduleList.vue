<template>
  <div class="app-container">
    <base-search v-model="condition"
                 @search="getDataInfo()"
                 @add="edit()">
      <el-col :span="12">
        <el-form-item>
          <el-input v-model="condition.keyword"
                    placeholder="请输入关键字"
                    class="input-with-select">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </el-form-item>
      </el-col>

      <template #action>
        <div class="action">
          <el-button type="success"
                     @click="edit()">新增</el-button>
        </div>
      </template>
    </base-search>
    <el-card shadow="never"
             class="mt10"></el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

const state = reactive<any>({
  showD: false,
});
let condition = ref({});
let params = ref<any>({});

const getDataInfo = () => {
  console.log("获取数据");
};

const edit = (data: any = {}, title = "新增") => {
  params = {
    ...data,
    title,
  };
  state.showD = true;
  console.log("edit", params);
};

onMounted(() => {
  console.log("onMounted");
});
</script>
<style lang="scss" scoped>
</style>
