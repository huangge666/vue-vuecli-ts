<template>
  <div>
    <el-dialog :title="title"
               v-model="value"
               width="600px"
               @close="close">
      <slot>content</slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary"
                     @click="save">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  name: "BaseFormDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "弹窗",
    },
  },
  emits: ["update:modelValue", "save"],
  setup(props, { emit }) {
    const state = reactive({
      value: false,
    });

    const save = () => {
      emit("save");
    };

    const close = () => {
      state.value = false;
      emit("update:modelValue", false);
    };

    watch(
      () => props.modelValue,
      (nVal) => {
        state.value = nVal;
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(state),
      close,
      save,
    };
  },
});
</script>

<style scoped>
</style>