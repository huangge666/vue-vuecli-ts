<template>
  <div>
    <el-drawer v-model="drawerVisible"
               :destroy-on-close="true"
               size="1200px"
               :title="`${drawerData.title}视频列表`">

      <base-search :modelValue="{}"
                   @add="edit()">
      </base-search>

      <template #footer>
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary"
                   v-show="!drawerData.isView"
                   @click="handleSubmit">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup name="VideoList">
import { onMounted, reactive, ref } from "vue";
import { useTable } from "@/hooks/useTabel";

interface DrawerProps {
  title: string;
  isView: boolean;
  seId?: string;
}

const drawerVisible = ref(false);
const drawerData = ref<DrawerProps>({
  isView: false,
  title: "",
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerData.value = params;
  drawerVisible.value = true;
};

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({
  seId: "",
});

// const {
//   tableData,
//   searchShow,
//   pageable,
//   searchParam,
//   searchInitParam,
//   getTableList,
//   search,
//   reset,
//   handleSizeChange,
//   handleCurrentChange,
// } = useTable();

const edit = (data: any = { id: "" }, title = "新增") => {
  console.log(title);
};

onMounted(() => {
  console.log("onMounted");
});
</script>
<style lang="scss" scoped>
</style>