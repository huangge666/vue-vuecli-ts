<template>
  <div class="upload-box">
    <!-- 上传组件 -->
    <el-upload ref="singleUploadRef"
               action=""
               :class="['upload', disabled ? 'is-view' : '']"
               :show-file-list="false"
               :style="uploadStyle"
               accept="image/jpeg,image/jpeg,image/png"
               :before-upload="handleBeforeUpload"
               :http-request="uploadImage">
      <img v-if="imgUrl"
           :src="imgUrl"
           class="image" />

      <el-icon v-else
               class="upload-icon">
        <Plus />
      </el-icon>

      <!-- 删除图标 -->
      <el-icon v-if="props.showClose && imgUrl"
               class="single-uploader__remove view-icon"
               @click.stop="handleRemove(imgUrl)">
        <Close />
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Close } from '@element-plus/icons-vue';
import {
  ElMessage,
  ElUpload,
  UploadRawFile,
  UploadRequestOptions,
  ElLoading
} from 'element-plus';
import { uploadFile } from "@/api/common";
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * 是否显示右上角的删除图片按钮
   */
  showClose: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  uploadStyle: {
    type: Object,
    default: () => ({width: "175px", height: "175px"})
  }
});
const imgUrl = computed<string | undefined>({
  get() {
    return props.modelValue;
  },
  set(val) {
    // imgUrl改变时触发修改父组件绑定的v-model的值
    emit('update:modelValue', val);
  }
});
/**
 * 自定义图片上传
 *
 * @param params
 */
async function uploadImage(options: UploadRequestOptions): Promise<any> {
  let excelFormData = new FormData();
	excelFormData.append("file", options.file);
	excelFormData.append("CustomerID", "178");
  const loading = ElLoading.service({
    lock: true,
    text: '上传中~~~',
    background: 'rgba(0, 0, 0, 0.7)',
    body:  true,
  })
  const result:any = await uploadFile(excelFormData);
  loading.close();
  imgUrl.value = result.Data.URL;
}
/**
 * 删除图片
 *
 * @param fileUrl
 */
function handleRemove(fileUrl?: string) {
  if (fileUrl) {
    imgUrl.value = undefined; // 这里会触发imgUrl的computed的set方法
  }
}
/**
 * 在 before-upload 钩子中限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file: UploadRawFile) {
  // const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.warning('上传图片不能大于2M');
  }
  return true;
}
</script>

<style lang="scss" scoped>
.upload-box {
  /* 上传组件禁用样式 */
  .is-view,
  .is-view:hover {
    border-color: var(--el-border-color) !important;
    :deep(.el-upload) {
      cursor: not-allowed !important;
    }
  }

  /* 上传组件样式 */
  .upload {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 2px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
    :deep(.el-upload) {
      position: relative;
      width: 100%;
      height: 100%;
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
      }
      .image {
        width: 100%;
        height: 100%;
      }
      .upload-icon {
        width: 100%;
        height: 100%;
        font-size: 28px;
        color: #8c939d;
      }
      .view-icon {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 25px;
        cursor: pointer;
        background: rgb(235 235 235 / 80%);
        border-bottom-left-radius: 10px;
        img {
          width: 17px;
        }
      }
    }
  }
}
</style>
