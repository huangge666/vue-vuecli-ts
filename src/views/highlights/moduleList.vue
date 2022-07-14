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
          <el-button type="danger"
                     @click="del(state.selectRows)">
            批量删除
          </el-button>
        </div>
      </template>
    </base-search>
    <el-card shadow="never"
             class="mt10">
      <el-table ref="multipleTableRef"
                :data="state.dataInfo.records"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55" />
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
                       @click="del([row])">删除</el-button>
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

    <base-form-dialog v-model="state.showD"
                      :title="params.title"
                      @save="ModuleDetailRef.save()">
      <module-detail v-if="state.showD"
                     key="ModuleDetail"
                     ref="ModuleDetailRef"
                     @close="state.showD=false;getDataInfo(condition.page)"></module-detail>
    </base-form-dialog>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { datetimeFormat } from "@/hooks/useTableFormat";
import ModuleDetail from "./moduleDetail.vue";
import { getHighlightList, delBgStyleExhibition } from "@/api/highlight";

const state = reactive({
  showD: false,
  params: {},
  dataInfo: {},
  selectRows: <Object[]>[],
});
const { params } = toRefs(state);

let condition = ref<any>({
  page: 1,
  pageSize: 10,
});

const ModuleDetailRef = ref();

const getDataInfo = async (page = 1, pageSize = 10) => {
  condition.value.page = page;
  condition.value.pageSize = pageSize;
  const { data } = await getHighlightList({
    current: page,
    size: pageSize,
    ...condition.value,
  });
  state.dataInfo = { ...data };
};

const edit = (data: any = {}, title = "新增") => {
  state.params = {
    ...data,
    title,
  };
  state.showD = true;
};

const handleSelectionChange = (e: Object[]) => {
  state.selectRows = e;
};

const del = (rows: object[]) => {
  if(rows.length === 0){
    ElMessage.warning("未选中任何行");
    return;
  }
  let msg = "你确定要删除当前项吗";
  if (rows.length > 1) {
    msg = "你确定要删除选中项吗";
  }
  ElMessageBox.confirm(msg, "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await delBgStyleExhibition(rows.map((item: any) => item.id));
      await getDataInfo(condition.value.page);
    })
    .catch(() => {
      ElMessage.info("你已取消操作");
    });
};

onMounted(async () => {
  await getDataInfo();
});
</script>
<style lang="scss" scoped>
</style>
