<template>
  <div>
    <el-form ref="dataInfoRef"
             :model="dataInfo"
             label-suffix="："
             label-width="auto">
      <el-form-item label="标题"
                    prop="title"
                    :rules="rules.title">
        <el-input v-model="dataInfo.title"
                  placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {
  getHighlightInfo,
  addBgStyleExhibition,
  editBgStyleExhibition,
} from "@/api/highlight";
export default defineComponent({
  name: "ModuleDetail",
  props: {
    params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const state = reactive({
      show: false,
      dataInfoRef: <FormInstance>{},
      dataInfo: {
        id: "",
        title: "",
      },
      rules: <FormRules>{
        title: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
    });

    const getDataInfo = async () => {
      if (!props.params?.id) {
        return;
      }
      const { data } = await getHighlightInfo(props.params.id);
      state.dataInfo = { ...data };
    };

    const save = async () => {
      await state.dataInfoRef.validate(async (valid: boolean) => {
        if (valid) {
          if (props.params?.id) {
            await editBgStyleExhibition(state.dataInfo, props.params.id);
          } else {
            await addBgStyleExhibition(state.dataInfo);
          }
          emit("close");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    onMounted(async () => {
      console.log("onMounted");
      await getDataInfo();
    });

    return {
      ...toRefs(state),
      save,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>