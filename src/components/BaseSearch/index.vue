<template>
  <div class="base-search">
    <el-card shadow="never">
      <el-form class="search"
               ref="searchFormRef">

        <el-row :gutter="12">
          <el-col :span="20">
            <el-row :gutter="12">
              <slot></slot>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div class="action">
              <slot name="searchAction">
                <el-button type="primary"
                           @click="search()">搜索</el-button>
                <el-button @click="resetForm(searchFormRef)">重置</el-button>
              </slot>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="action">
              <slot name="action">
                <el-button type="success"
                           @click="add()">新增</el-button>
              </slot>
            </div>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
import type { FormInstance } from "element-plus";
export default defineComponent({
  name: "BaseSearch",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "search", "add", "input"],
  setup(props, { emit }) {
    const state = reactive({});

    const searchFormRef = ref<FormInstance>();

    // 重置表单，因为封装为组件，直接通过 emit 提交出去
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      // formEl.resetFields();
      emit("update:modelValue", {});
    };

    const search = () => {
      emit("search");
    };

    const add = () => {
      emit("add");
    };

    return {
      ...toRefs(state),
      searchFormRef,
      search,
      add,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.search {
  background-color: #ffffff;
  .action {
    float: right;
  }
}
</style>