<template>
  <div class="base-search">
    <el-card shadow="never">
      <el-form class="search"
               ref="searchFormRef">

        <el-row :gutter="12">
          <el-col :span="19">
            <el-row :gutter="12">
              <slot></slot>
            </el-row>
          </el-col>
          <el-col :span="5">
            <div class="action">
              <slot name="searchAction">
                <el-button type="primary"
                           @click="search()">搜索</el-button>
                <el-button @click="resetForm(searchFormRef)">重置</el-button>
                <el-button v-if="showActionMore"
                           type="primary"
                           link
                           class="search-isOpen"
                           @click="searchShow = !searchShow">
                  {{ searchShow ? "合并" : "展开" }}
                  <el-icon class="el-icon--right">
                    <template v-if="searchShow">
                      <ArrowUp />
                    </template>
                    <template v-else>
                      <ArrowDown />
                    </template>
                  </el-icon>
                </el-button>
              </slot>
            </div>
          </el-col>

          <div class="search-operation"
               v-show="searchShow">
            <slot name="search-operation">
              search-operation
            </slot>
          </div>

          <el-col :span="24">
            <div class="action"
                 :class="{left: actionFloat == 'left'}">
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
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";

export default defineComponent({
  name: "BaseSearch",
  components: {
    ArrowDown: ArrowDown,
    ArrowUp: ArrowUp,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
    actionFloat: {
      type: String,
      default: "right",
    },
    // 展开按钮
    actionMore: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "search", "add", "input"],
  setup(props, { emit }) {
    const state = reactive({
      searchShow: false,
    });

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

    const showActionMore = computed(() => {
      return props.actionMore;
    });

    return {
      ...toRefs(state),
      searchFormRef,
      search,
      add,
      resetForm,
      showActionMore,
    };
  },
});
</script>

<style lang="scss" scoped>
.search {
  background-color: #ffffff;
  .action {
    float: right;

    &.left {
      float: left;
    }
  }
}
</style>