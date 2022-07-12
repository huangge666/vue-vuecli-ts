<template>
  <div>
    <el-date-picker v-model="dateValue"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :value-format="valueFormat"
                    @change="changeData" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "BaseDatePicker",
  props: {
    startData: {
      type: [Number, String],
      default: "",
    },
    endData: {
      type: [Number, String],
      default: "",
    },
    valueFormat: {
      type: String,
      default: "x",
    },
  },
  emits: ["update:startData", "update:endData", "search", "add", "input"],
  setup(props, { emit }) {
    const dateValue = ref();

    const changeData = (e: any) => {
      if (!e) {
        emit("update:startData", "");
        emit("update:endData", "");
        return;
      }
      emit("update:startData", e[0]);
      emit("update:endData", e[1]);
    };

    watch(
      () => props.startData,
      (nVal) => {
        dateValue.value = [props.startData, props.endData];
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      dateValue,
      changeData,
    };
  },
});
</script>

<style scoped>
</style>