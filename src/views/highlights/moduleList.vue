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
      <el-col :span="12">
        <el-form-item label="范围：">
          <base-date-picker v-model:startData="condition.startData"
                            v-model:endData="condition.endData" />
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
             class="mt10">
      <el-table :data="state.dataInfo.records"
                style="width: 100%">
        <el-table-column fixed
                         prop="title"
                         label="标题"
                         min-width="150" />
        <el-table-column prop="createTime"
                         label="创建时间"
                         :formatter="datetimeFormat"
                         min-width="200">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template #default="{row}">
            <el-button link
                       type="primary"
                       @click="edit(row,'编辑')">编辑</el-button>
            <el-button link
                       type="primary"
                       @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt10 justify-end"
                     v-model:currentPage="condition.page"
                     v-model:page-size="condition.pageSize"
                     :background="true"
                     layout="total, prev, pager, next"
                     :total="+state.dataInfo.total"
                     @current-change="getDataInfo" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getHighlightList } from "@/api/highlight";
import { datetimeFormat } from "@/hooks/useTableFormat";

const state = reactive<any>({
  showD: false,
  dataInfo: {},
});
let condition = ref<any>({
  page: 1,
  pageSize: 10,
});
let params = ref<any>({});

const getDataInfo = async (page = 1, pageSize = 10) => {
  condition.page = page;
  condition.pageSize = pageSize;
  const { data } = await getHighlightList({
    current: page,
    size: pageSize,
    ...condition.value,
  });
  state.dataInfo = { ...data };
};

const edit = (data: any = {}, title = "新增") => {
  params = {
    ...data,
    title,
  };
  state.showD = true;
  console.log("edit", params);
};

const del = (id: string) => {
  console.log(id, "del");
};

onMounted(() => {
  getDataInfo();
  console.log("onMounted");
});
</script>
<style lang="scss" scoped>
</style>
